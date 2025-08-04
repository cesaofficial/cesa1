import React from 'react';
import { Member } from '../types';
import { GithubIcon, InstagramIcon, LinkedinIcon, ProfileIcon } from './icons';

interface MemberCardProps {
  member: Member;
  hoverType?: 'golden' | 'blue' | 'white';
  showGithub?: boolean;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, hoverType = 'white', showGithub = false }) => {
    const [imageError, setImageError] = React.useState(false);

    const displayPost = member.post.replace(/^(BE|TE|SE)\s*-\s*/, '');

    let hoverClasses = '';
    let textHoverClass = '';
    let iconHoverClass = '';

    switch (hoverType) {
        case 'golden':
            hoverClasses = 'hover:border-amber-400/80 hover:shadow-[0_20px_50px_-20px_rgba(251,191,36,0.4)]';
            textHoverClass = 'group-hover:text-amber-400';
            iconHoverClass = 'hover:text-amber-400';
            break;
        case 'blue':
            hoverClasses = 'hover:border-blue-500/80 hover:shadow-[0_20px_50px_-20px_rgba(59,130,246,0.5)]';
            textHoverClass = 'group-hover:text-blue-400';
            iconHoverClass = 'hover:text-blue-400';
            break;
        case 'white':
        default:
            hoverClasses = 'hover:border-slate-300/80 hover:shadow-[0_20px_50px_-20px_rgba(255,255,255,0.2)]';
            textHoverClass = 'group-hover:text-slate-200';
            iconHoverClass = 'hover:text-slate-200';
            break;
    }


  return (
    <div className={`group bg-[#1A1A1A] rounded-xl border border-slate-800 overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 ${hoverClasses}`}>
      {/* The image container. No changes needed here. */}
      <div className="relative aspect-[4/3]">
        {!imageError ? (
        <img 
            src={member.imageUrl} 
            alt={`Photo of ${member.name}`}
            className="w-full h-full object-contain"
            loading="lazy"
            onError={() => setImageError(true)}
        />
        ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-800">
                <ProfileIcon className="w-16 h-16 text-slate-500" />
            </div>
        )}
         {/* --- THIS GRADIENT OVERLAY ON THE IMAGE IS NO LONGER NEEDED --- */}
         {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div> */}
      </div>
      
      {/* --- THIS IS THE DIV THAT WAS MODIFIED --- */}
      {/* It no longer has the negative margin or gradient background. */}
      <div className="p-4 text-center">
        <h3 className="text-base font-bold text-slate-100">{member.name}</h3>
        <p className={`text-sm text-violet-400 font-semibold mt-0.5 transition-colors ${textHoverClass}`}>{displayPost}</p>
        <div className="mt-3 flex items-center justify-center space-x-3">
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name}'s LinkedIn`} className={`text-slate-500 transition-all duration-200 ease-in-out hover:scale-125 ${iconHoverClass}`}>
            <LinkedinIcon className="w-4 h-4" />
          </a>
          {showGithub && (
            <a href={member.github} target="_blank" rel="noopener noreferrer" aria-label={`${member.name}'s GitHub`} className={`text-slate-500 transition-all duration-200 ease-in-out hover:scale-125 ${iconHoverClass}`}>
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
          <a href={member.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${member.name}'s Instagram`} className={`text-slate-500 transition-all duration-200 ease-in-out hover:scale-125 ${iconHoverClass}`}>
            <InstagramIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;