import { TitanTechLink } from '@/constants';
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
import { ChevronUpIcon } from '@nextui-org/shared-icons';

function NoTokenPage() {
    return (
        <Card className="max-w-[400px] mx-auto">
            <CardHeader className="flex gap-3">
                <Image alt="TitanTech logo" height={40} radius="sm" src={Logo} width={40} />
                <div className="flex flex-col justify-center items-start">
                    <p className="text-md">TitanTech</p>
                    <p className="text-small text-default-500">Some description</p>
                </div>
            </CardHeader>
            <CardBody>
                <p>Maybe more description here.</p>
            </CardBody>
            <CardFooter className="flex flex-col justify-center items-start">
                <div className="flex flex-row gap-3">
                    <Link isExternal href={TitanTechLink} target="_blank" rel="noopener noreferrer">
                        <Button color="primary" startContent={<DiscordLogoIcon />}>
                            Invite to Discord
                        </Button>
                    </Link>
                    <Tooltip content="Copy invite link">
                        <Button isIconOnly color="primary" aria-label="Copy invite link" onClick={() => navigator.clipboard.writeText(TitanTechLink)}>
                            <CopyIcon />
                        </Button>
                    </Tooltip>
                </div>
                <Spacer y={8} />
                <Divider />
                <Accordion>
                    <AccordionItem
                        aria-label="Tap here for more info"
                        title="Read here for more info"
                        className="text-left [&_span.rotate-0]:data-[open=true]:rotate-180"
                        indicator={<ChevronUpIcon />}
                    >
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
                                    2. Type <Code>/config register</Code>.
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

export default NoTokenPage;
