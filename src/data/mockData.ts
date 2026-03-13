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

export const monthlyTrend = [
  { month: "Окт", plan: 270, fact: 255 },
  { month: "Ноя", plan: 285, fact: 278 },
  { month: "Дек", plan: 310, fact: 325 },
  { month: "Янв", plan: 275, fact: 268 },
  { month: "Фев", plan: 290, fact: 282 },
  { month: "Мар", plan: 282, fact: 263 },
];

export const expenseStructure = [
  { name: "ФОТ", value: 576.7, fill: "#2563eb" },
  { name: "ИТ-инфраструктура", value: 241.8, fill: "#3b82f6" },
  { name: "Маркетинг", value: 78.9, fill: "#60a5fa" },
  { name: "Аренда", value: 37.1, fill: "#93bbfd" },
  { name: "Консалтинг", value: 28.4, fill: "#bfdbfe" },
  { name: "Прочие", value: 34.3, fill: "#dbeafe" },
];

export interface AIInsight {
  type: "danger" | "warning" | "success" | "info";
  title: string;
  description: string;
  metric: string;
  action: string;
}

export const aiInsights: AIInsight[] = [
  {
    type: "danger",
    title: "Перерасход на маркетинг в Брокерском обслуживании",
    description: "Расходы на маркетинг и рекламу превысили план на ₽11.9 млн (117.8%). Основной драйвер — незапланированная digital-кампания в феврале.",
    metric: "+₽11.9 млн",
    action: "Рекомендация: пересмотреть маркетинговый бюджет Q2, перенести часть расходов из резервного фонда или скорректировать план.",
  },
  {
    type: "danger",
    title: "Командировочные ИТ-департамента — критическое превышение",
    description: "Командировочные расходы составили 145.9% от плана (+₽3.9 млн). Выявлены незапланированные выезды на внедрение систем в филиалах.",
    metric: "+145.9%",
    action: "Рекомендация: ввести предварительное согласование командировок свыше ₽500 тыс., рассмотреть удалённое внедрение.",
  },
  {
    type: "warning",
    title: "Рост ИТ-расходов в Управлении рисками",
    description: "ИТ-инфраструктура превышает план на 9.3% (+₽5.2 млн). Связано с незапланированным обновлением системы риск-мониторинга.",
    metric: "+₽5.2 млн",
    action: "Рекомендация: включить затраты в план Q2, согласовать с ИТ-департаментом единый график обновлений.",
  },
  {
    type: "success",
    title: "Эффективная экономия в Управлении активами",
    description: "ЦФО показывает исполнение 94.1% — экономия ₽10.1 млн без ущерба для операционных показателей. Лучший результат среди подразделений.",
    metric: "-₽10.1 млн",
    action: "Рекомендация: транслировать практики бюджетной дисциплины на другие ЦФО, премировать ответственных.",
  },
];

export default {
  kpiData,
  budgetData,
  cfoList,
  articleList,
  periodOptions,
  cfoSummary,
  monthlyTrend,
  expenseStructure,
  aiInsights,
};