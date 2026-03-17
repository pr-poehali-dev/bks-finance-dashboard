import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
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
    color: "#3b82f6",
    label: "Run — операционные",
    desc: "Текущая деятельность, поддержка",
  },
  Change: {
    icon: "Rocket",
    color: "#8b5cf6",
    label: "Change — проектные",
    desc: "Развитие, трансформация, инвестиции",
  },
};

interface TooltipProps { active?: boolean; payload?: { payload: { name: string; plan: number; fact: number; execution: number } }[] }
const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (!active || !payload?.length) return null;
  const { name, plan, fact, execution } = payload[0].payload;
  return (
    <div className="bg-card border border-border rounded-lg shadow-lg p-3 text-sm">
      <p className="font-semibold text-foreground mb-1">{name}</p>
      <p className="text-muted-foreground">План: <span className="text-foreground font-medium">₽ {formatMln(plan)}</span></p>
      <p className="text-muted-foreground">Факт: <span className="text-foreground font-medium">₽ {formatMln(fact)}</span></p>
      <p className="text-muted-foreground">Исполнение: <span className={`font-bold ${execution > 100 ? "text-red-600" : "text-emerald-600"}`}>{execution}%</span></p>
    </div>
  );
};

const CategoryBreakdown = ({ data }: CategoryBreakdownProps) => {
  const totalFact = data.reduce((s, d) => s + d.fact, 0);

  const pieData = data.map((item) => ({
    name: catConfig[item.category].label,
    value: item.fact,
    plan: item.plan,
    fact: item.fact,
    execution: item.execution,
    color: catConfig[item.category].color,
    icon: catConfig[item.category].icon,
    desc: catConfig[item.category].desc,
  }));

  return (
    <Card className="border-0 shadow-sm p-5 animate-slide-up h-full flex flex-col" style={{ animationDelay: "250ms" }}>
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
          <Icon name="Layers" size={16} className="text-white" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">Run vs Change</h3>
          <p className="text-xs text-muted-foreground">Операционные расходы и проектные инвестиции</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          {pieData.map((item) => {
            const share = totalFact > 0 ? Math.round((item.fact / totalFact) * 100) : 0;
            return (
              <div key={item.name} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-medium text-foreground truncate">{item.name}</span>
                    <span className={`text-xs font-bold ml-2 flex-shrink-0 ${item.execution > 100 ? "text-red-600" : "text-emerald-600"}`}>
                      {item.execution}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>₽ {formatMln(item.fact)} факт</span>
                    <span className="font-medium">{share}% от итого</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {data.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">Нет данных</p>
        )}
      </div>
    </Card>
  );
};

export default CategoryBreakdown;