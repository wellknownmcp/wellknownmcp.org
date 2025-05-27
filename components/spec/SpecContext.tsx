"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type SpecContextType = {
  selected: string;
  setSelected: (value: string) => void;
};

const SpecContext = createContext<SpecContextType | undefined>(undefined);

export function SpecProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState("");
  return (
    <SpecContext.Provider value={{ selected, setSelected }}>
      {children}
    </SpecContext.Provider>
  );
}

export function useSpecContext() {
  const context = useContext(SpecContext);
  if (!context) {
    throw new Error("useSpecContext must be used within a SpecProvider");
  }
  return context;
}
