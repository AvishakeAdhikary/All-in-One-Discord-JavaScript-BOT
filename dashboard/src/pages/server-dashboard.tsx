import { Route, Routes } from "react-router-dom"
import DashboardSidebar from "../components/dashboard-sidebar"
import Navbar from "../components/navbar"
import HomeFragment from "../menu-fragments/home"
import AIFragment from "../menu-fragments/ai"
import WelcomerFragment from "../menu-fragments/welcomer"
import InviteFragment from "../menu-fragments/invite"
import ADBFragment from "../menu-fragments/adb"
import SSFragment from "../menu-fragments/supportserver"
import DatabaseFragment from "../menu-fragments/database"
import VerificationFragment from "../menu-fragments/verification"
import MessageFragment from "../menu-fragments/message"
import MISCFragment from "../menu-fragments/misc"
import LevelFragment from "../menu-fragments/level"
import BirthdaysFragment from "../menu-fragments/birthdays"
import ToolsFragment from "../menu-fragments/tools"
import { useLocation } from "react-router-dom"

export default function ServerDashboard() {
    let location = useLocation();
    const server = location.state.server;

    return (
        <div className="h-screen w-full">
            <Navbar />
            <div className="grid h-[calc(100vh-56px)] w-full pl-[56px]">
                <DashboardSidebar />
                <main className="flex-1 p-2">
                    <Routes>
                        <Route path="/" element={<HomeFragment />} index />
                        <Route path="home" element={<HomeFragment />} />
                        <Route path="ai" element={<AIFragment />} />
                        <Route path="welcomer" element={<WelcomerFragment />} />
                        <Route path="invite" element={<InviteFragment />} />
                        <Route path="database" element={<DatabaseFragment />} />
                        <Route path="adb" element={<ADBFragment />} />
                        <Route path="supportserver" element={<SSFragment />} />
                        <Route path="verification" element={<VerificationFragment />} />
                        <Route path="message" element={<MessageFragment />} />
                        <Route path="misc" element={<MISCFragment />} />
                        <Route path="levels" element={<LevelFragment />} />
                        <Route path="birthdays" element={<BirthdaysFragment />} />
                        <Route path="tools" element={<ToolsFragment />} />
                    </Routes>
                </main>
            </div>
        </div>
    )
}