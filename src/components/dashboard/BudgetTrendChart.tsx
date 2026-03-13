import { Card } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface TooltipEntry {
  name: string;
  value: number;
  color: string;
}

interface BudgetTrendChartProps {
  data: { month: string; plan: number; fact: number }[];
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: TooltipEntry[]; label?: string }) => {
  if (!active || !payload?.length) return null;
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
    </div>
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
          Помесячный план-факт за последние 6 месяцев, млн ₽
        </p>
      </div>

      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="planGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#93bbfd" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#93bbfd" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="factGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickFormatter={(v) => `${v}`}
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
            <Area
              type="monotone"
              dataKey="plan"
              stroke="#93bbfd"
              strokeWidth={2}
              fill="url(#planGrad)"
              strokeDasharray="6 3"
              dot={{ r: 3, fill: "#93bbfd", strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="fact"
              stroke="#2563eb"
              strokeWidth={2.5}
              fill="url(#factGrad)"
              dot={{ r: 3, fill: "#2563eb", strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#2563eb", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default BudgetTrendChart;