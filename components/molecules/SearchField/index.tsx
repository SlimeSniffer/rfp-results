"use client";

import { Search } from "lucide-react";

export interface SearchFieldProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function SearchField({
  placeholder = "Search...",
  value,
  onChange,
  className = ""
}: SearchFieldProps) {

  return (
    <div className={`relative w-full xl:max-w-[375px] ${className}`}>
      <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors text-blue-300`}>
        <Search className="w-5 h-5" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-2.5 bg-white border rounded-sm shadow focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
      />
    </div>
  );
}

