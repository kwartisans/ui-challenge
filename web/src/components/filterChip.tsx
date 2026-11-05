import React from 'react';
import type { Category } from '../types/topic';

export type FilterCategory = 'All' | Category;

interface FilterChipProps {
  label: FilterCategory;
  isSelected: boolean;
  onClick: () => void;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  isSelected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
        isSelected
          ? 'bg-[#1B2A3D] text-white shadow-xs border border-[#2C3E50]'
          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  );
};