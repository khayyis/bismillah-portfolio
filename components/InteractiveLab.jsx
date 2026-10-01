'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useProjectModal } from './ProjectModalProvider';
import { RotateCcw, Cpu, Activity, Sliders } from 'lucide-react';

export default function InteractiveLab() {
  const { triggerHaptic } = useProjectModal();
  const [activeTab, setActiveTab] = useState('pid'); // 'pid' | 'pwm'
  
  // PID state
  const [kp, setKp] = useState(2.4);
  const [ki, setKi] = useState(0.8);
  const [targetSpeed, setTargetSpeed] = useState(60);
  
  // Motor PWM state
  const [dutyCycle, setDutyCycle] = useState(65);

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
        // Motor PWM Actuator Waveform
        const period = 50;
        const onWidth = (dutyCycle / 100) * period;
        const midY = height / 2;
        const highY = midY - 40;
        const lowY = midY + 40;

        ctx.strokeStyle = '#896fff';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        
        const offset = (time * 60) % period;

        for (let x = -period; x < width + period; x += period) {
          const startX = x - offset;
          ctx.moveTo(startX, lowY);
          ctx.lineTo(startX, highY);
          ctx.lineTo(startX + onWidth, highY);
          ctx.lineTo(startX + onWidth, lowY);
          ctx.lineTo(startX + period, lowY);
        }
        ctx.stroke();

        ctx.fillStyle = '#896fff';
        ctx.font = '10px monospace';
        ctx.fillText(`MOTOR PWM SIGNAL: ${dutyCycle}% DUTY CYCLE (20kHz)`, 10, 24);
        ctx.fillStyle = '#10b981';
        ctx.fillText(`KONTROL KECEPATAN: AKTIF`, 10, 42);
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [activeTab, kp, ki, targetSpeed, dutyCycle]);

  return (
    <section id="lab" className="border-b border-white/[0.08] bg-[#07080b] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-white/[0.08] pb-6 mb-12">
          <div>
            <span className="cap-small text-[#896fff]">
              [ EXPERIMENTAL LAB / INTERACTIVE SIMULATION ]
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white lowercase">
              simulasi interaktif kinematika.
            </h2>
            <p className="mt-2 text-xs text-zinc-400">
              Eksplorasi respons kendali PID robotika dan modulasi sinyal aktuator motor langsung di browser.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="mt-6 md:mt-0 flex items-center gap-2 bg-zinc-950 p-1.5 rounded-full border border-white/[0.08]">
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
                setActiveTab('pwm');
              }}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'pwm'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Activity className="h-3.5 w-3.5" />
              <span>Sinyal Motor PWM</span>
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
              <span>STATUS: CLOSED-LOOP AKTIF</span>
              <span>STANDAR: ISO 2768-1 / KINEMATIKA</span>
            </div>
          </div>

          {/* Interactive Sliders Panel */}
          <div className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-zinc-950/70 p-6 flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-white/[0.08]">
                <Sliders className="h-4 w-4 text-[#896fff]" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  {activeTab === 'pid' ? 'Parameter Kendali PID' : 'Parameter Modulasi PWM'}
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
                      <span className="text-zinc-400">Siklus Kerja (Duty Cycle):</span>
                      <span className="font-bold text-[#896fff]">{dutyCycle}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="5"
                      value={dutyCycle}
                      onChange={(e) => setDutyCycle(parseInt(e.target.value))}
                      className="w-full accent-[#896fff] cursor-pointer"
                    />
                  </div>

                  <div className="p-3 rounded-lg border border-white/[0.08] bg-zinc-900/60 font-mono text-[11px] space-y-1 text-zinc-300">
                    <div className="flex justify-between">
                      <span>Frekuensi:</span>
                      <span className="text-white font-bold">20 kHz PWM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tegangan Motor:</span>
                      <span className="text-emerald-400 font-bold">12V - 24V DC</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Driver:</span>
                      <span className="text-blue-400 font-bold">H-Bridge MOSFET</span>
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
                  setDutyCycle(65);
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
