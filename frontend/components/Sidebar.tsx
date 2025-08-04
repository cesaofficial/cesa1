
import React from 'react';

interface SidebarProps {
  teamNames: string[];
  activeTeam: string;
}

// A helper function to generate consistent IDs for scrolling
const generateTeamId = (teamName: string) => {
  return teamName.replace(/ & /g, '-').replace(/\s+/g, '-').toLowerCase();
};

const Sidebar: React.FC<SidebarProps> = ({ teamNames, activeTeam }) => {
  const handleScrollToTeam = (teamName: string) => {
    const element = document.getElementById(generateTeamId(teamName));
    if (element) {
      // Offset to account for the taller sticky navigation bar
      const yOffset = -220; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className="py-3">
        <ul className="flex items-center justify-center flex-wrap gap-x-3 gap-y-2">
        {teamNames.map(name => {
          const isActive = name === activeTeam;
          return (
            <li key={name}>
            <button
                onClick={() => handleScrollToTeam(name)}
                className={`w-full text-left px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#1A1A1A] ${
                  isActive 
                  ? 'bg-[#0d6efd] text-white' 
                  : 'text-slate-300 hover:bg-violet-500/10 hover:text-violet-400'
                }`}
            >
                {name}
            </button>
            </li>
          );
        })}
        </ul>
    </nav>
  );
};

export default Sidebar;
