export interface RequestItem {
  id: string;
  number: string;
  description: string;
  amount: number;
  date: string;
  initiator: string;
  status: "approved" | "pending" | "rejected";
}

export type BudgetCategory = "Run" | "Change";

export type BudgetType = "P/L" | "Cash";

export interface BudgetRow {
  id: string;
  cfo: string;
  article: string;
  article2: string;
  category: BudgetCategory;
  budgetType: BudgetType;
  plan: number;
  fact: number;
  reserve: number;
  deviation: number;
  execution: number;
  status: "ok" | "warning" | "danger";
  requests: RequestItem[];
}

export interface KPIData {
  title: string;
  value: string;
  change: number;
  icon: string;
  subtitle: string;
  color?: string;
}

export interface AIInsight {
  type: "danger" | "warning" | "success" | "info";
  title: string;
  description: string;
  metric: string;
  action: string;
}

export const categoryList = ["Все категории", "Run", "Change"];

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
  "Обучение и развитие",
  "Страхование",
  "Представительские",
  "Связь и телеком",
  "Лицензии и подписки",
  "Прочие расходы",
];

export const articleHierarchy: Record<string, string[]> = {
  "ФОТ": ["Оклады и ставки", "Премии и бонусы", "ДМС и страхование", "Компенсации"],
  "Аренда и содержание": ["Аренда офисов", "Коммунальные услуги", "Ремонт и обслуживание"],
  "ИТ-инфраструктура": ["Серверы и хостинг", "Лицензии ПО", "Кибербезопасность", "Техподдержка"],
  "Маркетинг и реклама": ["Digital-маркетинг", "Брендинг и PR", "Мероприятия и спонсорство"],
  "Командировочные": ["Перелёты и проезд", "Проживание", "Суточные и представительские"],
  "Консалтинг и аудит": ["Юридический консалтинг", "Финансовый аудит", "Стратегический консалтинг"],
  "Амортизация": ["Амортизация ОС", "Амортизация НМА"],
  "Обучение и развитие": ["Сертификация", "Тренинги и курсы", "Менторские программы"],
  "Страхование": ["D&O страхование", "Имущественное страхование", "Профессиональная ответственность"],
  "Представительские": ["Деловые встречи", "VIP-мероприятия", "Корпоративные подарки"],
  "Связь и телеком": ["Мобильная связь", "VoIP и SIP", "Интернет и каналы"],
  "Лицензии и подписки": ["Аналитические платформы", "Информационные терминалы", "ESG и рейтинги"],
  "Прочие расходы": ["Канцелярия", "Подписки на СМИ", "Непредвиденные расходы"],
};

export function getArticle2List(article: string): string[] {
  if (article === "Все статьи") {
    const all = Object.values(articleHierarchy).flat();
    return ["Все подстатьи", ...all];
  }
  const subs = articleHierarchy[article];
  if (!subs) return ["Все подстатьи"];
  return ["Все подстатьи", ...subs];
}

export const budgetTypeList = ["Все типы", "P/L", "Cash"];

export const periodOptions = [
  "Январь 2026",
  "Февраль 2026",
  "Март 2026",
  "Q1 2026",
  "Q2 2026",
  "2026 год",
];

