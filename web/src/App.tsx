import { useMemo, useState } from 'react';
import { FilterChip, type FilterCategory } from './components/filterChip';
import { SearchField } from './components/searchField';
import { TopicCard } from './components/topicCard';
import { MOCK_TOPICS } from './data/mockTopics';
import { useDebounce } from './hooks/useDebounce';
import type { Category, Topic } from './types/topic';

const CATEGORIES: FilterCategory[] = ['All', 'Labour', 'Land', 'Family', 'Business'];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const debouncedSearch = useDebounce(searchTerm, 300);

  const topicsArray: Topic[] = Array.isArray(MOCK_TOPICS) 
    ? MOCK_TOPICS 
    : (MOCK_TOPICS as { topics: Topic[] }).topics || [];

  const filteredTopics = useMemo(() => {
    return topicsArray.filter((topic: Topic) => {
      const matchesCategory =
        selectedCategory === 'All' || topic.category === (selectedCategory as Category);

      const query = debouncedSearch.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        topic.title.toLowerCase().includes(query) ||
        topic.summary.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [topicsArray, selectedCategory, debouncedSearch]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans flex justify-center">
      {/* Mobile container wrapper matching Figma preview frame */}
      <div className="w-full max-w-md bg-[#F4F5F7] min-h-screen shadow-xl pb-12">
        
        {/* Dark Navy Header Section (Flat Bottom) */}
        <header className="bg-[#0D1B2A] px-5 pt-8 pb-8 rounded-none">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-gray-950 font-bold text-lg shadow-sm">
              M
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">Mbaza Ubutabera</h1>
              <p className="text-gray-400 text-xs">Legal topics</p>
            </div>
          </div>

          {/* Search Box */}
          <SearchField 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="Search topics, e.g. dismissal" 
          />
        </header>

        {/* Filter Chips Scroll View (Overlapping / directly below header) */}
        <div className="bg-[#0D1B2A] px-5 pb-5 pt-1">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map((cat) => (
              <FilterChip
                key={cat}
                label={cat}
                isSelected={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              />
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <main className="px-5 pt-4">
          {/* Topics Count Header */}
          <div className="mb-3">
            <span className="text-xs font-medium text-gray-500">
              {filteredTopics.length} topics
            </span>
          </div>

          {/* Topic Cards List */}
          {filteredTopics.length > 0 ? (
            <div className="flex flex-col gap-3">
              {filteredTopics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 mt-4">
              <p className="text-xs text-gray-500">No topics match your search criteria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}