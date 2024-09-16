import React, { useEffect, useState } from "react";
import { Link, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useServer } from '../contexts/ServerContext';
import Server from "../types/server";

const inviteURL = `https://discord.com/oauth2/authorize?client_id=1276859825833115669&permissions=8&integration_type=0&scope=bot`

const ServersPage: React.FC = () => {
    const [servers, setServers] = useState<Server[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { setServer } = useServer();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServers = async () => {
            try {
                const response = await fetch('http://localhost:3001/auth/servers', {
                    credentials: 'include'
                });
                if (response.ok) {
                    const data: Server[] = await response.json();
                    setServers(data);
                } else {
                    throw new Error('Failed to fetch servers');
                }
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
                console.error('Error fetching servers:', errorMessage);
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchServers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleEditSettings = (server: Server) => {
        setServer(server); // Set the server context
        navigate("/serverdashboard");
    };

    return (
        <div className="h-screen w-full">
            <Navbar />
            <div className="flex flex-wrap p-8 justify-evenly">
                {servers.map(server => (
                    <Card key={server.id} className="mr-4 mb-4">
                        <CardHeader className="text-center">
                            <CardTitle>{server.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center">
                            <img
                                className="rounded"
                                src={server.icon ? `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png` : "https://placehold.co/200x200"}
                                alt={server.name? server.name : ""}
                                height={200}
                                width={200}
                            />
                            <Button className="mt-2" onClick={() => { window.open(inviteURL, "_blank") }}>
                                <Link className="mr-2 h-4 w-4" /> Invite BOT
                            </Button>
                            <Button className="mt-1" onClick={() => handleEditSettings(server)}>
                                <Pencil className="mr-2 h-4 w-4" /> Edit Settings
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ServersPage;