const allBudgetData: Record<string, BudgetRow[]> = {
  "Январь 2026": [
    {
      id: "j1", cfo: "Управление активами", article: "ФОТ", article2: "Оклады и ставки", category: "Run", budgetType: "P/L",
      plan: 42000000, fact: 39800000, reserve: 38500000, deviation: -2200000, execution: 94.8, status: "ok",
      requests: [
        { id: "rj1-1", number: "З-2026-0001", description: "Оклады — аналитики, январь", amount: 28500000, date: "10.01.2026", initiator: "Козлов А.В.", status: "approved" },
        { id: "rj1-2", number: "З-2026-0002", description: "Премия за закрытие Q4'25", amount: 8200000, date: "15.01.2026", initiator: "Козлов А.В.", status: "approved" },
        { id: "rj1-3", number: "З-2026-0003", description: "ДМС — продление полисов", amount: 3100000, date: "12.01.2026", initiator: "Козлов А.В.", status: "approved" },
      ],
    },
    {
      id: "j2", cfo: "Управление активами", article: "ИТ-инфраструктура", article2: "Лицензии ПО", category: "Run", budgetType: "Cash",
      plan: 15000000, fact: 14200000, reserve: 13500000, deviation: -800000, execution: 94.7, status: "ok",
      requests: [
        { id: "rj2-1", number: "З-2026-0010", description: "Лицензии Bloomberg Terminal — продление", amount: 6200000, date: "20.01.2026", initiator: "Семёнов Д.К.", status: "approved" },
        { id: "rj2-2", number: "З-2026-0011", description: "Обслуживание серверов — январь", amount: 4800000, date: "18.01.2026", initiator: "Семёнов Д.К.", status: "approved" },
        { id: "rj2-3", number: "З-2026-0012", description: "Лицензии Refinitiv Eikon", amount: 3200000, date: "22.01.2026", initiator: "Семёнов Д.К.", status: "approved" },
      ],
    },
    {
      id: "j3", cfo: "Управление активами", article: "ИТ-инфраструктура", article2: "Серверы и хостинг", category: "Change", budgetType: "Cash",
      plan: 8000000, fact: 7500000, reserve: 6800000, deviation: -500000, execution: 93.8, status: "ok",
      requests: [
        { id: "rj3-1", number: "З-2026-0013", description: "Внедрение модуля аналитики портфелей", amount: 5200000, date: "25.01.2026", initiator: "Семёнов Д.К.", status: "approved" },
        { id: "rj3-2", number: "З-2026-0014", description: "Миграция данных на новый кластер", amount: 2300000, date: "28.01.2026", initiator: "Петров И.С.", status: "approved" },
      ],
    },
    {
      id: "j4", cfo: "Брокерское обслуживание", article: "ФОТ", article2: "Оклады и ставки", category: "Run", budgetType: "P/L",
      plan: 66000000, fact: 65200000, reserve: 62700000, deviation: -800000, execution: 98.8, status: "ok",
      requests: [
        { id: "rj4-1", number: "З-2026-0020", description: "Оклады — отдел продаж, январь", amount: 42000000, date: "10.01.2026", initiator: "Иванова М.П.", status: "approved" },
        { id: "rj4-2", number: "З-2026-0021", description: "Бонусы за привлечение клиентов Q4'25", amount: 18500000, date: "15.01.2026", initiator: "Иванова М.П.", status: "approved" },
        { id: "rj4-3", number: "З-2026-0022", description: "Компенсация использования личного авто", amount: 2400000, date: "20.01.2026", initiator: "Иванова М.П.", status: "approved" },
        { id: "rj4-4", number: "З-2026-0023", description: "Оплата сертификации CFA — 5 сотр.", amount: 2300000, date: "25.01.2026", initiator: "Иванова М.П.", status: "approved" },
      ],
    },
    {
      id: "j5", cfo: "Брокерское обслуживание", article: "Маркетинг и реклама", article2: "Digital-маркетинг", category: "Run", budgetType: "P/L",
      plan: 12000000, fact: 11800000, reserve: 11200000, deviation: -200000, execution: 98.3, status: "ok",
      requests: [
        { id: "rj5-1", number: "З-2026-0030", description: "Контекстная реклама — Яндекс.Директ", amount: 4500000, date: "08.01.2026", initiator: "Сидоров Р.Н.", status: "approved" },
        { id: "rj5-2", number: "З-2026-0031", description: "SMM-продвижение — январь", amount: 2800000, date: "10.01.2026", initiator: "Сидоров Р.Н.", status: "approved" },
        { id: "rj5-3", number: "З-2026-0032", description: "Печатные материалы для клиентов", amount: 1500000, date: "15.01.2026", initiator: "Сидоров Р.Н.", status: "approved" },
        { id: "rj5-4", number: "З-2026-0033", description: "Email-рассылка — платформа", amount: 3000000, date: "18.01.2026", initiator: "Сидоров Р.Н.", status: "approved" },
      ],
    },
    {
      id: "j6", cfo: "Брокерское обслуживание", article: "Маркетинг и реклама", article2: "Брендинг и PR", category: "Change", budgetType: "Cash",
      plan: 10000000, fact: 15200000, reserve: 10200000, deviation: 5200000, execution: 152.0, status: "danger",
      requests: [
        { id: "rj6-1", number: "З-2026-0034", description: "Запуск digital-кампании «Инвестируй легко»", amount: 8500000, date: "22.01.2026", initiator: "Сидоров Р.Н.", status: "approved" },
        { id: "rj6-2", number: "З-2026-0035", description: "Ребрендинг мобильного приложения", amount: 4200000, date: "25.01.2026", initiator: "Сидоров Р.Н.", status: "approved" },
        { id: "rj6-3", number: "З-2026-0036", description: "Видеоролик — имиджевая реклама", amount: 2500000, date: "28.01.2026", initiator: "Сидоров Р.Н.", status: "pending" },
      ],
    },
    {
      id: "j7", cfo: "Инвестиционный банкинг", article: "ФОТ", article2: "Премии и бонусы", category: "Run", budgetType: "P/L",
      plan: 58000000, fact: 57200000, reserve: 55100000, deviation: -800000, execution: 98.6, status: "ok",
      requests: [
        { id: "rj7-1", number: "З-2026-0040", description: "Оклады — инвестбанкиры, январь", amount: 38000000, date: "10.01.2026", initiator: "Кузнецов В.А.", status: "approved" },
        { id: "rj7-2", number: "З-2026-0041", description: "Бонусы за сделку «Северсталь»", amount: 12500000, date: "18.01.2026", initiator: "Кузнецов В.А.", status: "approved" },
        { id: "rj7-3", number: "З-2026-0042", description: "Привлечение временных консультантов", amount: 6700000, date: "22.01.2026", initiator: "Кузнецов В.А.", status: "approved" },
      ],
    },
    {
      id: "j8", cfo: "Инвестиционный банкинг", article: "Консалтинг и аудит", article2: "Финансовый аудит", category: "Run", budgetType: "Cash",
      plan: 8000000, fact: 7800000, reserve: 7400000, deviation: -200000, execution: 97.5, status: "ok",
      requests: [
        { id: "rj8-1", number: "З-2026-0045", description: "Аудит сделок M&A — PwC", amount: 5400000, date: "25.01.2026", initiator: "Кузнецов В.А.", status: "approved" },
        { id: "rj8-2", number: "З-2026-0046", description: "Due diligence — проект «Арктика»", amount: 2400000, date: "28.01.2026", initiator: "Кузнецов В.А.", status: "approved" },
      ],
    },
    {
      id: "j9", cfo: "Инвестиционный банкинг", article: "Консалтинг и аудит", article2: "Юридический консалтинг", category: "Change", budgetType: "Cash",
      plan: 5000000, fact: 4800000, reserve: 4350000, deviation: -200000, execution: 96.0, status: "ok",
      requests: [
        { id: "rj9-1", number: "З-2026-0047", description: "Юридический консалтинг — подготовка IPO", amount: 3200000, date: "27.01.2026", initiator: "Кузнецов В.А.", status: "approved" },
        { id: "rj9-2", number: "З-2026-0048", description: "Структурирование нового фонда", amount: 1600000, date: "30.01.2026", initiator: "Кузнецов В.А.", status: "approved" },
      ],
    },
    {
      id: "j10", cfo: "Казначейство", article: "ФОТ", article2: "Оклады и ставки", category: "Run", budgetType: "P/L",
      plan: 29500000, fact: 29300000, reserve: 28200000, deviation: -200000, execution: 99.3, status: "ok",
      requests: [
        { id: "rj10-1", number: "З-2026-0050", description: "Оклады — казначейство, январь", amount: 22000000, date: "10.01.2026", initiator: "Орлова Т.Г.", status: "approved" },
        { id: "rj10-2", number: "З-2026-0051", description: "Премия за снижение стоимости фондирования", amount: 5200000, date: "15.01.2026", initiator: "Орлова Т.Г.", status: "approved" },
        { id: "rj10-3", number: "З-2026-0052", description: "Обучение — курс по управлению ликвидностью", amount: 2100000, date: "20.01.2026", initiator: "Орлова Т.Г.", status: "approved" },
      ],
    },
    {
      id: "j11", cfo: "Казначейство", article: "Амортизация", article2: "Амортизация ОС", category: "Run", budgetType: "P/L",
      plan: 7300000, fact: 7300000, reserve: 7300000, deviation: 0, execution: 100.0, status: "ok",
      requests: [
        { id: "rj11-1", number: "З-2026-0055", description: "Амортизация ОС — январь (план)", amount: 4600000, date: "15.01.2026", initiator: "Орлова Т.Г.", status: "approved" },
        { id: "rj11-2", number: "З-2026-0056", description: "Амортизация НМА — январь (план)", amount: 2700000, date: "15.01.2026", initiator: "Орлова Т.Г.", status: "approved" },
      ],
    },
    {
      id: "j12", cfo: "Управление рисками", article: "ИТ-инфраструктура", article2: "Лицензии ПО", category: "Run", budgetType: "Cash",
      plan: 12000000, fact: 11500000, reserve: 10800000, deviation: -500000, execution: 95.8, status: "ok",
      requests: [
        { id: "rj12-1", number: "З-2026-0060", description: "Лицензии SAS Risk Management", amount: 7200000, date: "28.01.2026", initiator: "Белов К.И.", status: "approved" },
        { id: "rj12-2", number: "З-2026-0061", description: "Хостинг модели рисков — облако", amount: 4300000, date: "29.01.2026", initiator: "Белов К.И.", status: "approved" },
      ],
    },
    {
      id: "j13", cfo: "Управление рисками", article: "ИТ-инфраструктура", article2: "Кибербезопасность", category: "Change", budgetType: "Cash",
      plan: 6000000, fact: 9800000, reserve: 6100000, deviation: 3800000, execution: 163.3, status: "danger",
      requests: [
        { id: "rj13-1", number: "З-2026-0062", description: "Обновление системы риск-мониторинга (внеплан)", amount: 6500000, date: "25.01.2026", initiator: "Белов К.И.", status: "approved" },
        { id: "rj13-2", number: "З-2026-0063", description: "Интеграция с новой торговой платформой", amount: 3300000, date: "28.01.2026", initiator: "Белов К.И.", status: "pending" },
      ],
    },
    {
      id: "j14", cfo: "ИТ-департамент", article: "ИТ-инфраструктура", article2: "Серверы и хостинг", category: "Run", budgetType: "Cash",
      plan: 38000000, fact: 37200000, reserve: 35600000, deviation: -800000, execution: 97.9, status: "ok",
      requests: [
        { id: "rj14-1", number: "З-2026-0070", description: "Датацентр — аренда стоек, январь", amount: 16000000, date: "12.01.2026", initiator: "Григорьев А.П.", status: "approved" },
        { id: "rj14-2", number: "З-2026-0071", description: "Кибербезопасность — SOC-мониторинг", amount: 8500000, date: "15.01.2026", initiator: "Григорьев А.П.", status: "approved" },
        { id: "rj14-3", number: "З-2026-0072", description: "Обновление сетевого оборудования", amount: 5200000, date: "18.01.2026", initiator: "Григорьев А.П.", status: "approved" },
        { id: "rj14-4", number: "З-2026-0073", description: "Лицензии VMware — продление", amount: 4500000, date: "22.01.2026", initiator: "Григорьев А.П.", status: "approved" },
        { id: "rj14-5", number: "З-2026-0074", description: "Мониторинг инфраструктуры — Zabbix", amount: 3000000, date: "25.01.2026", initiator: "Григорьев А.П.", status: "approved" },
      ],
    },
    {
      id: "j15", cfo: "ИТ-департамент", article: "ИТ-инфраструктура", article2: "Кибербезопасность", category: "Change", budgetType: "Cash",
      plan: 12000000, fact: 11800000, reserve: 11400000, deviation: -200000, execution: 98.3, status: "ok",
      requests: [
        { id: "rj15-1", number: "З-2026-0075", description: "Внедрение SIEM — Splunk", amount: 7800000, date: "20.01.2026", initiator: "Григорьев А.П.", status: "approved" },
        { id: "rj15-2", number: "З-2026-0075b", description: "Пентест — внешний подрядчик", amount: 4000000, date: "28.01.2026", initiator: "Григорьев А.П.", status: "approved" },
      ],
    },
    {
      id: "j16", cfo: "ИТ-департамент", article: "Командировочные", article2: "Перелёты и проезд", category: "Run", budgetType: "Cash",
      plan: 2500000, fact: 3200000, reserve: 2400000, deviation: 700000, execution: 128.0, status: "warning",
      requests: [
        { id: "rj16-1", number: "З-2026-0078", description: "Командировка — настройка филиала Новосибирск", amount: 1200000, date: "22.01.2026", initiator: "Волков С.М.", status: "approved" },
        { id: "rj16-2", number: "З-2026-0079", description: "Выезд на объект — Краснодар, миграция", amount: 1100000, date: "28.01.2026", initiator: "Волков С.М.", status: "approved" },
        { id: "rj16-3", number: "З-2026-0080", description: "Аварийный выезд — Казань (внеплан)", amount: 900000, date: "30.01.2026", initiator: "Волков С.М.", status: "approved" },
      ],
    },
    {
      id: "j17", cfo: "HR и администрация", article: "Аренда и содержание", article2: "Аренда офисов", category: "Run", budgetType: "P/L",
      plan: 12500000, fact: 12500000, reserve: 12500000, deviation: 0, execution: 100.0, status: "ok",
      requests: [
        { id: "rj17-1", number: "З-2026-0085", description: "Аренда офиса — Москва-Сити, январь", amount: 9200000, date: "15.01.2026", initiator: "Новикова Е.С.", status: "approved" },
        { id: "rj17-2", number: "З-2026-0086", description: "Коммунальные платежи — январь", amount: 1800000, date: "20.01.2026", initiator: "Новикова Е.С.", status: "approved" },
        { id: "rj17-3", number: "З-2026-0087", description: "Клининг и обслуживание", amount: 1500000, date: "25.01.2026", initiator: "Новикова Е.С.", status: "approved" },
      ],
    },
    {
      id: "j18", cfo: "HR и администрация", article: "ФОТ", article2: "Оклады и ставки", category: "Run", budgetType: "P/L",
      plan: 18000000, fact: 17800000, reserve: 17100000, deviation: -200000, execution: 98.9, status: "ok",
      requests: [
        { id: "rj18-1", number: "З-2026-0088", description: "Оклады — HR, бухгалтерия, январь", amount: 12500000, date: "10.01.2026", initiator: "Новикова Е.С.", status: "approved" },
        { id: "rj18-2", number: "З-2026-0089", description: "Премия — закрытие годового аудита", amount: 3400000, date: "18.01.2026", initiator: "Новикова Е.С.", status: "approved" },
        { id: "rj18-3", number: "З-2026-0090", description: "Рекрутинг — агентства", amount: 1900000, date: "25.01.2026", initiator: "Новикова Е.С.", status: "approved" },
      ],
    },
    {
      id: "j19", cfo: "HR и администрация", article: "Прочие расходы", article2: "Непредвиденные расходы", category: "Run", budgetType: "Cash",
      plan: 3000000, fact: 2800000, reserve: 2400000, deviation: -200000, execution: 93.3, status: "ok",
      requests: [
        { id: "rj19-1", number: "З-2026-0091", description: "Канцтовары и расходные материалы", amount: 800000, date: "15.01.2026", initiator: "Новикова Е.С.", status: "approved" },
        { id: "rj19-2", number: "З-2026-0092", description: "Корпоративный транспорт — ТО", amount: 1200000, date: "22.01.2026", initiator: "Новикова Е.С.", status: "approved" },
        { id: "rj19-3", number: "З-2026-0093", description: "Подписки на деловые издания", amount: 800000, date: "28.01.2026", initiator: "Новикова Е.С.", status: "approved" },
      ],
    },
    {
      id: "j20", cfo: "Управление рисками", article: "ФОТ", article2: "Компенсации", category: "Run", budgetType: "P/L",
      plan: 24000000, fact: 23800000, reserve: 22800000, deviation: -200000, execution: 99.2, status: "ok",
      requests: [
        { id: "rj20-1", number: "З-2026-0064", description: "Оклады — риск-менеджеры, январь", amount: 18000000, date: "10.01.2026", initiator: "Белов К.И.", status: "approved" },
        { id: "rj20-2", number: "З-2026-0065", description: "Премия за внедрение stress-тестирования", amount: 3800000, date: "20.01.2026", initiator: "Белов К.И.", status: "approved" },
        { id: "rj20-3", number: "З-2026-0066", description: "ДМС — новые сотрудники", amount: 2000000, date: "25.01.2026", initiator: "Белов К.И.", status: "approved" },
      ],
    },
    {
      id: "j21", cfo: "Брокерское обслуживание", article: "Обучение и развитие", article2: "Сертификация", category: "Run", budgetType: "P/L",
      plan: 4500000, fact: 4200000, reserve: 3600000, deviation: -300000, execution: 93.3, status: "ok",
      requests: [
        { id: "rj21-1", number: "З-2026-0094", description: "Тренинг по продажам — внешний провайдер", amount: 2200000, date: "18.01.2026", initiator: "Иванова М.П.", status: "approved" },
        { id: "rj21-2", number: "З-2026-0095", description: "Подписка Coursera Business — 50 лицензий", amount: 1200000, date: "22.01.2026", initiator: "Иванова М.П.", status: "approved" },
        { id: "rj21-3", number: "З-2026-0096", description: "Семинар по комплаенсу — ЦБ", amount: 800000, date: "25.01.2026", initiator: "Иванова М.П.", status: "approved" },
      ],
    },
    {
      id: "j22", cfo: "Управление рисками", article: "Обучение и развитие", article2: "Сертификация", category: "Change", budgetType: "P/L",
      plan: 3000000, fact: 3500000, reserve: 3050000, deviation: 500000, execution: 116.7, status: "warning",
      requests: [
        { id: "rj22-1", number: "З-2026-0097", description: "Программа сертификации PRM — 8 сотр.", amount: 2400000, date: "20.01.2026", initiator: "Белов К.И.", status: "approved" },
        { id: "rj22-2", number: "З-2026-0098x", description: "Внешняя стажировка — Лондон, 2 чел.", amount: 1100000, date: "28.01.2026", initiator: "Белов К.И.", status: "approved" },
      ],
    },
    {
      id: "j23", cfo: "Казначейство", article: "Страхование", article2: "D&O страхование", category: "Run", budgetType: "P/L",
      plan: 5200000, fact: 5200000, reserve: 5200000, deviation: 0, execution: 100.0, status: "ok",
      requests: [
        { id: "rj23-1", number: "З-2026-0053", description: "Страхование D&O — годовой полис", amount: 3200000, date: "12.01.2026", initiator: "Орлова Т.Г.", status: "approved" },
        { id: "rj23-2", number: "З-2026-0054", description: "Страхование профответственности", amount: 2000000, date: "15.01.2026", initiator: "Орлова Т.Г.", status: "approved" },
      ],
    },
    {
      id: "j24", cfo: "Инвестиционный банкинг", article: "Представительские", article2: "Деловые встречи", category: "Run", budgetType: "Cash",
      plan: 6000000, fact: 7200000, reserve: 5700000, deviation: 1200000, execution: 120.0, status: "danger",
      requests: [
        { id: "rj24-1", number: "З-2026-0049", description: "Деловой ужин — клиенты M&A", amount: 2800000, date: "18.01.2026", initiator: "Кузнецов В.А.", status: "approved" },
        { id: "rj24-2", number: "З-2026-0049b", description: "Аренда VIP-зала — презентация IPO", amount: 2400000, date: "25.01.2026", initiator: "Кузнецов В.А.", status: "approved" },
        { id: "rj24-3", number: "З-2026-0049c", description: "Подарки партнёрам — Новый год (доп.)", amount: 2000000, date: "12.01.2026", initiator: "Кузнецов В.А.", status: "approved" },
      ],
    },
    {
      id: "j25", cfo: "ИТ-департамент", article: "Связь и телеком", article2: "VoIP и SIP", category: "Run", budgetType: "Cash",
      plan: 4800000, fact: 4600000, reserve: 4300000, deviation: -200000, execution: 95.8, status: "ok",
      requests: [
        { id: "rj25-1", number: "З-2026-0076", description: "Корпоративная мобильная связь — январь", amount: 1800000, date: "15.01.2026", initiator: "Григорьев А.П.", status: "approved" },
        { id: "rj25-2", number: "З-2026-0077", description: "SIP-транки и VoIP — январь", amount: 1400000, date: "18.01.2026", initiator: "Григорьев А.П.", status: "approved" },
        { id: "rj25-3", number: "З-2026-0077b", description: "Выделенные каналы связи — филиалы", amount: 1400000, date: "22.01.2026", initiator: "Григорьев А.П.", status: "approved" },
      ],
    },
    {
      id: "j26", cfo: "Управление активами", article: "Лицензии и подписки", article2: "Аналитические платформы", category: "Run", budgetType: "Cash",
      plan: 8500000, fact: 8200000, reserve: 7900000, deviation: -300000, execution: 96.5, status: "ok",
      requests: [
        { id: "rj26-1", number: "З-2026-0015", description: "Reuters Datastream — годовая подписка", amount: 3800000, date: "10.01.2026", initiator: "Семёнов Д.К.", status: "approved" },
        { id: "rj26-2", number: "З-2026-0016", description: "Morningstar Direct — лицензия", amount: 2600000, date: "15.01.2026", initiator: "Семёнов Д.К.", status: "approved" },
        { id: "rj26-3", number: "З-2026-0017", description: "MSCI ESG Research — подписка", amount: 1800000, date: "20.01.2026", initiator: "Семёнов Д.К.", status: "approved" },
      ],
    },
  ],
  "Февраль 2026": [
    {
      id: "f1", cfo: "Управление активами", article: "ФОТ", article2: "Оклады и ставки", category: "Run", budgetType: "P/L",
      plan: 42000000, fact: 40500000, reserve: 39200000, deviation: -1500000, execution: 96.4, status: "ok",
      requests: [
        { id: "rf1-1", number: "З-2026-0098", description: "Оклады — аналитики, февраль", amount: 28500000, date: "10.02.2026", initiator: "Козлов А.В.", status: "approved" },
        { id: "rf1-2", number: "З-2026-0099", description: "Компенсация фитнеса — 2 квартал", amount: 1800000, date: "15.02.2026", initiator: "Козлов А.В.", status: "approved" },
        { id: "rf1-3", number: "З-2026-0100", description: "Оплата переработок — январь", amount: 4200000, date: "18.02.2026", initiator: "Козлов А.В.", status: "approved" },
        { id: "rf1-4", number: "З-2026-0101", description: "Командировочные — конференция Лондон", amount: 6000000, date: "20.02.2026", initiator: "Козлов А.В.", status: "rejected" },
      ],
    },
    {
      id: "f2", cfo: "Управление активами", article: "ИТ-инфраструктура", article2: "Серверы и хостинг", category: "Run", budgetType: "Cash",
      plan: 15000000, fact: 14800000, reserve: 14200000, deviation: -200000, execution: 98.7, status: "ok",
      requests: [
        { id: "rf2-1", number: "З-2026-0105", description: "Серверное оборудование — обновление", amount: 8200000, date: "05.02.2026", initiator: "Семёнов Д.К.", status: "approved" },
        { id: "rf2-2", number: "З-2026-0106", description: "Лицензии аналитических платформ", amount: 4100000, date: "10.02.2026", initiator: "Семёнов Д.К.", status: "approved" },
        { id: "rf2-3", number: "З-2026-0107", description: "Техподдержка торговых систем", amount: 2500000, date: "15.02.2026", initiator: "Семёнов Д.К.", status: "approved" },
      ],
    },
    {
      id: "f3", cfo: "Управление активами", article: "ИТ-инфраструктура", article2: "Серверы и хостинг", category: "Change", budgetType: "Cash",
      plan: 8000000, fact: 7200000, reserve: 6400000, deviation: -800000, execution: 90.0, status: "ok",
      requests: [
        { id: "rf3-1", number: "З-2026-0108", description: "СХД — расширение хранилища данных", amount: 4800000, date: "12.02.2026", initiator: "Петров И.С.", status: "approved" },
        { id: "rf3-2", number: "З-2026-0109", description: "Настройка DR-сайта (резерв)", amount: 2400000, date: "18.02.2026", initiator: "Петров И.С.", status: "approved" },
      ],
    },
    {
      id: "f4", cfo: "Брокерское обслуживание", article: "ФОТ", article2: "Оклады и ставки", category: "Run", budgetType: "P/L",
      plan: 66000000, fact: 68400000, reserve: 63400000, deviation: 2400000, execution: 103.6, status: "warning",
      requests: [
        { id: "rf4-1", number: "З-2026-0110", description: "Оклады — отдел продаж, февраль", amount: 42000000, date: "10.02.2026", initiator: "Иванова М.П.", status: "approved" },
        { id: "rf4-2", number: "З-2026-0111", description: "Расширение штата — 3 новых менеджера", amount: 8400000, date: "12.02.2026", initiator: "Иванова М.П.", status: "approved" },
        { id: "rf4-3", number: "З-2026-0112", description: "Доплата за совмещение — 2 руководителя", amount: 4500000, date: "15.02.2026", initiator: "Иванова М.П.", status: "approved" },
        { id: "rf4-4", number: "З-2026-0113", description: "Корпоративное обучение — MiFID II", amount: 6500000, date: "20.02.2026", initiator: "Иванова М.П.", status: "approved" },
        { id: "rf4-5", number: "З-2026-0114", description: "Премия за рекорд по оборотам", amount: 7000000, date: "25.02.2026", initiator: "Иванова М.П.", status: "pending" },
      ],
    },
    {
      id: "f5", cfo: "Брокерское обслуживание", article: "Маркетинг и реклама", article2: "Мероприятия и спонсорство", category: "Run", budgetType: "P/L",
      plan: 12000000, fact: 11500000, reserve: 10900000, deviation: -500000, execution: 95.8, status: "ok",
      requests: [
        { id: "rf5-1", number: "З-2026-0115", description: "Контекстная реклама — февраль", amount: 4800000, date: "05.02.2026", initiator: "Сидоров Р.Н.", status: "approved" },
        { id: "rf5-2", number: "З-2026-0116", description: "Спонсорство финансовой конференции", amount: 5000000, date: "06.02.2026", initiator: "Сидоров Р.Н.", status: "approved" },
        { id: "rf5-3", number: "З-2026-0117", description: "PR-публикации — Forbes, РБК", amount: 1700000, date: "15.02.2026", initiator: "Сидоров Р.Н.", status: "approved" },
      ],
    },
    {
      id: "f6", cfo: "Брокерское обслуживание", article: "Маркетинг и реклама", article2: "Digital-маркетинг", category: "Change", budgetType: "Cash",
      plan: 10000000, fact: 14800000, reserve: 10500000, deviation: 4800000, execution: 148.0, status: "danger",
      requests: [
        { id: "rf6-1", number: "З-2026-0118", description: "Внеплановая кампания — таргетинг feb'26", amount: 8900000, date: "18.02.2026", initiator: "Сидоров Р.Н.", status: "approved" },
        { id: "rf6-2", number: "З-2026-0119", description: "Разработка нового лендинга", amount: 3200000, date: "20.02.2026", initiator: "Сидоров Р.Н.", status: "approved" },
        { id: "rf6-3", number: "З-2026-0120", description: "SEO-оптимизация и контент", amount: 2700000, date: "25.02.2026", initiator: "Сидоров Р.Н.", status: "approved" },
      ],
    },
    {
      id: "f7", cfo: "Инвестиционный банкинг", article: "ФОТ", article2: "Премии и бонусы", category: "Run", budgetType: "P/L",
      plan: 58000000, fact: 56800000, reserve: 54600000, deviation: -1200000, execution: 97.9, status: "ok",
      requests: [
        { id: "rf7-1", number: "З-2026-0121", description: "Оклады — инвестбанкиры, февраль", amount: 38000000, date: "10.02.2026", initiator: "Кузнецов В.А.", status: "approved" },
        { id: "rf7-2", number: "З-2026-0122", description: "Переменная часть — deal fee", amount: 15800000, date: "20.02.2026", initiator: "Кузнецов В.А.", status: "approved" },
        { id: "rf7-3", number: "З-2026-0123", description: "Relocation-пакет — 2 сотрудника", amount: 3000000, date: "25.02.2026", initiator: "Кузнецов В.А.", status: "approved" },
      ],
    },
    {
      id: "f8", cfo: "Инвестиционный банкинг", article: "Консалтинг и аудит", article2: "Юридический консалтинг", category: "Run", budgetType: "Cash",
      plan: 8000000, fact: 8200000, reserve: 7600000, deviation: 200000, execution: 102.5, status: "ok",
      requests: [
        { id: "rf8-1", number: "З-2026-0125", description: "Юридический консалтинг — структурирование", amount: 4500000, date: "10.02.2026", initiator: "Кузнецов В.А.", status: "approved" },
        { id: "rf8-2", number: "З-2026-0126", description: "Финансовое моделирование — внешний подряд", amount: 3700000, date: "15.02.2026", initiator: "Кузнецов В.А.", status: "approved" },
      ],
    },
    {
      id: "f9", cfo: "Казначейство", article: "ФОТ", article2: "Оклады и ставки", category: "Run", budgetType: "P/L",
      plan: 29500000, fact: 29200000, reserve: 27800000, deviation: -300000, execution: 99.0, status: "ok",
      requests: [
        { id: "rf9-1", number: "З-2026-0130", description: "Оклады — казначейство, февраль", amount: 22000000, date: "10.02.2026", initiator: "Орлова Т.Г.", status: "approved" },
        { id: "rf9-2", number: "З-2026-0131", description: "Квартальная аттестация — выплаты", amount: 4200000, date: "18.02.2026", initiator: "Орлова Т.Г.", status: "approved" },
        { id: "rf9-3", number: "З-2026-0132", description: "Подписка на аналитику ЦБ", amount: 3000000, date: "22.02.2026", initiator: "Орлова Т.Г.", status: "approved" },
      ],
    },
    {
      id: "f10", cfo: "Казначейство", article: "Амортизация", article2: "Амортизация ОС", category: "Run", budgetType: "P/L",
      plan: 7300000, fact: 7300000, reserve: 7300000, deviation: 0, execution: 100.0, status: "ok",
      requests: [
        { id: "rf10-1", number: "З-2026-0133", description: "Амортизация ОС — февраль (план)", amount: 4600000, date: "15.02.2026", initiator: "Орлова Т.Г.", status: "approved" },
        { id: "rf10-2", number: "З-2026-0134", description: "Амортизация НМА — февраль (план)", amount: 2700000, date: "15.02.2026", initiator: "Орлова Т.Г.", status: "approved" },
      ],
    },
    {
      id: "f11", cfo: "Управление рисками", article: "ИТ-инфраструктура", article2: "Лицензии ПО", category: "Run", budgetType: "Cash",
      plan: 12000000, fact: 12800000, reserve: 11500000, deviation: 800000, execution: 106.7, status: "warning",
      requests: [
        { id: "rf11-1", number: "З-2026-0135", description: "Поддержка SAS — расширенная", amount: 8200000, date: "05.02.2026", initiator: "Белов К.И.", status: "approved" },
        { id: "rf11-2", number: "З-2026-0136", description: "Облачные вычисления — доп. мощности", amount: 4600000, date: "15.02.2026", initiator: "Белов К.И.", status: "approved" },
      ],
    },
    {
      id: "f12", cfo: "Управление рисками", article: "ИТ-инфраструктура", article2: "Техподдержка", category: "Change", budgetType: "Cash",
      plan: 6000000, fact: 5800000, reserve: 5400000, deviation: -200000, execution: 96.7, status: "ok",
      requests: [
        { id: "rf12-1", number: "З-2026-0137", description: "Внедрение FRTB-модуля", amount: 3800000, date: "10.02.2026", initiator: "Белов К.И.", status: "approved" },
        { id: "rf12-2", number: "З-2026-0138", description: "Автоматизация отчётности ЦБ", amount: 2000000, date: "20.02.2026", initiator: "Белов К.И.", status: "approved" },
      ],
    },
    {
      id: "f13", cfo: "Управление рисками", article: "ФОТ", article2: "ДМС и страхование", category: "Run", budgetType: "P/L",
      plan: 24000000, fact: 24200000, reserve: 23200000, deviation: 200000, execution: 100.8, status: "ok",
      requests: [
        { id: "rf13-1", number: "З-2026-0139", description: "Оклады — риск-менеджеры, февраль", amount: 18000000, date: "10.02.2026", initiator: "Белов К.И.", status: "approved" },
        { id: "rf13-2", number: "З-2026-0140", description: "Оплата сертификации FRM — 3 сотр.", amount: 2400000, date: "18.02.2026", initiator: "Белов К.И.", status: "approved" },
        { id: "rf13-3", number: "З-2026-0141", description: "Премия за успешный аудит ЦБ", amount: 3800000, date: "25.02.2026", initiator: "Белов К.И.", status: "approved" },
      ],
    },
    {
      id: "f14", cfo: "ИТ-департамент", article: "ИТ-инфраструктура", article2: "Серверы и хостинг", category: "Run", budgetType: "Cash",
      plan: 38000000, fact: 37500000, reserve: 36200000, deviation: -500000, execution: 98.7, status: "ok",
      requests: [
        { id: "rf14-1", number: "З-2026-0142", description: "Датацентр — аренда стоек, февраль", amount: 16000000, date: "12.02.2026", initiator: "Григорьев А.П.", status: "approved" },
        { id: "rf14-2", number: "З-2026-0143", description: "Кибербезопасность — ежемесячная подписка", amount: 8500000, date: "15.02.2026", initiator: "Григорьев А.П.", status: "approved" },
        { id: "rf14-3", number: "З-2026-0144", description: "Обновление Wi-Fi инфраструктуры", amount: 5200000, date: "18.02.2026", initiator: "Григорьев А.П.", status: "approved" },
        { id: "rf14-4", number: "З-2026-0145", description: "Мониторинг — Zabbix + Grafana", amount: 4800000, date: "22.02.2026", initiator: "Григорьев А.П.", status: "approved" },
        { id: "rf14-5", number: "З-2026-0146", description: "Замена UPS в серверной", amount: 3000000, date: "25.02.2026", initiator: "Григорьев А.П.", status: "pending" },
      ],
    },
    {
      id: "f15", cfo: "ИТ-департамент", article: "ИТ-инфраструктура", article2: "Кибербезопасность", category: "Change", budgetType: "Cash",
      plan: 12000000, fact: 13200000, reserve: 12300000, deviation: 1200000, execution: 110.0, status: "warning",
      requests: [
        { id: "rf15-1", number: "З-2026-0147", description: "Внедрение ServiceNow ITSM", amount: 8500000, date: "10.02.2026", initiator: "Григорьев А.П.", status: "approved" },
        { id: "rf15-2", number: "З-2026-0148", description: "DevOps-пайплайн — CI/CD для трейдинга", amount: 4700000, date: "20.02.2026", initiator: "Григорьев А.П.", status: "approved" },
      ],
    },
    {
      id: "f16", cfo: "ИТ-департамент", article: "Командировочные", article2: "Проживание", category: "Run", budgetType: "Cash",
      plan: 2500000, fact: 4200000, reserve: 2500000, deviation: 1700000, execution: 168.0, status: "danger",
      requests: [
        { id: "rf16-1", number: "З-2026-0149", description: "Настройка филиала — Екатеринбург", amount: 1600000, date: "08.02.2026", initiator: "Волков С.М.", status: "approved" },
        { id: "rf16-2", number: "З-2026-0150", description: "Миграция серверов — Краснодар", amount: 1800000, date: "15.02.2026", initiator: "Волков С.М.", status: "approved" },
        { id: "rf16-3", number: "З-2026-0151", description: "Аварийный выезд — сбой в Самаре", amount: 800000, date: "22.02.2026", initiator: "Волков С.М.", status: "approved" },
      ],
    },
    {
      id: "f17", cfo: "HR и администрация", article: "Аренда и содержание", article2: "Аренда офисов", category: "Run", budgetType: "P/L",
      plan: 12500000, fact: 12400000, reserve: 12500000, deviation: -100000, execution: 99.2, status: "ok",
      requests: [
        { id: "rf17-1", number: "З-2026-0152", description: "Аренда офиса — Москва-Сити, февраль", amount: 9200000, date: "15.02.2026", initiator: "Новикова Е.С.", status: "approved" },
        { id: "rf17-2", number: "З-2026-0153", description: "Коммунальные платежи — февраль", amount: 1800000, date: "20.02.2026", initiator: "Новикова Е.С.", status: "approved" },
        { id: "rf17-3", number: "З-2026-0154", description: "Ремонт переговорных комнат", amount: 1400000, date: "25.02.2026", initiator: "Новикова Е.С.", status: "approved" },
      ],
    },
    {
      id: "f18", cfo: "HR и администрация", article: "ФОТ", article2: "Оклады и ставки", category: "Run", budgetType: "P/L",
      plan: 18000000, fact: 18200000, reserve: 17200000, deviation: 200000, execution: 101.1, status: "ok",
      requests: [
        { id: "rf18-1", number: "З-2026-0155", description: "Оклады — HR, бухгалтерия, февраль", amount: 12500000, date: "10.02.2026", initiator: "Новикова Е.С.", status: "approved" },
        { id: "rf18-2", number: "З-2026-0156", description: "Найм — бонус рекрутерам", amount: 3500000, date: "18.02.2026", initiator: "Новикова Е.С.", status: "approved" },
        { id: "rf18-3", number: "З-2026-0157", description: "Корпоратив 23 февраля", amount: 2200000, date: "22.02.2026", initiator: "Новикова Е.С.", status: "approved" },
      ],
    },
    {
      id: "f19", cfo: "Брокерское обслуживание", article: "Обучение и развитие", article2: "Тренинги и курсы", category: "Run", budgetType: "P/L",
      plan: 4500000, fact: 4800000, reserve: 4200000, deviation: 300000, execution: 106.7, status: "warning",
      requests: [
        { id: "rf19-1", number: "З-2026-0158", description: "Тренинг MiFID II — compliance", amount: 2500000, date: "08.02.2026", initiator: "Иванова М.П.", status: "approved" },
        { id: "rf19-2", number: "З-2026-0159", description: "Курсы CFA — оплата за 4 сотр.", amount: 2300000, date: "15.02.2026", initiator: "Иванова М.П.", status: "approved" },
      ],
    },
    {
      id: "f20", cfo: "Казначейство", article: "Страхование", article2: "Имущественное страхование", category: "Run", budgetType: "P/L",
      plan: 5200000, fact: 5200000, reserve: 5200000, deviation: 0, execution: 100.0, status: "ok",
      requests: [
        { id: "rf20-1", number: "З-2026-0133b", description: "Страхование D&O — ежемесячный платёж", amount: 3200000, date: "12.02.2026", initiator: "Орлова Т.Г.", status: "approved" },
        { id: "rf20-2", number: "З-2026-0133c", description: "Страхование кибер-рисков", amount: 2000000, date: "18.02.2026", initiator: "Орлова Т.Г.", status: "approved" },
      ],
    },
    {
      id: "f21", cfo: "Инвестиционный банкинг", article: "Представительские", article2: "VIP-мероприятия", category: "Run", budgetType: "Cash",
      plan: 6000000, fact: 5400000, reserve: 4800000, deviation: -600000, execution: 90.0, status: "ok",
      requests: [
        { id: "rf21-1", number: "З-2026-0127", description: "Деловой ужин — презентация фонда", amount: 2200000, date: "12.02.2026", initiator: "Кузнецов В.А.", status: "approved" },
        { id: "rf21-2", number: "З-2026-0128", description: "Аренда конференц-зала — roadshow", amount: 3200000, date: "20.02.2026", initiator: "Кузнецов В.А.", status: "approved" },
      ],
    },
    {
      id: "f22", cfo: "ИТ-департамент", article: "Связь и телеком", article2: "Мобильная связь", category: "Run", budgetType: "Cash",
      plan: 4800000, fact: 5100000, reserve: 4600000, deviation: 300000, execution: 106.3, status: "warning",
      requests: [
        { id: "rf22-1", number: "З-2026-0148b", description: "Корпоративная мобильная связь — февраль", amount: 1800000, date: "15.02.2026", initiator: "Григорьев А.П.", status: "approved" },
        { id: "rf22-2", number: "З-2026-0148c", description: "SIP-транки и VoIP — февраль", amount: 1400000, date: "18.02.2026", initiator: "Григорьев А.П.", status: "approved" },
        { id: "rf22-3", number: "З-2026-0148d", description: "Расширение пропускной способности каналов", amount: 1900000, date: "22.02.2026", initiator: "Григорьев А.П.", status: "approved" },
      ],
    },
    {
      id: "f23", cfo: "Управление активами", article: "Лицензии и подписки", article2: "Информационные терминалы", category: "Run", budgetType: "Cash",
      plan: 8500000, fact: 8400000, reserve: 8100000, deviation: -100000, execution: 98.8, status: "ok",
      requests: [
        { id: "rf23-1", number: "З-2026-0109b", description: "FactSet — месячная подписка", amount: 3200000, date: "10.02.2026", initiator: "Семёнов Д.К.", status: "approved" },
        { id: "rf23-2", number: "З-2026-0109c", description: "Capital IQ — подписка", amount: 2800000, date: "15.02.2026", initiator: "Семёнов Д.К.", status: "approved" },
        { id: "rf23-3", number: "З-2026-0109d", description: "Wind Financial — терминал", amount: 2400000, date: "20.02.2026", initiator: "Семёнов Д.К.", status: "approved" },
      ],
    },
    {
      id: "f24", cfo: "HR и администрация", article: "Прочие расходы", article2: "Непредвиденные расходы", category: "Change", budgetType: "Cash",
      plan: 2500000, fact: 2800000, reserve: 2100000, deviation: 300000, execution: 112.0, status: "warning",
      requests: [
        { id: "rf24-1", number: "З-2026-0157b", description: "Внедрение LMS-платформы", amount: 1800000, date: "12.02.2026", initiator: "Новикова Е.С.", status: "approved" },
        { id: "rf24-2", number: "З-2026-0157c", description: "Разработка курсов адаптации", amount: 1000000, date: "20.02.2026", initiator: "Новикова Е.С.", status: "pending" },
      ],
    },
    {
      id: "f25", cfo: "ИТ-департамент", article: "Связь и телеком", article2: "Интернет и каналы", category: "Run", budgetType: "Cash",
      plan: 3200000, fact: 3100000, reserve: 2900000, deviation: -100000, execution: 96.9, status: "ok",
      requests: [
        { id: "rf25-1", number: "З-2026-0148e", description: "Выделенные каналы связи — филиалы", amount: 1800000, date: "10.02.2026", initiator: "Григорьев А.П.", status: "approved" },
        { id: "rf25-2", number: "З-2026-0148f", description: "Интернет — офис Москва-Сити", amount: 1300000, date: "15.02.2026", initiator: "Григорьев А.П.", status: "approved" },
      ],
    },
    {
      id: "f26", cfo: "Инвестиционный банкинг", article: "Консалтинг и аудит", article2: "Стратегический консалтинг", category: "Change", budgetType: "Cash",
      plan: 5000000, fact: 4800000, reserve: 4500000, deviation: -200000, execution: 96.0, status: "ok",
      requests: [
        { id: "rf26-1", number: "З-2026-0126b", description: "Стратегический консалтинг — McKinsey", amount: 3200000, date: "12.02.2026", initiator: "Кузнецов В.А.", status: "approved" },
        { id: "rf26-2", number: "З-2026-0126c", description: "Рыночный анализ — новый сегмент", amount: 1600000, date: "22.02.2026", initiator: "Кузнецов В.А.", status: "approved" },
      ],
    },
  ],
  "Март 2026": [
    {
      id: "m1", cfo: "Управление активами", article: "ФОТ", article2: "Оклады и ставки", category: "Run", budgetType: "P/L",
      plan: 42000000, fact: 38200000, reserve: 35700000, deviation: -3800000, execution: 90.9, status: "ok",
      requests: [
        { id: "rm1-1", number: "З-2026-0160", description: "Оклады — аналитики, март", amount: 28500000, date: "10.03.2026", initiator: "Козлов А.В.", status: "approved" },
        { id: "rm1-2", number: "З-2026-0161", description: "Компенсация питания — Q1", amount: 2200000, date: "12.03.2026", initiator: "Козлов А.В.", status: "approved" },
        { id: "rm1-3", number: "З-2026-0162", description: "Оплата 8 Марта — подарки", amount: 500000, date: "06.03.2026", initiator: "Козлов А.В.", status: "approved" },
        { id: "rm1-4", number: "З-2026-0163", description: "Годовой бонус — топ-аналитик", amount: 7000000, date: "15.03.2026", initiator: "Козлов А.В.", status: "pending" },
      ],
    },
    {
      id: "m2", cfo: "Управление активами", article: "ИТ-инфраструктура", article2: "Лицензии ПО", category: "Run", budgetType: "Cash",
      plan: 15000000, fact: 13500000, reserve: 12000000, deviation: -1500000, execution: 90.0, status: "ok",
      requests: [
        { id: "rm2-1", number: "З-2026-0164", description: "Обслуживание серверов — март", amount: 4800000, date: "05.03.2026", initiator: "Семёнов Д.К.", status: "approved" },
        { id: "rm2-2", number: "З-2026-0165", description: "Продление лицензий — Factset", amount: 5200000, date: "10.03.2026", initiator: "Семёнов Д.К.", status: "approved" },
        { id: "rm2-3", number: "З-2026-0166", description: "Техподдержка Bloomberg", amount: 3500000, date: "12.03.2026", initiator: "Семёнов Д.К.", status: "pending" },
      ],
    },
    {
      id: "m3", cfo: "Управление активами", article: "ИТ-инфраструктура", article2: "Серверы и хостинг", category: "Change", budgetType: "Cash",
      plan: 8000000, fact: 7500000, reserve: 6600000, deviation: -500000, execution: 93.8, status: "ok",
      requests: [
        { id: "rm3-1", number: "З-2026-0167", description: "Миграция на облачную инфраструктуру", amount: 5200000, date: "05.03.2026", initiator: "Семёнов Д.К.", status: "approved" },
        { id: "rm3-2", number: "З-2026-0168", description: "Настройка отказоустойчивости", amount: 2300000, date: "10.03.2026", initiator: "Семёнов Д.К.", status: "approved" },
      ],
    },
    {
      id: "m4", cfo: "Брокерское обслуживание", article: "ФОТ", article2: "Премии и бонусы", category: "Run", budgetType: "P/L",
      plan: 66000000, fact: 67900000, reserve: 62400000, deviation: 1900000, execution: 102.9, status: "warning",
      requests: [
        { id: "rm4-1", number: "З-2026-0170", description: "Оклады — отдел продаж, март", amount: 42000000, date: "10.03.2026", initiator: "Иванова М.П.", status: "approved" },
        { id: "rm4-2", number: "З-2026-0171", description: "Доплата за расширение штата — 3 чел.", amount: 8400000, date: "12.03.2026", initiator: "Иванова М.П.", status: "approved" },
        { id: "rm4-3", number: "З-2026-0172", description: "Премия по итогам Q1", amount: 12500000, date: "15.03.2026", initiator: "Иванова М.П.", status: "pending" },
        { id: "rm4-4", number: "З-2026-0173", description: "Компенсация удалённой работы", amount: 5000000, date: "08.03.2026", initiator: "Иванова М.П.", status: "approved" },
      ],
    },
    {
      id: "m5", cfo: "Брокерское обслуживание", article: "Маркетинг и реклама", article2: "Digital-маркетинг", category: "Run", budgetType: "P/L",
      plan: 12000000, fact: 10500000, reserve: 9600000, deviation: -1500000, execution: 87.5, status: "ok",
      requests: [
        { id: "rm5-1", number: "З-2026-0174", description: "Контекстная реклама — март", amount: 4500000, date: "05.03.2026", initiator: "Сидоров Р.Н.", status: "approved" },
        { id: "rm5-2", number: "З-2026-0175", description: "Партнёрская программа — вебинары", amount: 3200000, date: "10.03.2026", initiator: "Сидоров Р.Н.", status: "approved" },
        { id: "rm5-3", number: "З-2026-0176", description: "Баннерная реклама — РБК", amount: 2800000, date: "12.03.2026", initiator: "Сидоров Р.Н.", status: "approved" },
      ],
    },
    {
      id: "m6", cfo: "Брокерское обслуживание", article: "Маркетинг и реклама", article2: "Мероприятия и спонсорство", category: "Change", budgetType: "Cash",
      plan: 10000000, fact: 13500000, reserve: 10300000, deviation: 3500000, execution: 135.0, status: "danger",
      requests: [
        { id: "rm6-1", number: "З-2026-0177", description: "Наружная реклама — Москва, СПб", amount: 6500000, date: "03.03.2026", initiator: "Сидоров Р.Н.", status: "approved" },
        { id: "rm6-2", number: "З-2026-0178", description: "Запуск YouTube-канала — продакшн", amount: 4200000, date: "08.03.2026", initiator: "Сидоров Р.Н.", status: "approved" },
        { id: "rm6-3", number: "З-2026-0179", description: "Инфлюенсер-маркетинг — пилот", amount: 2800000, date: "12.03.2026", initiator: "Сидоров Р.Н.", status: "pending" },
      ],
    },
    {
      id: "m7", cfo: "Инвестиционный банкинг", article: "ФОТ", article2: "Оклады и ставки", category: "Run", budgetType: "P/L",
      plan: 58000000, fact: 55800000, reserve: 52200000, deviation: -2200000, execution: 96.2, status: "ok",
      requests: [
        { id: "rm7-1", number: "З-2026-0180", description: "Оклады — инвестбанкиры, март", amount: 38000000, date: "10.03.2026", initiator: "Кузнецов В.А.", status: "approved" },
        { id: "rm7-2", number: "З-2026-0181", description: "Бонусы по сделке IPO", amount: 14800000, date: "15.03.2026", initiator: "Кузнецов В.А.", status: "pending" },
        { id: "rm7-3", number: "З-2026-0182", description: "Командировочные — Дубай, клиентская встреча", amount: 3000000, date: "08.03.2026", initiator: "Кузнецов В.А.", status: "approved" },
      ],
    },
    {
      id: "m8", cfo: "Казначейство", article: "ФОТ", article2: "Компенсации", category: "Run", budgetType: "P/L",
      plan: 29500000, fact: 28500000, reserve: 26500000, deviation: -1000000, execution: 96.6, status: "ok",
      requests: [
        { id: "rm8-1", number: "З-2026-0185", description: "Оклады — казначейство, март", amount: 22000000, date: "10.03.2026", initiator: "Орлова Т.Г.", status: "approved" },
        { id: "rm8-2", number: "З-2026-0186", description: "Обучение — Basel IV", amount: 3500000, date: "15.03.2026", initiator: "Орлова Т.Г.", status: "approved" },
        { id: "rm8-3", number: "З-2026-0187", description: "Квартальная оценка — выплата", amount: 3000000, date: "12.03.2026", initiator: "Орлова Т.Г.", status: "pending" },
      ],
    },
    {
      id: "m9", cfo: "Казначейство", article: "Амортизация", article2: "Амортизация НМА", category: "Run", budgetType: "P/L",
      plan: 7300000, fact: 7300000, reserve: 7300000, deviation: 0, execution: 100.0, status: "ok",
      requests: [
        { id: "rm9-1", number: "З-2026-0188", description: "Амортизация ОС — март (план)", amount: 4600000, date: "15.03.2026", initiator: "Орлова Т.Г.", status: "approved" },
        { id: "rm9-2", number: "З-2026-0189", description: "Амортизация НМА — март (план)", amount: 2700000, date: "15.03.2026", initiator: "Орлова Т.Г.", status: "approved" },
      ],
    },
    {
      id: "m10", cfo: "Управление рисками", article: "ФОТ", article2: "Оклады и ставки", category: "Run", budgetType: "P/L",
      plan: 24000000, fact: 23500000, reserve: 22200000, deviation: -500000, execution: 97.9, status: "ok",
      requests: [
        { id: "rm10-1", number: "З-2026-0190", description: "Оклады — риск-менеджеры, март", amount: 18000000, date: "10.03.2026", initiator: "Белов К.И.", status: "approved" },
        { id: "rm10-2", number: "З-2026-0191", description: "Курсы повышения квалификации", amount: 2500000, date: "15.03.2026", initiator: "Белов К.И.", status: "approved" },
        { id: "rm10-3", number: "З-2026-0192", description: "Выходное пособие — 1 сотрудник", amount: 3000000, date: "12.03.2026", initiator: "Белов К.И.", status: "approved" },
      ],
    },
    {
      id: "m11", cfo: "Управление рисками", article: "ИТ-инфраструктура", article2: "Кибербезопасность", category: "Change", budgetType: "Cash",
      plan: 6000000, fact: 8200000, reserve: 5800000, deviation: 2200000, execution: 136.7, status: "danger",
      requests: [
        { id: "rm11-1", number: "З-2026-0193", description: "Внеплановая миграция на новый кластер", amount: 5200000, date: "01.03.2026", initiator: "Белов К.И.", status: "approved" },
        { id: "rm11-2", number: "З-2026-0194", description: "Нагрузочное тестирование — внешний подряд", amount: 3000000, date: "08.03.2026", initiator: "Белов К.И.", status: "pending" },
      ],
    },
    {
      id: "m12", cfo: "ИТ-департамент", article: "ИТ-инфраструктура", article2: "Серверы и хостинг", category: "Run", budgetType: "Cash",
      plan: 38000000, fact: 36800000, reserve: 34800000, deviation: -1200000, execution: 96.8, status: "ok",
      requests: [
        { id: "rm12-1", number: "З-2026-0195", description: "Датацентр — аренда стоек, март", amount: 16000000, date: "12.03.2026", initiator: "Григорьев А.П.", status: "approved" },
        { id: "rm12-2", number: "З-2026-0196", description: "Кибербезопасность — продление", amount: 8500000, date: "15.03.2026", initiator: "Григорьев А.П.", status: "approved" },
        { id: "rm12-3", number: "З-2026-0197", description: "Обновление принтеров и МФУ", amount: 3200000, date: "05.03.2026", initiator: "Григорьев А.П.", status: "approved" },
        { id: "rm12-4", number: "З-2026-0198", description: "Телефония — SIP-транки", amount: 2800000, date: "08.03.2026", initiator: "Григорьев А.П.", status: "approved" },
        { id: "rm12-5", number: "З-2026-0199", description: "Резервное копирование — Veeam", amount: 6300000, date: "10.03.2026", initiator: "Григорьев А.П.", status: "approved" },
      ],
    },
    {
      id: "m13", cfo: "ИТ-департамент", article: "ИТ-инфраструктура", article2: "Техподдержка", category: "Change", budgetType: "Cash",
      plan: 12000000, fact: 14500000, reserve: 12200000, deviation: 2500000, execution: 120.8, status: "danger",
      requests: [
        { id: "rm13-1", number: "З-2026-0200", description: "Срочная замена СХД после аварии", amount: 8500000, date: "02.03.2026", initiator: "Григорьев А.П.", status: "approved" },
        { id: "rm13-2", number: "З-2026-0201", description: "Внедрение DR-решения — Zerto", amount: 6000000, date: "10.03.2026", initiator: "Григорьев А.П.", status: "approved" },
      ],
    },
    {
      id: "m14", cfo: "ИТ-департамент", article: "Командировочные", article2: "Суточные и представительские", category: "Run", budgetType: "Cash",
      plan: 2500000, fact: 2800000, reserve: 2300000, deviation: 300000, execution: 112.0, status: "warning",
      requests: [
        { id: "rm14-1", number: "З-2026-0202", description: "Командировка — Владивосток, филиал", amount: 1200000, date: "05.03.2026", initiator: "Волков С.М.", status: "approved" },
        { id: "rm14-2", number: "З-2026-0203", description: "Настройка VPN — Калининград", amount: 800000, date: "10.03.2026", initiator: "Волков С.М.", status: "approved" },
        { id: "rm14-3", number: "З-2026-0204", description: "Аварийный выезд — Нижний Новгород", amount: 800000, date: "12.03.2026", initiator: "Волков С.М.", status: "approved" },
      ],
    },
    {
      id: "m15", cfo: "HR и администрация", article: "Аренда и содержание", article2: "Ремонт и обслуживание", category: "Run", budgetType: "P/L",
      plan: 12500000, fact: 13800000, reserve: 12500000, deviation: 1300000, execution: 110.4, status: "warning",
      requests: [
        { id: "rm15-1", number: "З-2026-0205", description: "Аренда офиса — Москва-Сити, март", amount: 9200000, date: "15.03.2026", initiator: "Новикова Е.С.", status: "approved" },
        { id: "rm15-2", number: "З-2026-0206", description: "Коммунальные платежи — март", amount: 1800000, date: "20.03.2026", initiator: "Новикова Е.С.", status: "approved" },
        { id: "rm15-3", number: "З-2026-0207", description: "Ремонт серверной — внеплановый", amount: 2800000, date: "08.03.2026", initiator: "Новикова Е.С.", status: "approved" },
      ],
    },
    {
      id: "m16", cfo: "HR и администрация", article: "ФОТ", article2: "Оклады и ставки", category: "Run", budgetType: "P/L",
      plan: 18000000, fact: 19200000, reserve: 17400000, deviation: 1200000, execution: 106.7, status: "warning",
      requests: [
        { id: "rm16-1", number: "З-2026-0208", description: "Оклады — HR, бухгалтерия, март", amount: 12500000, date: "10.03.2026", initiator: "Новикова Е.С.", status: "approved" },
        { id: "rm16-2", number: "З-2026-0209", description: "Выплата годовых бонусов — HR", amount: 4500000, date: "15.03.2026", initiator: "Новикова Е.С.", status: "approved" },
        { id: "rm16-3", number: "З-2026-0210", description: "Корпоратив 8 Марта", amount: 2200000, date: "07.03.2026", initiator: "Новикова Е.С.", status: "approved" },
      ],
    },
    {
      id: "m17", cfo: "HR и администрация", article: "Прочие расходы", article2: "Непредвиденные расходы", category: "Change", budgetType: "Cash",
      plan: 3000000, fact: 3600000, reserve: 2700000, deviation: 600000, execution: 120.0, status: "danger",
      requests: [
        { id: "rm17-1", number: "З-2026-0211", description: "Экстренная закупка мебели — новый этаж", amount: 2200000, date: "05.03.2026", initiator: "Новикова Е.С.", status: "approved" },
        { id: "rm17-2", number: "З-2026-0212", description: "Дезинсекция офиса (внеплан)", amount: 800000, date: "10.03.2026", initiator: "Новикова Е.С.", status: "approved" },
        { id: "rm17-3", number: "З-2026-0213", description: "Вывоз строительного мусора", amount: 600000, date: "12.03.2026", initiator: "Новикова Е.С.", status: "approved" },
      ],
    },
    {
      id: "m18", cfo: "Брокерское обслуживание", article: "Обучение и развитие", article2: "Менторские программы", category: "Run", budgetType: "P/L",
      plan: 4500000, fact: 3800000, reserve: 3400000, deviation: -700000, execution: 84.4, status: "ok",
      requests: [
        { id: "rm18-1", number: "З-2026-0214", description: "Программа менторства — запуск", amount: 1500000, date: "05.03.2026", initiator: "Иванова М.П.", status: "approved" },
        { id: "rm18-2", number: "З-2026-0215", description: "Сертификация ФСФР — 8 сотр.", amount: 1800000, date: "10.03.2026", initiator: "Иванова М.П.", status: "approved" },
        { id: "rm18-3", number: "З-2026-0216", description: "Вебинар по ESG-инвестициям", amount: 500000, date: "12.03.2026", initiator: "Иванова М.П.", status: "pending" },
      ],
    },
    {
      id: "m19", cfo: "Казначейство", article: "Страхование", article2: "Профессиональная ответственность", category: "Run", budgetType: "P/L",
      plan: 5200000, fact: 5800000, reserve: 5200000, deviation: 600000, execution: 111.5, status: "warning",
      requests: [
        { id: "rm19-1", number: "З-2026-0217", description: "Страхование D&O — расширение покрытия", amount: 3800000, date: "08.03.2026", initiator: "Орлова Т.Г.", status: "approved" },
        { id: "rm19-2", number: "З-2026-0218", description: "Страхование имущества — доп. объекты", amount: 2000000, date: "12.03.2026", initiator: "Орлова Т.Г.", status: "approved" },
      ],
    },
    {
      id: "m20", cfo: "Инвестиционный банкинг", article: "Представительские", article2: "VIP-мероприятия", category: "Run", budgetType: "Cash",
      plan: 6000000, fact: 8500000, reserve: 5600000, deviation: 2500000, execution: 141.7, status: "danger",
      requests: [
        { id: "rm20-1", number: "З-2026-0219", description: "Приём делегации — Ближний Восток", amount: 3500000, date: "05.03.2026", initiator: "Кузнецов В.А.", status: "approved" },
        { id: "rm20-2", number: "З-2026-0220", description: "VIP-ложа — финансовый форум", amount: 2800000, date: "10.03.2026", initiator: "Кузнецов В.А.", status: "approved" },
        { id: "rm20-3", number: "З-2026-0221", description: "Деловой ужин — закрытие сделки", amount: 2200000, date: "12.03.2026", initiator: "Кузнецов В.А.", status: "approved" },
      ],
    },
    {
      id: "m21", cfo: "ИТ-департамент", article: "Связь и телеком", article2: "VoIP и SIP", category: "Run", budgetType: "Cash",
      plan: 4800000, fact: 4700000, reserve: 4500000, deviation: -100000, execution: 97.9, status: "ok",
      requests: [
        { id: "rm21-1", number: "З-2026-0222", description: "Корпоративная мобильная связь — март", amount: 1800000, date: "15.03.2026", initiator: "Григорьев А.П.", status: "approved" },
        { id: "rm21-2", number: "З-2026-0223", description: "VoIP и SIP-транки — март", amount: 1400000, date: "18.03.2026", initiator: "Григорьев А.П.", status: "approved" },
        { id: "rm21-3", number: "З-2026-0224", description: "Обслуживание ВОЛС", amount: 1500000, date: "10.03.2026", initiator: "Григорьев А.П.", status: "approved" },
      ],
    },
    {
      id: "m22", cfo: "Управление активами", article: "Лицензии и подписки", article2: "Аналитические платформы", category: "Run", budgetType: "Cash",
      plan: 8500000, fact: 8800000, reserve: 8200000, deviation: 300000, execution: 103.5, status: "ok",
      requests: [
        { id: "rm22-1", number: "З-2026-0225", description: "Bloomberg — месячная подписка", amount: 3800000, date: "10.03.2026", initiator: "Семёнов Д.К.", status: "approved" },
        { id: "rm22-2", number: "З-2026-0226", description: "Refinitiv Eikon — продление", amount: 2800000, date: "12.03.2026", initiator: "Семёнов Д.К.", status: "approved" },
        { id: "rm22-3", number: "З-2026-0227", description: "S&P Capital IQ Pro — апгрейд", amount: 2200000, date: "15.03.2026", initiator: "Семёнов Д.К.", status: "pending" },
      ],
    },
    {
      id: "m23", cfo: "Управление рисками", article: "Лицензии и подписки", article2: "ESG и рейтинги", category: "Change", budgetType: "Cash",
      plan: 3500000, fact: 4200000, reserve: 3300000, deviation: 700000, execution: 120.0, status: "danger",
      requests: [
        { id: "rm23-1", number: "З-2026-0228", description: "Moody's Analytics — новая лицензия", amount: 2800000, date: "08.03.2026", initiator: "Белов К.И.", status: "approved" },
        { id: "rm23-2", number: "З-2026-0229", description: "MSCI RiskMetrics — подключение", amount: 1400000, date: "12.03.2026", initiator: "Белов К.И.", status: "approved" },
      ],
    },
  ],
};

