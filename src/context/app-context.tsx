
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { User, AccountType, Player, Message, ScheduleEvent, Team } from '@/lib/types';
import { users as initialUsers, players as initialPlayers, messages as initialMessages, schedule as initialSchedule, teams as initialTeams } from '@/lib/data';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  currentAccountType: AccountType;
  setCurrentAccountType: (type: AccountType) => void;
  users: Record<string, User>;
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  messages: string[];
  setMessages: React.Dispatch<React.SetStateAction<string[]>>;
  schedule: ScheduleEvent[];
  setSchedule: React.Dispatch<React.SetStateAction<ScheduleEvent[]>>;
  teams: Team[];
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  selectedTeam: Team | null;
  setSelectedTeam: (team: Team | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentAccountType, setCurrentAccountType] = useState<AccountType>('coach');
  const [users, setUsers] = useState(initialUsers);
  const [players, setPlayers] = useState(initialPlayers);
  const [messages, setMessages] = useState(initialMessages);
  const [schedule, setSchedule] = useState(initialSchedule);
  const [teams, setTeams] = useState(initialTeams);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);


  return (
    <AppContext.Provider value={{ 
        currentUser, 
        setCurrentUser, 
        currentAccountType, 
        setCurrentAccountType,
        users,
        players,
        setPlayers,
        messages,
        setMessages,
        schedule,
        setSchedule,
        teams,
        setTeams,
        selectedTeam,
        setSelectedTeam
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
