import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cfoList, articleList, periodOptions } from "@/data/mockData";

interface FiltersProps {
  selectedCfo: string;
  selectedArticle: string;
  selectedPeriod: string;
  onCfoChange: (value: string) => void;
  onArticleChange: (value: string) => void;
  onPeriodChange: (value: string) => void;
}

const Filters = ({
  selectedCfo,
  selectedArticle,
  selectedPeriod,
  onCfoChange,
  onArticleChange,
  onPeriodChange,
}: FiltersProps) => {
  return (
    <div className="flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: "100ms" }}>
      <Select value={selectedPeriod} onValueChange={onPeriodChange}>
        <SelectTrigger className="w-[180px] bg-white border-border/60 shadow-sm text-sm font-medium">
          <SelectValue placeholder="Период" />
        </SelectTrigger>
        <SelectContent>
          {periodOptions.map((period) => (
            <SelectItem key={period} value={period}>
              {period}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedCfo} onValueChange={onCfoChange}>
        <SelectTrigger className="w-[220px] bg-white border-border/60 shadow-sm text-sm font-medium">
          <SelectValue placeholder="ЦФО" />
        </SelectTrigger>
        <SelectContent>
          {cfoList.map((cfo) => (
            <SelectItem key={cfo} value={cfo}>
              {cfo}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedArticle} onValueChange={onArticleChange}>
        <SelectTrigger className="w-[200px] bg-white border-border/60 shadow-sm text-sm font-medium">
          <SelectValue placeholder="Статья расходов" />
        </SelectTrigger>
        <SelectContent>
          {articleList.map((article) => (
            <SelectItem key={article} value={article}>
              {article}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filters;
