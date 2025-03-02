"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
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
    <div className="ml-2 flex w-full flex-col justify-center overflow-hidden rounded-xl bg-[#2E8B57]/20 p-4">
      <button
        className="flex w-full justify-between"
        onClick={() => setIsOpen((open) => !open)}
      >
        <p className="text-balance text-start font-medium">{exercise.name}</p>
        <ChevronDown
          className={`${isOpen ? "rotate-180" : ""} h-6 w-6 min-w-fit duration-300 ease-in-out`}
        />
      </button>
      <motion.div
        initial={false}
        animate={
          isOpen
            ? { height: "auto", marginTop: "1rem", opacity: 1 }
            : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex flex-col space-y-4 overflow-hidden"
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
      </motion.div>
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
