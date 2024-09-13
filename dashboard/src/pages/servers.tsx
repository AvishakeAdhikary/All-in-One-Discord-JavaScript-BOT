import { Link, Pencil } from "lucide-react";
import Navbar from "../components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";

const ServersPage = () => {
    const rows = [];
    let i = 0; const len = 20;
    while(++i <= len) rows.push(i);

    return(
        <div className="h-screen w-full">
            <Navbar />
            <div className="flex flex-wrap p-8 justify-evenly">
                {
                    rows.map(() => {
                        return (
                            <Card className="mr-4 mb-4">
                                <CardHeader>
                                    <CardTitle>Server Name</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col">
                                    <img className="rounded" src="https://placehold.co/200x200" alt="server-image"/>
                                    <Button className="mt-1">
                                        <Link className="mr-2 h-4 w-4" />Invite BOT
                                    </Button>
                                    <Button className="mt-1">
                                        <Pencil className="mr-2 h-4 w-4" />Edit Settings
                                    </Button>
                                </CardContent>
                            </Card>
                            );
                        }
                    )
                }
            </div>
        </div>
    );
}

export default ServersPage;