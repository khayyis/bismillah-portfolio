'use client';

import React, { createContext, useContext, useState } from 'react';

const ProjectModalContext = createContext({
  activeModalProject: null,
  setActiveModalProject: () => {},
  openProjectById: () => {},
  triggerHaptic: () => {}
});

export function ProjectModalProvider({ children }) {
  const [activeModalProject, setActiveModalProject] = useState(null);

  const triggerHaptic = (style = 'medium') => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        const duration = style === 'light' ? 10 : style === 'heavy' ? 40 : 20;
        navigator.vibrate(duration);
      } catch {
        // Haptic feedback not supported on current device
      }
    }
  };

  const openProjectById = (projectId, allProjects = []) => {
    triggerHaptic('light');
    const found = allProjects.find((p) => p.id === projectId);
    if (found) {
      setActiveModalProject(found);
    } else {
      const el = document.getElementById('proyek');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ProjectModalContext.Provider
      value={{
        activeModalProject,
        setActiveModalProject,
        openProjectById,
        triggerHaptic
      }}
    >
      {children}
    </ProjectModalContext.Provider>
  );
}

export function useProjectModal() {
  return useContext(ProjectModalContext);
}
