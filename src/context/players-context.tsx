
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Player } from '@/lib/types';
import { players as initialPlayers } from '@/app/roster/data';

interface PlayersContextType {
  players: Player[];
  addPlayer: (player: Player) => void;
  updatePlayer: (updatedPlayer: Player) => void;
  deletePlayer: (playerId: string) => void;
}

const PlayersContext = createContext<PlayersContextType | undefined>(undefined);

export function PlayersProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);

  const addPlayer = (player: Player) => {
    setPlayers(prevPlayers => [...prevPlayers, player]);
  };

  const updatePlayer = (updatedPlayer: Player) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(p => (p.id === updatedPlayer.id ? updatedPlayer : p))
    );
  };

  const deletePlayer = (playerId: string) => {
    setPlayers(prevPlayers => prevPlayers.filter(p => p.id !== playerId));
  };

  return (
    <PlayersContext.Provider value={{ players, addPlayer, updatePlayer, deletePlayer }}>
      {children}
    </PlayersContext.Provider>
  );
}

export function usePlayers() {
  const context = useContext(PlayersContext);
  if (context === undefined) {
    throw new Error('usePlayers must be used within a PlayersProvider');
  }
  return context;
}
