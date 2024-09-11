import { Button } from "../components/ui/button";
import { KeyRound } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const LoginPage = () => {
    const { toast } = useToast();

    return(
        <div className="h-screen w-full flex justify-center items-center">
            <Button
            onClick={() => {
                toast({
                    description: "Trying to login with Discord."
                });
            }}>
                <KeyRound className="mr-2 h-4 w-4" /> Login with Discord 
            </Button>
        </div>
    );
}

export default LoginPage;