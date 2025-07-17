import React from 'react';
import { parseISO, getMonth } from 'date-fns';

function Calendar({ data }) {
  if (!data) return <div className="p-4">Loading...</div>;

  // Flatten all days into a single list
  const allDays = data.flatMap(week => week.contributionDays);

  // Group days into columns by week
  const columns = [];
  for (let i = 0; i < allDays.length; i += 7) {
    columns.push(allDays.slice(i, i + 7));
  }

  // Add visual gaps after month ends
  const columnElements = [];
  let lastMonth = null;

  columns.forEach((days, index) => {
    const month = getMonth(parseISO(days[0]?.date));
    const isNewMonth = lastMonth !== null && month !== lastMonth;

    columnElements.push(
      <div
        key={index}
        className="flex flex-col gap-[4px]"
        style={{
          marginRight: isNewMonth ? '6px' : '2px',
        }}
      >
        {days.map((day, i) => (
          <div
            key={i}
            title={`${day.date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? 's' : ''}`}
            className="w-4 h-4 rounded-sm"
            style={{ backgroundColor: day.color }}
          />
        ))}
      </div>
    );

    lastMonth = month;
  });

  return (
    <div className="p-4 bg-[#161b22] rounded border border-[#30363d] overflow-x-auto">
      <div className="flex ml-[20px] min-w-[880px]">
        {columnElements}
      </div>
    </div>
  );
}

export default Calendar;
