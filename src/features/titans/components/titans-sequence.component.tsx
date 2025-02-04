import TitanSequenceImage from '@/assets/Titan_sequence.webp';
import JukkAvatar from '@/assets/titans/avatars/Jukk_avatar.webp';
import KlonkAvatar from '@/assets/titans/avatars/Klonk_avatar.webp';
import LojakAvatar from '@/assets/titans/avatars/Lojak_avatar.webp';
import MohacaAvatar from '@/assets/titans/avatars/Mohaca_avatar.webp';
import PrikerAvatar from '@/assets/titans/avatars/Priker_avatar.webp';
import SterlAvatar from '@/assets/titans/avatars/Sterl_avatar.webp';
import TakedarAvatar from '@/assets/titans/avatars/Takedar_avatar.webp';
import TerroAvatar from '@/assets/titans/avatars/Terro_avatar.webp';
import { RaidTitanData } from '@/components/raid-titan-data';
import { TitanSequence } from '@/features/titans';
import { useBoundStore } from '@/stores/bound.store';
import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Image,
    Selection,
    Skeleton,
} from "@heroui/react";
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

const TitanImageMapping = {
    Jukk: JukkAvatar,
    Klonk: KlonkAvatar,
    Lojak: LojakAvatar,
    Mohaca: MohacaAvatar,
    Priker: PrikerAvatar,
    Sterl: SterlAvatar,
    Takedar: TakedarAvatar,
    Terro: TerroAvatar,
};

type TitanImageMappingType = keyof typeof TitanImageMapping;

export function TitansSequence() {
    const { titans, currentTitan } = useBoundStore();

    const [selectedTitan, setSelectedTitan] = useState<TitanSequence>();

    useEffect(() => {
        if (currentTitan) setSelectedTitan(currentTitan);
        if (currentTitan) setSelectedOption(new Set([currentTitan.id]));
    }, [currentTitan]);

    const selectTitan = (titanId: string) => {
        const foundTitan = titans.find((titan) => titan.id === titanId);
        setSelectedTitan(foundTitan);
        if (foundTitan) setSelectedOption(new Set([foundTitan.id]));
    };

    const [selectedOption, setSelectedOption] = useState(new Set([currentTitan?.id!]));

    const isDefeatedTitan = (otherTitanSequenceIndex: number) => !!(currentTitan && currentTitan?.sequence_index > otherTitanSequenceIndex);

    return (
        <Card className="h-full p-2 dark:bg-neutral-800">
            <CardHeader className="flex h-[70px] flex-row items-center justify-between">
                <Skeleton isLoaded={!!selectedTitan} className="rounded-md">
                    <h3 className="text-lg font-medium">Titan Sequence</h3>
                </Skeleton>
                <div className="min-w-fit">
                    <Skeleton isLoaded={!!selectedTitan} className="rounded-md">
                        <Image src={TitanSequenceImage} className="flex h-8 w-8 object-cover" radius="none" />
                    </Skeleton>
                </div>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-col gap-4">
                <div className="flex flex-col items-center justify-center gap-2">
                    <Skeleton isLoaded={!!selectedTitan} className="rounded-md">
                        {selectedTitan && (
                            <ButtonGroup variant="solid" className="flex flex-row items-center justify-center">
                                <Dropdown placement="top">
                                    <DropdownTrigger>
                                        <Button
                                            key={selectedTitan.id}
                                            className="m-0 flex min-h-fit w-44 flex-row p-0"
                                            radius="sm"
                                            color="primary"
                                            startContent={
                                                <div className="relative flex w-full flex-row items-center justify-start gap-2">
                                                    {isDefeatedTitan(selectedTitan.sequence_index) && (
                                                        <CheckIcon className="absolute z-10 h-10 w-10 bg-transparent text-green-500" />
                                                    )}
                                                    <Image
                                                        radius="sm"
                                                        width="100%"
                                                        alt={selectedTitan.name}
                                                        className={`z-0 h-10 w-10 object-contain ${
                                                            isDefeatedTitan(selectedTitan.sequence_index) ? 'grayscale' : 'grayscale-0'
                                                        }`}
                                                        src={TitanImageMapping[selectedTitan.name as TitanImageMappingType]}
                                                    />
                                                    <span>
                                                        {selectedTitan.name} &nbsp;
                                                        {selectedTitan.sequence_index! + 1} / {titans.length}
                                                    </span>
                                                </div>
                                            }
                                            endContent={<ChevronDownIcon className="mr-2" />}
                                        ></Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        disallowEmptySelection
                                        aria-label="Titan Sequence options"
                                        selectedKeys={selectedOption}
                                        selectionMode="single"
                                        onSelectionChange={(keys: Selection) => selectTitan(Array.from(keys)[0].toString())}
                                        className="max-w-[300px]"
                                        hideSelectedIcon={true}
                                        variant="solid"
                                        color="default"
                                    >
                                        {titans?.map((titan) => (
                                            <DropdownItem
                                                key={titan.id}
                                                title={titan.name}
                                                description={`${titan.sequence_index! + 1} / ${titans.length}`}
                                                startContent={
                                                    <div className="relative h-auto min-w-fit">
                                                        {isDefeatedTitan(titan.sequence_index) && (
                                                            <CheckIcon className="absolute z-10 h-10 w-10 bg-transparent text-green-500" />
                                                        )}
                                                        <Image
                                                            radius="sm"
                                                            width="100%"
                                                            alt={titan.name}
                                                            className={`z-0 h-10 w-10 object-contain ${
                                                                isDefeatedTitan(titan.sequence_index) ? 'grayscale' : 'grayscale-0'
                                                            }`}
                                                            src={TitanImageMapping[titan.name as TitanImageMappingType]}
                                                        />
                                                    </div>
                                                }
                                            />
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                            </ButtonGroup>
                        )}
                    </Skeleton>
                </div>

                <div className="flex flex-row items-center justify-center">
                    <Skeleton isLoaded={!!selectedTitan} className="rounded-md">
                        {selectedTitan && <RaidTitanData titan={selectedTitan} showHealthbars={true} />}
                    </Skeleton>
                </div>
            </CardBody>
        </Card>
    );
}
