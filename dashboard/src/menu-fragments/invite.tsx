import React from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "lucide-react";

const inviteURL = `https://discord.com/oauth2/authorize?client_id=1276859825833115669&permissions=8&integration_type=0&scope=bot`

const InviteFragment: React.FC = () => {
    return(
        <div>
            <Card className="border p-2 flex items-center">
                Invite Bot:
                <Button onClick={() => { window.open(inviteURL, "_blank") }} className="ml-2">
                    <Link className="mr-2" /> Invite Now
                </Button>
            </Card>
        </div>
    )
}

export default InviteFragment;