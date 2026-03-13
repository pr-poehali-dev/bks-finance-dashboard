import Icon from "@/components/ui/icon";

const Header = () => {
  return (
    <header className="bg-white border-b border-border/60 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">БКС</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="font-semibold text-foreground text-sm">
              Финансовая аналитика
            </span>
            <span className="text-muted-foreground text-sm">|</span>
            <span className="text-muted-foreground text-sm">
              Бюджетный контроль
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="h-8 px-3 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors flex items-center gap-1.5">
            <Icon name="Download" size={14} />
            Экспорт
          </button>
          <button className="h-8 px-3 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors flex items-center gap-1.5">
            <Icon name="Bell" size={14} />
          </button>
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center ml-1">
            <Icon name="User" size={14} className="text-primary" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
