import { Bot, Cake, CircleFadingArrowUp, CircleGauge, Code, Database, Hand, HeartHandshake, Home, Mail, Send, Shield, ShieldCheck, Wrench } from "lucide-react";
import HomeFragment from "../menu-fragments/home";
import AIFragment from "../menu-fragments/ai";
import WelcomerFragment from "../menu-fragments/welcomer";
import InviteFragment from "../menu-fragments/invite";
import DatabaseFragment from "../menu-fragments/database";
import ADBFragment from "../menu-fragments/adb";
import SSFragment from "../menu-fragments/supportserver";
import VerificationFragment from "../menu-fragments/verification";
import MessageFragment from "../menu-fragments/message";
import MISCFragment from "../menu-fragments/misc";
import MODFragment from "../menu-fragments/moderation";
import LevelFragment from "../menu-fragments/level";
import BirthdaysFragment from "../menu-fragments/birthdays";
import ToolsFragment from "../menu-fragments/tools";

const Menu = [
    {
        "item-name": "Home",
        "item-icon": Home,
        "item-route": "/home",
        "item-fragment": HomeFragment,
    },
    {
        "item-name": "AI",
        "item-icon": Bot,
        "item-route": "/ai",
        "item-fragment": AIFragment
    },
    {
        "item-name": "Welcomer",
        "item-icon": Hand,
        "item-route": "/welcome",
        "item-fragment": WelcomerFragment
    },
    {
        "item-name": "Invite",
        "item-icon": Mail,
        "item-route": "/invite",
        "item-fragment": InviteFragment
    },
    {
        "item-name": "Database",
        "item-icon": Database,
        "item-route": "/database",
        "item-fragment": DatabaseFragment
    },
    {
        "item-name": "ADB",
        "item-icon": Code,
        "item-route": "/activedevbadge",
        "item-fragment": ADBFragment
    },
    {
        "item-name": "Support Server",
        "item-icon": HeartHandshake,
        "item-route": "/supportserver",
        "item-fragment": SSFragment
    },
    {
        "item-name": "Verification",
        "item-icon": ShieldCheck,
        "item-route": "/verification",
        "item-fragment": VerificationFragment
    },
    {
        "item-name": "Message",
        "item-icon": Send,
        "item-route": "/message",
        "item-fragment": MessageFragment
    },
    {
        "item-name": "Miscellaneous",
        "item-icon": CircleGauge,
        "item-route": "/misc",
        "item-fragment": MISCFragment
    },
    {
        "item-name": "Moderation",
        "item-icon": Shield,
        "item-route": "/moderation",
        "item-fragment": MODFragment
    },
    {
        "item-name": "Level",
        "item-icon": CircleFadingArrowUp,
        "item-route": "/level",
        "item-fragment": LevelFragment
    },
    {
        "item-name": "Birthdays",
        "item-icon": Cake,
        "item-route": "/birthdays",
        "item-fragment": BirthdaysFragment
    },
    {
        "item-name": "Tools",
        "item-icon": Wrench,
        "item-route": "/tools",
        "item-fragment": ToolsFragment
    }
]

export default Menu;