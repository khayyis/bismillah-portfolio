/**
 * File konfigurasi untuk skill dan kemampuan yang ditampilkan
 * Ubah nilai-nilai di bawah ini sesuai dengan skill dan kemampuan Anda
 */

const skillsConfig = {
  // Kategori skill teknis dengan persentase kemampuan
  technicalSkills: [
    { name: "Robotics Programming", percentage: 85 },
    { name: "3D Design", percentage: 80 },
    { name: "Electronics", percentage: 90 },
    { name: "Embedded Systems", percentage: 75 },
    { name: "Computer Vision", percentage: 70 },
    { name: "Web Development", percentage: 65 },
    { name: "Photography", percentage: 88 },
  ],
  
  // Kategori skill perangkat lunak
  softwareSkills: [
    { name: "Arduino", icon: "arduino" },
    { name: "Fusion 360", icon: "fusion360" },
    { name: "SolidWorks", icon: "solidworks" },
    { name: "Python", icon: "python" },
    { name: "C++", icon: "cpp" },
    { name: "React", icon: "react" },
    { name: "Adobe Lightroom", icon: "lightroom" },
    { name: "Adobe Photoshop", icon: "photoshop" },
  ],
  
  // Kategori soft skills
  softSkills: [
    "Problem Solving",
    "Team Collaboration",
    "Project Management",
    "Critical Thinking",
    "Adaptability",
    "Communication",
  ],
  
  // Sertifikasi dan penghargaan
  certifications: [
    {
      title: "LKS Autonomous Mobile Robotic",
      issuer: "Dinas Pendidikan",
      date: "2023",
      credentialUrl: "#"
    },
    {
      title: "Embedded Systems Programming",
      issuer: "Dicoding Indonesia",
      date: "2022",
      credentialUrl: "#"
    },
    {
      title: "3D Design Fundamentals",
      issuer: "Autodesk",
      date: "2022",
      credentialUrl: "#"
    },
  ],
};

export default skillsConfig;