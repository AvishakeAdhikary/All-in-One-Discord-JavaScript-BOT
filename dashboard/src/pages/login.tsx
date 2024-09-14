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
        const discordLoginUrl = 'http://localhost:3001/auth/discord';
        window.location.href = discordLoginUrl;
        setIsLoggingIn(false);
    }

    return(
        <div className="h-screen w-full flex justify-center items-center">
            <Button onClick={handleDiscordLogin} disabled={isLoggingIn}>
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