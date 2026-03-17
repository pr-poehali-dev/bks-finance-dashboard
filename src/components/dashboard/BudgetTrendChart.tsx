import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from "recharts";

interface TooltipEntry {
  name: string;
  value: number;
  color: string;
}

interface QuarterData {
  quarter: string;
  plan: number;
  fact: number;
  execution: number;
}

interface BudgetTrendChartProps {
  data: QuarterData[];
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: TooltipEntry[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  const execEntry = payload.find((e) => e.name === "fact");
  const planEntry = payload.find((e) => e.name === "plan");
  const execution = planEntry && execEntry && planEntry.value > 0
    ? Math.round((execEntry.value / planEntry.value) * 10000) / 100
    : 0;
  return (
    <div className="bg-white rounded-lg shadow-lg border border-border/60 p-3 text-xs">
      <p className="font-semibold text-foreground mb-1.5">{label}</p>
      {payload.map((entry: TooltipEntry) => (
        <div key={entry.name} className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            {entry.name === "plan" ? "План" : "Факт"}
          </span>
          <span className="font-semibold text-foreground tabular-nums">₽ {entry.value} млн</span>
        </div>
      ))}
      <div className="mt-1.5 pt-1.5 border-t border-border/40 flex justify-between">
        <span className="text-muted-foreground">Исполнение</span>
        <span className={`font-semibold ${execution >= 100 ? "text-emerald-600" : "text-amber-600"}`}>
          {execution.toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

const ExecutionLabel = (props: {
  x?: number;
  y?: number;
  width?: number;
  value?: number;
  index?: number;
  data?: QuarterData[];
}) => {
  const { x = 0, y = 0, width = 0, index = 0, data = [] } = props;
  const item = data[index];
  if (!item) return null;
  const execution = item.execution;
  const isOver = execution > 100;
  const color = isOver ? "#dc2626" : "#16a34a";
  return (
    <text
      x={x + width}
      y={y - 8}
      fill={color}
      textAnchor="middle"
      fontSize={11}
      fontWeight={700}
    >
      {execution.toFixed(2)}%
    </text>
  );
};

const BudgetTrendChart = ({ data }: BudgetTrendChartProps) => {
  return (
    <Card className="border-0 shadow-sm p-5 animate-slide-up h-full" style={{ animationDelay: "450ms" }}>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground">
          Динамика исполнения бюджета
        </h3>
        <p className="text-sm text-muted-foreground mt-0.5">
          Квартальный план-факт, млн ₽
        </p>
      </div>

      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 24, right: 5, left: -20, bottom: 0 }} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="quarter"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={8}
              formatter={(value: string) => (
                <span className="text-xs text-muted-foreground ml-1">
                  {value === "plan" ? "План" : "Факт"}
                </span>
              )}
            />
            <Bar dataKey="plan" fill="#93bbfd" radius={[4, 4, 0, 0]}>
              <LabelList
                dataKey="execution"
                content={(props) => <ExecutionLabel {...props} data={data} />}
              />
            </Bar>
            <Bar dataKey="fact" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default BudgetTrendChart;