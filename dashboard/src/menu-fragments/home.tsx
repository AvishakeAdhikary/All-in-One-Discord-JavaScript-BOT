import { useState, useEffect } from "react";
import axios from 'axios';
import { Card } from "../components/ui/card";
import { Circle } from "lucide-react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Avatar } from "../components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "../components/ui/badge";
import { useServer } from "../contexts/ServerContext";

const SERVER_URL = "http://127.0.0.1:3001"

const HomeFragment: React.FC = () => {
    const [isOnline, setIsOnline] = useState(false);
    const { server } = useServer();
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/api/status`);
                const data = response.data;
                if (data.status === 'online') {
                    setIsOnline(true);
                } else {
                    setIsOnline(false);
                }
            } catch (error) {
                console.error('Error fetching status:', error);
            }
        };

        fetchStatus();
    }, []);

    return (
        <div>
            <Card className="border p-2 flex items-center">
                Status:
                <Card className="ml-2">
                    {
                        isOnline ? (
                            <Card className="flex w-full p-2">
                                <Circle fill="#00ff00" className="mr-2" /> Online
                            </Card>
                        ) : (
                            <Card className="flex w-full p-2">
                                <Circle fill="#ff0000" className="mr-2" /> Offline
                            </Card>
                        )
                    }
                </Card>
            </Card>
            {
                server ? (
                    <Table className="border rounded mt-2">
                        <TableCaption>Server Details</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Property</TableHead>
                                <TableHead>Value</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>Server ID</TableCell>
                                <TableCell>{server.id}</TableCell>
                            </TableRow>
                            {
                                server.banner ? (
                                    <TableRow>
                                        <TableCell>Server Banner</TableCell>
                                        <TableCell>{server.banner}</TableCell>
                                    </TableRow>
                                    ) : (
                                    <></>
                                )
                            }
                            <TableRow>
                                <TableCell>Server Name</TableCell>
                                <TableCell>{server.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Server Icon</TableCell>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`} />
                                    </Avatar>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Server Owner</TableCell>
                                <TableCell>
                                    {
                                        server.owner ? (<>True</>) : (<>False</>)
                                    }
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Server Permissions</TableCell>
                                <TableCell>{server.permissions}</TableCell>
                            </TableRow>
                            {
                                server.features ? (
                                    <TableRow>
                                        <TableCell>Server Features</TableCell>
                                        <TableCell className="flex flex-col">
                                            {
                                                server.features.map((feature: any) => {
                                                    return <Badge key={feature} className="mr-1 mb-1 max-w-max">{feature}</Badge>
                                                })
                                            }
                                        </TableCell>
                                    </TableRow>
                                    ) : (
                                    <></>
                                )
                            }
                        </TableBody>
                    </Table>
                ) : (
                    <></>
                )
            }
        </div>
    );
};

export default HomeFragment;