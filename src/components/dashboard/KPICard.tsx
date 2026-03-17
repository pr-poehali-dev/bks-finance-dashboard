import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import type { KPIData } from "@/data/mockData";

interface KPICardProps {
  data: KPIData;
  index: number;
}

const colorMap: Record<string, { bg: string; text: string; badge: string; badgeText: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", badge: "bg-blue-50", badgeText: "text-blue-700" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", badge: "bg-emerald-50", badgeText: "text-emerald-700" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", badge: "bg-amber-50", badgeText: "text-amber-700" },
  red: { bg: "bg-red-50", text: "text-red-600", badge: "bg-red-50", badgeText: "text-red-700" },
  violet: { bg: "bg-violet-50", text: "text-violet-600", badge: "bg-violet-50", badgeText: "text-violet-700" },
};

const KPICard = ({ data, index }: KPICardProps) => {
  const colors = colorMap[data.color || "blue"] || colorMap.blue;
  const showBadge = data.change !== 0 && data.title !== "План" && data.title !== "Резервы по договорам";
  const isPositive = data.title === "Эффективность"
    ? data.change >= 0
    : data.title === "Факт"
      ? data.change <= 100
      : data.change > 0;

  return (
    <Card
      className="p-4 animate-fade-in border-0 shadow-sm hover:shadow-md transition-shadow duration-200"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-9 h-9 rounded-lg ${colors.bg} flex items-center justify-center`}>
          <Icon name={data.icon} size={18} className={colors.text} />
        </div>
        {showBadge && (
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              isPositive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
            }`}
          >
            {data.change > 0 ? "+" : ""}
            {data.change}%
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground font-medium mb-1">
        {data.title}
      </p>
      <p className="text-xl font-semibold tracking-tight text-foreground">
        {data.value}
      </p>
      <p className="text-xs text-muted-foreground mt-1">{data.subtitle}</p>
    </Card>
  );
};

export default KPICard;
