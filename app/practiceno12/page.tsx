'use client';

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';

export default function MyDatePicker() {
  const [selected, setSelected] = useState<Date | undefined>(undefined);

  return (
    <div className="p-4 mx-auto text-black bg-white border rounded-md shadow-sm w-80">
      <label className="block mb-2 font-medium text-gray-700">
        Pick a date
      </label>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        fromYear={1900}     // allow old years
        toYear={new Date().getFullYear()} // up to current year
      />
      <p className="mt-2 text-gray-600">
        Selected date: {selected ? selected.toLocaleDateString() : 'None'}
      </p>
    </div>
  );
}
