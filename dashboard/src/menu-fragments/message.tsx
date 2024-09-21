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
import { SelectItem } from "@radix-ui/react-select";
import { useToast } from "../hooks/use-toast";

interface Profile {
    id: string;
}

interface Channel {
    id: string;
    name: string;
}

const MessageFragment: React.FC = () => {
    const { toast } = useToast();
    const { server } = useServer();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [channels, setChannels] = useState<Channel[]>([]);
    const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
    const [messageContent, setMessageContent] = useState("");
    const [color, setColor] = useState('#1F2225');
    const [date, setDate] = useState<Date>()
    const [embeddingMessageContent, setEmbeddingMessageContent] = useState("");
    const [embeddingAuthor, setEmbeddingAuthor] = useState("");
    const [embeddingAuthorURL, setEmbeddingAuthorURL] = useState("");
    const [embeddingAuthorIconURL, setEmbeddingAuthorIconURL] = useState("");
    const [embeddingTitle, setEmbeddingTitle] = useState("");
    const [embeddingContent, setEmbeddingContent] = useState("");
    const [embeddingTitleURL, setEmbeddingTitleURL] = useState("");
    const [embeddingImageURL, setEmbeddingImageURL] = useState("");
    const [embeddingThumbnailURL, setEmbeddingThumbnailURL] = useState("");
    const [embeddingFooterTitle, setEmbeddingFooterTitle] = useState("");
    const [embeddingFooterIconURL, setEmbeddingFooterIconURL] = useState("");

    const handleProfileFetch = async () => {
        try {
            const response = await fetch('http://localhost:3001/auth/profile', {
                credentials: 'include'
            });
            if (response.ok) {
                const userData = await response.json();
                setProfile(userData);
                return userData;
            } else {
                throw new Error('Failed to fetch user info');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            toast({
                variant: "destructive",
                title: "Error fetching user info.",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify({"error": errorMessage.toString()}, null, 2)}</code>
                    </pre>
                ),
            });
            return null;
        }
    }
    
    const handleFetchChannels = async () => {
        const profile = await handleProfileFetch();
        if (!profile || !server) {
            console.log("Profile or server not found.");
            
            return;
        }
    
        const serverId = server.id;
        const userId = profile.id;
    
        try {
            const response = await fetch('http://localhost:3001/api/textchannels', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ serverId, userId }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'An error occurred');
            }
    
            const data = await response.json();
            setChannels(data.textChannels);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error fetching text channels.",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify({"error": error}, null, 2)}</code>
                    </pre>
                ),
            })
        }
    };
    
    const handleSendMessage = async () => {
        console.log("Selected Channel Id:", selectedChannelId);
        console.log("Message Content", messageContent);
        if (!selectedChannelId || !messageContent) {
            toast({
                variant: "destructive",
                title: "Error sending message.",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify({"error": "Channel and message content are required"}, null, 2)}</code>
                    </pre>
                ),
            });
            return;
        }
    
        try {
            const response = await fetch('http://localhost:3001/api/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ channelId: selectedChannelId, message: messageContent }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'An error occurred while sending the message');
            }
    
            toast({
                title: "Sent Successfully",
                description: "Message sent successfully.",
            });
            setMessageContent("");
            setSelectedChannelId(null);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error sending message.",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify({"error": error}, null, 2)}</code>
                    </pre>
                ),
            });
        }
    };

    const handleSendEmbedding = async () => {        
        if (!selectedChannelId || !embeddingMessageContent) {
            toast({
                variant: "destructive",
                title: "Channel and embedding content are required.",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 overflow-auto">
                        <code className="text-white">{JSON.stringify({"selectedChannelId": selectedChannelId, "embeddingMessageContent": embeddingMessageContent}, null, 2)}</code>
                    </pre>
                ),
            })
            return;
        }
        
        const embedData = {
            title: embeddingTitle,
            content: embeddingMessageContent,
            url: embeddingTitleURL,
            author: embeddingAuthor,
            authorIcon: embeddingAuthorIconURL,
            authorURL: embeddingAuthorURL,
            image: embeddingImageURL,
            thumbnail: embeddingThumbnailURL,
            footerTitle: embeddingFooterTitle,
            footerIcon: embeddingFooterIconURL,
            date: date,
            color: color,
        };
    
        try {
            const response = await fetch('http://localhost:3001/api/send-embedding', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ channelId: selectedChannelId, embed: embedData }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'An error occurred while sending the embed');
            }
    
            toast({
                title: "Sent Successfully",
                description: "Embedding has been sent successfully.",
            });
        } catch (error) {
            console.error('Error sending embedding:', error);
        } finally {
            setEmbeddingMessageContent("");
            setEmbeddingTitle("");
            setEmbeddingContent("");
            setEmbeddingAuthor("");
            setEmbeddingAuthorURL("");
            setEmbeddingAuthorIconURL("");
            setEmbeddingImageURL("");
            setEmbeddingThumbnailURL("");
            setEmbeddingFooterTitle("");
            setEmbeddingFooterIconURL("");
            setColor('#1F2225');
            setDate(undefined);
        }
    };

    return(
        <div className="space-y-2">
            <Card className="border p-2 flex flex-col space-y-2">
                <CardHeader>
                    <CardTitle>Text Message</CardTitle>
                </CardHeader>
                <CardContent className="w-full space-y-2">
                    <Card className="flex w-full space-x-2 p-2">
                        <Button onClick={() => {handleFetchChannels()}}>Fetch Channels</Button>
                        <Select onValueChange={setSelectedChannelId} disabled={channels.length === 0}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Channels" />
                            </SelectTrigger>
                            <SelectContent id="selectMessageChannel" position="popper">
                                {channels.map((channel) => (
                                    <SelectItem key={channel.id} value={channel.id}>
                                        {channel.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Card>
                    <Card className="flex p-2 w-full space-x-2">
                        <Input type="text" placeholder="Message" value={messageContent} onChange={(e) => setMessageContent(e.target.value)} />
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
                                        {embeddingImageURL? <img src={embeddingImageURL} height="100%" width="100%" alt="mainimage" /> : <></>}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex flex-row space-x-2">
                                    <Avatar>
                                        {embeddingFooterIconURL? <AvatarImage src={embeddingFooterIconURL} /> : <></>}
                                    </Avatar>
                                    <CardDescription>{embeddingFooterTitle}</CardDescription>
                                    <CardDescription>{date?.toDateString()}</CardDescription>
                                </CardFooter>
                            </div>
                            <div className="max-w-[80px] max-h-[80px] my-8">
                                {embeddingThumbnailURL?<img className="rounded" src={embeddingThumbnailURL} alt="thumbnail" width={80} height={80} />: <></>}
                            </div>
                        </Card>
                    </Card>
                    <Card className="flex flex-col p-2 w-full space-y-2">
                        <Textarea placeholder="Message Content" defaultValue={embeddingMessageContent} onChange={event => setEmbeddingMessageContent(event.target.value)} />
                        <Input type="text" placeholder="Embedding Author" onChange={event => setEmbeddingAuthor(event.target.value)} />
                        <div className="flex flex-row space-x-2">
                            <Input type="text" placeholder="Embedding Author URL" onChange={event => setEmbeddingAuthorURL(event.target.value)} />
                            <Input type="text" placeholder="Embedding Author Icon URL" onChange={event => setEmbeddingAuthorIconURL(event.target.value)} />
                        </div>
                        <Input type="text" placeholder="Embedding Title" onChange={event => setEmbeddingTitle(event.target.value)} />
                        <Textarea placeholder="Embedding Content" onChange={event => setEmbeddingContent(event.target.value)}></Textarea>
                        <div className="flex flex-row space-x-2">
                            <Input type="text" placeholder="Embedding URL" onChange={event => setEmbeddingTitleURL(event.target.value)} />
                            <GradientPicker background={color} setBackground={setColor} />
                        </div>
                        <Input type="text" placeholder="Image URL" onChange={event => setEmbeddingImageURL(event.target.value)} />
                        <Input type="text" placeholder="Thumbnail URL" onChange={event => setEmbeddingThumbnailURL(event.target.value)} />
                        <Input type="text" placeholder="Footer Title" onChange={event => setEmbeddingFooterTitle(event.target.value)} />
                        <div className="flex flex-row space-x-2">
                            <Input type="text" placeholder="Footer Icon URL" onChange={event => setEmbeddingFooterIconURL(event.target.value)} />
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
                        <Button onClick={() => {handleFetchChannels()}}>Fetch Channels</Button>
                        <Select onValueChange={setSelectedChannelId} disabled={channels.length === 0}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Channels" />
                            </SelectTrigger>
                            <SelectContent id="selectMessageChannel" position="popper">
                                {channels.map((channel) => (
                                    <SelectItem key={channel.id} value={channel.id}>
                                        {channel.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button type="button" onClick={handleSendEmbedding}>Send Embedding</Button>
                    </Card>
                </CardContent>
            </Card>
        </div>
    )
}

export default MessageFragment;