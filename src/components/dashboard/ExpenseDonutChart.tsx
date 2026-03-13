import { Card } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface ExpenseItem {
  name: string;
  value: number;
  fill: string;
}

interface TooltipEntry {
  name: string;
  value: number;
  payload: { fill: string };
}

interface ExpenseDonutChartProps {
  data: ExpenseItem[];
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: TooltipEntry[] }) => {
  if (!active || !payload?.length) return null;
  const entry = payload[0];
  return (
    <div className="bg-white rounded-lg shadow-lg border border-border/60 p-3 text-xs">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.payload.fill }} />
        <span className="font-medium text-foreground">{entry.name}</span>
      </div>
      <p className="font-semibold text-foreground mt-1 tabular-nums">₽ {entry.value} млн</p>
    </div>
  );
};

const ExpenseDonutChart = ({ data }: ExpenseDonutChartProps) => {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <Card className="border-0 shadow-sm p-5 animate-slide-up" style={{ animationDelay: "500ms" }}>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground">
          Структура расходов
        </h3>
        <p className="text-sm text-muted-foreground mt-0.5">
          Распределение фактических затрат, млн ₽
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-[200px] w-[200px] relative flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-lg font-bold text-foreground tabular-nums">₽ {total.toFixed(0)}</span>
            <span className="text-[10px] text-muted-foreground">млн всего</span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.fill }} />
                <span className="truncate">{item.name}</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground tabular-nums">
                  {item.value}
                </span>
                <span className="text-muted-foreground tabular-nums w-[36px] text-right">
                  {total > 0 ? ((item.value / total) * 100).toFixed(0) : 0}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ExpenseDonutChart;
