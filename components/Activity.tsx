"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export type WorkoutItem = {
  name: string;
  sets: [
    {
      reps: number;
      weight?: number;
    },
  ];
};

export type WorkoutProps = {
  workout: WorkoutItem[];
};

function Exercise({ exercise }: { exercise: WorkoutItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="ml-2 flex w-full flex-col justify-center space-y-4 overflow-hidden rounded-xl bg-[#2E8B57]/20 p-4">
      <div
        className="flex cursor-pointer justify-between"
        onClick={() => setIsOpen((open) => !open)}
      >
        <p>{exercise.name}</p>
        <ChevronDown
          className={`${isOpen ? "rotate-180" : ""} duration-300 ease-in-out`}
        />
      </div>
      <div
        className={`${isOpen ? "block h-auto" : "hidden h-0"} flex flex-col space-y-4 duration-300 ease-in-out`}
      >
        {exercise.sets.map((set, index) => {
          return (
            <div
              key={index}
              className="inline-flex items-center space-x-2 text-sm md:text-base"
            >
              <div className="grid h-5 w-5 place-items-center rounded-full bg-white text-center text-xs">
                {index + 1}
              </div>
              {set.reps && <p>{set.reps} reps</p>}
              {set.weight && <p> + {set.weight} kg</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Activity({ workout }: WorkoutProps) {
  return (
    <div className="relative space-y-4 border-l">
      {workout.map((exercise, index) => {
        return (
          <div key={index} className="flex w-full">
            <div className="-ml-3 mt-4 grid h-6 w-6 place-items-center rounded-full border bg-white text-center">
              <p className="text-xs">{index + 1}</p>
            </div>
            <Exercise exercise={exercise} />
          </div>
        );
      })}
    </div>
  );
}

export default Activity;
