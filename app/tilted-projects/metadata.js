import projectsData from '../../config/projectsData';

export default function generateMetadata() {
  return {
    title: `${projectsData.projectPageText.title} | Portfolio`,
    description: projectsData.projectPageText.description,
  };
}