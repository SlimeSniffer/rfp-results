"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/atoms/Button";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterDropdownProps {
  options: FilterOption[];
  selectedValues: string[];
  onApply: (selectedValues: string[]) => void;
  label?: string;
}

export function FilterDropdown({
  options,
  selectedValues,
  onApply,
  label = "Filters"
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState<string[]>(selectedValues);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTempSelected(selectedValues);
  }, [selectedValues]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = (value: string) => {
    setTempSelected(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const handleApply = () => {
    onApply(tempSelected);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full md:w-auto" ref={dropdownRef}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 py-5.5 bg-white shadow text-gray-700 hover:text-white border rounded-sm"
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 bg-white border rounded-sm shadow-lg z-10 min-w-[200px]">
          <div className="py-2">
            {options.map((option) => (
              <label
                key={option.value}
                className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={tempSelected.includes(option.value)}
                  onChange={() => handleToggle(option.value)}
                  className="mr-3 w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>

          <div className="border-t border-gray-200 my-1"></div>

          <div className="p-2">
            <Button
              onClick={handleApply}
              className="w-full"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

