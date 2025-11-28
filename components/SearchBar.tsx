import React, { useState, FormEvent } from 'react';
import { SearchIcon, LoadingIcon } from './Icons';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 mb-12">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入关键词，启动箴言检索..."
            className="w-full px-6 py-4 text-lg bg-white border-2 border-stone-200 rounded-full shadow-sm focus:outline-none focus:border-stone-800 focus:ring-0 transition-all placeholder:text-stone-300 text-stone-800 font-serif"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="absolute right-2 p-3 bg-stone-900 text-white rounded-full hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? <LoadingIcon className="w-6 h-6" /> : <SearchIcon className="w-6 h-6" />}
          </button>
        </div>
      </form>
      
      <div className="text-center mt-3 text-stone-400 text-sm font-light tracking-widest">
        AI 驱动 · 鉴伪存真
      </div>
    </div>
  );
};

export default SearchBar;