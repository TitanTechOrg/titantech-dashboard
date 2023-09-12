import { TitanTechLink, instructions } from '@/constants';
import { Instruction } from '@/types';
import { Link } from 'react-router-dom';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

import { CopyIcon, DiscordLogoIcon } from '@radix-ui/react-icons';

import Logo from '@/assets/Logo.webp';

function NoTokenPage() {
    return (
        <div id="no-token-page" className="flex justify-center align-center">
            <Card className="w-[360px]">
                <CardHeader>
                    <CardTitle className="pb-4">Authorize</CardTitle>
                    <div className="flex-col justify-start align-center">
                        <div className="flex gap-x-4 pb-4">
                            <Avatar>
                                <AvatarImage src={Logo} />
                                <AvatarFallback>TitanTech</AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col justify-center items-start">
                                <h3 className="text-lg font-medium leading-none">TitanTech</h3>
                                <p className="text-sm text-muted-foreground">Some description about the bot...</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Link to={TitanTechLink} target="_blank" rel="noopener noreferrer">
                                <Button>
                                    <DiscordLogoIcon className="mr-2 h-4 w-4" />
                                    Invite to your server
                                </Button>
                            </Link>
                            <Button size="icon" onClick={() => navigator.clipboard.writeText(TitanTechLink)}>
                                <CopyIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible>
                        <AccordionItem value={'How to get started'}>
                            <AccordionTrigger>Read here for more info</AccordionTrigger>
                            <AccordionContent>
                                {instructions.map((instruction: Instruction, index: number) => {
                                    return (
                                        <div key={instruction.id} className={index !== instructions.length - 1 ? 'mb-4' : undefined}>
                                            <Alert>
                                                {instruction.icon}
                                                <AlertTitle>{instruction.title}</AlertTitle>
                                                <AlertDescription>{instruction.description}</AlertDescription>
                                            </Alert>
                                        </div>
                                    );
                                })}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
}

export default NoTokenPage;
