import JukkHeadshot from '@/assets/titans/headshots/Jukk.webp';
import KlonkHeadshot from '@/assets/titans/headshots/Klonk.webp';
import LemmyHeadshot from '@/assets/titans/headshots/Lemmy.webp';
import LojakHeadshot from '@/assets/titans/headshots/Lojak.webp';
import MohacaHeadshot from '@/assets/titans/headshots/Mohaca.webp';
import PrikerHeadshot from '@/assets/titans/headshots/Priker.webp';
import SterlHeadshot from '@/assets/titans/headshots/Sterl.webp';
import TakedarHeadshot from '@/assets/titans/headshots/Takedar.webp';
import TerroHeadshot from '@/assets/titans/headshots/Terro.webp';
import { Avatar, Button, ButtonGroup, Image } from '@heroui/react';

import Jukk from '@/assets/titans/Jukk.webp';
import { useState } from 'react';

type TitanSelection = {
    id: number;
    name: string;
    headshotImg: string;
    bodyImg: string;
};

const titans: TitanSelection[] = [
    { id: 1, name: 'Lemmy', headshotImg: LemmyHeadshot, bodyImg: Jukk },
    { id: 2, name: 'Lojak', headshotImg: LojakHeadshot, bodyImg: Jukk },
    { id: 3, name: 'Takedar', headshotImg: TakedarHeadshot, bodyImg: Jukk },
    { id: 4, name: 'Jukk', headshotImg: JukkHeadshot, bodyImg: Jukk },
    { id: 5, name: 'Sterl', headshotImg: SterlHeadshot, bodyImg: Jukk },
    { id: 6, name: 'Mohaca', headshotImg: MohacaHeadshot, bodyImg: Jukk },
    { id: 7, name: 'Terro', headshotImg: TerroHeadshot, bodyImg: Jukk },
    { id: 8, name: 'Klonk', headshotImg: KlonkHeadshot, bodyImg: Jukk },
    { id: 9, name: 'Priker', headshotImg: PrikerHeadshot, bodyImg: Jukk },
];

export default function TitanSelector() {
    const [selectedTitan, setSelectedTitan] = useState<TitanSelection | null>(null);
    console.log(selectedTitan);
    return (
        <div className="flex h-dvh w-full max-w-3xl flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Titan Selector</h1>

            <div className="flex w-full max-w-3xl flex-col items-center justify-center">
                <Image src={selectedTitan?.bodyImg} alt={selectedTitan?.name} className="h-64 w-full rounded-lg object-cover" />
            </div>

            <div className="flex items-center justify-center gap-4">
                <ButtonGroup>
                    {titans.map((titan) => (
                        <Button
                            key={titan.id}
                            onPress={(_e) => setSelectedTitan(titan)}
                            className="m-0 flex h-16 w-16 min-w-fit flex-col items-center justify-center p-0"
                        >
                            <Avatar isBordered radius="sm" src={titan.headshotImg} alt={titan.name} size="lg" />
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
        </div>
    );
}
