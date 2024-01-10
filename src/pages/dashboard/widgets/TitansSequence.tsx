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
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { TitanPart, TitanSequence, TitanSequenceParts } from '../raid-log/types';
import RaidTitanData from '@/components/RaidTitanData';
import { useBoundStore } from '@/stores/useBoundStore';
import { ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons';

function getImageUrl(name: string): string {
    return new URL(`../../../assets/titans/avatars/${name}.webp`, import.meta.url).href;
}

function getCardLogoImageUrl(name: string): string {
    return new URL(`../../../assets/${name}.webp`, import.meta.url).href;
}

const titanAvatarSuffix = '_avatar';
const raidIconFileName = 'RaidIcon';

export default function TitansSequence() {
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
        <Card className="dark:bg-neutral-800 p-2 h-full">
            <CardHeader>
                <div className="flex flex-row items-center justify-start gap-4">
                    <div className="min-w-fit">
                        <Skeleton isLoaded={!!selectedTitan} className="rounded-lg">
                            <Image src={getCardLogoImageUrl(raidIconFileName)} className="rounded-lg flex object-cover h-8 w-8" />
                        </Skeleton>
                    </div>
                    <Skeleton isLoaded={!!selectedTitan} className="rounded-lg">
                        <h3 className="text-lg font-medium">Titan Sequence</h3>
                    </Skeleton>
                </div>
            </CardHeader>

            <CardBody className="flex flex-col gap-4">
                <Divider />
                <div className="flex flex-col gap-2 justify-center items-center">
                    <Skeleton isLoaded={!!selectedTitan}>
                        {selectedTitan && (
                            <ButtonGroup variant="solid">
                                <Dropdown placement="top">
                                    <DropdownTrigger>
                                        <Button
                                            key={selectedTitan.id}
                                            className="p-0 m-0 flex flex-row w-44 min-h-fit"
                                            radius="sm"
                                            color="primary"
                                            startContent={
                                                <div className="flex flex-row justify-start items-center w-full gap-2 relative">
                                                    {isDefeatedTitan(selectedTitan.sequence_index) && (
                                                        <CheckIcon className="text-green-500 h-10 w-10 bg-transparent absolute z-10" />
                                                    )}
                                                    <Image
                                                        shadow="sm"
                                                        radius="sm"
                                                        width="100%"
                                                        alt={selectedTitan.name}
                                                        className={`object-cover h-10 w-10 z-0 ${
                                                            isDefeatedTitan(selectedTitan.sequence_index) ? 'grayscale' : 'grayscale-0'
                                                        }`}
                                                        src={getImageUrl(selectedTitan.name + titanAvatarSuffix)}
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
                                                    <div className="relative min-w-fit h-auto">
                                                        {isDefeatedTitan(titan.sequence_index) && (
                                                            <CheckIcon className="text-green-500 h-10 w-10 bg-transparent absolute z-10" />
                                                        )}
                                                        <Image
                                                            shadow="sm"
                                                            radius="sm"
                                                            width="100%"
                                                            alt={titan.name}
                                                            className={`object-cover h-10 w-10 z-0 ${
                                                                isDefeatedTitan(titan.sequence_index) ? 'grayscale' : 'grayscale-0'
                                                            }`}
                                                            src={getImageUrl(titan.name + titanAvatarSuffix)}
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
                    {selectedTitan && (
                        <RaidTitanData
                            titan={selectedTitan}
                            parts={selectedTitan?.parts?.map(({ name, current_health: value }: TitanSequenceParts) => {
                                const titanPart: TitanPart = { name, value };
                                return titanPart;
                            })}
                            showHealthbars={true}
                        />
                    )}
                </div>
            </CardBody>
        </Card>
    );
}
