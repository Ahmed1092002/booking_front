"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import {
  getMonthlyCalendarAction,
  blockDatesAction,
  addSeasonalPricingAction,
} from "@/actions/calendar";
import { CalendarDay } from "@/types";
import Button from "@/components/ui/Button";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";

export default function RoomCalendarPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = Number(params.id);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState<CalendarDay[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCalendar = async () => {
    setLoading(true);
    const monthStr = format(currentDate, "yyyy-MM");
    const result = await getMonthlyCalendarAction(roomId, monthStr);

    if (result.success && result.data) {
      setCalendarData(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCalendar();
  }, [currentDate, roomId]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getDayStatus = (date: Date) => {
    const dayStr = format(date, "yyyy-MM-dd");
    return calendarData.find((d) => d.date === dayStr);
  };

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            icon={<ArrowLeft />}
            className="mb-4"
          >
            Back to Room
          </Button>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-neutral-900">
              Room Availability & Pricing
            </h1>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" icon={<Plus />}>
                Block Dates
              </Button>
              <Button variant="primary" size="sm" icon={<Plus />}>
                Add Seasonal Rate
              </Button>
            </div>
          </div>
        </div>

        {/* Calendar Controls */}
        <div className="bg-white p-4 rounded-t-xl border-b flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={prevMonth}>
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={nextMonth}>
              Next
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-b-xl shadow-soft overflow-hidden">
          <div className="grid grid-cols-7 border-b bg-neutral-50">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="p-4 text-center font-semibold text-neutral-500 text-sm"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 auto-rows-fr">
            {/* Empty cells for start of month */}
            {Array.from({ length: monthStart.getDay() }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="p-4 border-b border-r min-h-[120px] bg-neutral-50/50"
              />
            ))}

            {/* Days */}
            {daysInMonth.map((date) => {
              const status = getDayStatus(date);
              const isBlocked = status?.status === "BLOCKED";
              const isBooked = status?.status === "BOOKED";
              const hasSeasonalPrice = status?.status === "SEASONAL_PRICING";

              return (
                <div
                  key={date.toString()}
                  className={`
                    p-2 border-b border-r min-h-[120px] relative transition-colors hover:bg-neutral-50
                    ${isBlocked ? "bg-red-50" : ""}
                    ${isBooked ? "bg-blue-50" : ""}
                    ${hasSeasonalPrice ? "bg-yellow-50" : ""}
                  `}
                >
                  <span className="font-medium text-sm text-neutral-700 block mb-2">
                    {format(date, "d")}
                  </span>

                  {status && (
                    <div className="space-y-1">
                      {status.price && (
                        <div className="text-xs font-semibold text-primary-600">
                          ${status.price}
                        </div>
                      )}

                      {isBlocked && (
                        <div className="text-xs bg-red-100 text-red-700 px-1 py-0.5 rounded">
                          Blocked
                        </div>
                      )}

                      {isBooked && (
                        <div className="text-xs bg-blue-100 text-blue-700 px-1 py-0.5 rounded">
                          Booked
                        </div>
                      )}

                      {hasSeasonalPrice && (
                        <div className="text-xs text-yellow-700 mt-1">
                          {status.seasonName}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
