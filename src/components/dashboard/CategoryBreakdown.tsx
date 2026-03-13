import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import type { BudgetCategory } from "@/data/mockData";

interface CategoryItem {
  category: BudgetCategory;
  plan: number;
  fact: number;
  execution: number;
}

interface CategoryBreakdownProps {
  data: CategoryItem[];
}

const formatMln = (v: number) => {
  if (v >= 1_000_000_000) return `${(v / 1_000_000_000).toFixed(1)} млрд`;
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)} млн`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(0)} тыс`;
  return String(v);
};

const catConfig = {
  Run: {
    icon: "Play",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
    barColor: "bg-blue-500",
    label: "Run — операционные",
    desc: "Текущая деятельность, поддержка",
  },
  Change: {
    icon: "Rocket",
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
    barColor: "bg-violet-500",
    label: "Change — проектные",
    desc: "Развитие, трансформация, инвестиции",
  },
};

const CategoryBreakdown = ({ data }: CategoryBreakdownProps) => {
  const totalPlan = data.reduce((s, d) => s + d.plan, 0);

  return (
    <Card className="border-0 shadow-sm p-5 animate-slide-up h-full flex flex-col" style={{ animationDelay: "250ms" }}>
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
          <Icon name="Layers" size={16} className="text-white" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Run vs Change
          </h3>
          <p className="text-xs text-muted-foreground">
            Операционные расходы и проектные инвестиции
          </p>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        {data.map((item) => {
          const config = catConfig[item.category];
          const deviation = item.fact - item.plan;
          const shareOfTotal = totalPlan > 0 ? Math.round((item.plan / totalPlan) * 100) : 0;

          return (
            <div key={item.category} className="rounded-lg border border-border/40 p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-9 h-9 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={config.icon} size={18} className={config.iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-foreground">{config.label}</h4>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      item.execution <= 100
                        ? "bg-emerald-50 text-emerald-700"
                        : item.execution <= 110
                          ? "bg-amber-50 text-amber-700"
                          : "bg-red-50 text-red-600"
                    }`}>
                      {item.execution}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{config.desc}</p>
                </div>
              </div>

              <div className="relative h-2 w-full rounded-full bg-muted mb-3">
                <div
                  className={`h-full rounded-full ${config.barColor} transition-all duration-700`}
                  style={{ width: `${Math.min(item.execution, 100)}%` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">План</p>
                  <p className="text-sm font-semibold text-foreground tabular-nums">₽ {formatMln(item.plan)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Факт</p>
                  <p className="text-sm font-semibold text-foreground tabular-nums">₽ {formatMln(item.fact)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Доля</p>
                  <p className={`text-sm font-semibold tabular-nums ${
                    deviation > 0 ? "text-red-600" : "text-emerald-600"
                  }`}>
                    {shareOfTotal}%
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {data.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">Нет данных</p>
        )}
      </div>
    </Card>
  );
};

export default CategoryBreakdown;