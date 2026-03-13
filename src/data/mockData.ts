export interface BudgetRow {
  id: string;
  cfo: string;
  article: string;
  plan: number;
  fact: number;
  deviation: number;
  execution: number;
  status: "ok" | "warning" | "danger";
}

export interface KPIData {
  title: string;
  value: string;
  change: number;
  icon: string;
  subtitle: string;
}

export const cfoList = [
  "Все ЦФО",
  "Управление активами",
  "Брокерское обслуживание",
  "Инвестиционный банкинг",
  "Казначейство",
  "Управление рисками",
  "ИТ-департамент",
  "HR и администрация",
];

export const articleList = [
  "Все статьи",
  "ФОТ",
  "Аренда и содержание",
  "ИТ-инфраструктура",
  "Маркетинг и реклама",
  "Командировочные",
  "Консалтинг и аудит",
  "Амортизация",
  "Прочие расходы",
];

export const periodOptions = [
  "Январь 2026",
  "Февраль 2026",
  "Март 2026",
  "Q1 2026",
  "Q2 2026",
  "2026 год",
];

export const kpiData: KPIData[] = [
  {
    title: "Общий бюджет",
    value: "₽ 847.2 млн",
    change: 0,
    icon: "Wallet",
    subtitle: "Плановый объём Q1",
  },
  {
    title: "Исполнение",
    value: "₽ 612.8 млн",
    change: 72.3,
    icon: "TrendingUp",
    subtitle: "72.3% от плана",
  },
  {
    title: "Экономия",
    value: "₽ 34.1 млн",
    change: 4.0,
    icon: "PiggyBank",
    subtitle: "+4.0% к прогнозу",
  },
  {
    title: "Заявки",
    value: "186",
    change: -3,
    icon: "FileText",
    subtitle: "12 на согласовании",
  },
];

export const budgetData: BudgetRow[] = [
  {
    id: "1",
    cfo: "Управление активами",
    article: "ФОТ",
    plan: 125400000,
    fact: 118200000,
    deviation: -7200000,
    execution: 94.3,
    status: "ok",
  },
  {
    id: "2",
    cfo: "Управление активами",
    article: "ИТ-инфраструктура",
    plan: 45000000,
    fact: 42100000,
    deviation: -2900000,
    execution: 93.6,
    status: "ok",
  },
  {
    id: "3",
    cfo: "Брокерское обслуживание",
    article: "ФОТ",
    plan: 198000000,
    fact: 201500000,
    deviation: 3500000,
    execution: 101.8,
    status: "warning",
  },
  {
    id: "4",
    cfo: "Брокерское обслуживание",
    article: "Маркетинг и реклама",
    plan: 67000000,
    fact: 78900000,
    deviation: 11900000,
    execution: 117.8,
    status: "danger",
  },
  {
    id: "5",
    cfo: "Инвестиционный банкинг",
    article: "Консалтинг и аудит",
    plan: 32000000,
    fact: 28400000,
    deviation: -3600000,
    execution: 88.8,
    status: "ok",
  },
  {
    id: "6",
    cfo: "Казначейство",
    article: "ФОТ",
    plan: 89000000,
    fact: 87200000,
    deviation: -1800000,
    execution: 98.0,
    status: "ok",
  },
  {
    id: "7",
    cfo: "Управление рисками",
    article: "ИТ-инфраструктура",
    plan: 56000000,
    fact: 61200000,
    deviation: 5200000,
    execution: 109.3,
    status: "warning",
  },
  {
    id: "8",
    cfo: "ИТ-департамент",
    article: "ИТ-инфраструктура",
    plan: 142000000,
    fact: 138500000,
    deviation: -3500000,
    execution: 97.5,
    status: "ok",
  },
  {
    id: "9",
    cfo: "HR и администрация",
    article: "Аренда и содержание",
    plan: 38000000,
    fact: 37100000,
    deviation: -900000,
    execution: 97.6,
    status: "ok",
  },
  {
    id: "10",
    cfo: "ИТ-департамент",
    article: "Командировочные",
    plan: 8500000,
    fact: 12400000,
    deviation: 3900000,
    execution: 145.9,
    status: "danger",
  },
  {
    id: "11",
    cfo: "Инвестиционный банкинг",
    article: "ФОТ",
    plan: 175000000,
    fact: 169800000,
    deviation: -5200000,
    execution: 97.0,
    status: "ok",
  },
  {
    id: "12",
    cfo: "Казначейство",
    article: "Амортизация",
    plan: 22000000,
    fact: 22000000,
    deviation: 0,
    execution: 100.0,
    status: "ok",
  },
];

export const cfoSummary = [
  { name: "Управление активами", plan: 170400, fact: 160300, execution: 94.1 },
  { name: "Брокерское обслуживание", plan: 265000, fact: 280400, execution: 105.8 },
  { name: "Инвестиционный банкинг", plan: 207000, fact: 198200, execution: 95.7 },
  { name: "Казначейство", plan: 111000, fact: 109200, execution: 98.4 },
  { name: "Управление рисками", plan: 56000, fact: 61200, execution: 109.3 },
  { name: "ИТ-департамент", plan: 150500, fact: 150900, execution: 100.3 },
  { name: "HR и администрация", plan: 38000, fact: 37100, execution: 97.6 },
];

export default {
  kpiData,
  budgetData,
  cfoList,
  articleList,
  periodOptions,
  cfoSummary,
};
