import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { getAllocationData, AllocationFlow } from "@/data/mockData";

type ViewMode = "plan" | "fact";
type GroupBy = "source" | "target" | "activity";

const CFO_COLORS: Record<string, string> = {
  "ИТ-департамент": "#6366f1",
  "HR и администрация": "#f59e0b",
  "Управление рисками": "#ef4444",
  "Казначейство": "#8b5cf6",
  "Управление активами": "#10b981",
  "Брокерское обслуживание": "#3b82f6",
  "Инвестиционный банкинг": "#f97316",
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

function shortName(name: string) {
  const map: Record<string, string> = {
    "Управление активами": "Упр. активами",
    "Брокерское обслуживание": "Брокерское",
    "Инвестиционный банкинг": "Инвест. банкинг",
    "Казначейство": "Казначейство",
    "Управление рисками": "Упр. рисками",
    "ИТ-департамент": "ИТ-деп.",
    "HR и администрация": "HR и адм.",
    "ИТ-поддержка бизнеса": "ИТ-поддержка",
    "Развитие ИТ": "Развитие ИТ",
    "HR и обеспечение": "HR и обесп.",
    "Контроль рисков": "Контроль риск.",
    "Управление ликвидностью": "Упр. ликвидн.",
  };
  return map[name] || name;
}

interface ChartRow {
  name: string;
  fullName: string;
  value: number;
  planValue: number;
  factValue: number;
  color: string;
  details: { label: string; value: number; color: string }[];
}

function buildChartData(
  flows: AllocationFlow[],
  mode: ViewMode,
  groupBy: GroupBy
): ChartRow[] {
  const getValue = (f: AllocationFlow) =>
    mode === "plan" ? f.planAmount : f.factAmount;

  const grouped: Record<
    string,
    { plan: number; fact: number; details: Record<string, { plan: number; fact: number }> }
  > = {};

  for (const f of flows) {
    const key =
      groupBy === "source"
        ? f.sourceCfo
        : groupBy === "target"
        ? f.targetCfo
        : f.activity;

    const detailKey =
      groupBy === "source"
        ? f.targetCfo
        : groupBy === "target"
        ? f.sourceCfo
        : f.sourceCfo;

    if (!grouped[key]) grouped[key] = { plan: 0, fact: 0, details: {} };
    grouped[key].plan += f.planAmount;
    grouped[key].fact += f.factAmount;

    if (!grouped[key].details[detailKey])
      grouped[key].details[detailKey] = { plan: 0, fact: 0 };
    grouped[key].details[detailKey].plan += f.planAmount;
    grouped[key].details[detailKey].fact += f.factAmount;
  }

  return Object.entries(grouped)
    .map(([name, data]) => {
      const color =
        groupBy === "activity"
          ? ACTIVITY_COLORS[name] || "#94a3b8"
          : CFO_COLORS[name] || "#94a3b8";

      const details = Object.entries(data.details)
        .map(([label, vals]) => ({
          label,
          value: mode === "plan" ? vals.plan : vals.fact,
          color: groupBy === "activity" ? CFO_COLORS[label] || "#94a3b8" : CFO_COLORS[label] || "#94a3b8",
        }))
        .sort((a, b) => b.value - a.value);

      return {
        name: shortName(name),
        fullName: name,
        value: mode === "plan" ? data.plan : data.fact,
        planValue: data.plan,
        factValue: data.fact,
        color,
        details,
      };
    })
    .sort((a, b) => b.value - a.value);
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: ChartRow }[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="bg-white border border-border rounded-lg shadow-lg p-3 min-w-[200px]">
      <p className="text-sm font-semibold text-foreground mb-2">{row.fullName}</p>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted-foreground">План</span>
        <span className="font-medium">{fmtMln(row.planValue)}</span>
      </div>
      <div className="flex justify-between text-xs mb-2">
        <span className="text-muted-foreground">Факт</span>
        <span className="font-medium">{fmtMln(row.factValue)}</span>
      </div>
      {row.details.length > 0 && (
        <>
          <div className="border-t border-border pt-2 mt-1">
            <p className="text-xs text-muted-foreground mb-1.5">Детализация:</p>
            {row.details.map((d) => (
              <div key={d.label} className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-1.5">
                  <span
                    className="inline-block w-2 h-2 rounded-sm flex-shrink-0"
                    style={{ background: d.color }}
                  />
                  <span className="text-muted-foreground truncate max-w-[120px]">{d.label}</span>
                </span>
                <span className="font-medium ml-2">{fmtMln(d.value)}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const AllocationSankey = () => {
  const [mode, setMode] = useState<ViewMode>("plan");
  const [groupBy, setGroupBy] = useState<GroupBy>("target");
  const [selectedBar, setSelectedBar] = useState<string | null>(null);

  const { flows } = getAllocationData();

  const filteredFlows = useMemo(
    () =>
      selectedBar
        ? flows.filter((f) => {
            if (groupBy === "source") return f.sourceCfo === selectedBar;
            if (groupBy === "target") return f.targetCfo === selectedBar;
            return f.activity === selectedBar;
          })
        : flows,
    [flows, selectedBar, groupBy]
  );

  const chartData = useMemo(
    () => buildChartData(flows, mode, groupBy),
    [flows, mode, groupBy]
  );

  const detailData = useMemo(() => {
    if (!selectedBar) return [];
    const row = chartData.find((r) => r.fullName === selectedBar);
    return row?.details || [];
  }, [chartData, selectedBar]);

  const groupLabels: Record<GroupBy, string> = {
    source: "ЦФО-источник",
    target: "ЦФО-получатель",
    activity: "Активность",
  };

  const maxValue = Math.max(...chartData.map((d) => Math.max(d.planValue, d.factValue)));

  return (
    <Card className="border-0 shadow-sm p-5 animate-slide-up" style={{ animationDelay: "200ms" }}>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
        <div>
          <h3 className="text-base font-semibold text-foreground">Аллокации расходов</h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Распределение затрат через активности на центры прибыли
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
            {(["target", "source", "activity"] as GroupBy[]).map((g) => (
              <button
                key={g}
                className={`px-3 py-1.5 font-medium transition-colors ${groupBy === g ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted"}`}
                onClick={() => { setGroupBy(g); setSelectedBar(null); }}
              >
                {g === "target" ? "По получателю" : g === "source" ? "По источнику" : "По активности"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <p className="text-xs text-muted-foreground mb-3">
            {groupLabels[groupBy]} · {mode === "plan" ? "Plan" : "Fact"} · млн ₽
            {selectedBar && (
              <button
                className="ml-2 text-primary underline"
                onClick={() => setSelectedBar(null)}
              >
                сбросить фильтр
              </button>
            )}
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 0, right: 60, left: 0, bottom: 0 }}
              barSize={22}
            >
              <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                type="number"
                tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}`}
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={90}
                tick={{ fontSize: 11, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
              <Bar
                dataKey="value"
                radius={[0, 4, 4, 0]}
                cursor="pointer"
                onClick={(data: ChartRow) =>
                  setSelectedBar(selectedBar === data.fullName ? null : data.fullName)
                }
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.fullName}
                    fill={entry.color}
                    fillOpacity={
                      selectedBar === null || selectedBar === entry.fullName ? 1 : 0.3
                    }
                  />
                ))}
                <LabelList
                  dataKey="value"
                  position="right"
                  formatter={(v: number) => fmtMln(v)}
                  style={{ fontSize: 11, fill: "#64748b" }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          {selectedBar ? (
            <>
              <p className="text-xs text-muted-foreground mb-3">
                Детализация: <span className="font-medium text-foreground">{selectedBar}</span>
              </p>
              <div className="space-y-2">
                {detailData.map((d) => {
                  const pct = maxValue > 0 ? (d.value / maxValue) * 100 : 0;
                  return (
                    <div key={d.label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="flex items-center gap-1.5 text-xs text-foreground">
                          <span
                            className="inline-block w-2.5 h-2.5 rounded-sm flex-shrink-0"
                            style={{ background: d.color }}
                          />
                          {d.label}
                        </span>
                        <span className="text-xs font-medium tabular-nums">{fmtMln(d.value)}</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, background: d.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <p className="text-xs text-muted-foreground mb-3">Итого по всем аллокациям</p>
              <div className="space-y-2.5">
                {chartData.map((row) => {
                  const exec =
                    row.planValue > 0
                      ? Math.round((row.factValue / row.planValue) * 1000) / 10
                      : 0;
                  return (
                    <div
                      key={row.fullName}
                      className="flex items-center gap-3 p-2 rounded-lg bg-muted/40 cursor-pointer hover:bg-muted/70 transition-colors"
                      onClick={() => setSelectedBar(selectedBar === row.fullName ? null : row.fullName)}
                    >
                      <span
                        className="w-2.5 h-8 rounded flex-shrink-0"
                        style={{ background: row.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">{row.fullName}</p>
                        <p className="text-xs text-muted-foreground">{fmtMln(row.value)}</p>
                      </div>
                      <span
                        className={`text-xs font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0 ${
                          exec <= 100
                            ? "bg-emerald-50 text-emerald-700"
                            : exec <= 115
                            ? "bg-amber-50 text-amber-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {exec}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4 opacity-60">
        Нажмите на столбец для детализации · Основа аллокации: ФОТ, штатная численность, прямая, пропорционально
      </p>
    </Card>
  );
};

export default AllocationSankey;
