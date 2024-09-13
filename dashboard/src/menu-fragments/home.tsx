import { useState, useEffect } from "react";
import axios from 'axios';
import { Card } from "../components/ui/card";
import { Circle } from "lucide-react";

const SERVER_URL = "http://127.0.0.1:3001"

const HomeFragment = () => {
    const [isOnline, setIsOnline] = useState(false);

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
        </div>
    );
};

export default HomeFragment;
