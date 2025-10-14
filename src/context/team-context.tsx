
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { teams as initialTeams, type Team } from '@/app/teams/data';

interface TeamContextType {
  teams: Team[];
  selectedTeam: string | null;
  setSelectedTeam: (teamId: string) => void;
  addTeam: (team: { name: string; sport: string }) => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(initialTeams[0]?.id || null);

  const addTeam = (team: { name: string; sport: string }) => {
    const newTeam: Team = {
      id: `team-${Date.now()}`,
      ...team,
      coachId: 'coach-1' // Assuming a static coach for now
    };
    setTeams(prev => [...prev, newTeam]);
    setSelectedTeam(newTeam.id);
  };

  return (
    <TeamContext.Provider value={{ teams, selectedTeam, setSelectedTeam, addTeam }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
};
