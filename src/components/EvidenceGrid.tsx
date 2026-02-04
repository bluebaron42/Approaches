import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Scale, ChevronDown } from 'lucide-react';

interface EvidenceItem {
  id: string;
  type: 'support' | 'counter' | 'mixed';
  study: string;
  finding: string;
  evaluation?: string;
}

interface EvidenceGridProps {
  evidence: EvidenceItem[];
  isPresentation: boolean;
  topic?: string;
}

export default function EvidenceGrid({ evidence, isPresentation, topic }: EvidenceGridProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'support' | 'counter' | 'mixed'>('all');

  const supportCount = evidence.filter(e => e.type === 'support').length;
  const counterCount = evidence.filter(e => e.type === 'counter').length;
  const mixedCount = evidence.filter(e => e.type === 'mixed').length;

  const filteredEvidence = filter === 'all' 
    ? evidence 
    : evidence.filter(e => e.type === filter);

  const typeConfig = {
    support: { 
      icon: <ThumbsUp size={20} />, 
      bg: 'bg-green-900/30', 
      border: 'border-green-500/50', 
      text: 'text-green-400',
      label: 'Supporting'
    },
    counter: { 
      icon: <ThumbsDown size={20} />, 
      bg: 'bg-red-900/30', 
      border: 'border-red-500/50', 
      text: 'text-red-400',
      label: 'Contradicting'
    },
    mixed: { 
      icon: <Scale size={20} />, 
      bg: 'bg-amber-900/30', 
      border: 'border-amber-500/50', 
      text: 'text-amber-400',
      label: 'Mixed'
    },
  };

  return (
    <div className={`w-full ${isPresentation ? 'max-w-6xl' : 'max-w-4xl'}`}>
      {/* Header */}
      {topic && (
        <h3 className={`text-gray-200 font-bold ${isPresentation ? 'mb-6 text-3xl' : 'mb-4 text-xl'}`}>
          📊 Evidence for: {topic}
        </h3>
      )}

      {/* Filter Buttons */}
      <div className={`flex flex-wrap items-center ${isPresentation ? 'gap-3 mb-8' : 'gap-2 mb-6'}`}>
        <button
          onClick={() => setFilter('all')}
          className={`${isPresentation ? 'px-6 py-3 text-lg' : 'px-4 py-2'} rounded-lg font-medium transition-all ${
            filter === 'all' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          All ({evidence.length})
        </button>
        <button
          onClick={() => setFilter('support')}
          className={`${isPresentation ? 'px-6 py-3 text-lg' : 'px-4 py-2'} rounded-lg font-medium transition-all flex items-center gap-2 ${
            filter === 'support' 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          <ThumbsUp size={isPresentation ? 20 : 16} /> Supporting ({supportCount})
        </button>
        <button
          onClick={() => setFilter('counter')}
          className={`${isPresentation ? 'px-6 py-3 text-lg' : 'px-4 py-2'} rounded-lg font-medium transition-all flex items-center gap-2 ${
            filter === 'counter' 
              ? 'bg-red-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          <ThumbsDown size={isPresentation ? 20 : 16} /> Contradicting ({counterCount})
        </button>
        <button
          onClick={() => setFilter('mixed')}
          className={`${isPresentation ? 'px-6 py-3 text-lg' : 'px-4 py-2'} rounded-lg font-medium transition-all flex items-center gap-2 ${
            filter === 'mixed' 
              ? 'bg-amber-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          <Scale size={isPresentation ? 20 : 16} /> Mixed ({mixedCount})
        </button>
      </div>

      {/* Evidence Cards */}
      <div className={isPresentation ? 'space-y-5' : 'space-y-4'}>
        {filteredEvidence.map((item) => {
          const config = typeConfig[item.type];
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className={`${config.bg} ${config.border} border rounded-xl transition-all duration-300`}
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className={`w-full ${isPresentation ? 'p-6' : 'p-4'} text-left`}
              >
                <div className="flex items-start justify-between">
                  <div className={`flex items-start ${isPresentation ? 'gap-4' : 'gap-3'}`}>
                    <div className={`${config.text} mt-1`}>
                      {config.icon}
                    </div>
                    <div>
                      <span className={`${config.text} ${isPresentation ? 'text-sm' : 'text-xs'} font-bold uppercase tracking-wider`}>
                        {config.label}
                      </span>
                      <h4 className={`text-gray-200 font-bold ${isPresentation ? 'text-2xl lg:text-3xl' : 'text-lg'}`}>
                        {item.study}
                      </h4>
                      <p className={`text-gray-400 mt-1 ${isPresentation ? 'text-xl lg:text-2xl leading-relaxed' : 'text-sm'}`}>
                        {item.finding}
                      </p>
                    </div>
                  </div>
                  
                  {item.evaluation && (
                    <ChevronDown 
                      className={`text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      size={isPresentation ? 28 : 20}
                    />
                  )}
                </div>
              </button>

              {isExpanded && item.evaluation && (
                <div className={`${isPresentation ? 'px-6 pb-6' : 'px-4 pb-4'} animate-fadeIn`}>
                  <div className="pt-4 border-t border-gray-700">
                    <p className={`text-gray-300 ${isPresentation ? 'text-xl lg:text-2xl leading-relaxed' : 'text-sm'}`}>
                      <span className="text-gray-500 font-bold">💭 Evaluation: </span>
                      {item.evaluation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredEvidence.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No evidence found for this filter.
        </div>
      )}
    </div>
  );
}
