"use client";

export interface CalendarDateProps {
  date: string;
  label?: string;
}

export function CalendarDate({ date, label = "Cut-Off Date" }: CalendarDateProps) {
  const [year, month, day] = date.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center min-w-[60px]">
        <div className="w-full bg-blue-100 px-3 py-1 rounded-t-lg">
          <span className="text-xs text-blue-700 uppercase font-bold block text-center">
            {monthName}
          </span>
        </div>
        <div className="px-4 py-2 border-blue-100 border-b border-r border-l rounded-b-lg">
          <span className="text-2xl font-bold text-blue-700 block text-center">
            {day}
          </span>
        </div>
      </div>
      {label && (
        <span className="text-xs text-gray-600 mt-1 text-center">{label}</span>
      )}
    </div>
  );
}

