import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Avatar } from "../components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Textarea } from "../components/ui/textarea";
import { GradientPicker } from "../components/gradient-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { cn } from "../lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../components/ui/calendar";

const MessageFragment: React.FC = () => {
    const handleSendMessage = () => { console.log("Inside handleSendMessage()."); };
    const handleSendEmbedding = () => { console.log("Inside handleSendEmbedding()."); };

    const [color, setColor] = useState('#1F2225');
    const [date, setDate] = useState<Date>()
    const [embeddingMessageContent, setEmbeddingMessageContent] = useState("");
    const [embeddingTitle, setEmbeddingTitle] = useState("Title");
    const [embeddingTitleURL, setEmbeddingTitleURL] = useState("https://avishakeadhikary.github.io/");
    const [embeddingContent, setEmbeddingContent] = useState("Content");
    const [embeddingImageURL, setEmbeddingImageURL] = useState("https://placehold.co/600x600");
    const [embeddingThumbnailURL, setEmbeddingThumbnailURL] = useState("https://placehold.co/600x600");
    const [embeddingAuthor, setEmbeddingAuthor] = useState("Author");
    const [embeddingAuthorIconURL, setEmbeddingAuthorIconURL] = useState("https://placehold.co/600x600");
    const [embeddingAuthorURL, setEmbeddingAuthorURL] = useState("https://avishakeadhikary.github.io/");

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
                                        <AvatarImage src={embeddingAuthorIconURL} />
                                    </Avatar>
                                    <CardDescription>Footer Description</CardDescription>
                                    <CardDescription>Timestamp 06/09/1969</CardDescription>
                                </CardFooter>
                            </div>
                            <div className="max-w-[80px] max-h-[80px] my-8">
                                <img className="rounded" src={embeddingThumbnailURL} alt="thumbnail" width={80} height={80} />
                            </div>
                        </Card>
                    </Card>
                    <Card className="flex flex-col p-2 w-full space-y-2">
                        <Textarea placeholder="Message Content" defaultValue={embeddingMessageContent} onChange={event => setEmbeddingMessageContent(event.target.value)}></Textarea>
                        <Input type="text" placeholder="Embedding Author" />
                        <div className="flex flex-row space-x-2">
                            <Input type="text" placeholder="Embedding Author URL" />
                            <Input type="text" placeholder="Embedding Author Icon URL" />
                        </div>
                        <Input type="text" placeholder="Embedding Title" />
                        <Textarea placeholder="Embedding Description"></Textarea>
                        <div className="flex flex-row space-x-2">
                            <Input type="text" placeholder="Embedding Link URL" />
                            <GradientPicker background={color} setBackground={setColor} />
                        </div>
                        <Input type="text" placeholder="Image URL" />
                        <Input type="text" placeholder="Thumbnail URL" />
                        <Input type="text" placeholder="Footer Title" />
                        <div className="flex flex-row space-x-2">
                            <Input type="text" placeholder="Footer Icon URL" />
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
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
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