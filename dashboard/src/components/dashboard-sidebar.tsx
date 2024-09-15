import React from "react";
import {
    Bot,
    Cake,
    CircleFadingArrowUp,
    CircleGauge,
    Code,
    Database,
    Hand,
    HeartHandshake,
    HomeIcon,
    Mail,
    Send,
    ShieldCheck,
    Wrench,
  } from "lucide-react"
  
import { Button } from "./ui/button"
import {
    Tooltip,
    TooltipProvider,
    TooltipContent,
    TooltipTrigger,
} from "./ui/tooltip"
import { Link } from "react-router-dom";

const DashboardSidebar: React.FC = () => {
    return(
        <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
            <nav className="grid gap-1 p-2">
                <TooltipProvider>
                    <Link to="/serverdashboard/home">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-lg bg-muted"
                                aria-label="Home"
                                >
                                <HomeIcon className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Home
                            </TooltipContent>
                        </Tooltip>
                    </Link>
                    <Link to="/serverdashboard/ai">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-lg"
                                aria-label="AI"
                                >
                                <Bot className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                AI
                            </TooltipContent>
                        </Tooltip>
                    </Link>
                    <Link to="/serverdashboard/welcomer">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-lg"
                                aria-label="Welcomer"
                                >
                                <Hand className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Welcomer
                            </TooltipContent>
                        </Tooltip>
                    </Link>
                    <Link to="/serverdashboard/invite">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-lg"
                                aria-label="Invite"
                                >
                                <Mail className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Invite
                            </TooltipContent>
                        </Tooltip>
                    </Link>
                    <Link to="/serverdashboard/database">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-lg"
                                aria-label="Database"
                                >
                                <Database className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Database
                            </TooltipContent>
                        </Tooltip>
                    </Link>
                    <Link to="/serverdashboard/adb">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-lg"
                                aria-label="ADB"
                                >
                                <Code className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                ADB
                            </TooltipContent>
                        </Tooltip>
                    </Link>
                    <Link to="/serverdashboard/supportserver">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-lg"
                                aria-label="Support Server"
                                >
                                <HeartHandshake className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Support Server
                            </TooltipContent>
                        </Tooltip>
                    </Link>
                    <Link to="/serverdashboard/verification">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-lg"
                                aria-label="Verification"
                                >
                                <ShieldCheck className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Verification
                            </TooltipContent>
                        </Tooltip>
                    </Link>
                    <Link to="/serverdashboard/message">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-lg"
                                aria-label="Message"
                                >
                                <Send className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Message
                            </TooltipContent>
                        </Tooltip>
                    </Link>
                    <Link to="/serverdashboard/misc">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-lg"
                                aria-label="Miscellaneous"
                                >
                                <CircleGauge className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Miscellaneous
                            </TooltipContent>
                        </Tooltip>
                    </Link>
                    <Link to="/serverdashboard/levels">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-lg"
                                aria-label="Levels"
                                >
                                <CircleFadingArrowUp className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Levels
                            </TooltipContent>
                        </Tooltip>
                    </Link>
                    <Link to="/serverdashboard/birthdays">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-lg"
                                aria-label="Birthdays"
                                >
                                <Cake className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Birthdays
                            </TooltipContent>
                        </Tooltip>
                    </Link>
                    <Link to="/serverdashboard/tools">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-lg"
                                aria-label="Tools"
                                >
                                <Wrench className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Tools
                            </TooltipContent>
                        </Tooltip>
                    </Link>
                </TooltipProvider>
            </nav>
        </aside>
    )
}

export default DashboardSidebar;