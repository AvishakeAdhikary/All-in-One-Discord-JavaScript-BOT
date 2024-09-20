import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectTrigger, SelectValue } from "../components/ui/select";
import { Avatar } from "../components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Textarea } from "../components/ui/textarea";
import { GradientPicker } from "../components/gradient-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { cn } from "../lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../components/ui/calendar";
import { useServer } from "../contexts/ServerContext";

const MessageFragment: React.FC = () => {
    const { server } = useServer();
    const [profile, setProfile] = useState(null);
    const [channels, setChannels] = useState(null);

    const handleProfileFetch = async () => {
        try {
            const response = await fetch('http://localhost:3001/auth/profile', {
                credentials: 'include'
            });
            if (response.ok) {
                const userData = await response.json();
                setProfile(userData);
            } else {
                throw new Error('Failed to fetch user info');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            console.error('Error fetching user info:', errorMessage);
        }
    }

    const handleFetchChannels = async (serverId: string | null) => {
        try {
            const response = await fetch('http://localhost:3001/api/textchannels', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ serverId }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'An error occurred');
            }
    
            const data = await response.json();
            console.log("Channels:", data)
        } catch (error) {
            console.error('Error fetching text channels:', error);
        }
    }

    const handleSendMessage = async () => { 
        await handleProfileFetch();
        console.log("Profile:", profile);
        console.log("Server:", server);
        server? handleFetchChannels(server.id) : (
            console.log("Server not found")
        );
    };
    const handleSendEmbedding = () => { console.log("Inside handleSendEmbedding()."); };

    const [color, setColor] = useState('#1F2225');
    const [date, setDate] = useState<Date>()
    const [embeddingMessageContent, setEmbeddingMessageContent] = useState("");
    const [embeddingAuthor, setEmbeddingAuthor] = useState("Author");
    const [embeddingAuthorURL, setEmbeddingAuthorURL] = useState("https://avishakeadhikary.github.io/");
    const [embeddingAuthorIconURL, setEmbeddingAuthorIconURL] = useState("https://placehold.co/600x600");
    const [embeddingTitle, setEmbeddingTitle] = useState("Title");
    const [embeddingContent, setEmbeddingContent] = useState("Content");
    const [embeddingTitleURL, setEmbeddingTitleURL] = useState("https://www.google.com/");
    const [embeddingImageURL, setEmbeddingImageURL] = useState("https://placehold.co/600x600");
    const [embeddingThumbnailURL, setEmbeddingThumbnailURL] = useState("https://placehold.co/600x600");
    const [embeddingFooterTitle, setEmbeddingFooterTitle] = useState("Footer");
    const [embeddingFooterIconURL, setEmbeddingFooterIconURL] = useState("https://placehold.co/600x600");

    return(
        <div className="space-y-2">
            <Card className="border p-2 flex flex-col space-y-2">
                <CardHeader>
                    <CardTitle>Text Message</CardTitle>
                </CardHeader>
                <CardContent className="w-full space-y-2">
                    <Card className="flex w-full space-x-2 p-2">
                        <Button>Fetch Channels</Button>
                        <Select disabled={false}>
                            <SelectTrigger>
                                <SelectValue>Select Channels</SelectValue>
                            </SelectTrigger>
                            <SelectContent position="popper">
                            </SelectContent>
                        </Select>
                    </Card>
                    <Card className="flex p-2 w-full space-x-2">
                        <Input type="text" placeholder="Message" />
                        <Button type="button" onClick={handleSendMessage}>Send</Button>
                    </Card>
                </CardContent>
            </Card>
            <Card className="flex flex-col border p-2">
                <CardHeader>
                    <CardTitle>Embedding Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 w-full">
                    <Card className="flex p-2 w-full space-x-2">
                        <div>Preview:</div>
                        <Card id="preview" style={{borderLeft: `${5}px solid ${color}`, color: "rgb(255, 255, 255)", backgroundColor: "rgb(47, 49, 54)"}} className="flex flex-row p-2 w-full space-x-2">
                            <div className="flex flex-col w-full">
                                <CardHeader>
                                    <div className="flex flex-row space-x-2 items-center">
                                        <Avatar>
                                            <AvatarImage src={embeddingAuthorIconURL} />
                                        </Avatar>
                                        <a className="hover:underline" href={embeddingAuthorURL}><CardTitle className="space-y-2">{embeddingAuthor}</CardTitle></a>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <a className="hover:underline" href={embeddingTitleURL}><CardTitle>{embeddingTitle}</CardTitle></a>
                                    <CardDescription>{embeddingContent}</CardDescription>
                                    <div className="max-w-[600px] max-h-[600px]">
                                        <img src={embeddingImageURL} height="100%" width="100%" alt="mainimage" />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex flex-row space-x-2">
                                    <Avatar>
                                        <AvatarImage src={embeddingFooterIconURL} />
                                    </Avatar>
                                    <CardDescription>{embeddingFooterTitle}</CardDescription>
                                    <CardDescription>{date?.toDateString()}</CardDescription>
                                </CardFooter>
                            </div>
                            <div className="max-w-[80px] max-h-[80px] my-8">
                                <img className="rounded" src={embeddingThumbnailURL} alt="thumbnail" width={80} height={80} />
                            </div>
                        </Card>
                    </Card>
                    <Card className="flex flex-col p-2 w-full space-y-2">
                        <Textarea placeholder="Message Content" defaultValue={embeddingMessageContent} onChange={event => setEmbeddingMessageContent(event.target.value)}></Textarea>
                        <Input type="text" placeholder="Embedding Author" defaultValue={embeddingAuthor} onChange={event => setEmbeddingAuthor(event.target.value)} />
                        <div className="flex flex-row space-x-2">
                            <Input type="text" placeholder="Embedding Author URL" defaultValue={embeddingAuthorURL} onChange={event => setEmbeddingAuthorURL(event.target.value)} />
                            <Input type="text" placeholder="Embedding Author Icon URL" defaultValue={embeddingAuthorIconURL} onChange={event => setEmbeddingAuthorIconURL(event.target.value)} />
                        </div>
                        <Input type="text" placeholder="Embedding Title" defaultValue={embeddingTitle} onChange={event => setEmbeddingTitle(event.target.value)} />
                        <Textarea placeholder="Embedding Content" defaultValue={embeddingContent} onChange={event => setEmbeddingContent(event.target.value)}></Textarea>
                        <div className="flex flex-row space-x-2">
                            <Input type="text" placeholder="Embedding URL" defaultValue={embeddingTitleURL} onChange={event => setEmbeddingTitleURL(event.target.value)} />
                            <GradientPicker background={color} setBackground={setColor} />
                        </div>
                        <Input type="text" placeholder="Image URL" defaultValue={embeddingImageURL} onChange={event => setEmbeddingImageURL(event.target.value)} />
                        <Input type="text" placeholder="Thumbnail URL" defaultValue={embeddingThumbnailURL} onChange={event => setEmbeddingThumbnailURL(event.target.value)} />
                        <Input type="text" placeholder="Footer Title" defaultValue={embeddingFooterTitle} onChange={event => setEmbeddingFooterTitle(event.target.value)} />
                        <div className="flex flex-row space-x-2">
                            <Input type="text" placeholder="Footer Icon URL" defaultValue={embeddingFooterIconURL} onChange={event => setEmbeddingFooterIconURL(event.target.value)} />
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                    >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <p>Pick a date</p>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </Card>
                </CardContent>
                <CardContent className="w-full space-y-2">
                    <Card className="flex w-full space-x-2 p-2">
                        <Button>Fetch Channels</Button>
                        <Select disabled={false}>
                            <SelectTrigger>
                                <SelectValue>Select Channels</SelectValue>
                            </SelectTrigger>
                            <SelectContent position="popper">
                            </SelectContent>
                        </Select>
                    </Card>
                    <Card className="flex p-2 w-full space-x-2">
                        <Input type="text" placeholder="Message" />
                        <Button type="button" onClick={handleSendEmbedding}>Send</Button>
                    </Card>
                </CardContent>
            </Card>
        </div>
    )
}

export default MessageFragment;