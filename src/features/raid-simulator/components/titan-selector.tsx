import JukkHeadshot from '@/assets/titans/headshots/Jukk.webp';
import KlonkHeadshot from '@/assets/titans/headshots/Klonk.webp';
import LemmyHeadshot from '@/assets/titans/headshots/Lemmy.webp';
import LojakHeadshot from '@/assets/titans/headshots/Lojak.webp';
import MohacaHeadshot from '@/assets/titans/headshots/Mohaca.webp';
import PrikerHeadshot from '@/assets/titans/headshots/Priker.webp';
import SterlHeadshot from '@/assets/titans/headshots/Sterl.webp';
import TakedarHeadshot from '@/assets/titans/headshots/Takedar.webp';
import TerroHeadshot from '@/assets/titans/headshots/Terro.webp';
import Jukk from '@/assets/titans/Jukk.webp';
import Takedar from '@/assets/titans/Takedar.webp';
import { Avatar, Button, ButtonGroup, Image, Progress } from '@heroui/react';
// import Lemmy from '@/assets/titans/Lemmy.webp';
import Klonk from '@/assets/titans/Klonk.webp';
import Lojak from '@/assets/titans/Lojak.webp';
import Mohaca from '@/assets/titans/Mohaca.webp';
import Priker from '@/assets/titans/Priker.webp';
import Sterl from '@/assets/titans/Sterl.webp';
import Terro from '@/assets/titans/Terro.webp';
import { abbreviateNumber } from '@/utils/number-formatter';
import { useState } from 'react';

type TitanSelection = {
    id: number;
    name: string;
    headshotImg: string;
    bodyImg: string;
};

const titans: TitanSelection[] = [
    { id: 1, name: 'Lemmy', headshotImg: LemmyHeadshot, bodyImg: Jukk },
    { id: 2, name: 'Lojak', headshotImg: LojakHeadshot, bodyImg: Lojak },
    { id: 3, name: 'Takedar', headshotImg: TakedarHeadshot, bodyImg: Takedar },
    { id: 4, name: 'Jukk', headshotImg: JukkHeadshot, bodyImg: Jukk },
    { id: 5, name: 'Sterl', headshotImg: SterlHeadshot, bodyImg: Sterl },
    { id: 6, name: 'Mohaca', headshotImg: MohacaHeadshot, bodyImg: Mohaca },
    { id: 7, name: 'Terro', headshotImg: TerroHeadshot, bodyImg: Terro },
    { id: 8, name: 'Klonk', headshotImg: KlonkHeadshot, bodyImg: Klonk },
    { id: 9, name: 'Priker', headshotImg: PrikerHeadshot, bodyImg: Priker },
];

const titanBodyParts = {
    leftShoulder: { health: 10_000_000, position: 'left-2 top-8' },
    rightShoulder: { health: 10_000_000, position: 'right-2 top-8' },
    leftHand: { health: 10_000_000, position: 'left-2' },
    rightHand: { health: 10_000_000, position: 'right-2' },
    leftLeg: { health: 10_000_000, position: 'bottom-12 left-14' },
    rightLeg: { health: 10_000_000, position: 'bottom-12 right-14' },
    head: { health: 10_000_000, position: 'top-4' },
    torso: { health: 10_000_000, position: 'top-[40%]' },
};

const formatter = new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export default function TitanSelector() {
    const [selectedTitan, setSelectedTitan] = useState<TitanSelection>(titans[0]);
    const [selectedTitanPart, setSelectedTitanPart] = useState<string | null>(null);

    const selectedTitanHealth = Object.values(titanBodyParts).reduce((prev, curr) => prev + curr.health, 0);

    return (
        <div className="flex h-dvh w-full max-w-3xl flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Titan Selector</h1>

            <div className="flex flex-col gap-8 rounded-lg border-4 border-solid p-4">
                <div className="flex flex-col">
                    <div className="relative">
                        <Progress
                            aria-label="titan total armour"
                            radius="sm"
                            size="lg"
                            value={selectedTitanHealth * Math.random()}
                            maxValue={selectedTitanHealth}
                            color="default"
                            label={<span className="absolute left-1 top-2.5 z-10 text-tiny font-bold text-white">Armour</span>}
                            showValueLabel
                            valueLabel={
                                <span className="absolute right-1 top-2.5 z-10 text-tiny font-bold text-white">
                                    {formatter.format(selectedTitanHealth)} AP
                                </span>
                            }
                            classNames={{ track: 'bg-default-900/50', indicator: 'bg-default-700' }}
                        />
                    </div>
                    <div className="relative">
                        <Progress
                            aria-label="titan total health"
                            radius="sm"
                            size="lg"
                            value={selectedTitanHealth * Math.random()}
                            maxValue={selectedTitanHealth}
                            color="primary"
                            label={<span className="absolute left-1 top-2.5 z-10 text-tiny font-bold text-white">{selectedTitan.name}</span>}
                            showValueLabel
                            valueLabel={
                                <span className="absolute right-1 top-2.5 z-10 text-tiny font-bold text-white">
                                    {formatter.format(selectedTitanHealth)} HP
                                </span>
                            }
                            classNames={{ track: 'bg-default-900/50' }}
                        />
                    </div>
                </div>
                <div className="relative flex w-fit flex-col items-center justify-center">
                    <Image src={selectedTitan?.bodyImg} alt={selectedTitan?.name} className="h-64 w-64 object-contain" />
                    {Object.entries(titanBodyParts).map(([key, value]) => {
                        return (
                            <Progress
                                key={key}
                                aria-label={key}
                                // label={
                                //     <span className="absolute right-1 top-2.5 z-10 text-tiny font-bold text-white">
                                //         {abbreviateNumber(value.health)}
                                //     </span>
                                // }
                                showValueLabel
                                valueLabel={
                                    <span className="absolute right-1 top-2.5 z-10 text-tiny font-bold text-white">
                                        {abbreviateNumber(value.health)}
                                    </span>
                                }
                                radius="sm"
                                className={`absolute z-10 max-w-16 ${value.position}`}
                                classNames={{ track: 'bg-default-900/50 inset-ring-2 inset-ring-blue-500' }}
                                value={value.health * Math.random()}
                                maxValue={value.health}
                                size="lg"
                                onClick={() => setSelectedTitanPart(key)}
                            />
                        );
                    })}
                </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
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
                {selectedTitanPart}
            </div>
        </div>
    );
}
