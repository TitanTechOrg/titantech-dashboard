import { Instruction } from './types';
import { TriangleRightIcon, InfoCircledIcon } from '@radix-ui/react-icons';

export const TitanTechLink =
    'https://discord.com/api/oauth2/authorize?client_id=1130160856211128460&permissions=537152576&scope=bot%20applications.commands';

export const instructions: Instruction[] = [
    {
        id: 1,
        title: 'Requisites',
        description: 'Please note that only Grand Master and Master ranks in a clan can generate a token',
        icon: <InfoCircledIcon className="h-4 w-4" />,
    },
    {
        id: 2,
        title: 'Step 1',
        description: 'To get started, please invite TitanTech Discord bot to your server using the invite button above',
        icon: <TriangleRightIcon className="h-4 w-4" />,
    },
    { id: 3, title: 'Step 2', description: 'Type /config register', icon: <TriangleRightIcon className="h-4 w-4" /> },
    {
        id: 4,
        title: 'Step 3',
        description: 'Use the link provided by the bot to access the TitanTech Dashboard',
        icon: <TriangleRightIcon className="h-4 w-4" />,
    },
];
