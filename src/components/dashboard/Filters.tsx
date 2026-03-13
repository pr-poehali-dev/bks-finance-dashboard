import { cfoList, articleList, periodOptions } from "@/data/mockData";
import Icon from "@/components/ui/icon";

interface FiltersProps {
  selectedCfo: string;
  selectedArticle: string;
  selectedPeriod: string;
  onCfoChange: (value: string) => void;
  onArticleChange: (value: string) => void;
  onPeriodChange: (value: string) => void;
}

const SelectField = ({
  value,
  onChange,
  options,
  icon,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  icon: string;
}) => (
  <div className="relative">
    <Icon
      name={icon}
      size={14}
      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
    />
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 pl-8 pr-8 rounded-md border border-border/60 bg-white text-sm font-medium text-foreground shadow-sm appearance-none cursor-pointer hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    <Icon
      name="ChevronDown"
      size={14}
      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
    />
  </div>
);

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
      <SelectField
        value={selectedPeriod}
        onChange={onPeriodChange}
        options={periodOptions}
        icon="Calendar"
      />
      <SelectField
        value={selectedCfo}
        onChange={onCfoChange}
        options={cfoList}
        icon="Building2"
      />
      <SelectField
        value={selectedArticle}
        onChange={onArticleChange}
        options={articleList}
        icon="Tag"
      />
    </div>
  );
};

export default Filters;
