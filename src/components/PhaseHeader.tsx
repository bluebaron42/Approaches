import { ReactNode } from 'react';

interface PhaseHeaderProps {
  phaseName: string;
  title: string;
  icon: ReactNode;
  time: string;
  isPresentation: boolean;
  themeColor?: string;
}

export default function PhaseHeader({ 
  phaseName, 
  title, 
  icon, 
  time, 
  isPresentation,
  themeColor = 'indigo'
}: PhaseHeaderProps) {
  return (
    <div className={`w-full ${isPresentation ? 'mb-10' : 'mb-8'} animate-fadeIn`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className={`${isPresentation ? 'p-4' : 'p-3'} bg-${themeColor}-500/20 rounded-xl text-${themeColor}-400`}>
            {icon}
          </div>
          <div>
            <p className={`text-${themeColor}-400 uppercase tracking-wider font-bold ${isPresentation ? 'text-lg' : 'text-xs'}`}>
              {phaseName}
            </p>
            <h2 className={`text-white font-black ${isPresentation ? 'text-5xl lg:text-6xl' : 'text-2xl'}`}>
              {title}
            </h2>
          </div>
        </div>
        <div className={`${isPresentation ? 'px-6 py-3' : 'px-4 py-2'} bg-gray-800/50 rounded-full border border-gray-700`}>
          <span className={`text-gray-400 font-mono ${isPresentation ? 'text-xl' : 'text-sm'}`}>
            ⏱️ {time}
          </span>
        </div>
      </div>
    </div>
  );
}
