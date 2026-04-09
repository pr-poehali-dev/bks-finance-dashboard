import { useState, useMemo, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { getAllocationData, AllocationFlow } from "@/data/mockData";

type ViewMode = "plan" | "fact";
type GroupBy = "cfo" | "activity";

interface SankeyNode {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  column: number;
  value: number;
}

interface SankeyLink {
  source: string;
  target: string;
  value: number;
  sourceNode?: SankeyNode;
  targetNode?: SankeyNode;
  sourceY?: number;
  targetY?: number;
  color: string;
  activity: string;
  article: string;
  sharePercent: number;
}

const CFO_COLORS: Record<string, string> = {
  "ИТ-департамент": "#6366f1",
  "HR и администрация": "#f59e0b",
  "Управление рисками": "#ef4444",
  "Казначейство": "#8b5cf6",
  "Управление активами": "#10b981",
  "Брокерское обслуживание": "#3b82f6",
  "Инвестиционный банкинг": "#f97316",
  "Инвестиционный банкинг (цель)": "#f97316",
};

const ACTIVITY_COLORS: Record<string, string> = {
  "ИТ-поддержка бизнеса": "#6366f1",
  "Развитие ИТ": "#818cf8",
  "HR и обеспечение": "#f59e0b",
  "Контроль рисков": "#ef4444",
  "Управление ликвидностью": "#8b5cf6",
};

function fmtMln(v: number) {
  return `₽${(v / 1_000_000).toFixed(1)} млн`;
}

function buildSankey(
  flows: AllocationFlow[],
  mode: ViewMode,
  groupBy: GroupBy,
  containerWidth: number
): { nodes: SankeyNode[]; links: SankeyLink[] } {
  const getValue = (f: AllocationFlow) => mode === "plan" ? f.planAmount : f.factAmount;

  const NODE_WIDTH = 140;
  const NODE_GAP = 12;
  const COL_GAP = (containerWidth - NODE_WIDTH * 3) / 2;
  const COL_X = [0, NODE_WIDTH + COL_GAP, NODE_WIDTH * 2 + COL_GAP * 2];
  const PADDING_TOP = 10;

  const sourceSet = new Set(flows.map((f) => f.sourceCfo));
  const targetSet = new Set(flows.map((f) => f.targetCfo));
  const middleSet = new Set(flows.map((f) => groupBy === "cfo" ? f.sourceCfo : f.activity));

  const nodeMap: Record<string, { value: number; column: number; label: string }> = {};

  for (const f of flows) {
    const val = getValue(f);
    const midKey = groupBy === "cfo" ? `mid_${f.sourceCfo}` : `mid_${f.activity}`;
    const midLabel = groupBy === "cfo" ? f.sourceCfo : f.activity;
    const midColor = groupBy === "cfo" ? CFO_COLORS[f.sourceCfo] : ACTIVITY_COLORS[f.activity];

    if (!nodeMap[f.sourceCfo]) nodeMap[f.sourceCfo] = { value: 0, column: 0, label: f.sourceCfo };
    nodeMap[f.sourceCfo].value += val;

    if (!nodeMap[midKey]) nodeMap[midKey] = { value: 0, column: 1, label: midLabel };
    nodeMap[midKey].value += val;

    if (!nodeMap[f.targetCfo]) nodeMap[f.targetCfo] = { value: 0, column: 2, label: f.targetCfo };
    nodeMap[f.targetCfo].value += val;
  }

  const totalByCol: Record<number, number> = { 0: 0, 1: 0, 2: 0 };
  for (const n of Object.values(nodeMap)) {
    totalByCol[n.column] += n.value;
  }

  const maxTotal = Math.max(...Object.values(totalByCol));
  const svgHeight = 400;
  const usableHeight = svgHeight - PADDING_TOP * 2;

  const colNodes: Record<number, string[]> = { 0: [], 1: [], 2: [] };
  for (const [id, n] of Object.entries(nodeMap)) {
    colNodes[n.column].push(id);
  }

  const nodes: SankeyNode[] = [];
  for (let col = 0; col < 3; col++) {
    const ids = colNodes[col].sort((a, b) => nodeMap[b].value - nodeMap[a].value);
    const totalH = ids.reduce((sum, id) => sum + (nodeMap[id].value / maxTotal) * usableHeight, 0);
    const totalGap = (ids.length - 1) * NODE_GAP;
    let startY = PADDING_TOP + Math.max(0, (usableHeight - totalH - totalGap) / 2);

    for (const id of ids) {
      const n = nodeMap[id];
      const h = Math.max(24, (n.value / maxTotal) * usableHeight);
      const color = col === 0
        ? (CFO_COLORS[n.label] || "#94a3b8")
        : col === 1
          ? (groupBy === "cfo" ? (CFO_COLORS[n.label] || "#94a3b8") : (ACTIVITY_COLORS[n.label] || "#94a3b8"))
          : (CFO_COLORS[n.label] || "#94a3b8");

      nodes.push({
        id,
        label: n.label,
        x: COL_X[col],
        y: startY,
        width: NODE_WIDTH,
        height: h,
        color,
        column: col,
        value: n.value,
      });
      startY += h + NODE_GAP;
    }
  }

  const nodeById: Record<string, SankeyNode> = {};
  for (const n of nodes) nodeById[n.id] = n;

  const sourceOffsets: Record<string, number> = {};
  const midOffsets: Record<string, number> = {};
  const targetOffsets: Record<string, number> = {};

  const links: SankeyLink[] = [];

  for (const f of flows) {
    const val = getValue(f);
    const midKey = groupBy === "cfo" ? `mid_${f.sourceCfo}` : `mid_${f.activity}`;
    const srcNode = nodeById[f.sourceCfo];
    const midNode = nodeById[midKey];
    const tgtNode = nodeById[f.targetCfo];
    if (!srcNode || !midNode || !tgtNode) continue;

    const maxV = maxTotal;
    const linkH1 = Math.max(1, (val / maxV) * usableHeight);
    const linkH2 = Math.max(1, (val / maxV) * usableHeight);

    if (!sourceOffsets[f.sourceCfo]) sourceOffsets[f.sourceCfo] = 0;
    if (!midOffsets[midKey]) midOffsets[midKey] = 0;
    if (!targetOffsets[f.targetCfo]) targetOffsets[f.targetCfo] = 0;

    const srcY = srcNode.y + sourceOffsets[f.sourceCfo];
    const midInY = midNode.y + midOffsets[midKey];
    const tgtY = tgtNode.y + targetOffsets[f.targetCfo];

    const linkColor = srcNode.color;

    links.push({
      source: f.sourceCfo,
      target: midKey,
      value: val,
      sourceNode: srcNode,
      targetNode: midNode,
      sourceY: srcY + linkH1 / 2,
      targetY: midInY + linkH2 / 2,
      color: linkColor,
      activity: f.activity,
      article: f.article,
      sharePercent: f.sharePercent,
    });

    links.push({
      source: midKey,
      target: f.targetCfo,
      value: val,
      sourceNode: midNode,
      targetNode: tgtNode,
      sourceY: midInY + linkH2 / 2,
      targetY: tgtY + linkH2 / 2,
      color: linkColor,
      activity: f.activity,
      article: f.article,
      sharePercent: f.sharePercent,
    });

    sourceOffsets[f.sourceCfo] = (sourceOffsets[f.sourceCfo] || 0) + linkH1;
    midOffsets[midKey] = (midOffsets[midKey] || 0) + linkH2;
    targetOffsets[f.targetCfo] = (targetOffsets[f.targetCfo] || 0) + linkH2;
  }

  return { nodes, links };
}

function SankeyPath({ link, hovered, onHover }: {
  link: SankeyLink;
  hovered: boolean;
  onHover: (l: SankeyLink | null) => void;
}) {
  if (!link.sourceNode || !link.targetNode) return null;
  const x1 = link.sourceNode.x + link.sourceNode.width;
  const x2 = link.targetNode.x;
  const y1 = link.sourceY!;
  const y2 = link.targetY!;
  const cx = (x1 + x2) / 2;

  const d = `M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2}`;

  return (
    <path
      d={d}
      fill="none"
      stroke={link.color}
      strokeWidth={Math.max(1.5, (link.value / 5_000_000))}
      strokeOpacity={hovered ? 0.9 : 0.35}
      style={{ cursor: "pointer", transition: "stroke-opacity 0.15s" }}
      onMouseEnter={() => onHover(link)}
      onMouseLeave={() => onHover(null)}
    />
  );
}

const AllocationSankey = () => {
  const [mode, setMode] = useState<ViewMode>("plan");
  const [groupBy, setGroupBy] = useState<GroupBy>("activity");
  const [hoveredLink, setHoveredLink] = useState<SankeyLink | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number } | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(700);

  useEffect(() => {
    const obs = new ResizeObserver((entries) => {
      for (const e of entries) setWidth(e.contentRect.width);
    });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const { flows } = getAllocationData();

  const filteredFlows = useMemo(
    () => selectedSource ? flows.filter((f) => f.sourceCfo === selectedSource) : flows,
    [flows, selectedSource]
  );

  const { nodes, links } = useMemo(
    () => buildSankey(filteredFlows, mode, groupBy, Math.max(width - 32, 400)),
    [filteredFlows, mode, groupBy, width]
  );

  const svgHeight = 420;

  const sourceCfos = useMemo(() => [...new Set(flows.map((f) => f.sourceCfo))], [flows]);

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
    setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const summaryRows = useMemo(() => {
    const grouped: Record<string, { plan: number; fact: number }> = {};
    for (const f of flows) {
      if (!grouped[f.sourceCfo]) grouped[f.sourceCfo] = { plan: 0, fact: 0 };
      grouped[f.sourceCfo].plan += f.planAmount;
      grouped[f.sourceCfo].fact += f.factAmount;
    }
    return Object.entries(grouped).sort((a, b) => b[1].plan - a[1].plan);
  }, [flows]);

  return (
    <Card className="border-0 shadow-sm p-5 animate-slide-up" style={{ animationDelay: "200ms" }}>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
        <div>
          <h3 className="text-base font-semibold text-foreground">Аллокации расходов</h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Распределение затрат ЦФО через активности на центры прибыли
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex rounded-lg border border-border overflow-hidden text-xs">
            <button
              className={`px-3 py-1.5 font-medium transition-colors ${mode === "plan" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted"}`}
              onClick={() => setMode("plan")}
            >
              План
            </button>
            <button
              className={`px-3 py-1.5 font-medium transition-colors ${mode === "fact" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted"}`}
              onClick={() => setMode("fact")}
            >
              Факт
            </button>
          </div>
          <div className="flex rounded-lg border border-border overflow-hidden text-xs">
            <button
              className={`px-3 py-1.5 font-medium transition-colors ${groupBy === "activity" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted"}`}
              onClick={() => setGroupBy("activity")}
            >
              По активностям
            </button>
            <button
              className={`px-3 py-1.5 font-medium transition-colors ${groupBy === "cfo" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted"}`}
              onClick={() => setGroupBy("cfo")}
            >
              По ЦФО
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSelectedSource(null)}
          className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${!selectedSource ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}
        >
          Все ЦФО
        </button>
        {sourceCfos.map((cfo) => (
          <button
            key={cfo}
            onClick={() => setSelectedSource(selectedSource === cfo ? null : cfo)}
            className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${selectedSource === cfo ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}
            style={selectedSource === cfo ? {} : { borderColor: CFO_COLORS[cfo] + "60" }}
          >
            <span
              className="inline-block w-2 h-2 rounded-full mr-1.5"
              style={{ background: CFO_COLORS[cfo] || "#94a3b8" }}
            />
            {cfo}
          </button>
        ))}
      </div>

      <div className="flex gap-6 mb-3 text-xs text-muted-foreground font-medium">
        <span className="flex-1 text-left">ЦФО-источник</span>
        <span className="flex-1 text-center">{groupBy === "activity" ? "Активность" : "ЦФО (проводник)"}</span>
        <span className="flex-1 text-right">ЦФО-получатель</span>
      </div>

      <div ref={containerRef} className="relative">
        <svg
          width="100%"
          height={svgHeight}
          viewBox={`0 0 ${Math.max(width - 32, 400)} ${svgHeight}`}
          onMouseMove={handleSvgMouseMove}
          onMouseLeave={() => { setHoveredLink(null); setTooltip(null); }}
          style={{ overflow: "visible" }}
        >
          {links.map((link, i) => (
            <SankeyPath
              key={i}
              link={link}
              hovered={hoveredLink === link}
              onHover={setHoveredLink}
            />
          ))}
          {nodes.map((node) => (
            <g key={node.id}>
              <rect
                x={node.x}
                y={node.y}
                width={node.width}
                height={node.height}
                rx={4}
                fill={node.color}
                fillOpacity={0.9}
              />
              {node.height >= 20 && (
                <text
                  x={node.x + node.width / 2}
                  y={node.y + node.height / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={node.height > 36 ? 11 : 9}
                  fontWeight={600}
                  fill="white"
                  style={{ pointerEvents: "none", userSelect: "none" }}
                >
                  {node.label.length > 16 && node.height < 48
                    ? node.label.split(" ").map((w, i, arr) =>
                      i === 0 ? <tspan key={i} x={node.x + node.width / 2} dy={i === 0 && arr.length > 1 ? "-0.5em" : "0"}>{w}</tspan>
                        : <tspan key={i} x={node.x + node.width / 2} dy="1.2em">{w}</tspan>
                    )
                    : node.label
                  }
                </text>
              )}
              {node.height >= 48 && (
                <text
                  x={node.x + node.width / 2}
                  y={node.y + node.height - 8}
                  textAnchor="middle"
                  fontSize={9}
                  fill="white"
                  fillOpacity={0.8}
                  style={{ pointerEvents: "none", userSelect: "none" }}
                >
                  {fmtMln(node.value)}
                </text>
              )}
            </g>
          ))}

          {hoveredLink && tooltip && (
            <g>
              <rect
                x={Math.min(tooltip.x + 10, (width - 32) - 180)}
                y={Math.max(tooltip.y - 60, 0)}
                width={170}
                height={70}
                rx={6}
                fill="white"
                stroke="#e2e8f0"
                strokeWidth={1}
                filter="drop-shadow(0 2px 6px rgba(0,0,0,0.12))"
              />
              <text
                x={Math.min(tooltip.x + 18, (width - 32) - 172)}
                y={Math.max(tooltip.y - 44, 14)}
                fontSize={10}
                fontWeight={600}
                fill="#1e293b"
              >
                {hoveredLink.activity}
              </text>
              <text
                x={Math.min(tooltip.x + 18, (width - 32) - 172)}
                y={Math.max(tooltip.y - 30, 28)}
                fontSize={9}
                fill="#64748b"
              >
                Статья: {hoveredLink.article}
              </text>
              <text
                x={Math.min(tooltip.x + 18, (width - 32) - 172)}
                y={Math.max(tooltip.y - 18, 40)}
                fontSize={9}
                fill="#64748b"
              >
                Сумма: {fmtMln(hoveredLink.value)}
              </text>
              <text
                x={Math.min(tooltip.x + 18, (width - 32) - 172)}
                y={Math.max(tooltip.y - 6, 52)}
                fontSize={9}
                fill="#64748b"
              >
                Доля: {hoveredLink.sharePercent}%
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="mt-5 border-t border-border pt-4">
        <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Итого аллокаций по ЦФО</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {summaryRows.map(([cfo, vals]) => {
            const exec = vals.plan > 0 ? Math.round((vals.fact / vals.plan) * 1000) / 10 : 0;
            return (
              <div
                key={cfo}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/40 cursor-pointer hover:bg-muted/70 transition-colors"
                onClick={() => setSelectedSource(selectedSource === cfo ? null : cfo)}
              >
                <span
                  className="w-3 h-8 rounded flex-shrink-0"
                  style={{ background: CFO_COLORS[cfo] || "#94a3b8" }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{cfo}</p>
                  <p className="text-xs text-muted-foreground">
                    {fmtMln(mode === "plan" ? vals.plan : vals.fact)}
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0 ${exec <= 100 ? "bg-emerald-50 text-emerald-700" : exec <= 115 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-600"}`}
                >
                  {exec}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-3 opacity-60">
        Наведите на поток для детализации · Нажмите на карточку ЦФО или фильтр для фокуса
      </p>
    </Card>
  );
};

export default AllocationSankey;
