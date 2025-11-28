export interface Quote {
  content: string;
  author: string;
  source?: string;
  explanation: string;
  tags: string[];
}

export interface SearchState {
  query: string;
  results: Quote[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
}
