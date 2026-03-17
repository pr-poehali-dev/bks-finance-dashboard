import { useState, useMemo } from "react";
import Header from "@/components/dashboard/Header";
import KPICard from "@/components/dashboard/KPICard";
import Filters from "@/components/dashboard/Filters";
import BudgetTable from "@/components/dashboard/BudgetTable";
import CFOChart from "@/components/dashboard/CFOChart";
import AIInsights from "@/components/dashboard/AIInsights";
import BudgetTrendChart from "@/components/dashboard/BudgetTrendChart";
import ArticleBreakdownChart from "@/components/dashboard/ArticleBreakdownChart";
import ExpenseDonutChart from "@/components/dashboard/ExpenseDonutChart";
import CategoryBreakdown from "@/components/dashboard/CategoryBreakdown";
import {
  getFilteredBudgetData,
  getKPIData,
  getCFOSummary,
  getMonthlyTrend,
  getTrendByPeriod,
  getArticleBreakdown,
  getExpenseStructure,
  getAIInsights,
  getCategoryBreakdown,
} from "@/data/mockData";

const Index = () => {
  const [selectedCfo, setSelectedCfo] = useState("Все ЦФО");
  const [selectedArticle, setSelectedArticle] = useState("Все статьи");
  const [selectedArticle2, setSelectedArticle2] = useState("Все подстатьи");
  const [selectedPeriod, setSelectedPeriod] = useState("Q1 2026");
  const [selectedCategory, setSelectedCategory] = useState("Все категории");
  const [selectedBudgetType, setSelectedBudgetType] = useState("Все типы");

  const handleArticleChange = (value: string) => {
    setSelectedArticle(value);
    setSelectedArticle2("Все подстатьи");
  };

  const filteredData = useMemo(
    () => getFilteredBudgetData(selectedPeriod, selectedCfo, selectedArticle, selectedCategory, selectedArticle2, selectedBudgetType),
    [selectedPeriod, selectedCfo, selectedArticle, selectedCategory, selectedArticle2, selectedBudgetType]
  );

  const kpiData = useMemo(
    () => getKPIData(selectedPeriod, selectedCfo, selectedArticle, selectedCategory, selectedArticle2, selectedBudgetType),
    [selectedPeriod, selectedCfo, selectedArticle, selectedCategory, selectedArticle2, selectedBudgetType]
  );

  const cfoData = useMemo(
    () => getCFOSummary(selectedPeriod, selectedArticle, selectedCategory, selectedArticle2, selectedBudgetType),
    [selectedPeriod, selectedArticle, selectedCategory, selectedArticle2, selectedBudgetType]
  );

  const trendData = useMemo(
    () => getMonthlyTrend(selectedCfo, selectedArticle, selectedCategory, selectedArticle2, selectedBudgetType),
    [selectedCfo, selectedArticle, selectedCategory, selectedArticle2, selectedBudgetType]
  );

  const trendFot = useMemo(
    () => getTrendByPeriod(selectedPeriod, selectedCfo, "ФОТ", selectedCategory, "Все подстатьи", selectedBudgetType),
    [selectedPeriod, selectedCfo, selectedCategory, selectedBudgetType]
  );

  const trendBonuses = useMemo(
    () => getTrendByPeriod(selectedPeriod, selectedCfo, "ФОТ", selectedCategory, "Премии и бонусы", selectedBudgetType),
    [selectedPeriod, selectedCfo, selectedCategory, selectedBudgetType]
  );

  const articleBreakdownData = useMemo(
    () => getArticleBreakdown(selectedPeriod, selectedCfo, selectedArticle, selectedCategory, selectedBudgetType),
    [selectedPeriod, selectedCfo, selectedArticle, selectedCategory, selectedBudgetType]
  );

  const expenseData = useMemo(
    () => getExpenseStructure(selectedPeriod, selectedCfo, selectedCategory, selectedArticle2, selectedBudgetType),
    [selectedPeriod, selectedCfo, selectedCategory, selectedArticle2, selectedBudgetType]
  );

  const insightsData = useMemo(
    () => getAIInsights(selectedPeriod, selectedCfo, selectedArticle, selectedCategory, selectedArticle2, selectedBudgetType),
    [selectedPeriod, selectedCfo, selectedArticle, selectedCategory, selectedArticle2, selectedBudgetType]
  );

  const categoryData = useMemo(
    () => getCategoryBreakdown(selectedPeriod, selectedCfo, selectedArticle, selectedArticle2, selectedBudgetType),
    [selectedPeriod, selectedCfo, selectedArticle, selectedArticle2, selectedBudgetType]
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-[1440px] mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div className="animate-fade-in">
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              Дашборд бюджетного контроля
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Период: {selectedPeriod} · Обновлено: 13 марта 2026, 09:30
            </p>
          </div>

          <Filters
            selectedCfo={selectedCfo}
            selectedArticle={selectedArticle}
            selectedArticle2={selectedArticle2}
            selectedPeriod={selectedPeriod}
            selectedCategory={selectedCategory}
            selectedBudgetType={selectedBudgetType}
            onCfoChange={setSelectedCfo}
            onArticleChange={handleArticleChange}
            onArticle2Change={setSelectedArticle2}
            onPeriodChange={setSelectedPeriod}
            onCategoryChange={setSelectedCategory}
            onBudgetTypeChange={setSelectedBudgetType}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {kpiData.map((kpi, idx) => (
            <KPICard key={kpi.title} data={kpi} index={idx} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 mt-6">
          <div className="lg:col-span-2">
            <BudgetTrendChart data={trendData} />
          </div>
          <CategoryBreakdown data={categoryData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <BudgetTrendChart
            data={trendFot}
            title="Персонал (ФОТ)"
            subtitle="План-факт по периодам, млн ₽"
          />
          <BudgetTrendChart
            data={trendBonuses}
            title="Бонусы"
            subtitle="План-факт по периодам, млн ₽"
          />
        </div>

        <div className="mb-6">
          <ArticleBreakdownChart data={articleBreakdownData} period={selectedPeriod} />
        </div>

        <AIInsights data={insightsData} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 mt-6">
          <ExpenseDonutChart data={expenseData} />
          <CFOChart data={cfoData} />
        </div>

        <BudgetTable data={filteredData} />
      </main>
    </div>
  );
};

export default Index;