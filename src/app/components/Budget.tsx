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
    { id: "1", date: "2026-04-09", category: "생활비", place: "이마트", amount: 150000, paymentMethod: "카드", memo: "식재료 구입" },
    { id: "2", date: "2026-04-08", category: "아이", place: "학원", amount: 250000, paymentMethod: "계좌이체", memo: "영어학원 월납" },
    { id: "3", date: "2026-04-07", category: "비즈니스", place: "스타벅스", amount: 15000, paymentMethod: "카드", memo: "미팅" },
    { id: "4", date: "2026-04-06", category: "생활비", place: "GS25", amount: 8500, paymentMethod: "카드", memo: "간식" },
    { id: "5", date: "2026-04-05", category: "아이", place: "교보문고", amount: 45000, paymentMethod: "카드", memo: "참고서와 동화책" },
  ];

  const categoryData = [
    { name: "생활비", value: 850000, color: "#FFB3D9" },
    { name: "아이", value: 680000, color: "#B3D9FF" },
    { name: "비즈니스", value: 420000, color: "#FFE4B3" },
    { name: "건강", value: 280000, color: "#B3FFCC" },
    { name: "기타", value: 220000, color: "#E0B3FF" },
  ];

  const totalIncome = 4500000;
  const totalExpense = 2450000;
  const balance = totalIncome - totalExpense;

  const formatCurrency = (amount: number) => `${amount.toLocaleString("ko-KR")}원`;

  const filteredExpenses = expenses.filter((expense) => {
    if (filter === "all") return true;
    if (filter === "child") return expense.category === "아이";
    if (filter === "business") return expense.category === "비즈니스";
    if (filter === "living") return expense.category === "생활비";
    return true;
  });

  return (
    <div className="p-4 space-y-6">
      <div className="pt-4">
        <h1>가계부</h1>
        <p className="mt-1 text-sm text-gray-500">4월 가계부 관리</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-white p-4 shadow-md">
          <div className="mb-2 flex items-center gap-1"><TrendingUp className="h-4 w-4 text-green-500" /><p className="text-xs text-gray-500">총수입</p></div>
          <p className="text-sm">{formatCurrency(totalIncome)}</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-md">
          <div className="mb-2 flex items-center gap-1"><TrendingDown className="h-4 w-4 text-red-500" /><p className="text-xs text-gray-500">총지출</p></div>
          <p className="text-sm">{formatCurrency(totalExpense)}</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-[#FFB3D9] to-[#B3D9FF] p-4 text-white shadow-md">
          <p className="mb-2 text-xs opacity-90">잔액</p>
          <p className="text-sm">{formatCurrency(balance)}</p>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-md">
        <h3 className="mb-4">카테고리별 지출</h3>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {categoryData.map((category) => (
            <div key={category.name} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
              <span className="text-xs text-gray-600">{category.name}</span>
              <span className="ml-auto text-xs">{formatCurrency(category.value)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Filter className="h-4 w-4 flex-shrink-0 text-gray-400" />
        <button onClick={() => setFilter("all")} className={`rounded-full px-4 py-2 text-sm transition-colors ${filter === "all" ? "bg-[#FFB3D9] text-white" : "border border-gray-200 bg-white text-gray-600"}`}>전체</button>
        <button onClick={() => setFilter("child")} className={`rounded-full px-4 py-2 text-sm transition-colors ${filter === "child" ? "bg-[#B3D9FF] text-white" : "border border-gray-200 bg-white text-gray-600"}`}>아이</button>
        <button onClick={() => setFilter("business")} className={`rounded-full px-4 py-2 text-sm transition-colors ${filter === "business" ? "bg-[#FFE4B3] text-gray-800" : "border border-gray-200 bg-white text-gray-600"}`}>비즈니스</button>
        <button onClick={() => setFilter("living")} className={`rounded-full px-4 py-2 text-sm transition-colors ${filter === "living" ? "bg-[#FFB3D9] text-white" : "border border-gray-200 bg-white text-gray-600"}`}>생활비</button>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <h3>지출 내역</h3>
          <div className="flex gap-2">
            <button onClick={() => setPeriod("current")} className={`rounded-full px-3 py-1 text-xs transition-colors ${period === "current" ? "bg-[#FFB3D9] text-white" : "bg-gray-100 text-gray-600"}`}>이번 달</button>
            <button onClick={() => setPeriod("last")} className={`rounded-full px-3 py-1 text-xs transition-colors ${period === "last" ? "bg-[#FFB3D9] text-white" : "bg-gray-100 text-gray-600"}`}>지난달</button>
          </div>
        </div>
        <div className="space-y-3">
          {filteredExpenses.map((expense) => (
            <div key={expense.id} className="border-l-4 py-2 pl-4" style={{ borderColor: expense.category === "아이" ? "#B3D9FF" : expense.category === "비즈니스" ? "#FFE4B3" : "#FFB3D9" }}>
              <div className="mb-1 flex items-start justify-between">
                <div>
                  <p className="text-sm">{expense.place}</p>
                  <p className="text-xs text-gray-500">{expense.category}</p>
                </div>
                <p className="text-sm">{formatCurrency(expense.amount)}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>{expense.date}</span><span>·</span><span>{expense.paymentMethod}</span>
                {expense.memo && <><span>·</span><span>{expense.memo}</span></>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="fixed bottom-24 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#FFB3D9] to-[#B3D9FF] text-white shadow-lg transition-transform hover:scale-110">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}
