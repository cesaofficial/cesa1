
import React from 'react';
import { Team, Member } from '../types';
import MemberCard from './MemberCard';

interface TeamSectionProps {
  team: Team;
}

const generateTeamId = (teamName: string) => {
  return teamName.replace(/ & /g, '-').replace(/\s+/g, '-').toLowerCase();
};

const TeamSection: React.FC<TeamSectionProps> = ({ team }) => {
  const sectionId = generateTeamId(team.name);
  const isTechnicalTeam = team.name === 'Technical Team';

  const specialLayoutTeams = [
    'Creative Team',
    'Technical Team',
    'Public Relations',
    'Digital & Social Media',
    'Marketing & Sponsorship',
    'Sports Team',
  ];

  const wideCardLayoutTeams = [
    'President & Vice President',
    'Treasurer & Jt. Treasurer',
  ];

  const hasSpecialLayout = specialLayoutTeams.includes(team.name);
  const hasWideCards = wideCardLayoutTeams.includes(team.name);

  let leads: Member[] = [];
  let regularMembers: Member[] = [];

  if (hasSpecialLayout) {
    leads = team.members.filter(member => 
      member.post.includes('Lead') || member.post.includes('Head')
    );
    regularMembers = team.members.filter(member => 
      !leads.some(lead => lead.name === member.name)
    );
  } else {
    regularMembers = team.members;
  }
  
  const flexContainerClasses = "flex flex-wrap justify-center gap-x-4 gap-y-8";
  const wideFlexContainerClasses = "flex flex-wrap justify-center gap-x-8 gap-y-8";

  return (
    <section id={sectionId} className="scroll-mt-56 reveal">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-100 tracking-tight">{team.name}</h2>
        <div className="mt-3 h-1.5 w-24 bg-violet-500 rounded-full mx-auto"></div>
      </div>
      
      {hasSpecialLayout && leads.length > 0 && (
        <div className="mb-12">
          <div className={wideFlexContainerClasses}>
            {leads.map((member, index) => {
              const hoverType = member.post.includes('Jt. Lead') ? 'blue' : 'golden';
              return (
                <div key={member.name} className="w-72 reveal" style={{ transitionDelay: `${index * 75}ms` }}>
                  <MemberCard member={member} hoverType={hoverType} showGithub={isTechnicalTeam} />
                </div>
              );
            })}
          </div>
          {regularMembers.length > 0 && <hr className="mt-12 mb-10 border-slate-800 reveal" />}
        </div>
      )}

      {regularMembers.length > 0 && (
        <div className={hasWideCards ? wideFlexContainerClasses : flexContainerClasses}>
          {regularMembers.map((member, index) => {
             let hoverType: 'golden' | 'blue' | 'white' = 'white';
             if (hasWideCards) {
               if (member.post.includes('President') && !member.post.includes('Vice President')) {
                 hoverType = 'golden';
               } else if (member.post.includes('Treasurer') && !member.post.includes('Jt. Treasurer')) {
                 hoverType = 'golden';
               } else {
                 hoverType = 'blue';
               }
             }
            return (
              <div key={member.name} className={`${hasWideCards ? "w-72" : "w-44"} reveal`} style={{ transitionDelay: `${index * 75}ms` }}>
                <MemberCard member={member} hoverType={hoverType} showGithub={isTechnicalTeam} />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default TeamSection;