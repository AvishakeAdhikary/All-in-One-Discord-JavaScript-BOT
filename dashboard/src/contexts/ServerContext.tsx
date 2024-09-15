import React, { createContext, useContext, ReactNode } from 'react';
import Server from '../types/server';

interface ServerContextProps {
    server: Server | null;
    setServer: (server: Server | null) => void;
}

const ServerContext = createContext<ServerContextProps | undefined>(undefined);

export const ServerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [server, setServer] = React.useState<Server | null>(null);

    return (
        <ServerContext.Provider value={{ server, setServer }}>
            {children}
        </ServerContext.Provider>
    );
};

export const useServer = () => {
    const context = useContext(ServerContext);
    if (context === undefined) {
        throw new Error('useServer must be used within a ServerProvider');
    }
    return context;
};
