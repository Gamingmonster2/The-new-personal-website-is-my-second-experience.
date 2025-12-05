import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onScrollDown: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollDown }) => {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 bg-slate-900">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h2 className="text-brand-500 font-medium tracking-wide uppercase text-sm mb-4 animate-fade-in-up">
          Welcome to the Future
        </h2>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
          One Website <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">
            Experience
          </span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          A demonstration of modern React architecture fused with the power of the Gemini API. 
          Dynamic, responsive, and intelligent.
        </p>
        
        <div className="flex gap-4 justify-center">
          <button 
            onClick={onScrollDown}
            className="px-8 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-full font-medium transition-all shadow-lg shadow-brand-900/50 hover:shadow-brand-500/25 active:scale-95"
          >
            Explore Experience
          </button>
          <a 
            href="#chat"
            className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-full font-medium transition-all border border-slate-700 active:scale-95"
          >
            Talk to AI
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <button onClick={onScrollDown} className="p-2 text-slate-500 hover:text-white transition-colors">
          <ArrowDown size={24} />
        </button>
      </div>
    </section>
  );
};
