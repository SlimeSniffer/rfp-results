"use client";

export interface CategorySeparatorProps {
  categoryName: string;
}

export function CategorySeparator({ categoryName }: CategorySeparatorProps) {
  return (
    <div className="flex items-center gap-4 my-16">
      <div className="flex-1 h-[3px] bg-linear-to-r from-transparent to-purple-300"></div>
      
      <span className="bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-md border border-purple-300">
        {categoryName}
      </span>
      
      <div className="flex-1 h-[3px] bg-linear-to-r from-purple-300 to-transparent"></div>
    </div>
  );
}
