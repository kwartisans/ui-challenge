import { useMemo, useState } from 'react'
import { MOCK_TOPICS, type Category, type Topic } from './data/mockTopics'
import './App.css'

type TopicFilter = 'All' | Category

const FILTERS: TopicFilter[] = ['All', 'Labour', 'Land', 'Family', 'Business']

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="search-icon"
      fill="none"
      viewBox="0 0 20 20"
    >
      <circle cx="8.75" cy="8.75" r="5.75" stroke="currentColor" />
      <path d="m13 13 4 4" stroke="currentColor" strokeLinecap="round" />
    </svg>
  )
}

function TopicCard({ topic }: { topic: Topic }) {
  return (
    <article className="topic-card">
      <div className="topic-card-top">
        <span className="category-tag">{topic.category}</span>
        {topic.isPopular && (
          <span className="popular-badge">
            <span aria-hidden="true" className="popular-star">
              ★
            </span>
            Popular
          </span>
        )}
      </div>
      <h2 className="topic-title">{topic.title}</h2>
      <p className="topic-summary">{topic.summary}</p>
      <p className="law-reference">
        <svg aria-hidden="true" fill="none" viewBox="0 0 16 16">
          <path
            d="M3 2.5h8.5v11H3zM5 5h4.5M5 7.5h4.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M5 11h2" stroke="currentColor" strokeLinecap="round" />
        </svg>
        <span>{topic.lawReference}</span>
      </p>
    </article>
  )
}

function App() {
  const [activeFilter, setActiveFilter] = useState<TopicFilter>('All')
  const [searchText, setSearchText] = useState('')

  const visibleTopics = useMemo(() => {
    const query = searchText.trim().toLowerCase()

    return MOCK_TOPICS.topics.filter((topic) => {
      const matchesCategory =
        activeFilter === 'All' || topic.category === activeFilter
      const matchesSearch =
        query.length === 0 ||
        topic.title.toLowerCase().includes(query) ||
        topic.summary.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [activeFilter, searchText])

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span aria-hidden="true" className="brand-mark">
            M
          </span>
          <span className="brand-copy">
            <span className="brand-name">Mbaza Ubutabera</span>
            <span className="brand-caption">Legal topics</span>
          </span>
        </div>

        <label className="search-field">
          <SearchIcon />
          <input
            aria-label="Search topics by title or summary"
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search topics, e.g. dismissal"
            type="search"
            value={searchText}
          />
        </label>
      </header>

      <main className="topics-content">
        <nav aria-label="Filter topics by category" className="filter-list">
          {FILTERS.map((filter) => (
            <button
              aria-pressed={activeFilter === filter}
              className={`filter-chip${activeFilter === filter ? ' is-active' : ''}`}
              key={filter}
              onClick={() => setActiveFilter(filter)}
              type="button"
            >
              {filter}
            </button>
          ))}
        </nav>

        <p aria-live="polite" className="topic-count">
          {visibleTopics.length} {visibleTopics.length === 1 ? 'topic' : 'topics'}
        </p>

        {visibleTopics.length > 0 ? (
          <section aria-label="Legal topics" className="topic-list">
            {visibleTopics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </section>
        ) : (
          <p className="empty-state">
            No topics found. Try a different search or category.
          </p>
        )}
      </main>
    </div>
  )
}

export default App