function getMonthsForPeriod(period: string): string[] {
  switch (period) {
    case "Январь 2026": return ["Январь 2026"];
    case "Февраль 2026": return ["Февраль 2026"];
    case "Март 2026": return ["Март 2026"];
    case "Q1 2026": return ["Январь 2026", "Февраль 2026", "Март 2026"];
    case "Q2 2026": return ["Январь 2026", "Февраль 2026", "Март 2026"];
    case "2026 год": return ["Январь 2026", "Февраль 2026", "Март 2026"];
    default: return ["Январь 2026", "Февраль 2026", "Март 2026"];
  }
}

export function getFilteredBudgetData(
  period: string,
  cfo: string,
  article: string,
  category: string,
  article2: string = "Все подстатьи",
  budgetType: string = "Все типы"
): BudgetRow[] {
  const months = getMonthsForPeriod(period);
  let rows: BudgetRow[] = [];

  for (const month of months) {
    const monthData = allBudgetData[month] || [];
    rows = rows.concat(monthData);
  }

  if (months.length > 1) {
    const grouped: Record<string, BudgetRow> = {};
    for (const row of rows) {
      const key = `${row.cfo}|${row.article}|${row.article2}|${row.category}|${row.budgetType}`;
      if (!grouped[key]) {
        grouped[key] = { ...row, requests: [...row.requests] };
      } else {
        grouped[key].plan += row.plan;
        grouped[key].fact += row.fact;
        grouped[key].reserve += row.reserve;
        grouped[key].deviation += row.deviation;
        grouped[key].requests = [...grouped[key].requests, ...row.requests];
      }
    }
    rows = Object.values(grouped).map((r) => {
      r.execution = r.plan > 0 ? Math.round((r.fact / r.plan) * 1000) / 10 : 0;
      r.status = r.execution <= 100 ? "ok" : r.execution <= 110 ? "warning" : "danger";
      return r;
    });
  }

  return rows.filter((row) => {
    const cfoMatch = cfo === "Все ЦФО" || row.cfo === cfo;
    const articleMatch = article === "Все статьи" || row.article === article;
    const categoryMatch = category === "Все категории" || row.category === category;
    const article2Match = article2 === "Все подстатьи" || row.article2 === article2;
    const budgetTypeMatch = budgetType === "Все типы" || row.budgetType === budgetType;
    return cfoMatch && articleMatch && categoryMatch && article2Match && budgetTypeMatch;
  });
}

