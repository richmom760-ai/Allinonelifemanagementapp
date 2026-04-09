import { useState } from "react";
import { CheckCircle2, Circle, Sparkles, Star, TrendingUp } from "lucide-react";

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
    { id: "1", text: "아이 등교 준비물 챙기기", completed: false, priority: "high" },
    { id: "2", text: "프로젝트 보고서 작성", completed: false, priority: "high" },
    { id: "3", text: "장보기", completed: true, priority: "medium" },
    { id: "4", text: "운동 가기", completed: false, priority: "low" },
  ]);

  const schedules: Schedule[] = [
    { id: "1", time: "09:00", title: "회의 - 팀 미팅", type: "personal" },
    { id: "2", time: "12:00", title: "점심 약속", type: "personal" },
    { id: "3", time: "15:00", title: "아이 학원 픽업", type: "child" },
    { id: "4", time: "17:30", title: "저녁 준비", type: "personal" },
    { id: "5", time: "19:00", title: "아이 숙제 확인", type: "child" },
  ];

  const topPriorities = todos.filter((todo) => !todo.completed && todo.priority === "high");

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-400";
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
    <div className="px-4 pb-6 pt-4 lg:px-0 lg:pb-10">
      <div className="pt-4 lg:pt-0">
        <p className="text-sm text-gray-500 lg:text-base">{formattedDate}</p>
        <h1 className="mt-2 flex items-center gap-2 text-[clamp(1.9rem,3vw,3.1rem)] leading-tight">
          <span>오늘도 한 걸음씩 나아가고 있어요</span>
          <Sparkles className="h-5 w-5 text-[#FFB3D9] lg:h-6 lg:w-6" />
        </h1>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.9fr)] xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.95fr)]">
        <section className="space-y-6">
          <div className="rounded-3xl bg-gradient-to-br from-[#FFB3D9] to-[#FFE4B3] p-6 shadow-lg lg:p-8">
            <div className="mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 fill-white text-white" />
              <h2 className="text-white">오늘의 우선순위 3가지</h2>
            </div>
            <div className="grid gap-3 lg:grid-cols-3">
              {topPriorities.slice(0, 3).map((todo) => (
                <div key={todo.id} className="flex items-center gap-3 rounded-2xl bg-white/90 p-4">
                  <button onClick={() => toggleTodo(todo.id)} className="flex-shrink-0">
                    {todo.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-[#FFB3D9]" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-300" />
                    )}
                  </button>
                  <span className={todo.completed ? "line-through text-gray-400" : ""}>
                    {todo.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md lg:p-8">
            <h3 className="mb-5">오늘 일정</h3>
            <div className="space-y-3">
              {schedules.map((schedule) => (
                <div key={schedule.id} className="flex items-start gap-3 lg:gap-4">
                  <div className="w-14 flex-shrink-0 pt-1 text-sm text-gray-500">{schedule.time}</div>
                  <div
                    className={`flex-1 rounded-2xl p-3 lg:p-4 ${
                      schedule.type === "child" ? "bg-[#B3D9FF]" : "bg-[#FFB3D9]/20"
                    }`}
                  >
                    <p className="text-sm lg:text-base">{schedule.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md lg:p-8">
            <h3 className="mb-4">할 일 리스트</h3>
            <div className="grid gap-2 xl:grid-cols-2">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-gray-50"
                >
                  <button onClick={() => toggleTodo(todo.id)} className="flex-shrink-0">
                    {todo.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-[#FFB3D9]" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-300" />
                    )}
                  </button>
                  <span className={`flex-1 ${todo.completed ? "line-through text-gray-400" : ""}`}>
                    {todo.text}
                  </span>
                  <Star
                    className={`h-4 w-4 ${getPriorityColor(todo.priority)} ${
                      todo.priority === "high" ? "fill-current" : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-md lg:p-8">
            <div className="mb-4 flex items-center justify-between">
              <h3>이번 달 지출</h3>
              <TrendingUp className="h-5 w-5 text-[#FFB3D9]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-[#FAFAFA] p-4">
                <p className="mb-1 text-xs text-gray-500">총 지출</p>
                <p className="text-xl">2,450,000원</p>
              </div>
              <div className="rounded-2xl bg-[#FAFAFA] p-4">
                <p className="mb-1 text-xs text-gray-500">오늘 지출</p>
                <p className="text-xl">45,000원</p>
              </div>
            </div>
            <div className="mt-4 rounded-2xl bg-gradient-to-r from-[#B3D9FF] to-[#FFB3D9] p-4">
              <p className="mb-1 text-xs text-white/80">가장 큰 지출</p>
              <p className="text-white">생활비 850,000원</p>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md lg:p-8">
            <h3 className="mb-4">가족 요청 사항</h3>
            <div className="space-y-3">
              <div className="rounded-2xl bg-[#B3D9FF]/30 p-4">
                <p className="mb-2">첫째 (지우)</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <Circle className="h-3 w-3 text-[#B3D9FF]" />
                    <span>운동화 사주기</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Circle className="h-3 w-3 text-[#B3D9FF]" />
                    <span>주말 영화 보러 가기</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl bg-[#B3FFCC]/30 p-4">
                <p className="mb-2">둘째 (민서)</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <Circle className="h-3 w-3 text-[#B3FFCC]" />
                    <span>미술 재료 준비</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Circle className="h-3 w-3 text-[#B3FFCC]" />
                    <span>친구 생일 선물</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl bg-[#FFB3D9]/20 p-4">
                <p className="mb-2">엄마</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <Circle className="h-3 w-3 text-[#FFB3D9]" />
                    <span>요가 수업 등록</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Circle className="h-3 w-3 text-[#FFB3D9]" />
                    <span>책 읽기</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
