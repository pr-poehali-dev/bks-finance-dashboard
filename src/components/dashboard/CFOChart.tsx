import { Card } from "@/components/ui/card";

interface CFOSummaryItem {
  name: string;
  plan: number;
  fact: number;
  execution: number;
}

interface CFOChartProps {
  data: CFOSummaryItem[];
}

const CFOChart = ({ data }: CFOChartProps) => {
  const maxValue = data.length > 0 ? Math.max(...data.map((d) => Math.max(d.plan, d.fact))) : 1;

  return (
    <Card className="border-0 shadow-sm p-5 animate-slide-up" style={{ animationDelay: "400ms" }}>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground">
          Сводка по ЦФО
        </h3>
        <p className="text-sm text-muted-foreground mt-0.5">
          План vs Факт, тыс. ₽
        </p>
      </div>

      <div className="flex items-center gap-5 mb-4 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-primary/30" />
          План
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-primary" />
          Факт
        </span>
      </div>

      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.name} className="group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-foreground truncate max-w-[200px]">
                {item.name}
              </span>
              <span
                className={`text-xs font-semibold tabular-nums px-2 py-0.5 rounded-full ${
                  item.execution <= 100
                    ? "bg-emerald-50 text-emerald-700"
                    : item.execution <= 110
                      ? "bg-amber-50 text-amber-700"
                      : "bg-red-50 text-red-600"
                }`}
              >
                {item.execution.toFixed(1)}%
              </span>
            </div>
            <div className="relative h-6 w-full">
              <div
                className="absolute top-0 left-0 h-3 rounded bg-primary/20 transition-all duration-700"
                style={{ width: `${(item.plan / maxValue) * 100}%` }}
              />
              <div
                className="absolute top-3 left-0 h-3 rounded bg-primary transition-all duration-700 group-hover:opacity-90"
                style={{ width: `${(item.fact / maxValue) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>₽ {item.plan.toLocaleString("ru-RU")} тыс</span>
              <span>₽ {item.fact.toLocaleString("ru-RU")} тыс</span>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">Нет данных для выбранных фильтров</p>
        )}
      </div>
    </Card>
  );
};

export default CFOChart;
