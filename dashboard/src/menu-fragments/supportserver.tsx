import React from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "lucide-react";

const supportServerURL = `https://discord.com/application-directory/1276859825833115669`

const SSFragment: React.FC = () => {
    return(
        <div>
            <Card className="border p-2 flex items-center">
                Get Support:
                <Button onClick={() => { window.open(supportServerURL, "_blank") }} className="ml-2">
                    <Link className="mr-2" /> Get Support Now
                </Button>
            </Card>
        </div>
    )
}

export default SSFragment;