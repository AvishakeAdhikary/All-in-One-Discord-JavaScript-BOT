import React, { useEffect, useState } from "react";
import { Link, Pencil } from "lucide-react";
import Navbar from "../components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";

interface Server {
    id: string;
    name: string;
    icon?: string;
}

const ServersPage: React.FC = () => {
    const [servers, setServers] = useState<Server[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    return (
        <div className="h-screen w-full">
            <Navbar />
            <div className="flex flex-wrap p-8 justify-evenly">
                {servers.map(server => (
                    <Card key={server.id} className="mr-4 mb-4">
                        <CardHeader>
                            <CardTitle>{server.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center">
                            <img
                                className="rounded"
                                src={server.icon ? `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png` : "https://placehold.co/200x200"}
                                alt={server.name}
                                height={200}
                                width={200}
                            />
                            <Button className="mt-2">
                                <Link className="mr-2 h-4 w-4" /> Invite BOT
                            </Button>
                            <Button className="mt-1">
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
