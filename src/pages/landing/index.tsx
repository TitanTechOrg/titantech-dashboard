import { Button, Code, Link } from '@nextui-org/react';
import { DiscordLogoIcon, InfoCircledIcon } from '@radix-ui/react-icons';

export default function GetStarted() {
    return (
        <div className="mx-auto max-w-2xl">
            <div className="flex flex-col items-center justify-center gap-8 sm:py-16">
                <article>
                    <h1 className="text-2xl font-semibold">TitanTech</h1>
                    <p className="text-left">
                        TitanTech is an analytics solution for Tap Titans 2 that aims to provide real-time data and insights to help clan members and
                        leaders optimize their raiding strategy.
                    </p>
                </article>
                <div className="w-full">
                    <h1 className="text-lg font-medium">Get started</h1>
                    <ol className="list-inside list-decimal text-left">
                        <li>
                            Invite the&nbsp;
                            <Link isExternal showAnchorIcon href={import.meta.env.VITE_DISCORD_INVITE_LINK} target="_blank" rel="noopener noreferrer">
                                TitanTech bot
                            </Link>
                            &nbsp;to your Discord server
                        </li>
                        <li>
                            Type&nbsp;<Code>/connect_clan&nbsp;&lt;TOKEN&gt;</Code>
                        </li>
                        <li>Use the link provided by the TitanTech bot to access your Dashboard</li>
                    </ol>
                    <Code className="mt-4 text-wrap">
                        <div className="flex items-center">
                            <InfoCircledIcon className="h-4 w-4 flex-shrink-0 object-cover sm:mr-4" />
                            <span>Please note that only (Grand) Master rank can generate a token for your clan</span>
                        </div>
                    </Code>
                </div>
                <div className="flex w-full flex-col items-center justify-center gap-4">
                    <h1 className="text-lg">Got feedback or questions?</h1>
                    <Button
                        size="lg"
                        as={Link}
                        href={import.meta.env.VITE_DISCORD_SUPPORT_INVITE_LINK}
                        color="primary"
                        variant="ghost"
                        target="_blank"
                        className="w-fit"
                        startContent={<DiscordLogoIcon />}
                    >
                        Discord
                    </Button>
                </div>
            </div>
        </div>
    );
}
