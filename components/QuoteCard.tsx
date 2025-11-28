import React, { useState } from 'react';
import { Quote } from '../types';
import { CopyIcon, CheckIcon, QuoteLeftIcon } from './Icons';

interface QuoteCardProps {
  quote: Quote;
  index: number;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `${quote.content} —— ${quote.author} ${quote.source ? `《${quote.source}》` : ''}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="bg-white p-8 rounded-none border-l-4 border-stone-800 shadow-md hover:shadow-xl transition-all duration-300 relative group overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Decorative Stamp Background - Changed to '真' (Truth/Authentic) */}
      <div className="absolute -right-4 -top-4 opacity-[0.03] text-9xl font-serif select-none pointer-events-none rotate-12">
        真
      </div>

      <div className="relative z-10">
        <div className="mb-4 text-stone-300">
           <QuoteLeftIcon className="w-8 h-8 opacity-40" />
        </div>

        <h3 className="text-2xl md:text-3xl font-serif text-stone-900 leading-relaxed mb-6 tracking-wide">
          {quote.content}
        </h3>

        <div className="flex flex-col md:flex-row md:items-center justify-between border-t border-stone-100 pt-4 mt-4">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-bold text-stone-700 font-serif flex items-center gap-2">
              {quote.author}
              {quote.source && (
                <span className="text-stone-500 font-normal text-base bg-stone-100 px-2 py-0.5 rounded-sm">
                  《{quote.source}》
                </span>
              )}
            </p>
          </div>
          
          <button 
            onClick={handleCopy}
            className="flex items-center space-x-2 text-stone-400 hover:text-seal-600 transition-colors text-sm uppercase tracking-wider font-semibold group-hover:opacity-100 md:opacity-0 transition-opacity"
            title="Copy Quote"
          >
            {copied ? (
              <>
                <CheckIcon className="w-4 h-4" />
                <span>已复制</span>
              </>
            ) : (
              <>
                <CopyIcon className="w-4 h-4" />
                <span>复制</span>
              </>
            )}
          </button>
        </div>

        {quote.explanation && (
          <div className="mt-4 bg-stone-50 p-4 rounded text-stone-600 text-sm italic border border-stone-100 flex gap-2">
            <span className="font-bold not-italic text-stone-400">按：</span>
            <span>{quote.explanation}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-4">
          {quote.tags.map((tag, i) => (
            <span key={i} className="px-2 py-1 bg-stone-100 text-stone-500 text-xs rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;