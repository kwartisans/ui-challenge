import React from 'react';
import type { Topic } from '../types/topic';

interface TopicCardProps {
  topic: Topic;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between mb-3">
      <div>
        {/* Top Row: Popular Badge (if applicable) */}
        {topic.isPopular && (
          <div className="flex justify-end mb-1">
            <span className="text-[11px] font-medium text-amber-600 flex items-center gap-1">
              <span>★</span> Popular
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">
          {topic.title}
        </h3>

        {/* Summary */}
        <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">
          {topic.summary}
        </p>
      </div>

      {/* Law Reference with Icon */}
      <div className="flex items-center gap-1.5 text-amber-700 text-[11px] font-medium">
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span>{topic.lawReference}</span>
      </div>
    </div>
  );
};