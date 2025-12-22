'use client';
import { motion } from 'framer-motion';
import GlareHover from './GlareHover';
import GradientText from './GradientText';
import './GlareHover.css';
import userInfo from '../config/userInfo';

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center justify-center"
    >
      <div className="container mx-auto px-4 py-12">
        {/* Centered Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
          >
            <span className="text-blue-400">✨</span>
            <span className="text-white text-sm font-medium">Teknik Mekatronika</span>
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={8}
              showBorder={false}
              className="hero-name-gradient"
            >
              Khayyis Billawal Rozikin
            </GradientText>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 mb-4">
            Siswa SMKN 4 Jakarta
          </p>

          <p className="text-base md:text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Berfokus pada pengembangan robotik, desain 3D, dan teknologi AI. Aktif dalam kompetisi LKS Autonomous Mobile Robotic.
          </p>

          {/* Buttons */}
          <div className="flex flex-row gap-4 justify-center">
            <GlareHover
              height="52px"
              width="auto"
              background="#ffffff"
              borderRadius="999px"
              glareColor="#3B82F6"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
            >
              <a
                href="#projects"
                className="px-8 h-full flex items-center justify-center text-gray-900 font-semibold text-base no-underline select-none bg-transparent border-none"
                title="Lihat proyek saya"
              >
                Lihat Proyek
              </a>
            </GlareHover>

            <GlareHover
              height="52px"
              width="auto"
              background="transparent"
              borderRadius="999px"
              borderColor="rgba(255,255,255,0.3)"
              glareColor="#ffffff"
              glareOpacity={0.2}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
            >
              <a
                href="#kontak"
                className="px-8 h-full flex items-center justify-center text-white font-semibold text-base no-underline select-none bg-transparent border-none"
                title="Hubungi saya"
              >
                Hubungi Saya
              </a>
            </GlareHover>
          </div>
        </motion.div>
      </div>
    </section>
  );
}