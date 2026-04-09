import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Filter, TrendingDown, TrendingUp, Plus } from "lucide-react";

interface Expense {
  id: string;
  date: string;
  category: string;
  place: string;
  amount: number;
  paymentMethod: string;
  memo: string;
}

export function Budget() {
  const [filter, setFilter] = useState<"all" | "child" | "business" | "living">("all");
  const [period, setPeriod] = useState<"current" | "last">("current");

  const expenses: Expense[] = [
    {
      id: "1",
      date: "2026-04-09",
      category: "생활비",
      place: "이마트",
      amount: 150000,
      paymentMethod: "카드",
      memo: "식재료",
    },
    {
      id: "2",
      date: "2026-04-08",
      category: "자녀",
      place: "학원",
      amount: 250000,
      paymentMethod: "계좌이체",
      memo: "영어학원 월납",
    },
    {
      id: "3",
      date: "2026-04-07",
      category: "비즈니스",
      place: "스타벅스",
      amount: 15000,
      paymentMethod: "카드",
      memo: "회의",
    },
    {
      id: "4",
      date: "2026-04-06",
      category: "생활비",
      place: "GS25",
      amount: 8500,
      paymentMethod: "카드",
      memo: "간식",
    },
    {
      id: "5",
      date: "2026-04-05",
      category: "자녀",
      place: "교보문고",
      place: "교보문고",
      amount: 45000,
      paymentMethod: "카드",
      memo: "참고서, 동화책",
    },
  ];

  const categoryData = [
    { name: "생활비", value: 850000, color: "#FFB3D9" },
    { name: "자녀", value: 680000, color: "#B3D9FF" },
    { name: "비즈니스", value: 420000, color: "#FFE4B3" },
    { name: "여가", value: 280000, color: "#B3FFCC" },
    { name: "기타", value: 220000, color: "#E0B3FF" },
  ];

  const totalIncome = 4500000;
  const totalExpense = 2450000;
  const balance = totalIncome - totalExpense;

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("ko-KR") + "원";
  };

  const filteredExpenses = expenses.filter((expense) => {
    if (filter === "all") return true;
    if (filter === "child") return expense.category === "자녀";
    if (filter === "business") return expense.category === "비즈니스";
    if (filter === "living") return expense.category === "생활비";
    return true;
  });

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1>가계부</h1>
        <p className="text-sm text-gray-500 mt-1">4월 가계 관리</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-1 mb-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <p className="text-xs text-gray-500">총 수입</p>
          </div>
          <p className="text-sm">{formatCurrency(totalIncome)}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-1 mb-2">
            <TrendingDown className="w-4 h-4 text-red-500" />
            <p className="text-xs text-gray-500">총 지출</p>
          </div>
          <p className="text-sm">{formatCurrency(totalExpense)}</p>
        </div>
        <div className="bg-gradient-to-br from-[#FFB3D9] to-[#B3D9FF] rounded-2xl p-4 shadow-md text-white">
          <p className="text-xs opacity-90 mb-2">잔액</p>
          <p className="text-sm">{formatCurrency(balance)}</p>
        </div>
      </div>

      {/* Category Chart */}
      <div className="bg-white rounded-3xl p-6 shadow-md">
        <h3 className="mb-4">카테고리별 지출</h3>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {categoryData.map((category) => (
            <div key={category.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-xs text-gray-600">{category.name}</span>
              <span className="text-xs ml-auto">{formatCurrency(category.value)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
            filter === "all"
              ? "bg-[#FFB3D9] text-white"
              : "bg-white text-gray-600 border border-gray-200"
          }`}
        >
          전체
        </button>
        <button
          onClick={() => setFilter("child")}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
            filter === "child"
              ? "bg-[#B3D9FF] text-white"
              : "bg-white text-gray-600 border border-gray-200"
          }`}
        >
          자녀
        </button>
        <button
          onClick={() => setFilter("business")}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
            filter === "business"
              ? "bg-[#FFE4B3] text-gray-800"
              : "bg-white text-gray-600 border border-gray-200"
          }`}
        >
          비즈니스
        </button>
        <button
          onClick={() => setFilter("living")}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
            filter === "living"
              ? "bg-[#FFB3D9] text-white"
              : "bg-white text-gray-600 border border-gray-200"
          }`}
        >
          생활
        </button>
      </div>

      {/* Expense Table */}
      <div className="bg-white rounded-3xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3>지출 내역</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setPeriod("current")}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                period === "current"
                  ? "bg-[#FFB3D9] text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              이번 달
            </button>
            <button
              onClick={() => setPeriod("last")}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                period === "last"
                  ? "bg-[#FFB3D9] text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              지난 달
            </button>
          </div>
        </div>
        <div className="space-y-3">
          {filteredExpenses.map((expense) => (
            <div
              key={expense.id}
              className="border-l-4 pl-4 py-2"
              style={{
                borderColor:
                  expense.category === "자녀"
                    ? "#B3D9FF"
                    : expense.category === "비즈니스"
                    ? "#FFE4B3"
                    : "#FFB3D9",
              }}
            >
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-sm">{expense.place}</p>
                  <p className="text-xs text-gray-500">{expense.category}</p>
                </div>
                <p className="text-sm">{formatCurrency(expense.amount)}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>{expense.date}</span>
                <span>·</span>
                <span>{expense.paymentMethod}</span>
                {expense.memo && (
                  <>
                    <span>·</span>
                    <span>{expense.memo}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Add Button */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-[#FFB3D9] to-[#B3D9FF] rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
