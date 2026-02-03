import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: string;
  content: React.ReactNode;
}

interface TabbedContentProps {
  tabs: Tab[];
  isPresentation: boolean;
  themeColor?: string;
}

export default function TabbedContent({ tabs, isPresentation, themeColor = 'blue' }: TabbedContentProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className={`w-full ${isPresentation ? 'max-w-6xl' : 'max-w-4xl'}`}>
      {/* Tab Navigation */}
      <div className={`flex border-b border-gray-700 ${isPresentation ? 'mb-8' : 'mb-6'}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 ${isPresentation ? 'px-8 py-4' : 'px-6 py-3'} font-medium transition-all
              ${activeTab === tab.id 
                ? `text-${themeColor}-400 border-b-2 border-${themeColor}-400` 
                : 'text-gray-500 hover:text-gray-300'
              }
              ${isPresentation ? 'text-2xl' : 'text-base'}
            `}
          >
            {tab.icon && <span className={isPresentation ? 'text-2xl' : 'text-base'}>{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={`bg-gray-800/30 rounded-xl border border-gray-700 ${isPresentation ? 'p-8' : 'p-6'} animate-fadeIn`}>
        {activeTabData?.content}
      </div>
    </div>
  );
}
