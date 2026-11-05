export type Category = 'Labour' | 'Land' | 'Family' | 'Business';

export interface Topic {
  id: number;
  category: Category;
  title: string;
  summary: string;
  lawReference: string;
  isPopular: boolean;
  questionCount?: number;
  updatedAt?: string;
}

export interface TopicsResponse {
  count: number;
  topics: Topic[];
}