export function getKPIData(
  period: string,
  cfo: string,
  article: string,
  category: string,
  article2: string = "Все подстатьи",
  budgetType: string = "Все типы"
): KPIData[] {
  const data = getFilteredBudgetData(period, cfo, article, category, article2, budgetType);
  const totalPlan = data.reduce((s, r) => s + r.plan, 0);
  const totalFact = data.reduce((s, r) => s + r.fact, 0);
  const totalReserve = data.reduce((s, r) => s + r.reserve, 0);
  const remaining = totalPlan - totalFact;
  
  // Эффективность = (Факт + Остаток) / Резерв по договорам
  const efficiency = totalReserve > 0 
    ? Math.round(((totalFact + remaining) / totalReserve) * 10000) / 100 
    : 0;

  const fmtValue = (v: number) => {
    const abs = Math.abs(v);
    if (abs >= 1_000_000_000) return `₽ ${(v / 1_000_000_000).toFixed(1)} млрд`;
    if (abs >= 1_000_000) return `₽ ${(v / 1_000_000).toFixed(1)} млн`;
    if (abs >= 1_000) return `₽ ${(v / 1_000).toFixed(0)} тыс`;
    return `₽ ${v}`;
  };

  const executionPct = totalPlan > 0 ? Math.round((totalFact / totalPlan) * 10000) / 100 : 0;
  const remainingPct = totalPlan > 0 ? Math.round((remaining / totalPlan) * 10000) / 100 : 0;

  return [
    {
      title: "План",
      value: fmtValue(totalPlan),
      change: 0,
      icon: "Target",
      subtitle: `Плановый бюджет ${period}`,
      color: "blue",
    },
    {
      title: "Факт",
      value: fmtValue(totalFact),
      change: executionPct,
      icon: "TrendingUp",
      subtitle: `${executionPct}% от плана`,
      color: "emerald",
    },
    {
      title: "Остаток",
      value: fmtValue(remaining),
      change: remaining >= 0 ? remainingPct : -remainingPct,
      icon: remaining >= 0 ? "Wallet" : "TrendingDown",
      subtitle: remaining >= 0 ? `${remainingPct}% свободно` : `Перерасход ${Math.abs(remainingPct)}%`,
      color: remaining >= 0 ? "amber" : "red",
    },
    {
      title: "Резервы по договорам",
      value: fmtValue(totalReserve),
      change: 0,
      icon: "ShieldCheck",
      subtitle: `Зарезервировано по договорам/СЗ`,
      color: "violet",
    },
    {
      title: "Эффективность",
      value: `${efficiency}%`,
      change: efficiency >= 100 ? efficiency - 100 : -(100 - efficiency),
      icon: "Gauge",
      subtitle: "(Факт + Остаток) / Резерв",
      color: efficiency >= 90 ? "emerald" : efficiency >= 70 ? "amber" : "red",
    },
  ];
}

