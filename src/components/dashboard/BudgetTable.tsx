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
import type { BudgetRow } from "@/data/mockData";

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

const BudgetTable = ({ data }: BudgetTableProps) => {
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
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground w-[200px]">
                ЦФО
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Статья
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
              return (
                <TableRow
                  key={row.id}
                  className="hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <TableCell className="font-medium text-sm text-foreground">
                    {row.cfo}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {row.article}
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
                          : "text-muted-foreground"
                    }`}
                  >
                    {row.deviation > 0 ? "+" : ""}
                    {formatCurrency(row.deviation)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            row.status === "ok"
                              ? "bg-emerald-500"
                              : row.status === "warning"
                                ? "bg-amber-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${Math.min(row.execution, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold tabular-nums min-w-[52px]">
                        {row.execution.toFixed(1)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
                    >
                      <Icon name={config.icon} size={12} />
                      {config.label}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default BudgetTable;
