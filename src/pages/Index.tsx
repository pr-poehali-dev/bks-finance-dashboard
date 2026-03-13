import { useState, useMemo } from "react";
import Header from "@/components/dashboard/Header";
import KPICard from "@/components/dashboard/KPICard";
import Filters from "@/components/dashboard/Filters";
import BudgetTable from "@/components/dashboard/BudgetTable";
import CFOChart from "@/components/dashboard/CFOChart";
import AIInsights from "@/components/dashboard/AIInsights";
import BudgetTrendChart from "@/components/dashboard/BudgetTrendChart";
import ExpenseDonutChart from "@/components/dashboard/ExpenseDonutChart";
import CategoryBreakdown from "@/components/dashboard/CategoryBreakdown";
import {
  getFilteredBudgetData,
  getKPIData,
  getCFOSummary,
  getMonthlyTrend,
  getExpenseStructure,
  getAIInsights,
  getCategoryBreakdown,
} from "@/data/mockData";

const Index = () => {
  const [selectedCfo, setSelectedCfo] = useState("Все ЦФО");
  const [selectedArticle, setSelectedArticle] = useState("Все статьи");
  const [selectedPeriod, setSelectedPeriod] = useState("Q1 2026");
  const [selectedCategory, setSelectedCategory] = useState("Все категории");

  const filteredData = useMemo(
    () => getFilteredBudgetData(selectedPeriod, selectedCfo, selectedArticle, selectedCategory),
    [selectedPeriod, selectedCfo, selectedArticle, selectedCategory]
  );

  const kpiData = useMemo(
    () => getKPIData(selectedPeriod, selectedCfo, selectedArticle, selectedCategory),
    [selectedPeriod, selectedCfo, selectedArticle, selectedCategory]
  );

  const cfoData = useMemo(
    () => getCFOSummary(selectedPeriod, selectedArticle, selectedCategory),
    [selectedPeriod, selectedArticle, selectedCategory]
  );

  const trendData = useMemo(
    () => getMonthlyTrend(selectedCfo, selectedArticle, selectedCategory),
    [selectedCfo, selectedArticle, selectedCategory]
  );

  const expenseData = useMemo(
    () => getExpenseStructure(selectedPeriod, selectedCfo, selectedCategory),
    [selectedPeriod, selectedCfo, selectedCategory]
  );

  const insightsData = useMemo(
    () => getAIInsights(selectedPeriod, selectedCfo, selectedArticle, selectedCategory),
    [selectedPeriod, selectedCfo, selectedArticle, selectedCategory]
  );

  const categoryData = useMemo(
    () => getCategoryBreakdown(selectedPeriod, selectedCfo, selectedArticle),
    [selectedPeriod, selectedCfo, selectedArticle]
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
            selectedPeriod={selectedPeriod}
            selectedCategory={selectedCategory}
            onCfoChange={setSelectedCfo}
            onArticleChange={setSelectedArticle}
            onPeriodChange={setSelectedPeriod}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {kpiData.map((kpi, idx) => (
            <KPICard key={kpi.title} data={kpi} index={idx} />
          ))}
        </div>

        <AIInsights data={insightsData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 mt-6">
          <div className="lg:col-span-2">
            <BudgetTrendChart data={trendData} />
          </div>
          <CategoryBreakdown data={categoryData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ExpenseDonutChart data={expenseData} />
          <CFOChart data={cfoData} />
        </div>

        <BudgetTable data={filteredData} />
      </main>
    </div>
  );
};

export default Index;
