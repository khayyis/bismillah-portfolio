'use client';
import { motion } from 'framer-motion';
import userInfo from '../config/userInfo';
import socialConfig from '../config/socialConfig';
import ScrollReveal from './ScrollReveal';
import { useAnimationReady } from '../hooks/useAnimationReady';

export default function Contact() {
  const isAnimationReady = useAnimationReady(400);

  return (
    <section id="kontak" className="py-12 md:py-20 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <ScrollReveal
            baseOpacity={0.3}
            enableBlur={true}
            baseRotation={3}
            blurStrength={5}
            wordAnimationEnd="center center"
            textClassName="text-2xl md:text-3xl lg:text-4xl font-heading text-white"
          >
            Hubungi Saya
          </ScrollReveal>
          <p className="max-w-2xl mx-auto text-sm md:text-body text-gray-300 mt-4">
            Tertarik untuk berkolaborasi atau memiliki pertanyaan? Jangan ragu untuk menghubungi saya!
          </p>
        </div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={isAnimationReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-lg w-full"
          >
            <div className="bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg border border-white/10 hover:border-white/20 transition-all duration-300">
              <h3 className="text-xl md:text-h2 font-heading mb-4 md:mb-6">Informasi Kontak</h3>

              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs md:text-caption font-caption mb-1 opacity-80 font-medium">Email</h4>
                    <a
                      href={`mailto:${socialConfig.contact.email.address}?subject=${encodeURIComponent(socialConfig.contact.email.subject)}`}
                      className="text-sm md:text-body break-all hover:text-blue-300 transition-colors duration-300 flex items-center font-semibold"
                      title="Klik untuk mengirim email"
                    >
                      {socialConfig.contact.email.address}
                      <span className="ml-2 text-blue-300 text-xs font-normal">(Klik untuk email)</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs md:text-caption font-caption mb-1 opacity-80 font-medium">Instagram</h4>
                    <a
                      href={socialConfig.socialMedia.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm md:text-body hover:text-blue-300 transition-colors duration-300 flex items-center font-semibold"
                      title="Kunjungi profil Instagram saya"
                    >
                      {socialConfig.socialMedia.instagram.username}
                      <span className="ml-2 text-blue-300 text-xs font-normal">(Klik untuk kunjungi)</span>
                    </a>
                  </div>
                </div>

                {socialConfig.contact.telegram.enabled && (
                  <div className="flex items-start">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs md:text-caption font-caption mb-1 opacity-80 font-medium">Telegram</h4>
                      <a
                        href={socialConfig.contact.telegram.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm md:text-body hover:text-blue-300 transition-colors duration-300 flex items-center font-semibold"
                        title="Hubungi saya di Telegram"
                      >
                        @{socialConfig.contact.telegram.username}
                        <span className="ml-2 text-blue-300 text-xs font-normal">(Klik untuk chat)</span>
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs md:text-caption font-caption mb-1 opacity-80 font-medium">Sekolah</h4>
                    <p className="text-sm md:text-body font-semibold">{socialConfig.externalLinks.school.label}</p>
                    <p className="text-xs md:text-caption opacity-70 font-normal">{userInfo.department}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs md:text-caption font-caption mb-1 opacity-80 font-medium">Fotografi</h4>
                    <p className="text-sm md:text-body font-semibold">Landscape & Portrait Photography</p>
                    <p className="text-xs md:text-caption opacity-70 font-normal">Tersedia untuk sesi foto</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}