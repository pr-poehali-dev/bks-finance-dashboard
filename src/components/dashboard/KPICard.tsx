import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import type { KPIData } from "@/data/mockData";

interface KPICardProps {
  data: KPIData;
  index: number;
}

const KPICard = ({ data, index }: KPICardProps) => {
  return (
    <Card
      className="p-5 animate-fade-in border-0 shadow-sm hover:shadow-md transition-shadow duration-200"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name={data.icon} size={20} className="text-primary" />
        </div>
        {data.change !== 0 && data.title !== "Общий бюджет" && data.title !== "Заявки" && (
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              data.change > 0
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            {data.change > 0 ? "+" : ""}
            {data.change}%
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground font-medium mb-1">
        {data.title}
      </p>
      <p className="text-2xl font-semibold tracking-tight text-foreground">
        {data.value}
      </p>
      <p className="text-xs text-muted-foreground mt-1">{data.subtitle}</p>
    </Card>
  );
};

export default KPICard;