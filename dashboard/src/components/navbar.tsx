import React from "react";
import { NavigationMenu, NavigationMenuItem } from "./ui/navigation-menu";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { BotIcon, LogOut, Settings } from "lucide-react";
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";

class Navbar extends React.Component{
    render() {
        return(
        <div className="p-2 w-full flex max-h-14" style={{listStyle:"none"}}>
            <NavigationMenu className="flex justify-between items-center max-w-full">
                <NavigationMenuItem className="flex items-center">
                    <BotIcon className="mr-2 border rounded"/> AIO Discord BOT
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
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

// import {
// DropdownMenu,
// DropdownMenuContent,
// DropdownMenuGroup,
// DropdownMenuItem,
// DropdownMenuLabel,
// DropdownMenuPortal,
// DropdownMenuSeparator,
// DropdownMenuShortcut,
// DropdownMenuSub,
// DropdownMenuSubContent,
// DropdownMenuSubTrigger,
// DropdownMenuTrigger,
// } from "../components/ui/dropdown-menu"
// import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";

  
// export function DropdownMenuDemo() {
//     return (
//         <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//                 <Button variant="outline">Open</Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56">
//                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuGroup>
//                 <DropdownMenuItem>
                    
//                     <span>Profile</span>
//                     <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
                    
//                     <span>Billing</span>
//                     <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
                    
//                     <span>Settings</span>
//                     <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                     <span>Keyboard shortcuts</span>
//                     <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
//                 </DropdownMenuItem>
//                 </DropdownMenuGroup>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuGroup>
//                 <DropdownMenuItem>
//                     <span>Team</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuSub>
//                     <DropdownMenuSubTrigger>
//                     <span>Invite users</span>
//                     </DropdownMenuSubTrigger>
//                     <DropdownMenuPortal>
//                     <DropdownMenuSubContent>
//                         <DropdownMenuItem>
//                         <span>Email</span>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem>
//                         <span>Message</span>
//                         </DropdownMenuItem>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem>
//                         <span>More...</span>
//                         </DropdownMenuItem>
//                     </DropdownMenuSubContent>
//                     </DropdownMenuPortal>
//                 </DropdownMenuSub>
//                 <DropdownMenuItem>
//                     <span>New Team</span>
//                     <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
//                 </DropdownMenuItem>
//                 </DropdownMenuGroup>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                 <span>GitHub</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                 <span>Support</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem disabled>
//                 <span>API</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                 <LogOut className="mr-2 h-4 w-4" />
//                 <span>Log out</span>
//                 <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
//                 </DropdownMenuItem>
//             </DropdownMenuContent>
//         </DropdownMenu>
//     )
// }
