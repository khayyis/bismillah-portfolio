'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTelegramWebApp } from './TelegramWebAppProvider';
import { Play, RotateCcw, Cpu, Activity, Sliders, Sparkles } from 'lucide-react';

export default function InteractiveLab() {
  const { triggerHaptic } = useTelegramWebApp();
  const [activeTab, setActiveTab] = useState('pid'); // 'pid' | 'ecu'
  
  // PID state
  const [kp, setKp] = useState(2.4);
  const [ki, setKi] = useState(0.8);
  const [targetSpeed, setTargetSpeed] = useState(60);
  
  // ECU state
  const [rpm, setRpm] = useState(4500);
  const [isSampling, setIsSampling] = useState(true);

  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  // Real-time canvas simulation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const render = () => {
      time += 0.05;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Background grid lines (engineering graph paper)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (activeTab === 'pid') {
        // Draw target line
        const targetY = height - (targetSpeed / 100) * (height - 40) - 20;
        ctx.strokeStyle = 'rgba(137, 111, 255, 0.4)';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(0, targetY);
        ctx.lineTo(width, targetY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Label target
        ctx.fillStyle = '#896fff';
        ctx.font = '10px monospace';
        ctx.fillText(`TARGET: ${targetSpeed} cm/s`, 10, targetY - 6);

        // Compute PID closed-loop step response curve
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        
        let currentY = height - 20;
        let vel = 0;
        let integral = 0;

        for (let x = 0; x < width; x += 3) {
          const tRel = (x / width) * 5;
          const error = targetSpeed - (height - 20 - currentY);
          integral += error * 0.02;
          const u = kp * error + ki * integral;
          vel += (u - vel * 0.5) * 0.03;
          currentY = Math.max(20, Math.min(height - 20, currentY - vel));

          if (x === 0) {
            ctx.moveTo(x, currentY);
          } else {
            ctx.lineTo(x, currentY);
          }
        }
        ctx.stroke();

        // Pulsing marker at tip
        ctx.fillStyle = '#60a5fa';
        ctx.beginPath();
        ctx.arc(width - 15, currentY, 4, 0, Math.PI * 2);
        ctx.fill();

      } else {
        // ECU 16Hz Sensor Waveform
        const freq = (rpm / 6000) * 8;
        const midY = height / 2;

        // RPM Sinusoidal Signal
        ctx.strokeStyle = '#896fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x < width; x += 2) {
          const y = midY + Math.sin((x * 0.04 * freq) - time * 4) * (height * 0.28);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Square Wave Trigger Pulse (Crank Position Sensor)
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let x = 0; x < width; x += 2) {
          const sq = Math.sin((x * 0.02 * freq) - time * 4) > 0 ? 1 : -1;
          const y = midY + 40 + sq * 20;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.fillStyle = '#896fff';
        ctx.font = '10px monospace';
        ctx.fillText(`UART TELEMETRI: ${rpm} RPM (16Hz SAMPLING)`, 10, 20);
        ctx.fillStyle = '#10b981';
        ctx.fillText(`CRANK PULSE SENSOR: ACTIVE`, 10, 36);
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [activeTab, kp, ki, targetSpeed, rpm]);

  return (
    <section id="lab" className="border-b border-white/[0.08] bg-[#07080b] py-14 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-white/[0.08] pb-6 mb-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#896fff]"></span>
              <span className="cap-small text-[#896fff]">
                [ EXPERIMENTAL LAB / INTERACTIVE SIMULATION ]
              </span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white lowercase">
              we also engineer interactive simulations.
            </h2>
            <p className="mt-1.5 text-xs text-zinc-400">
              Eksplorasi respons kendali PID robotika dan waveform telemetri sensor ECU langsung di browser.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="mt-4 md:mt-0 flex items-center gap-2 bg-zinc-950 p-1.5 rounded-full border border-white/[0.08]">
            <button
              type="button"
              onClick={() => {
                triggerHaptic('light');
                setActiveTab('pid');
              }}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'pid'
                  ? 'bg-[#896fff] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Cpu className="h-3.5 w-3.5" />
              <span>PID Kinematika</span>
            </button>
            <button
              type="button"
              onClick={() => {
                triggerHaptic('light');
                setActiveTab('ecu');
              }}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'ecu'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Activity className="h-3.5 w-3.5" />
              <span>ECU Telemetri</span>
            </button>
          </div>
        </div>

        {/* Interactive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Canvas Simulation Display */}
          <div className="lg:col-span-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950 p-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-[11px] font-mono text-zinc-400">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>REAL-TIME ENGINE DISPLAY</span>
              </span>
              <span className="text-zinc-500">60 FPS CANVAS ACCELERATION</span>
            </div>

            <div className="relative mt-3 h-64 sm:h-80 w-full overflow-hidden rounded-xl bg-[#090a0f]">
              <canvas
                ref={canvasRef}
                width={800}
                height={340}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-zinc-400 px-1">
              <span>STATUS: CLOSED-LOOP ACTIVE</span>
              <span>STANDAR: ISO 2768-1 / 16Hz UART</span>
            </div>
          </div>

          {/* Interactive Sliders Panel */}
          <div className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-zinc-950/70 p-6 flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-white/[0.08]">
                <Sliders className="h-4 w-4 text-[#896fff]" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  {activeTab === 'pid' ? 'Parameter Kendali PID' : 'Parameter Sensor ECU'}
                </h3>
              </div>

              {activeTab === 'pid' ? (
                <div className="mt-5 space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-zinc-400">Gain Proportional (Kp):</span>
                      <span className="font-bold text-[#896fff]">{kp}</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="5.0"
                      step="0.1"
                      value={kp}
                      onChange={(e) => setKp(parseFloat(e.target.value))}
                      className="w-full accent-[#896fff] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-zinc-400">Gain Integral (Ki):</span>
                      <span className="font-bold text-blue-400">{ki}</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="2.5"
                      step="0.1"
                      value={ki}
                      onChange={(e) => setKi(parseFloat(e.target.value))}
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-zinc-400">Target Kecepatan (cm/s):</span>
                      <span className="font-bold text-emerald-400">{targetSpeed}</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="90"
                      step="5"
                      value={targetSpeed}
                      onChange={(e) => setTargetSpeed(parseInt(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-zinc-400">Putaran Mesin (RPM):</span>
                      <span className="font-bold text-[#896fff]">{rpm} RPM</span>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="9500"
                      step="250"
                      value={rpm}
                      onChange={(e) => setRpm(parseInt(e.target.value))}
                      className="w-full accent-[#896fff] cursor-pointer"
                    />
                  </div>

                  <div className="p-3 rounded-lg border border-white/[0.08] bg-zinc-900/60 font-mono text-[11px] space-y-1 text-zinc-300">
                    <div className="flex justify-between">
                      <span>Protokol:</span>
                      <span className="text-white font-bold">K-Line UART</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sampling Rate:</span>
                      <span className="text-emerald-400 font-bold">16 Samples/sec</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Konektor:</span>
                      <span className="text-blue-400 font-bold">USB FT232R</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="font-mono text-[10px] text-zinc-500">
                PROVEN IN HARDWARE
              </span>
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('medium');
                  setKp(2.4);
                  setKi(0.8);
                  setTargetSpeed(60);
                  setRpm(4500);
                }}
                className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Default</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
