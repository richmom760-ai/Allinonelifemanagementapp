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
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 9)); // April 9, 2026
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const events: Event[] = [
    {
      id: "1",
      date: "2026-04-09",
      title: "회의 - 팀 미팅",
      type: "personal",
      time: "09:00",
    },
    {
      id: "2",
      date: "2026-04-09",
      title: "아이 학원 픽업",
      type: "child",
      time: "15:00",
    },
    {
      id: "3",
      date: "2026-04-12",
      title: "프로젝트 마감",
      type: "business",
      time: "18:00",
    },
    {
      id: "4",
      date: "2026-04-15",
      title: "부모님 방문",
      type: "personal",
    },
    {
      id: "5",
      date: "2026-04-18",
      title: "아이 학부모 상담",
      type: "child",
      time: "14:00",
    },
    {
      id: "6",
      date: "2026-04-20",
      title: "건강검진",
      type: "personal",
      time: "10:00",
    },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
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

  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  const calendarDays = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const today = new Date();
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const selectedDateEvents = selectedDate
    ? events.filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getDate() === selectedDate.getDate() &&
          eventDate.getMonth() === selectedDate.getMonth() &&
          eventDate.getFullYear() === selectedDate.getFullYear()
        );
      })
    : [];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-4 flex items-center justify-between">
        <div>
          <h1>일정 관리</h1>
          <p className="text-sm text-gray-500 mt-1">나와 가족의 일정</p>
        </div>
        <div className="flex gap-1">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#B3D9FF]" />
            <span className="text-xs text-gray-500">아이</span>
          </div>
          <div className="flex items-center gap-1 ml-2">
            <div className="w-3 h-3 rounded-full bg-[#FFB3D9]" />
            <span className="text-xs text-gray-500">개인</span>
          </div>
          <div className="flex items-center gap-1 ml-2">
            <div className="w-3 h-3 rounded-full bg-[#FFE4B3]" />
            <span className="text-xs text-gray-500">비즈니스</span>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-3xl p-6 shadow-md">
        {/* Month Navigator */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3>
            {currentDate.getFullYear()}년 {monthNames[currentDate.getMonth()]}
          </h3>
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Week Days */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-xs text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const dayEvents = getEventsForDate(day);
            const isTodayDate = isToday(day);

            return (
              <button
                key={day}
                onClick={() =>
                  setSelectedDate(
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      day
                    )
                  )
                }
                className={`aspect-square rounded-2xl p-1 relative transition-all ${
                  isTodayDate
                    ? "bg-gradient-to-br from-[#FFB3D9] to-[#B3D9FF] text-white"
                    : "hover:bg-gray-50"
                }`}
              >
                <span className="text-sm">{day}</span>
                {dayEvents.length > 0 && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                    {dayEvents.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className={`w-1 h-1 rounded-full ${getTypeColor(
                          event.type
                        )}`}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Date Events */}
      {selectedDate && selectedDateEvents.length > 0 && (
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <h3 className="mb-4">
            {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일 일정
          </h3>
          <div className="space-y-3">
            {selectedDateEvents.map((event) => (
              <div
                key={event.id}
                className={`${getTypeColor(
                  event.type
                )} bg-opacity-30 rounded-2xl p-4`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm">{event.title}</p>
                    {event.time && (
                      <p className="text-xs text-gray-500 mt-1">{event.time}</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {event.type === "child"
                      ? "아이"
                      : event.type === "personal"
                      ? "개인"
                      : "비즈니스"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Events */}
      <div className="bg-white rounded-3xl p-6 shadow-md">
        <h3 className="mb-4">다가오는 일정</h3>
        <div className="space-y-3">
          {events.slice(0, 5).map((event) => {
            const eventDate = new Date(event.date);
            return (
              <div
                key={event.id}
                className={`border-l-4 pl-4 py-2`}
                style={{
                  borderColor:
                    event.type === "child"
                      ? "#B3D9FF"
                      : event.type === "personal"
                      ? "#FFB3D9"
                      : "#FFE4B3",
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm">{event.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {eventDate.getMonth() + 1}월 {eventDate.getDate()}일
                      {event.time && ` · ${event.time}`}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      event.type === "child"
                        ? "bg-[#B3D9FF]"
                        : event.type === "personal"
                        ? "bg-[#FFB3D9]"
                        : "bg-[#FFE4B3]"
                    } bg-opacity-30`}
                  >
                    {event.type === "child"
                      ? "아이"
                      : event.type === "personal"
                      ? "개인"
                      : "비즈니스"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Add Button */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-[#FFB3D9] to-[#B3D9FF] rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
