import React from "react";
import { NavigationMenu, NavigationMenuItem } from "./ui/navigation-menu";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { BotIcon, LogOut, Settings } from "lucide-react";
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";

interface User {
    id: string;
    username: string;
    avatar?: string;
}

interface NavbarState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

class Navbar extends React.Component<{}, NavbarState>{
    constructor(props: {}) {
        super(props);
        this.state = {
            user: null,
            loading: true,
            error: null,
        };
    }

    async componentDidMount() {
        try {
            const response = await fetch('http://localhost:3001/auth/profile', {
                credentials: 'include'
            });
            if (response.ok) {
                const userData: User = await response.json();
                this.setState({ user: userData, loading: false });
            } else {
                throw new Error('Failed to fetch user info');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            console.error('Error fetching user info:', errorMessage);
            this.setState({ error: errorMessage, loading: false });
        }
    }

    handleLogout = async () => {
        try {
            await fetch('http://localhost:3001/logout', {
                method: 'POST',
                credentials: 'include'
            });
            window.location.href = '/login';
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            console.error('Error during logout:', errorMessage);
        }
    }

    render() {
        const { user, loading, error } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        return(
        <div className="p-2 w-full flex max-h-14" style={{ listStyle: "none" }}>
            <NavigationMenu className="flex justify-between items-center max-w-full">
                <NavigationMenuItem className="flex items-center">
                    <BotIcon className="mr-2 border rounded"/> AIO Discord BOT
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar>
                                <AvatarImage src={user? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`:"https://github.com/shadcn.png"} alt={user?.username || "User"}/>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-black rounded">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={this.handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </NavigationMenuItem>
            </NavigationMenu>
        </div>
    );
    }
}

export default Navbar;