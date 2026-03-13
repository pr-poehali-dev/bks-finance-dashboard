import { useState } from "react";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import type { AIInsight } from "@/data/mockData";
import { aiInsights } from "@/data/mockData";

const typeConfig = {
  danger: {
    border: "border-l-red-500",
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
    metricBg: "bg-red-50",
    metricColor: "text-red-700",
    icon: "AlertCircle",
  },
  warning: {
    border: "border-l-amber-500",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    metricBg: "bg-amber-50",
    metricColor: "text-amber-700",
    icon: "AlertTriangle",
  },
  success: {
    border: "border-l-emerald-500",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    metricBg: "bg-emerald-50",
    metricColor: "text-emerald-700",
    icon: "CheckCircle2",
  },
  info: {
    border: "border-l-blue-500",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    metricBg: "bg-blue-50",
    metricColor: "text-blue-700",
    icon: "Info",
  },
};

const InsightCard = ({ insight, index }: { insight: AIInsight; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const config = typeConfig[insight.type];

  return (
    <div
      className={`border-l-[3px] ${config.border} bg-white rounded-r-lg p-4 animate-fade-in cursor-pointer hover:shadow-sm transition-shadow`}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-lg ${config.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
          <Icon name={config.icon} size={16} className={config.iconColor} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-semibold text-foreground leading-tight">
              {insight.title}
            </h4>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${config.metricBg} ${config.metricColor}`}>
              {insight.metric}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
            {insight.description}
          </p>
          {expanded && (
            <div className="mt-3 pt-3 border-t border-border/50 animate-fade-in">
              <div className="flex items-start gap-2">
                <Icon name="Lightbulb" size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-foreground/80 leading-relaxed">
                  {insight.action}
                </p>
              </div>
            </div>
          )}
        </div>
        <Icon
          name={expanded ? "ChevronUp" : "ChevronDown"}
          size={14}
          className="text-muted-foreground flex-shrink-0 mt-1"
        />
      </div>
    </div>
  );
};

const AIInsights = () => {
  return (
    <Card className="border-0 shadow-sm p-5 animate-slide-up" style={{ animationDelay: "350ms" }}>
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center">
          <Icon name="Sparkles" size={16} className="text-white" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">
            ИИ-аналитика
          </h3>
          <p className="text-xs text-muted-foreground">
            Автоматический анализ отклонений и рекомендации
          </p>
        </div>
      </div>

      <div className="space-y-2.5">
        {aiInsights.map((insight, idx) => (
          <InsightCard key={idx} insight={insight} index={idx} />
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-border/40 flex items-center gap-2 text-xs text-muted-foreground">
        <Icon name="Clock" size={12} />
        <span>Анализ обновлён: 13 марта 2026, 09:30</span>
      </div>
    </Card>
  );
};

export default AIInsights;
