import { Button } from "../components/ui/button";
import { KeyRound, Loader2 } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { useState } from "react";

const LoginPage = () => {
    const { toast } = useToast();
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleDiscordLogin = async () => {
        toast({
            description: "Trying to login with Discord."
        });

        setIsLoggingIn(true);

        await new Promise(resolve => setTimeout(resolve, 2000)); // Trying to simulate a promise for 2 seconds

        setIsLoggingIn(false);
    }

    return(
        <div className="h-screen w-full flex justify-center items-center">
            <Button onClick={handleDiscordLogin}>
                {
                    isLoggingIn? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <KeyRound className="mr-2 h-4 w-4" />
                    )
                }
                {isLoggingIn? "Logging in..." : "Login with discord"} 
            </Button>
        </div>
    );
}

export default LoginPage;