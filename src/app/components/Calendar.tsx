import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

interface Event {
  id: string;
  date: string;
  title: string;
  type: "child" | "personal" | "business";
  time?: string;
}

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 9));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const events: Event[] = [
    { id: "1", date: "2026-04-09", title: "팀 미팅", type: "personal", time: "09:00" },
    { id: "2", date: "2026-04-09", title: "아이 학원 픽업", type: "child", time: "15:00" },
    { id: "3", date: "2026-04-12", title: "프로젝트 마감", type: "business", time: "18:00" },
    { id: "4", date: "2026-04-15", title: "부모님 방문", type: "personal" },
    { id: "5", date: "2026-04-18", title: "아이 상담", type: "child", time: "14:00" },
    { id: "6", date: "2026-04-20", title: "건강검진", type: "personal", time: "10:00" },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return { daysInMonth: lastDay.getDate(), startingDayOfWeek: firstDay.getDay() };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((event) => event.date === dateStr);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "child":
        return "bg-[#B3D9FF]";
      case "personal":
        return "bg-[#FFB3D9]";
      case "business":
        return "bg-[#FFE4B3]";
      default:
        return "bg-gray-300";
    }
  };

  const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  const calendarDays = [];
  for (let i = 0; i < startingDayOfWeek; i++) calendarDays.push(null);
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day);

  const today = new Date();
  const isToday = (day: number) => day === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();

  const selectedDateEvents = selectedDate
    ? events.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getDate() === selectedDate.getDate() && eventDate.getMonth() === selectedDate.getMonth() && eventDate.getFullYear() === selectedDate.getFullYear();
      })
    : [];

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between pt-4">
        <div>
          <h1>일정 관리</h1>
          <p className="mt-1 text-sm text-gray-500">이번 주 가족과 개인 일정을 확인해보세요</p>
        </div>
        <div className="flex gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1"><div className="h-3 w-3 rounded-full bg-[#B3D9FF]" /><span>아이</span></div>
          <div className="flex items-center gap-1"><div className="h-3 w-3 rounded-full bg-[#FFB3D9]" /><span>개인</span></div>
          <div className="flex items-center gap-1"><div className="h-3 w-3 rounded-full bg-[#FFE4B3]" /><span>업무</span></div>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-md">
        <div className="mb-6 flex items-center justify-between">
          <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} className="rounded-full p-2 transition-colors hover:bg-gray-100"><ChevronLeft className="h-5 w-5" /></button>
          <h3>{`${currentDate.getFullYear()}년 ${monthNames[currentDate.getMonth()]}`}</h3>
          <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} className="rounded-full p-2 transition-colors hover:bg-gray-100"><ChevronRight className="h-5 w-5" /></button>
        </div>

        <div className="mb-2 grid grid-cols-7 gap-2">
          {weekDays.map((day) => <div key={day} className="py-2 text-center text-xs text-gray-500">{day}</div>)}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            if (day === null) return <div key={`empty-${index}`} className="aspect-square" />;
            const dayEvents = getEventsForDate(day);
            const isTodayDate = isToday(day);
            return (
              <button key={day} onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))} className={`relative aspect-square rounded-2xl p-1 transition-all ${isTodayDate ? "bg-gradient-to-br from-[#FFB3D9] to-[#B3D9FF] text-white" : "hover:bg-gray-50"}`}>
                <span className="text-sm">{day}</span>
                {dayEvents.length > 0 && <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-0.5">{dayEvents.slice(0, 3).map((event) => <div key={event.id} className={`h-1 w-1 rounded-full ${getTypeColor(event.type)}`} />)}</div>}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && selectedDateEvents.length > 0 && (
        <div className="rounded-3xl bg-white p-6 shadow-md">
          <h3 className="mb-4">{`${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일 일정`}</h3>
          <div className="space-y-3">
            {selectedDateEvents.map((event) => (
              <div key={event.id} className={`${getTypeColor(event.type)} rounded-2xl bg-opacity-30 p-4`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm">{event.title}</p>
                    {event.time && <p className="mt-1 text-xs text-gray-500">{event.time}</p>}
                  </div>
                  <span className="text-xs text-gray-500">{event.type === "child" ? "아이" : event.type === "personal" ? "개인" : "업무"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-3xl bg-white p-6 shadow-md">
        <h3 className="mb-4">다가오는 일정</h3>
        <div className="space-y-3">
          {events.slice(0, 5).map((event) => {
            const eventDate = new Date(event.date);
            return (
              <div key={event.id} className="border-l-4 py-2 pl-4" style={{ borderColor: event.type === "child" ? "#B3D9FF" : event.type === "personal" ? "#FFB3D9" : "#FFE4B3" }}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm">{event.title}</p>
                    <p className="mt-1 text-xs text-gray-500">{`${eventDate.getMonth() + 1}월 ${eventDate.getDate()}일`}{event.time && ` · ${event.time}`}</p>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-xs ${event.type === "child" ? "bg-[#B3D9FF]" : event.type === "personal" ? "bg-[#FFB3D9]" : "bg-[#FFE4B3]"} bg-opacity-30`}>{event.type === "child" ? "아이" : event.type === "personal" ? "개인" : "업무"}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button className="fixed bottom-24 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#FFB3D9] to-[#B3D9FF] text-white shadow-lg transition-transform hover:scale-110"><Plus className="h-6 w-6" /></button>
    </div>
  );
}
