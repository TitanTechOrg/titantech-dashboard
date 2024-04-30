import {
    Accordion,
    AccordionItem,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Image,
    Button,
    Spacer,
    Link,
    Tooltip,
    Code,
} from '@nextui-org/react';
import { CopyIcon, DiscordLogoIcon } from '@radix-ui/react-icons';
import Logo from '@/assets/Logo.webp';

export function GetStarted() {
    return (
        <Card className="mx-auto w-full max-w-[400px]">
            <CardHeader className="flex gap-3">
                <Image alt="TitanTech logo" className="h-10 w-10 rounded" src={Logo} />
                <div className="flex flex-col items-start justify-center">
                    <p className="text-lg">TitanTech</p>
                    <p className="text-small text-default-500">Some description</p>
                </div>
            </CardHeader>
            <CardBody>
                <p>Maybe more description here.</p>
            </CardBody>
            <CardFooter className="flex flex-col items-start justify-center">
                <div className="flex flex-row gap-3">
                    <Link isExternal href={import.meta.env.VITE_DISCORD_INVITE_LINK} target="_blank" rel="noopener noreferrer">
                        <Button color="primary" startContent={<DiscordLogoIcon />}>
                            Invite to Discord
                        </Button>
                    </Link>
                    <Tooltip content="Copy invite link">
                        <Button
                            isIconOnly
                            color="primary"
                            aria-label="Copy invite link"
                            onClick={() => navigator.clipboard.writeText(import.meta.env.VITE_DISCORD_INVITE_LINK)}
                        >
                            <CopyIcon />
                        </Button>
                    </Tooltip>
                </div>
                <Spacer y={8} />
                <Divider />
                <Accordion>
                    <AccordionItem aria-label="Tap here for more info" title="Read here for more info">
                        <Card shadow="none">
                            <CardBody>
                                <p className="font-medium italic">
                                    Please note that only Grand Master and Master ranks in a clan can generate a token.
                                </p>
                            </CardBody>
                        </Card>
                        <Card shadow="none">
                            <CardBody>
                                <p>1. Get started by inviting TitanTech to your server using the invite button above.</p>
                            </CardBody>
                        </Card>
                        <Card shadow="none">
                            <CardBody>
                                <p>
                                    2. Type <Code>{'/connect_clan <TOKEN>'}</Code>.
                                </p>
                            </CardBody>
                        </Card>
                        <Card shadow="none">
                            <CardBody>
                                <p>3. Use the link provided by the bot to access the TitanTech Dashboard.</p>
                            </CardBody>
                        </Card>
                    </AccordionItem>
                </Accordion>
            </CardFooter>
        </Card>
    );
}
