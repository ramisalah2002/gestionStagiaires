import React, { useState, createContext } from "react";

export const EncadrantContext = createContext();

export const EncadrantProvider = ({ children }) => {
  const [encadrant, setEncadrant] = useState(null);

  return (
    <EncadrantContext.Provider value={{ encadrant, setEncadrant }}>
      {children}
    </EncadrantContext.Provider>
  );
};
