import React from 'react';
import { Hero } from './components/Hero';
import { BioGenerator } from './components/BioGenerator';
import { ChatWidget } from './components/ChatWidget';
import { Github, Twitter, Linkedin, Code } from 'lucide-react';

const App: React.FC = () => {
  const scrollToBio = () => {
    document.getElementById('bio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <header className="fixed top-0 w-full z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-brand-600 p-1.5 rounded-lg">
              <Code size={20} className="text-white" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight">OneWeb</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Home</a>
            <a href="#bio" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Generator</a>
            <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Portfolio</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <Hero onScrollDown={scrollToBio} />
        <BioGenerator />
        
        {/* Placeholder Projects Section */}
        <section className="py-24 px-4 bg-slate-950">
            <div className="max-w-6xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Work</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    A curated selection of digital experiences. This section represents the static content typically found in portfolios, contrasting with the dynamic AI features above.
                </p>
            </div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="group relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-brand-500/50 transition-all duration-300">
                        <div className="aspect-video bg-slate-800 relative overflow-hidden">
                             <img 
                                src={`https://picsum.photos/800/600?random=${item}`} 
                                alt="Project preview" 
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                             />
                             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-400 transition-colors">Project {item}</h3>
                            <p className="text-slate-400 text-sm mb-4">A sample project description showcasing React patterns and modern UI design principles.</p>
                            <span className="text-xs font-semibold text-brand-500 uppercase tracking-wider">View Case Study</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} One Website Experience. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
};

export default App;
