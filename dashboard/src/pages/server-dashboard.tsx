import React from "react";
import Navbar from "../components/navbar";
import { ScrollArea } from "../components/ui/scroll-area";
import { Card } from "../components/ui/card";
import Menu from "../assets/menu";
import { Loader2 } from "lucide-react";
import HomeFragment from "../menu-fragments/home";

interface ServerDashboardState {
    isFetchingPage: boolean;
    currentFragment: React.ElementType;
}

class ServerDashboard extends React.Component<{}, ServerDashboardState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            isFetchingPage: false,
            currentFragment: HomeFragment,
        };
    }

    updateFetchStatus = (status: boolean) => {
        this.setState({
            isFetchingPage: status
        });
    }

    async handleFetchPage(route: string) {
        this.updateFetchStatus(true);
        const menuItem = Menu.find(item => item["item-route"] === route);
        if (menuItem && menuItem["item-fragment"]) {
            this.setState({
                currentFragment: menuItem["item-fragment"]
            });
        } else {
            this.setState({
                currentFragment: HomeFragment
            });
        }
        this.updateFetchStatus(false);
    }

    render() {
        const { isFetchingPage, currentFragment: Fragment } = this.state;

        return (
            <div className="h-screen w-full">
                <Navbar />
                <div className="flex">
                    <ScrollArea className="max-w-max border max-h-[calc(100vh-56px)] pr-4">
                        {
                            Menu.map((menuItem) => {
                                const IconComponent = menuItem["item-icon"];
                                return (
                                    <Card
                                        className="m-4 flex flex-col p-2 text-center justify-center items-center cursor-pointer hover:bg-zinc-600"
                                        onClick={async () => {
                                            await this.handleFetchPage(menuItem["item-route"]);
                                        }}
                                        key={menuItem["item-name"]}
                                    >
                                        <IconComponent /> {menuItem["item-name"]}
                                    </Card>
                                );
                            })
                        }
                    </ScrollArea>
                    <ScrollArea className="w-full border max-h-[calc(100vh-56px)]">
                        {
                            isFetchingPage ? (
                                <div className="flex justify-center items-center w-full h-[calc(100vh-56px)]">
                                    <Loader2 className="animate-spin"/>
                                </div>
                            ) : (
                                <div className="h-full">
                                    <Fragment />
                                </div>
                            )
                        }
                    </ScrollArea>
                </div>
            </div>
        );
    }
}

export default ServerDashboard;
