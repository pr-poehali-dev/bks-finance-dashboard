import { useState, Fragment } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import type { BudgetRow, RequestItem } from "@/data/mockData";

interface BudgetTableProps {
  data: BudgetRow[];
}

const formatCurrency = (value: number): string => {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)} млн`;
  }
  if (abs >= 1_000) {
    return `${(value / 1_000).toFixed(0)} тыс`;
  }
  return value.toString();
};

const formatFullAmount = (value: number): string => {
  return new Intl.NumberFormat("ru-RU").format(value);
};

const statusConfig = {
  ok: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    icon: "CheckCircle2",
    label: "В норме",
  },
  warning: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    icon: "AlertTriangle",
    label: "Внимание",
  },
  danger: {
    bg: "bg-red-50",
    text: "text-red-600",
    icon: "AlertCircle",
    label: "Превышение",
  },
};

const requestStatusConfig = {
  approved: { label: "Одобрена", bg: "bg-emerald-50", text: "text-emerald-700" },
  pending: { label: "На согласовании", bg: "bg-amber-50", text: "text-amber-700" },
  rejected: { label: "Отклонена", bg: "bg-red-50", text: "text-red-600" },
};

const RequestsPanel = ({ requests }: { requests: RequestItem[] }) => {
  return (
    <TableRow>
      <TableCell colSpan={10} className="p-0 border-0">
        <div className="bg-muted/20 border-t border-b border-border/40 px-5 py-3 animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="FileStack" size={14} className="text-primary" />
            <span className="text-xs font-semibold text-foreground">
              Заявки ({requests.length})
            </span>
          </div>
          <div className="rounded-lg border border-border/50 bg-white overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/30">
                  <th className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground text-left px-3 py-2">Номер</th>
                  <th className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground text-left px-3 py-2">Описание</th>
                  <th className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground text-left px-3 py-2">Инициатор</th>
                  <th className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground text-left px-3 py-2">Дата</th>
                  <th className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground text-right px-3 py-2">Сумма, ₽</th>
                  <th className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground text-center px-3 py-2">Статус</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => {
                  const reqStatus = requestStatusConfig[req.status];
                  return (
                    <tr key={req.id} className="border-t border-border/30 hover:bg-muted/20 transition-colors">
                      <td className="px-3 py-2 text-xs font-mono font-medium text-primary">{req.number}</td>
                      <td className="px-3 py-2 text-xs text-foreground">{req.description}</td>
                      <td className="px-3 py-2 text-xs text-muted-foreground">{req.initiator}</td>
                      <td className="px-3 py-2 text-xs text-muted-foreground tabular-nums">{req.date}</td>
                      <td className="px-3 py-2 text-xs font-medium text-foreground text-right tabular-nums">
                        {formatFullAmount(req.amount)}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${reqStatus.bg} ${reqStatus.text}`}>
                          {reqStatus.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

const categoryBadge = {
  Run: { bg: "bg-blue-50", text: "text-blue-700", label: "Run" },
  Change: { bg: "bg-violet-50", text: "text-violet-700", label: "Change" },
};

const budgetTypeBadge = {
  "P/L": { bg: "bg-orange-50", text: "text-orange-700", label: "P/L" },
  "Cash": { bg: "bg-teal-50", text: "text-teal-700", label: "Cash" },
};

const BudgetTable = ({ data }: BudgetTableProps) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <Card className="border-0 shadow-sm animate-slide-up overflow-hidden" style={{ animationDelay: "300ms" }}>
      <div className="p-5 pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Исполнение бюджета по статьям
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Детализация план-факт по ЦФО и статьям расходов
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            В норме
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Внимание
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            Превышение
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground w-[180px]">
                ЦФО
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Статья
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Подстатья
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center w-[70px]">
                Тип
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center w-[70px]">
                Бюджет
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">
                План
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">
                Факт
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">
                Отклонение
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">
                Исполнение
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center">
                Статус
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => {
              const config = statusConfig[row.status];
              const catBadge = categoryBadge[row.category];
              const btBadge = budgetTypeBadge[row.budgetType];
              const isExpanded = expandedRow === row.id;
              return (
                <Fragment key={row.id}>
                  <TableRow
                    className={`hover:bg-muted/30 transition-colors cursor-pointer select-none ${isExpanded ? "bg-muted/20" : ""}`}
                    onClick={() => toggleRow(row.id)}
                  >
                    <TableCell className="font-medium text-sm text-foreground">
                      <div className="flex items-center gap-2">
                        <Icon
                          name={isExpanded ? "ChevronDown" : "ChevronRight"}
                          size={14}
                          className="text-muted-foreground flex-shrink-0 transition-transform"
                        />
                        <span className="truncate">{row.cfo}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {row.article}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {row.article2}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${catBadge.bg} ${catBadge.text}`}>
                        {catBadge.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${btBadge.bg} ${btBadge.text}`}>
                        {btBadge.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-right font-medium tabular-nums">
                      ₽ {formatCurrency(row.plan)}
                    </TableCell>
                    <TableCell className="text-sm text-right font-medium tabular-nums">
                      ₽ {formatCurrency(row.fact)}
                    </TableCell>
                    <TableCell
                      className={`text-sm text-right font-medium tabular-nums ${
                        row.deviation > 0
                          ? "text-red-600"
                          : row.deviation < 0
                            ? "text-emerald-600"
                            : ""
                      }`}
                    >
                      {row.deviation > 0 ? "+" : ""}
                      {row.deviation !== 0 ? `₽ ${formatCurrency(row.deviation)}` : "—"}
                    </TableCell>
                    <TableCell className="text-sm text-right tabular-nums">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden hidden sm:block">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              row.execution <= 100
                                ? "bg-emerald-500"
                                : row.execution <= 110
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                            }`}
                            style={{ width: `${Math.min(row.execution, 100)}%` }}
                          />
                        </div>
                        <span className="font-medium">{row.execution}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${config.bg} ${config.text}`}
                      >
                        <Icon name={config.icon} size={12} />
                        {config.label}
                      </span>
                    </TableCell>
                  </TableRow>
                  {isExpanded && row.requests.length > 0 && (
                    <RequestsPanel key={`${row.id}-requests`} requests={row.requests} />
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default BudgetTable;
