import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import QuoteCard from './components/QuoteCard';
import { Quote, SearchState } from './types';
import { fetchQuotes } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<SearchState>({
    query: '',
    results: [],
    isLoading: false,
    error: null,
    hasSearched: false,
  });

  const handleSearch = async (query: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null, query }));
    
    try {
      const quotes = await fetchQuotes(query);
      setState({
        query,
        results: quotes,
        isLoading: false,
        error: null,
        hasSearched: true,
      });
    } catch (err) {
      console.error(err);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: "抱歉，检索时遇到了问题，请稍后重试。",
        hasSearched: true,
      }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-ink-50 selection:bg-stone-200 selection:text-stone-900">
      {/* Header */}
      <header className="pt-16 pb-8 px-4 text-center">
        <div className="inline-block relative">
          <h1 className="text-5xl md:text-6xl font-calligraphy text-ink-900 mb-2 z-10 relative tracking-wider">
            箴言引擎
          </h1>
          <div className="absolute -top-3 -right-6 bg-seal-600 text-white w-8 h-8 flex items-center justify-center rounded-sm shadow-sm text-xs font-serif border border-red-800 opacity-90">
             真
          </div>
        </div>
        <p className="text-stone-500 mt-4 font-serif text-lg tracking-widest border-t border-b border-stone-200 inline-block py-2 px-8">
          去伪 · 存真 · 溯源
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 pb-20 max-w-5xl">
        <SearchBar onSearch={handleSearch} isLoading={state.isLoading} />

        {/* Error State */}
        {state.error && (
          <div className="text-center p-8 bg-red-50 border border-red-100 rounded-lg text-red-800 max-w-2xl mx-auto">
            <p>{state.error}</p>
          </div>
        )}

        {/* Results */}
        <div className="space-y-8">
          {state.hasSearched && !state.isLoading && state.results.length === 0 && !state.error && (
            <div className="text-center py-20 text-stone-400">
              <p className="text-xl font-serif">未找到包含“{state.query}”的确切名言</p>
              <p className="mt-2 text-sm">我们会严格筛选来源，请尝试更换更通用的词汇。</p>
            </div>
          )}

          {state.results.map((quote, index) => (
            <div key={index} className="animate-fade-in-up">
              <QuoteCard quote={quote} index={index} />
            </div>
          ))}
        </div>

        {/* Initial Empty State (Pre-search) */}
        {!state.hasSearched && !state.isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-center opacity-60">
            <div className="p-6 border border-stone-200 rounded-lg hover:border-stone-400 transition-colors">
              <h3 className="font-serif text-xl mb-2 text-stone-700">字斟句酌</h3>
              <p className="text-sm text-stone-500">优先匹配包含搜索词的原句，拒绝过度联想。</p>
            </div>
            <div className="p-6 border border-stone-200 rounded-lg hover:border-stone-400 transition-colors">
              <h3 className="font-serif text-xl mb-2 text-stone-700">拒绝杜撰</h3>
              <p className="text-sm text-stone-500">严格过滤互联网“假名言”，尤其是鲁迅、莫言等重灾区。</p>
            </div>
            <div className="p-6 border border-stone-200 rounded-lg hover:border-stone-400 transition-colors">
              <h3 className="font-serif text-xl mb-2 text-stone-700">出处考据</h3>
              <p className="text-sm text-stone-500">每一条引文都必须附带真实的书名或篇名出处。</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-stone-400 text-sm border-t border-stone-200 mt-auto">
        <p>&copy; {new Date().getFullYear()} 箴言引擎 Proverb Engine. Powered by Gemini.</p>
      </footer>
    </div>
  );
};

export default App;