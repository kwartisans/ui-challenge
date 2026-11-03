import { useMemo, useState } from 'react';
import './App.css';
import { MOCK_TOPICS, type Topic } from './data/mockTopics';

const categories = ['All', 'Labour', 'Land', 'Family', 'Business'] as const;
type CategoryFilter = (typeof categories)[number];

const formatUpdatedDate = (date: string) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`));

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [search, setSearch] = useState('');

  const filteredTopics = useMemo(() => {
    const query = search.trim().toLowerCase();

    return MOCK_TOPICS.topics.filter((topic: Topic) => {
      const categoryMatch = selectedCategory === 'All' || topic.category === selectedCategory;
      const textMatch =
        query.length === 0 ||
        `${topic.title} ${topic.summary}`.toLowerCase().includes(query);

      return categoryMatch && textMatch;
    });
  }, [search, selectedCategory]);

  return (
    <div className="page-shell">
      <div className="app-shell">
        <div className="app-header">
          <header className="topbar">
            <div className="brand" aria-label="Brand">
              <div className="brand-mark">M</div>
              <div className="brand-text">
                <h1>Mbaza Ubutabera</h1>
                <span>Legal topics</span>
              </div>
            </div>

            <label className="search" aria-label="Search topics">
              <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="5.5" />
                <path d="M16 16L21 21" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search topics, e.g. dismissal"
                aria-label="Search topics"
              />
            </label>
          </header>
        </div>

        <div className="chip-row" aria-label="Topic filters">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`chip ${selectedCategory === category ? 'active' : ''}`}
              aria-pressed={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="topic-count" aria-live="polite">
          {filteredTopics.length} {filteredTopics.length === 1 ? 'topic' : 'topics'}
        </div>

        <main className="topic-list">
          {filteredTopics.map((topic) => (
            <article key={topic.id} className="topic-card">
              <div className="card-topline">
                <span className={`category-tag category-tag--${topic.category.toLowerCase()}`}>
                  {topic.category}
                </span>
                {topic.isPopular && (
                  <span className="popular-badge">
                    <span className="star" aria-hidden="true">★</span>
                    Popular
                  </span>
                )}
              </div>

              <h2>{topic.title}</h2>
              <p className="summary">{topic.summary}</p>

              <div className="law-row">
                <svg className="law-icon" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 2.5h8.5v11H3zM5.5 5h4M5.5 7.5h4" />
                  <path d="M11.5 4H13v9.5H5" />
                </svg>
                <span className="law-reference">{topic.lawReference}</span>
              </div>

              <div className="topic-meta">
                <span>{topic.questionCount} questions</span>
                <span>Updated {formatUpdatedDate(topic.updatedAt)}</span>
              </div>
            </article>
          ))}
          {filteredTopics.length === 0 && (
            <p className="empty-state">No topics match your search. Try another term or category.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
