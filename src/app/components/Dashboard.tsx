import { useState } from "react";
import { CheckCircle2, Circle, Star, TrendingUp, Sparkles } from "lucide-react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
}

interface Schedule {
  id: string;
  time: string;
  title: string;
  type: "child" | "personal";
}

export function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", text: "아이 학교 준비물 챙기기", completed: false, priority: "high" },
    { id: "2", text: "프로젝트 보고서 작성", completed: false, priority: "high" },
    { id: "3", text: "장보기", completed: true, priority: "medium" },
    { id: "4", text: "운동하기", completed: false, priority: "low" },
  ]);

  const schedules: Schedule[] = [
    { id: "1", time: "09:00", title: "회의 - 팀 미팅", type: "personal" },
    { id: "2", time: "12:00", title: "점심약속", type: "personal" },
    { id: "3", time: "15:00", title: "아이 학원 픽업", type: "child" },
    { id: "4", time: "17:30", title: "저녁 준비", type: "personal" },
    { id: "5", time: "19:00", title: "아이 숙제 확인", type: "child" },
  ];

  const topPriorities = todos.filter((t) => !t.completed && t.priority === "high");

  const toggleTodo = (id: string) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <p className="text-sm text-gray-500">{formattedDate}</p>
        <h1 className="mt-1 flex items-center gap-2">
          <span>오늘도 잘하고 있어요</span>
          <Sparkles className="w-5 h-5 text-[#FFB3D9]" />
        </h1>
      </div>

      {/* Top 3 Priorities */}
      <div className="bg-gradient-to-br from-[#FFB3D9] to-[#FFE4B3] rounded-3xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-white fill-white" />
          <h2 className="text-white">오늘의 핵심 3가지</h2>
        </div>
        <div className="space-y-3">
          {topPriorities.slice(0, 3).map((todo) => (
            <div
              key={todo.id}
              className="bg-white/90 rounded-2xl p-3 flex items-center gap-3"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className="flex-shrink-0"
              >
                {todo.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-[#FFB3D9]" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-300" />
                )}
              </button>
              <span className={todo.completed ? "line-through text-gray-400" : ""}>
                {todo.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Timeline */}
      <div className="bg-white rounded-3xl p-6 shadow-md">
        <h3 className="mb-4">오늘 일정</h3>
        <div className="space-y-3">
          {schedules.map((schedule) => (
            <div key={schedule.id} className="flex items-start gap-3">
              <div className="text-sm text-gray-500 w-14 flex-shrink-0 pt-1">
                {schedule.time}
              </div>
              <div
                className={`flex-1 rounded-2xl p-3 ${
                  schedule.type === "child"
                    ? "bg-[#B3D9FF]"
                    : "bg-[#FFB3D9] bg-opacity-20"
                }`}
              >
                <p className="text-sm">{schedule.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Summary */}
      <div className="bg-white rounded-3xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3>이번 달 지출</h3>
          <TrendingUp className="w-5 h-5 text-[#FFB3D9]" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#FAFAFA] rounded-2xl p-4">
            <p className="text-xs text-gray-500 mb-1">총 지출</p>
            <p className="text-xl">2,450,000원</p>
          </div>
          <div className="bg-[#FAFAFA] rounded-2xl p-4">
            <p className="text-xs text-gray-500 mb-1">오늘 지출</p>
            <p className="text-xl">45,000원</p>
          </div>
        </div>
        <div className="mt-4 bg-gradient-to-r from-[#B3D9FF] to-[#FFB3D9] rounded-2xl p-4">
          <p className="text-xs text-white/80 mb-1">가장 큰 지출</p>
          <p className="text-white">생활비 · 850,000원</p>
        </div>
      </div>

      {/* Todo List */}
      <div className="bg-white rounded-3xl p-6 shadow-md">
        <h3 className="mb-4">할 일 리스트</h3>
        <div className="space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className="flex-shrink-0"
              >
                {todo.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-[#FFB3D9]" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-300" />
                )}
              </button>
              <span
                className={`flex-1 ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.text}
              </span>
              <Star
                className={`w-4 h-4 ${getPriorityColor(todo.priority)} ${
                  todo.priority === "high" ? "fill-current" : ""
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Family Needs */}
      <div className="bg-white rounded-3xl p-6 shadow-md">
        <h3 className="mb-4">가족 요구사항</h3>
        <div className="space-y-3">
          <div className="bg-[#B3D9FF] bg-opacity-30 rounded-2xl p-4">
            <p className="mb-2">첫째 (지우)</p>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2">
                <Circle className="w-3 h-3 text-[#B3D9FF]" />
                <span>새 운동화 사주기</span>
              </li>
              <li className="flex items-center gap-2">
                <Circle className="w-3 h-3 text-[#B3D9FF]" />
                <span>주말에 영화 보러 가기</span>
              </li>
            </ul>
          </div>
          <div className="bg-[#B3FFCC] bg-opacity-30 rounded-2xl p-4">
            <p className="mb-2">둘째 (민서)</p>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2">
                <Circle className="w-3 h-3 text-[#B3FFCC]" />
                <span>미술 재료 준비</span>
              </li>
              <li className="flex items-center gap-2">
                <Circle className="w-3 h-3 text-[#B3FFCC]" />
                <span>친구 생일 선물</span>
              </li>
            </ul>
          </div>
          <div className="bg-[#FFB3D9] bg-opacity-20 rounded-2xl p-4">
            <p className="mb-2">나</p>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2">
                <Circle className="w-3 h-3 text-[#FFB3D9]" />
                <span>요가 수업 등록</span>
              </li>
              <li className="flex items-center gap-2">
                <Circle className="w-3 h-3 text-[#FFB3D9]" />
                <span>책 읽기</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
