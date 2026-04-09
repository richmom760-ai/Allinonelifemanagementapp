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
    { id: "1", text: "?꾩씠 ?깃탳 以鍮꾨Ъ 梨숆린湲?", completed: false, priority: "high" },
    { id: "2", text: "?꾨줈?앺듃 蹂닿퀬???묒꽦", completed: false, priority: "high" },
    { id: "3", text: "?λ낫湲?", completed: true, priority: "medium" },
    { id: "4", text: "?대룞 媛湲?", completed: false, priority: "low" },
  ]);

  const schedules: Schedule[] = [
    { id: "1", time: "09:00", title: "?뚯쓽 - ? 誘명똿", type: "personal" },
    { id: "2", time: "12:00", title: "?먯떖 ?쎌냽", type: "personal" },
    { id: "3", time: "15:00", title: "?꾩씠 ?숈썝 ?쎌뾽", type: "child" },
    { id: "4", time: "17:30", title: "???以鍮?", type: "personal" },
    { id: "5", time: "19:00", title: "?꾩씠 ?숈젣 ?뺤씤", type: "child" },
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
          <span>?ㅻ뒛????嫄몄쓬???섏븘媛怨??덉뼱??</span>
          <Sparkles className="h-5 w-5 text-[#FFB3D9] lg:h-6 lg:w-6" />
        </h1>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.9fr)] xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.95fr)]">
        <section className="space-y-6">
          <div className="rounded-3xl bg-gradient-to-br from-[#FFB3D9] to-[#FFE4B3] p-6 shadow-lg lg:p-8">
            <div className="mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 fill-white text-white" />
              <h2 className="text-white">?ㅻ뒛???곗꽑?쒖쐞 3媛吏</h2>
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
            <h3 className="mb-5">?ㅻ뒛 ?쇱젙</h3>
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
            <h3 className="mb-4">????由ъ뒪??</h3>
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
              <h3>?대쾲 ??吏異?</h3>
              <TrendingUp className="h-5 w-5 text-[#FFB3D9]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-[#FAFAFA] p-4">
                <p className="mb-1 text-xs text-gray-500">珥?吏異?</p>
                <p className="text-xl">2,450,000??</p>
              </div>
              <div className="rounded-2xl bg-[#FAFAFA] p-4">
                <p className="mb-1 text-xs text-gray-500">?ㅻ뒛 吏異?</p>
                <p className="text-xl">45,000??</p>
              </div>
            </div>
            <div className="mt-4 rounded-2xl bg-gradient-to-r from-[#B3D9FF] to-[#FFB3D9] p-4">
              <p className="mb-1 text-xs text-white/80">媛????吏異?</p>
              <p className="text-white">?앺솢鍮?850,000??</p>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md lg:p-8">
            <h3 className="mb-4">媛議??붿껌 ?ы빆</h3>
            <div className="space-y-3">
              <div className="rounded-2xl bg-[#B3D9FF]/30 p-4">
                <p className="mb-2">泥レ㎏ (吏??</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <Circle className="h-3 w-3 text-[#B3D9FF]" />
                    <span>?대룞???ъ＜湲?</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Circle className="h-3 w-3 text-[#B3D9FF]" />
                    <span>二쇰쭚 ?곹솕 蹂대윭 媛湲?</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl bg-[#B3FFCC]/30 p-4">
                <p className="mb-2">?섏㎏ (誘쇱꽌)</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <Circle className="h-3 w-3 text-[#B3FFCC]" />
                    <span>誘몄닠 ?щ즺 以鍮?</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Circle className="h-3 w-3 text-[#B3FFCC]" />
                    <span>移쒓뎄 ?앹씪 ?좊Ъ</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl bg-[#FFB3D9]/20 p-4">
                <p className="mb-2">?꾨쭏</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <Circle className="h-3 w-3 text-[#FFB3D9]" />
                    <span>?붽? ?섏뾽 ?깅줉</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Circle className="h-3 w-3 text-[#FFB3D9]" />
                    <span>梨??쎄린</span>
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