export function getCFOSummary(
  period: string,
  article: string,
  category: string,
  article2: string = "Все подстатьи",
  budgetType: string = "Все типы"
): { name: string; plan: number; fact: number; execution: number }[] {
  const data = getFilteredBudgetData(period, "Все ЦФО", article, category, article2, budgetType);
  const grouped: Record<string, { plan: number; fact: number }> = {};

  for (const row of data) {
    if (!grouped[row.cfo]) grouped[row.cfo] = { plan: 0, fact: 0 };
    grouped[row.cfo].plan += row.plan;
    grouped[row.cfo].fact += row.fact;
  }

  return Object.entries(grouped)
    .map(([name, { plan, fact }]) => ({
      name,
      plan: Math.round(plan / 1_000_000),
      fact: Math.round(fact / 1_000_000),
      execution: plan > 0 ? Math.round((fact / plan) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.plan - a.plan);
}

export function getMonthlyTrend(
  cfo: string,
  article: string,
  category: string,
  article2: string = "Все подстатьи",
  budgetType: string = "Все типы"
): { month: string; plan: number; fact: number }[] {
  const monthNames = ["Янв", "Фев", "Мар"];
  const fullMonths = ["Январь 2026", "Февраль 2026", "Март 2026"];

  const prevMonths = [
    { month: "Окт", plan: 270, fact: 255 },
    { month: "Ноя", plan: 285, fact: 278 },
    { month: "Дек", plan: 310, fact: 325 },
  ];

  const current = fullMonths.map((fm, i) => {
    const data = getFilteredBudgetData(fm, cfo, article, category, article2, budgetType);
    return {
      month: monthNames[i],
      plan: Math.round(data.reduce((s, r) => s + r.plan, 0) / 1_000_000),
      fact: Math.round(data.reduce((s, r) => s + r.fact, 0) / 1_000_000),
    };
  });

  if (cfo !== "Все ЦФО" || article !== "Все статьи" || category !== "Все категории" || article2 !== "Все подстатьи" || budgetType !== "Все типы") {
    const scale = current.length > 0 && current[0].plan > 0 ? current[0].plan / 275 : 1;
    return [
      ...prevMonths.map((m) => ({
        month: m.month,
        plan: Math.round(m.plan * scale),
        fact: Math.round(m.fact * scale),
      })),
      ...current,
    ];
  }

  return [...prevMonths, ...current];
}

export function getExpenseStructure(
  period: string,
  cfo: string,
  category: string,
  article2: string = "Все подстатьи",
  budgetType: string = "Все типы"
): { name: string; value: number; fill: string }[] {
  const data = getFilteredBudgetData(period, cfo, "Все статьи", category, article2, budgetType);
  const grouped: Record<string, number> = {};
  for (const row of data) {
    grouped[row.article] = (grouped[row.article] || 0) + row.fact;
  }

  const colors = [
    "#2563eb", "#3b82f6", "#60a5fa", "#93bbfd", "#bfdbfe", "#dbeafe",
    "#1d4ed8", "#6366f1", "#818cf8",
  ];

  return Object.entries(grouped)
    .map(([name, value], i) => ({
      name,
      value: Math.round(value / 1_000_000 * 10) / 10,
      fill: colors[i % colors.length],
    }))
    .sort((a, b) => b.value - a.value);
}

export function getAIInsights(
  period: string,
  cfo: string,
  article: string,
  category: string,
  article2: string = "Все подстатьи",
  budgetType: string = "Все типы"
): AIInsight[] {
  const data = getFilteredBudgetData(period, cfo, article, category, article2, budgetType);
  const insights: AIInsight[] = [];

  const dangerRows = data.filter((r) => r.status === "danger").sort((a, b) => b.deviation - a.deviation);
  const warningRows = data.filter((r) => r.status === "warning").sort((a, b) => b.deviation - a.deviation);
  const okRows = data.filter((r) => r.status === "ok" && r.deviation < 0).sort((a, b) => a.deviation - b.deviation);

  for (const row of dangerRows.slice(0, 2)) {
    const devMln = (row.deviation / 1_000_000).toFixed(1);
    const catLabel = row.category === "Change" ? " (Change)" : "";
    insights.push({
      type: "danger",
      title: `Перерасход: ${row.article}${catLabel} в ${row.cfo}`,
      description: `Расходы превысили план на ₽${devMln} млн (${row.execution}%). ${row.requests.filter((r) => r.status === "pending").length > 0 ? "Есть заявки на согласовании." : "Все заявки согласованы."}`,
      metric: `+₽${devMln} млн`,
      action: `Рекомендация: пересмотреть бюджет по статье «${row.article}» в следующем периоде, перенести часть расходов из резервного фонда.`,
    });
  }

  for (const row of warningRows.slice(0, 1)) {
    const devMln = (row.deviation / 1_000_000).toFixed(1);
    const catLabel = row.category === "Change" ? " (Change)" : "";
    insights.push({
      type: "warning",
      title: `Рост расходов: ${row.article}${catLabel} — ${row.cfo}`,
      description: `Превышение плана на ${(row.execution - 100).toFixed(1)}% (+₽${devMln} млн). Требует внимания при планировании следующего периода.`,
      metric: `+${(row.execution - 100).toFixed(1)}%`,
      action: `Рекомендация: включить дополнительные затраты в план следующего периода, согласовать корректировку бюджета.`,
    });
  }

  if (okRows.length > 0) {
    const best = okRows[0];
    const savingMln = (Math.abs(best.deviation) / 1_000_000).toFixed(1);
    insights.push({
      type: "success",
      title: `Экономия: ${best.article} в ${best.cfo}`,
      description: `Исполнение ${best.execution}% — экономия ₽${savingMln} млн без ущерба для операционных показателей.`,
      metric: `-₽${savingMln} млн`,
      action: `Рекомендация: транслировать практики бюджетной дисциплины на другие ЦФО, премировать ответственных.`,
    });
  }

  const changeRows = data.filter((r) => r.category === "Change");
  if (changeRows.length > 0) {
    const changeFact = changeRows.reduce((s, r) => s + r.fact, 0);
    const changePlan = changeRows.reduce((s, r) => s + r.plan, 0);
    const changePct = changePlan > 0 ? Math.round((changeFact / changePlan) * 1000) / 10 : 0;
    insights.push({
      type: changePct > 110 ? "warning" : "info",
      title: `Change-бюджет: исполнение ${changePct}%`,
      description: `Проектные расходы (Change): план ₽${(changePlan / 1_000_000).toFixed(1)} млн, факт ₽${(changeFact / 1_000_000).toFixed(1)} млн. ${changePct > 100 ? "Наблюдается перерасход на проектные инициативы." : "Расходы в рамках плана."}`,
      metric: `${changePct}%`,
      action: changePct > 110
        ? "Рекомендация: провести ревью проектного портфеля, приоритизировать инициативы."
        : "Рекомендация: продолжить мониторинг, при необходимости перераспределить бюджет между проектами.",
    });
  }

  if (insights.length === 0) {
    insights.push({
      type: "success",
      title: "Бюджет в норме",
      description: "По выбранным фильтрам все расходы находятся в пределах плана. Отклонений не обнаружено.",
      metric: "✓",
      action: "Рекомендация: продолжить текущую стратегию бюджетного контроля.",
    });
  }

  return insights;
}

export function getCategoryBreakdown(
  period: string,
  cfo: string,
  article: string,
  article2: string = "Все подстатьи",
  budgetType: string = "Все типы"
): { category: BudgetCategory; plan: number; fact: number; execution: number }[] {
  const data = getFilteredBudgetData(period, cfo, article, "Все категории", article2, budgetType);
  const result: Record<BudgetCategory, { plan: number; fact: number }> = {
    Run: { plan: 0, fact: 0 },
    Change: { plan: 0, fact: 0 },
  };

  for (const row of data) {
    result[row.category].plan += row.plan;
    result[row.category].fact += row.fact;
  }

  return (["Run", "Change"] as BudgetCategory[])
    .filter((cat) => result[cat].plan > 0 || result[cat].fact > 0)
    .map((cat) => ({
      category: cat,
      plan: result[cat].plan,
      fact: result[cat].fact,
      execution: result[cat].plan > 0 ? Math.round((result[cat].fact / result[cat].plan) * 1000) / 10 : 0,
    }));
}

export const kpiData = getKPIData("Q1 2026", "Все ЦФО", "Все статьи", "Все категории");
export const budgetData = getFilteredBudgetData("Q1 2026", "Все ЦФО", "Все статьи", "Все категории");
export const cfoSummary = getCFOSummary("Q1 2026", "Все статьи", "Все категории");
export const monthlyTrend = getMonthlyTrend("Все ЦФО", "Все статьи", "Все категории");
export const expenseStructure = getExpenseStructure("Q1 2026", "Все ЦФО", "Все категории");
export const aiInsights = getAIInsights("Q1 2026", "Все ЦФО", "Все статьи", "Все категории");

export default {
  kpiData,
  budgetData,
  cfoList,
  articleList,
  categoryList,
  periodOptions,
  cfoSummary,
  monthlyTrend,
  expenseStructure,
  aiInsights,
};