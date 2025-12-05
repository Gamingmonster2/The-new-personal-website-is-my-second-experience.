import React, { useState } from 'react';
import { Sparkles, RefreshCw, Copy, Check } from 'lucide-react';
import { generateBio } from '../services/geminiService';
import { BioInputs } from '../types';

export const BioGenerator: React.FC = () => {
  const [inputs, setInputs] = useState<BioInputs>({
    name: '',
    role: '',
    skills: '',
    hobby: '',
    tone: 'professional'
  });
  const [generatedBio, setGeneratedBio] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    if (!inputs.name || !inputs.role) return;
    setLoading(true);
    setGeneratedBio('');
    try {
      const result = await generateBio(inputs);
      setGeneratedBio(result);
    } catch (error) {
      setGeneratedBio("Sorry, I couldn't generate a bio right now. Please check the console.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedBio);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="bio" className="py-24 px-4 bg-slate-900 border-t border-slate-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Input Column */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-brand-500/10 rounded-lg text-brand-400">
              <Sparkles size={24} />
            </div>
            <h2 className="text-3xl font-bold text-white">AI Bio Generator</h2>
          </div>
          <p className="text-slate-400 mb-8">
            Don't know what to write for your "About Me"? Let Gemini craft the perfect persona for you.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={inputs.name}
                onChange={handleInputChange}
                placeholder="e.g. Alex Chen"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Current Role</label>
              <input
                type="text"
                name="role"
                value={inputs.role}
                onChange={handleInputChange}
                placeholder="e.g. Frontend Developer"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Key Skills</label>
              <input
                type="text"
                name="skills"
                value={inputs.skills}
                onChange={handleInputChange}
                placeholder="e.g. React, TypeScript, UI Design"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Hobby</label>
                <input
                    type="text"
                    name="hobby"
                    value={inputs.hobby}
                    onChange={handleInputChange}
                    placeholder="e.g. Hiking"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Tone</label>
                <select
                    name="tone"
                    value={inputs.tone}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="witty">Witty</option>
                    <option value="pirate">Pirate</option>
                </select>
                </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !inputs.name || !inputs.role}
              className={`w-full mt-4 py-4 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all ${
                loading || !inputs.name || !inputs.role
                  ? 'bg-slate-700 cursor-not-allowed text-slate-400'
                  : 'bg-brand-600 hover:bg-brand-500 shadow-lg hover:shadow-brand-500/20'
              }`}
            >
              {loading ? <RefreshCw className="animate-spin" /> : <Sparkles size={20} />}
              {loading ? 'Generating...' : 'Generate Bio'}
            </button>
          </div>
        </div>

        {/* Output Column */}
        <div className="relative h-full min-h-[400px] flex flex-col">
           {/* Decorative background elements */}
           <div className="absolute inset-0 bg-slate-800/50 rounded-2xl border border-slate-700 backdrop-blur-sm"></div>
           
           <div className="relative z-10 p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="text-xs text-slate-500 font-mono">bio_output.txt</span>
              </div>

              <div className="flex-1 font-serif text-lg leading-loose text-slate-200 whitespace-pre-wrap">
                {generatedBio ? (
                    <span className="animate-fade-in">{generatedBio}</span>
                ) : (
                    <span className="text-slate-600 italic">Your generated biography will appear here. Magic awaits...</span>
                )}
              </div>

              {generatedBio && (
                  <div className="mt-6 pt-6 border-t border-slate-700 flex justify-end">
                      <button 
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors"
                      >
                          {copied ? <Check size={16} /> : <Copy size={16} />}
                          {copied ? 'Copied!' : 'Copy to Clipboard'}
                      </button>
                  </div>
              )}
           </div>
        </div>

      </div>
    </section>
  );
};
