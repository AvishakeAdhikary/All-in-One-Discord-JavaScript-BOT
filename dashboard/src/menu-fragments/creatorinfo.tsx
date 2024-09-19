import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { MousePointer2 } from "lucide-react";

const CreatorInformationFragment: React.FC = () => {
    const creatorName = "Avishake Adhikary"
    const creatorLink = "https://avishakeadhikary.github.io/"
    const creatorHeroImageLink = "https://avishakeadhikary.github.io/images/gallery/AvishakeAmityMCAGradMain.JPG"

    return(
        <div>
            <Card className="border p-2 text-center">
                <CardHeader>
                    <CardTitle>Creator Information</CardTitle>
                    <CardDescription>Know more information about who created the bot...</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap flex-row justify-around space-x-4 space-y-4">
                        <img className="rounded max-h-[400px]" src={creatorHeroImageLink} alt={creatorName} />
                        <div className="flex flex-col text-left justify-evenly">
                            <p>Hey there, I'm <a className="hover:underline" href={creatorLink}><strong>Avishake Adhikary</strong></a></p>
                            <p>I'm a Machine Learning Engineer from Kolkata, India.</p>
                            <p>I currently have the knowledge of more than 30+ programming languages.</p>
                            <p>I have done many legendary projects, spanning over all the possible domains.</p>
                            <p>Words are too short to portray my legendary picture.</p>
                            <div className="flex flex-row">
                                <p>So, to know more:&nbsp;</p>
                                <Button>
                                    <MousePointer2 className="mr-2" />Click Here
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreatorInformationFragment;