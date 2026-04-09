import { useState } from "react";
import { Heart, Star, Plus, CheckCircle2, Circle } from "lucide-react";

interface FamilyMember {
  id: string;
  name: string;
  color: string;
  avatar: string;
  wishes: Wish[];
  goals: Goal[];
}

interface Wish {
  id: string;
  text: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

interface Goal {
  id: string;
  text: string;
  progress: number;
}

export function Family() {
  const [members, setMembers] = useState<FamilyMember[]>([
    {
      id: "1",
      name: "첫째 (지우)",
      color: "#B3D9FF",
      avatar: "👧",
      wishes: [
        {
          id: "w1",
          text: "새 운동화 사주기",
          priority: "high",
          completed: false,
        },
        {
          id: "w2",
          text: "주말에 영화 보러 가기",
          priority: "medium",
          completed: false,
        },
        {
          id: "w3",
          text: "친구들 집에 초대하기",
          priority: "low",
          completed: false,
        },
      ],
      goals: [
        { id: "g1", text: "책 10권 읽기", progress: 70 },
        { id: "g2", text: "수영 배우기", progress: 40 },
      ],
    },
    {
      id: "2",
      name: "둘째 (민서)",
      color: "#B3FFCC",
      avatar: "👦",
      wishes: [
        {
          id: "w4",
          text: "미술 재료 준비",
          priority: "high",
          completed: false,
        },
        {
          id: "w5",
          text: "친구 생일 선물",
          priority: "medium",
          completed: false,
        },
        {
          id: "w6",
          text: "로봇 장난감",
          priority: "low",
          completed: false,
        },
      ],
      goals: [
        { id: "g3", text: "피아노 연습 매일하기", progress: 85 },
        { id: "g4", text: "구구단 외우기", progress: 60 },
      ],
    },
    {
      id: "3",
      name: "나 (엄마)",
      color: "#FFB3D9",
      avatar: "👩",
      wishes: [
        { id: "w7", text: "요가 수업 등록", priority: "high", completed: false },
        { id: "w8", text: "책 읽기", priority: "medium", completed: true },
        {
          id: "w9",
          text: "친구들과 브런치",
          priority: "medium",
          completed: false,
        },
      ],
      goals: [
        { id: "g5", text: "매일 30분 운동", progress: 50 },
        { id: "g6", text: "자기계발 독서", progress: 75 },
      ],
    },
  ]);

  const toggleWish = (memberId: string, wishId: string) => {
    setMembers(
      members.map((member) =>
        member.id === memberId
          ? {
              ...member,
              wishes: member.wishes.map((wish) =>
                wish.id === wishId
                  ? { ...wish, completed: !wish.completed }
                  : wish
              ),
            }
          : member
      )
    );
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <Star className="w-4 h-4 text-red-500 fill-red-500" />;
      case "medium":
        return <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />;
      case "low":
        return <Star className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="flex items-center gap-2">
          <span>가족 관리</span>
          <Heart className="w-5 h-5 text-[#FFB3D9]" />
        </h1>
        <p className="text-sm text-gray-500 mt-1">우리 가족의 바람과 목표</p>
      </div>

      {/* Family Members */}
      {members.map((member) => (
        <div
          key={member.id}
          className="bg-white rounded-3xl p-6 shadow-md"
          style={{ borderTop: `4px solid ${member.color}` }}
        >
          {/* Member Header */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${member.color}30` }}
            >
              {member.avatar}
            </div>
            <div>
              <h3>{member.name}</h3>
              <p className="text-xs text-gray-500">
                요구사항 {member.wishes.filter((w) => !w.completed).length}개 ·
                목표 {member.goals.length}개
              </p>
            </div>
          </div>

          {/* Wishes */}
          <div className="mb-6">
            <h4 className="text-sm mb-3">하고 싶은 것</h4>
            <div className="space-y-2">
              {member.wishes.map((wish) => (
                <div
                  key={wish.id}
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors"
                >
                  <button
                    onClick={() => toggleWish(member.id, wish.id)}
                    className="flex-shrink-0"
                  >
                    {wish.completed ? (
                      <CheckCircle2
                        className="w-5 h-5"
                        style={{ color: member.color }}
                      />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300" />
                    )}
                  </button>
                  <span
                    className={`flex-1 text-sm ${
                      wish.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {wish.text}
                  </span>
                  {getPriorityIcon(wish.priority)}
                </div>
              ))}
            </div>
          </div>

          {/* Goals */}
          <div>
            <h4 className="text-sm mb-3">목표</h4>
            <div className="space-y-3">
              {member.goals.map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{goal.text}</span>
                    <span className="text-xs text-gray-500">
                      {goal.progress}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${goal.progress}%`,
                        backgroundColor: member.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Button */}
          <button
            className="mt-4 w-full py-3 rounded-2xl border-2 border-dashed text-sm text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
            style={{ borderColor: `${member.color}50` }}
          >
            <Plus className="w-4 h-4" />
            <span>추가하기</span>
          </button>
        </div>
      ))}

      {/* Add New Member */}
      <button className="w-full bg-white rounded-3xl p-6 shadow-md border-2 border-dashed border-gray-200 hover:border-gray-400 transition-colors flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700">
        <Plus className="w-5 h-5" />
        <span>가족 구성원 추가</span>
      </button>

      {/* Summary Card */}
      <div className="bg-gradient-to-br from-[#FFB3D9] to-[#B3D9FF] rounded-3xl p-6 shadow-lg text-white">
        <h3 className="mb-4">이번 주 가족 요약</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/20 rounded-2xl p-4">
            <p className="text-sm opacity-90 mb-1">완료된 요구사항</p>
            <p className="text-2xl">
              {members.reduce(
                (acc, m) => acc + m.wishes.filter((w) => w.completed).length,
                0
              )}
              개
            </p>
          </div>
          <div className="bg-white/20 rounded-2xl p-4">
            <p className="text-sm opacity-90 mb-1">진행 중인 목표</p>
            <p className="text-2xl">
              {members.reduce((acc, m) => acc + m.goals.length, 0)}개
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
