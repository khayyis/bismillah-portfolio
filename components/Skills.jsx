'use client';
import { motion } from 'framer-motion';
import ShinyText from './ShinyText';
import Carousel from './Carousel';
import { FiCpu, FiCodesandbox, FiCommand, FiMessageSquare, FiStar } from 'react-icons/fi';
import GlareHover from './GlareHover';
import ScrollReveal from './ScrollReveal';
import './GlareHover.css';
import { useRouter } from 'next/navigation';
import { useAnimationReady } from '../hooks/useAnimationReady';
import { useSkills } from '../hooks/useProfile';

// Default skills jika database kosong
const defaultSkillList = [
	{
		title: 'Autonomous Mobile Robotic',
		description:
			'Pengalaman dalam kompetisi LKS bidang robotik dan otomasi. Memahami pemrograman dan kontrol perangkat robotik.',
		id: 1,
		icon: <FiCpu className="carousel-icon" />,
	},
	{
		title: 'Desain 3D',
		description:
			'Keahlian dalam pembuatan model 3D menggunakan berbagai software desain untuk prototyping dan visualisasi proyek.',
		id: 2,
		icon: <FiCodesandbox className="carousel-icon" />,
	},
	{
		title: 'Prompt Engineering AI',
		description:
			'Kemampuan dalam membuat prompt yang efektif untuk berbagai model AI, mengoptimalkan hasil generasi konten dan kode.',
		id: 3,
		icon: <FiCommand className="carousel-icon" />,
	},
	{
		title: 'Pengembangan Chatbot',
		description:
			'Pengalaman dalam membuat dan mengembangkan chatbot WhatsApp dengan integrasi berbagai API dan fungsi otomatisasi.',
		id: 4,
		icon: <FiMessageSquare className="carousel-icon" />,
	},
	{
		title: 'Fotografi',
		description:
			'Keahlian dalam fotografi landscape dan potret dengan penguasaan teknik pencahayaan, komposisi, dan editing foto profesional.',
		id: 5,
		icon: <FiCodesandbox className="carousel-icon" />,
	},
];

// Map emoji to React icons
const iconMap = {
	'🟨': <FiCommand className="carousel-icon" />,
	'⚛️': <FiCodesandbox className="carousel-icon" />,
	'🟩': <FiCpu className="carousel-icon" />,
	'🐍': <FiCommand className="carousel-icon" />,
	'🔌': <FiCpu className="carousel-icon" />,
	'🎨': <FiCodesandbox className="carousel-icon" />,
	'⚡': <FiStar className="carousel-icon" />,
	'💻': <FiCommand className="carousel-icon" />,
	'🤖': <FiCpu className="carousel-icon" />,
	'📷': <FiCodesandbox className="carousel-icon" />,
	'💬': <FiMessageSquare className="carousel-icon" />,
};

export default function Skills() {
	const router = useRouter();
	const isAnimationReady = useAnimationReady(200);
	const { skills, isLoaded } = useSkills();

	// Convert database skills to carousel format
	const skillList = skills.length > 0
		? skills.map((skill, index) => ({
			id: index + 1,
			title: skill.name,
			description: skill.description || (skill.category ? `${skill.category} - Level ${skill.level}%` : `Skill Level: ${skill.level}%`),
			icon: iconMap[skill.icon] || <FiStar className="carousel-icon" />,
		}))
		: defaultSkillList;

	const navigateToProjects = () => {
		const projectsSection = document.getElementById('projects');
		if (projectsSection) {
			projectsSection.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<section id="keahlian" className="py-12 md:py-20">
			<div className="container mx-auto px-4">
				<div className="text-center mb-10 md:mb-16">
					<ScrollReveal
						baseOpacity={0.3}
						enableBlur={true}
						baseRotation={3}
						blurStrength={5}
						wordAnimationEnd="center center"
						textClassName="text-2xl md:text-3xl lg:text-4xl font-heading text-white"
					>
						Keahlian
					</ScrollReveal>
					<p className="max-w-2xl mx-auto text-sm md:text-body text-gray-300 px-2 mt-4">
						Berikut adalah bidang keahlian yang saya tekuni dan kembangkan dalam
						perjalanan karir saya di bidang teknologi.
					</p>
				</div>

				<motion.div
					className="flex justify-center"
					initial={{ opacity: 0 }}
					whileInView={isAnimationReady ? { opacity: 1 } : { opacity: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.8 }}
				>
					<div
						className="carousel-wrapper mx-auto"
						style={{
							height: '400px',
							position: 'relative',
							width: '100%',
							maxWidth: '350px',
						}}
					>
						<Carousel
							items={skillList}
							baseWidth={330}
							autoplay={true}
							autoplayDelay={4000}
							pauseOnHover={true}
							loop={true}
							round={false}
						/>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={isAnimationReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="mt-10 md:mt-16 text-center"
				>
					<div className="flex justify-center">
						<GlareHover
							height="48px"
							width="220px"
							background="#2563eb"
							borderRadius="8px"
							glareColor="#ffffff"
							glareOpacity={0.3}
							glareAngle={-30}
							glareSize={300}
							transitionDuration={800}
						>
							<a
								href="#projects"
								onClick={(e) => {
									e.preventDefault();
									navigateToProjects();
								}}
								className="w-full h-full flex items-center justify-center text-white font-semibold text-base no-underline select-none bg-transparent border-none cursor-pointer"
								aria-label="Lihat Proyek Saya"
							>
								<div className="button-text">Lihat Proyek Saya</div>
							</a>
						</GlareHover>
					</div>
				</motion.div>
			</div>
		</section>
	);
}