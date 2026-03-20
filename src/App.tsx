import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Power, 
  Settings, 
  Lock, 
  Smartphone, 
  Code, 
  Download, 
  Info, 
  CheckCircle2, 
  AlertTriangle,
  ChevronRight,
  Terminal,
  Volume2,
  EyeOff
} from 'lucide-react';

// --- Design Recipe: Technical Dashboard / Data Grid ---
const RecipeStyles = () => (
  <style>{`
    :root {
      --bg: #0a0a0a;
      --ink: #ffffff;
      --accent: #ff3b30;
      --line: #333333;
      --f-mono: 'JetBrains Mono', monospace;
      --f-sans: 'Inter', sans-serif;
    }

    body {
      background-color: var(--bg);
      color: var(--ink);
      font-family: var(--f-sans);
    }

    .data-row {
      display: grid;
      grid-template-columns: 40px 1.5fr 1fr 1fr;
      padding: 1rem;
      border-bottom: 1px solid var(--line);
      transition: background 0.2s ease, color 0.2s ease;
      cursor: pointer;
    }

    .data-row:hover {
      background: var(--ink);
      color: var(--bg);
    }

    .col-header {
      font-family: 'Georgia', serif;
      font-style: italic;
      font-size: 11px;
      opacity: 0.5;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 0.5rem 1rem;
      border-bottom: 1px solid var(--line);
    }

    .data-value {
      font-family: var(--f-mono);
      letter-spacing: -0.02em;
    }

    .terminal-box {
      background: #111;
      border: 1px solid var(--line);
      padding: 1rem;
      font-family: var(--f-mono);
      font-size: 13px;
      color: #00ff00;
      overflow-x: auto;
    }

    .glass-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 12px;
    }
  `}</style>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isStealthOn, setIsStealthOn] = useState(false);
  const [showFakePower, setShowFakePower] = useState(false);
  const [isStealthActive, setIsStealthActive] = useState(false);

  const toggleStealth = () => {
    setIsStealthOn(!isStealthOn);
  };

  const triggerFakePower = () => {
    if (isStealthOn) {
      setShowFakePower(true);
    } else {
      alert("Enable Stealth Mode first to intercept power button!");
    }
  };

  const confirmFakePowerOff = () => {
    setShowFakePower(false);
    setIsStealthActive(true);
    // In real app, this would be a black screen
  };

  const exitStealth = () => {
    setIsStealthActive(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <RecipeStyles />
      
      {/* Header */}
      <header className="border-b border-[#333] p-6 flex justify-between items-center sticky top-0 bg-[#0a0a0a] z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
            <EyeOff className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter uppercase">PhantomOff</h1>
            <p className="text-[10px] opacity-50 font-mono">v1.0.0 // ANTI-THEFT STEALTH ENGINE</p>
          </div>
        </div>
        <nav className="flex gap-6 text-xs font-mono uppercase tracking-widest">
          {['overview', 'simulation', 'code', 'build'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-1 border-b-2 transition-all ${activeTab === tab ? 'border-red-600 text-red-600' : 'border-transparent opacity-50 hover:opacity-100'}`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-8">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h2 className="text-4xl font-light mb-4 italic serif">Project Concept</h2>
                  <p className="text-lg opacity-70 leading-relaxed">
                    PhantomOff is a high-security stealth application designed to thwart thieves. 
                    When a thief attempts to turn off the phone to prevent tracking, PhantomOff 
                    intercepts the action, displays a <span className="text-red-500">pixel-perfect fake shutdown screen</span>, 
                    and enters a "Phantom State" where the phone appears dead but remains fully operational 
                    for remote tracking and data recovery.
                  </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="glass-card p-6 border-l-4 border-red-600">
                    <Power className="mb-4 text-red-600" />
                    <h3 className="text-xl font-bold mb-2">Power Interception</h3>
                    <p className="text-sm opacity-60">Uses Android AccessibilityService to suppress the real GlobalActions dialog and show our custom UI.</p>
                  </div>
                  <div className="glass-card p-6 border-l-4 border-zinc-500">
                    <Lock className="mb-4 text-zinc-500" />
                    <h3 className="text-xl font-bold mb-2">Secret Unlock</h3>
                    <p className="text-sm opacity-60">Restore the device state only with a specific hardware button sequence (Volume Down x3, Up x2).</p>
                  </div>
                </div>

                <section className="space-y-4">
                  <h3 className="text-xl font-mono uppercase tracking-widest opacity-50">Technical Stack</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Flutter', 'Kotlin', 'MethodChannel', 'Accessibility API'].map(tech => (
                      <div key={tech} className="border border-[#333] p-3 text-center font-mono text-xs uppercase">
                        {tech}
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="space-y-6">
                <div className="glass-card p-6 bg-red-950/20">
                  <h3 className="text-sm font-mono uppercase mb-4 flex items-center gap-2">
                    <AlertTriangle size={14} className="text-red-500" />
                    Security Notice
                  </h3>
                  <p className="text-xs opacity-70 mb-4">
                    This app requires high-level Android permissions. It is intended for anti-theft and personal security use cases.
                  </p>
                  <ul className="text-[10px] font-mono space-y-2 opacity-50">
                    <li className="flex items-center gap-2"><CheckCircle2 size={10} /> ACCESSIBILITY_SERVICE</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={10} /> MODIFY_AUDIO_SETTINGS</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={10} /> RECEIVE_BOOT_COMPLETED</li>
                  </ul>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-sm font-mono uppercase mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] opacity-50 uppercase">Code Quality</span>
                      <span className="text-xl font-mono">A+</span>
                    </div>
                    <div className="w-full bg-[#222] h-1">
                      <div className="bg-red-600 h-full w-[95%]"></div>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] opacity-50 uppercase">Stealth Level</span>
                      <span className="text-xl font-mono">MAX</span>
                    </div>
                    <div className="w-full bg-[#222] h-1">
                      <div className="bg-red-600 h-full w-[100%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'simulation' && (
            <motion.div 
              key="simulation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <div className="relative w-[320px] h-[640px] bg-black rounded-[40px] border-[8px] border-[#222] shadow-2xl overflow-hidden flex flex-col">
                {/* Phone Screen Content */}
                <div className="flex-1 bg-zinc-900 p-6 flex flex-col">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center mb-8 opacity-50 text-[10px] font-mono">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <Smartphone size={10} />
                      <div className="w-4 h-2 border border-white/50 rounded-sm"></div>
                    </div>
                  </div>

                  {isStealthActive ? (
                    <div className="absolute inset-0 bg-black z-[100] flex flex-col items-center justify-center p-8 text-center">
                      <p className="text-zinc-800 text-xs font-mono">SCREEN IS OFF (SIMULATED)</p>
                      <button 
                        onClick={exitStealth}
                        className="mt-8 text-[10px] text-zinc-700 hover:text-zinc-500 transition-colors"
                      >
                        [ PRESS SECRET COMBO TO EXIT ]
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-8">
                        <h2 className="text-xl font-bold mb-1">PhantomOff</h2>
                        <p className="text-[10px] opacity-50 uppercase tracking-widest">Control Center</p>
                      </div>

                      <div className="space-y-4">
                        <div className={`p-4 rounded-xl border transition-all ${isStealthOn ? 'bg-red-600/10 border-red-600/50' : 'bg-white/5 border-white/10'}`}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold">Stealth Mode</span>
                            <button 
                              onClick={toggleStealth}
                              className={`w-10 h-5 rounded-full relative transition-colors ${isStealthOn ? 'bg-red-600' : 'bg-zinc-700'}`}
                            >
                              <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isStealthOn ? 'right-1' : 'left-1'}`}></div>
                            </button>
                          </div>
                          <p className="text-[10px] opacity-50">
                            {isStealthOn ? 'INTERCEPTING POWER BUTTON' : 'SYSTEM PROTECTION DISABLED'}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <span className="text-[10px] opacity-50 uppercase block mb-2">Unlock Combo</span>
                          <div className="flex gap-2">
                            <div className="px-2 py-1 bg-white/10 rounded text-[10px] font-mono">VOL- x3</div>
                            <div className="px-2 py-1 bg-white/10 rounded text-[10px] font-mono">VOL+ x2</div>
                          </div>
                        </div>

                        <div className="mt-12 text-center">
                          <button 
                            onClick={triggerFakePower}
                            className="text-[10px] font-mono opacity-30 hover:opacity-100 transition-opacity"
                          >
                            [ SIMULATE POWER LONG-PRESS ]
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Fake Power Menu Overlay */}
                <AnimatePresence>
                  {showFakePower && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
                    >
                      <motion.div 
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        className="bg-zinc-800 w-full rounded-2xl overflow-hidden shadow-2xl"
                      >
                        <div className="p-6 space-y-4">
                          <button 
                            onClick={confirmFakePowerOff}
                            className="w-full flex items-center gap-4 p-4 hover:bg-white/5 rounded-xl transition-colors"
                          >
                            <div className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center">
                              <Power size={20} className="text-white" />
                            </div>
                            <div className="text-left">
                              <p className="font-bold">Power off</p>
                            </div>
                          </button>
                          <button className="w-full flex items-center gap-4 p-4 hover:bg-white/5 rounded-xl transition-colors">
                            <div className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center">
                              <Smartphone size={20} className="text-white" />
                            </div>
                            <div className="text-left">
                              <p className="font-bold">Restart</p>
                            </div>
                          </button>
                          <button className="w-full flex items-center gap-4 p-4 hover:bg-white/5 rounded-xl transition-colors">
                            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                              <AlertTriangle size={20} className="text-white" />
                            </div>
                            <div className="text-left">
                              <p className="font-bold text-red-500">Emergency</p>
                            </div>
                          </button>
                        </div>
                        <button 
                          onClick={() => setShowFakePower(false)}
                          className="w-full p-4 border-t border-white/5 text-xs font-mono opacity-50 hover:opacity-100"
                        >
                          CANCEL
                        </button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <p className="mt-8 text-xs font-mono opacity-50 uppercase tracking-[0.2em]">Interactive Simulation Environment</p>
            </motion.div>
          )}

          {activeTab === 'code' && (
            <motion.div 
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-end">
                <h2 className="text-3xl font-light italic serif">Source Explorer</h2>
                <div className="text-[10px] font-mono opacity-50">8 FILES GENERATED // KOTLIN + DART</div>
              </div>

              <div className="border border-[#333] rounded-xl overflow-hidden">
                <div className="col-header grid grid-cols-4 font-mono opacity-50 text-[9px]">
                  <span>FILE NAME</span>
                  <span>PATH</span>
                  <span>LANGUAGE</span>
                  <span>SIZE</span>
                </div>
                <div className="divide-y divide-[#333]">
                  {[
                    { name: 'main.dart', path: 'lib/', lang: 'Dart', size: '2.4 KB' },
                    { name: 'MainActivity.kt', path: 'android/.../', lang: 'Kotlin', size: '1.8 KB' },
                    { name: 'PhantomAccessibilityService.kt', path: 'android/.../', lang: 'Kotlin', size: '3.1 KB' },
                    { name: 'StealthActivity.kt', path: 'android/.../', lang: 'Kotlin', size: '4.2 KB' },
                    { name: 'AndroidManifest.xml', path: 'android/.../', lang: 'XML', size: '1.5 KB' },
                  ].map((file, i) => (
                    <div key={i} className="data-row hover:bg-white hover:text-black transition-colors group">
                      <div className="flex items-center gap-2">
                        <Code size={14} className="opacity-50 group-hover:opacity-100" />
                        <span className="font-bold text-xs">{file.name}</span>
                      </div>
                      <span className="text-[10px] font-mono opacity-50">{file.path}</span>
                      <span className="text-[10px] font-mono opacity-50">{file.lang}</span>
                      <span className="text-[10px] font-mono opacity-50">{file.size}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-sm font-mono uppercase mb-4 flex items-center gap-2">
                  <Terminal size={14} />
                  Code Structure Overview
                </h3>
                <div className="terminal-box">
                  {`phantom_off/
├── lib/
│   └── main.dart (UI & MethodChannel)
└── android/
    └── app/src/main/
        ├── AndroidManifest.xml (Permissions & Services)
        ├── kotlin/com/example/phantomoff/
        │   ├── MainActivity.kt (Entry point)
        │   ├── PhantomAccessibilityService.kt (Power Interception)
        │   ├── StealthActivity.kt (Fake Off State)
        │   └── StealthForegroundService.kt (Persistence)
        └── res/xml/
            └── accessibility_service_config.xml`}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'build' && (
            <motion.div 
              key="build"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-3xl mx-auto space-y-8"
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto border border-green-600/50">
                  <Download className="text-green-500" />
                </div>
                <h2 className="text-4xl font-light italic serif">Deployment Guide</h2>
                <p className="opacity-60">Follow these steps to compile the PhantomOff APK for Android 10+.</p>
              </div>

              <div className="space-y-4">
                {[
                  { step: '01', title: 'Initialize Project', desc: 'Create a new Flutter project named phantom_off and replace the generated files with the source code provided in the Code tab.' },
                  { step: '02', title: 'Configure Permissions', desc: 'Ensure AndroidManifest.xml includes the Accessibility and Foreground Service permissions as shown in the source.' },
                  { step: '03', title: 'Build Release APK', desc: 'Run the following command in your terminal:', code: 'flutter build apk --release' },
                  { step: '04', title: 'Install & Setup', desc: 'Transfer the APK to your device, install, and enable the Accessibility Service in Android Settings > Accessibility.' },
                ].map((item, i) => (
                  <div key={i} className="glass-card p-6 flex gap-6 items-start">
                    <span className="text-2xl font-mono text-red-600 opacity-50">{item.step}</span>
                    <div className="space-y-2">
                      <h4 className="font-bold uppercase tracking-widest text-sm">{item.title}</h4>
                      <p className="text-xs opacity-60 leading-relaxed">{item.desc}</p>
                      {item.code && (
                        <div className="bg-black p-3 rounded font-mono text-[10px] text-green-500 border border-white/5">
                          $ {item.code}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 border-t border-[#333] text-center">
                <p className="text-[10px] font-mono opacity-30 uppercase tracking-[0.3em]">End of Documentation // PhantomOff v1.0</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#333] p-4 text-[9px] font-mono opacity-30 flex justify-between uppercase tracking-widest">
        <span>© 2026 PHANTOMOFF SECURITY SYSTEMS</span>
        <span>ENCRYPTED_TRANSMISSION_STABLE</span>
      </footer>
    </div>
  );
}
