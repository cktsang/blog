"use client";

import { DateTime } from "luxon";
import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip } from "react-tooltip";
import { useTransitionRouter } from "next-transition-router";

type HeatmapProps = {
  dates: { date: string; count: number; path?: string[] }[] | null;
  days: number;
};

function Heatmap({ dates, days }: HeatmapProps) {
  const router = useTransitionRouter();

  function fillEmptyDates(
    dates: { date: string; count: number; path?: string[] }[],
  ) {
    const today = DateTime.now().plus({ days: 7 });
    const dateMap = new Map(
      dates?.map((item) => [DateTime.fromISO(item.date).toISODate(), item]),
    );
    const filledDates = Array.from({ length: days + 14 }, (_, i) => {
      const date = today.minus({ days: i }).toISODate();
      return dateMap.get(date) || { date, count: 0 };
    });
    return filledDates.reverse();
  }
  const dateValues = fillEmptyDates(dates!);

  return (
    <div className="z-0 h-full w-full rounded-xl bg-gradient-to-b from-emerald-700/80 via-emerald-600/90 to-emerald-600/80 p-2 shadow md:p-4">
      <CalendarHeatmap
        values={dateValues!}
        startDate={DateTime.now().minus({ days: days }).toISODate()}
        endDate={DateTime.now().toISODate()}
        showOutOfRangeDays={true}
        tooltipDataAttrs={(value): any => {
          if (!value || !value.date) {
            return;
          }
          return {
            "data-tooltip-content": `${value?.count} contributions on ${DateTime.fromISO(
              value?.date.toString(),
            ).toFormat("cccc, dd LLL yyyy")}`,
            "data-tooltip-id": `my-tooltip`,
          };
        }}
        classForValue={(value) => {
          if (!value || value!.count === 0) {
            return "color-empty outline-hidden";
          }
          return "color-filled";
        }}
        showMonthLabels={false}
        transformDayElement={(element) =>
          React.cloneElement(element as any, {
            rx: 1.5,
            ry: 1.5,
          })
        }
        onClick={(value) => {
          if (value?.path) router.push(`/${value?.path[0]}/${value?.path[1]}`);
        }}
      />
      <Tooltip id="my-tooltip" place="bottom" className="z-50" />
    </div>
  );
}

export default Heatmap;
