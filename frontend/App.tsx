// D:\ADITYA\python\cesa\frontend\src\App.tsx

import React, { useState, useEffect } from 'react';
import { TEAMS } from './constants';
import { Team } from './types';
import Sidebar from './components/Sidebar';
import TeamSection from './components/TeamSection';
// Import the up and down chevron icons from react-icons
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'; // <--- ADD THIS IMPORT

const generateTeamId = (teamName: string) => {
  return teamName.replace(/ & /g, '-').replace(/\s+/g, '-').toLowerCase();
};

const App: React.FC = () => {
  const teamNames = TEAMS.map(team => team.name);
  const [activeTeam, setActiveTeam] = useState<string>(teamNames[0]);
  const [isHeaderExpanded, setIsHeaderExpanded] = useState<boolean>(true); // Initial state: header is expanded

  useEffect(() => {
    // Intersection Observer for reveal animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -10% 0px',
    });

    const elementsToReveal = document.querySelectorAll('.reveal');
    elementsToReveal.forEach(el => observer.observe(el));

    // Scroll spy for active team
    const handleScroll = () => {
      // Adjust headerHeight based on whether the header is expanded or not.
      const headerHeight = isHeaderExpanded ? 220 : 60; // Approx height when expanded vs. collapsed
      const viewportTop = headerHeight;
      const viewportBottom = window.innerHeight;

      let maxVisibleRatio = 0;
      let mostVisibleTeam = '';

      TEAMS.forEach(team => {
        const element = document.getElementById(generateTeamId(team.name));
        if (element) {
          const rect = element.getBoundingClientRect();
          const visibleTop = Math.max(rect.top, viewportTop);
          const visibleBottom = Math.min(rect.bottom, viewportBottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visibleRatio = rect.height > 0 ? visibleHeight / rect.height : 0;

          if (visibleRatio > maxVisibleRatio) {
            maxVisibleRatio = visibleRatio;
            mostVisibleTeam = team.name;
          }
        }
      });

      if (mostVisibleTeam && maxVisibleRatio > 0.01) {
         setActiveTeam(mostVisibleTeam);
      } else {
        // Fallback for when no team section is significantly visible
        if (window.scrollY < (isHeaderExpanded ? 200 : 50)) {
          setActiveTeam(teamNames[0]);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [teamNames, isHeaderExpanded]);

  // Function to toggle the header expansion state
  const toggleHeader = () => {
    setIsHeaderExpanded(prev => !prev);
  };

  return (
    <>
      <div className="background-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      <div className="relative z-10 min-h-screen font-sans text-slate-300 selection:bg-violet-500/30">

        <div className="sticky top-0 z-20 bg-[#0D0D0D]/80 backdrop-blur-lg border-b border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center pt-6 pb-2 relative">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-br from-slate-100 to-slate-400 bg-clip-text text-transparent">
                Meet The Team 2025-26
              </h1>
              {/* The minimize/maximize button - MODIFIED HERE */}
              <button
                onClick={toggleHeader}
                className="absolute right-4 bottom-2 bg-slate-700 hover:bg-slate-600 text-white text-sm px-3 py-1 rounded-md transition-colors duration-200 flex items-center justify-center" // Added flex, items-center, justify-center
                aria-expanded={isHeaderExpanded}
                aria-controls="collapsible-team-info"
              >
                {isHeaderExpanded ? (
                  <>
                    <FaChevronUp className="text-lg" /> {/* Up arrow when expanded */}
                    {/* Optional: Add "Minimize" text if you still want it */}
                  </>
                ) : (
                  <>
                    <FaChevronDown className="text-lg" /> {/* Down arrow when minimized */}
                    {/* Optional: Add "Expand" text if you still want it */}
                  </>
                )}
              </button>

              {/* Collapsible content: descriptive text and Sidebar */}
              <div
                id="collapsible-team-info"
                className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${isHeaderExpanded ? 'max-h-96' : 'max-h-0'}`}
              >
                <p className="mt-2 max-w-2xl mx-auto text-base text-slate-400">
                  Get to know the passionate individuals driving our initiatives forward.
                </p>
                <Sidebar teamNames={teamNames} activeTeam={activeTeam} />
              </div>
            </header>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <main className="pt-16 md:pt-20 pb-16 md:pb-20">
              <div className="space-y-20">
                {TEAMS.map((team: Team) => (
                  <TeamSection key={team.name} team={team} />
                ))}
              </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default App;