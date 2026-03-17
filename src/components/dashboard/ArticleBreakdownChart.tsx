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

interface ArticleData {
  article: string;
  plan: number;
  fact: number;
  execution: number;
}

interface ArticleBreakdownChartProps {
  data: ArticleData[];
  period: string;
}

interface TooltipEntry {
  name: string;
  value: number;
  color: string;
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: TooltipEntry[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  const planEntry = payload.find((e) => e.name === "plan");
  const factEntry = payload.find((e) => e.name === "fact");
  const execution = planEntry && factEntry && planEntry.value > 0
    ? Math.round((factEntry.value / planEntry.value) * 10000) / 100
    : 0;
  return (
    <div className="bg-white rounded-lg shadow-lg border border-border/60 p-3 text-xs max-w-[180px]">
      <p className="font-semibold text-foreground mb-1.5 leading-tight">{label}</p>
      {payload.map((entry: TooltipEntry) => (
        <div key={entry.name} className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
            {entry.name === "plan" ? "План" : "Факт"}
          </span>
          <span className="font-semibold text-foreground tabular-nums">₽ {entry.value} млн</span>
        </div>
      ))}
      <div className="mt-1.5 pt-1.5 border-t border-border/40 flex justify-between">
        <span className="text-muted-foreground">Исполнение</span>
        <span className={`font-semibold ${execution > 100 ? "text-red-600" : "text-emerald-600"}`}>
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
  index?: number;
  data?: ArticleData[];
}) => {
  const { x = 0, y = 0, width = 0, index = 0, data = [] } = props;
  const item = data[index];
  if (!item) return null;
  const color = item.execution > 100 ? "#dc2626" : "#16a34a";
  return (
    <text
      x={x + width}
      y={y - 6}
      fill={color}
      textAnchor="middle"
      fontSize={10}
      fontWeight={700}
    >
      {item.execution.toFixed(1)}%
    </text>
  );
};

const SHORT_LABELS: Record<string, string> = {
  "Аренда и содержание": "Аренда",
  "ИТ-инфраструктура": "ИТ",
  "Маркетинг и реклама": "Маркетинг",
  "Командировочные": "Команд.",
  "Консалтинг и аудит": "Консалтинг",
  "Амортизация": "Аморт.",
  "Обучение и развитие": "Обучение",
  "Страхование": "Страх.",
  "Представительские": "Предст.",
  "Связь и телеком": "Связь",
  "Лицензии и подписки": "Лицензии",
  "Прочие расходы": "Прочие",
};

const ArticleBreakdownChart = ({ data, period }: ArticleBreakdownChartProps) => {
  const chartData = data.map((d) => ({
    ...d,
    label: SHORT_LABELS[d.article] ?? d.article,
  }));

  return (
    <Card className="border-0 shadow-sm p-5 animate-slide-up" style={{ animationDelay: "500ms" }}>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground">Прочие статьи</h3>
        <p className="text-sm text-muted-foreground mt-0.5">
          План-факт по статьям · {period}, млн ₽
        </p>
      </div>

      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 24, right: 5, left: -20, bottom: 0 }} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#6b7280" }}
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
                content={(props) => <ExecutionLabel {...props} data={chartData} />}
              />
            </Bar>
            <Bar dataKey="fact" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ArticleBreakdownChart;
