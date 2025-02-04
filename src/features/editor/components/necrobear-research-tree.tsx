import { Button, ButtonGroup } from '@heroui/react';
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import { useMemo, useState } from 'react';
import { raidResearchData } from '../constants/research-tree-data';

export function NecrobearResearchTree() {
    const nodes = useMemo(() => {
        return Object.entries(raidResearchData).flatMap(([key, nodeGroup]) =>
            nodeGroup.map((node, index) => ({
                ...node,
                id: `${key}_${index}`,
            }))
        );
    }, []);

    const [currentNodes, setCurrentNodes] = useState(nodes);

    const bonuses = useMemo(() => {
        return currentNodes.reduce(
            (acc, node) => {
                const existing = acc.find((bonus) => bonus.type === node.type);
                if (existing) {
                    existing.totalBonus += node.levels.current * node.levels.bonusPer;
                } else {
                    acc.push({
                        type: node.type,
                        totalBonus: node.levels.current * node.levels.bonusPer,
                    });
                }
                return acc;
            },
            [] as { type: string; totalBonus: number }[]
        );
    }, [currentNodes]);

    const handleIncrement = (index: number) => {
        setCurrentNodes((prevNodes) =>
            prevNodes.map((n, idx) =>
                idx === index
                    ? {
                          ...n,
                          levels: {
                              ...n.levels,
                              current: Math.min(n.levels.current + 1, n.levels.total),
                          },
                      }
                    : n
            )
        );
    };

    const handleDecrement = (index: number) => {
        setCurrentNodes((prevNodes) =>
            prevNodes.map((n, idx) =>
                idx === index
                    ? {
                          ...n,
                          levels: {
                              ...n.levels,
                              current: Math.max(n.levels.current - 1, 0),
                          },
                      }
                    : n
            )
        );
    };

    const handleMax = (index: number) => {
        setCurrentNodes((prevNodes) =>
            prevNodes.map((n, idx) =>
                idx === index
                    ? {
                          ...n,
                          levels: {
                              ...n.levels,
                              current: n.levels.total,
                          },
                      }
                    : n
            )
        );
    };

    const handleResetAll = () => {
        setCurrentNodes((prevNodes) =>
            prevNodes.map((n) => ({
                ...n,
                levels: { ...n.levels, current: 0 },
            }))
        );
    };

    const handleMaxAll = () => {
        setCurrentNodes((prevNodes) =>
            prevNodes.map((n) => ({
                ...n,
                levels: { ...n.levels, current: n.levels.total },
            }))
        );
    };

    return (
        <div className="flex flex-col items-center p-4">
            <div className="mb-8 w-full max-w-md rounded-lg bg-default-100 p-4">
                <details>
                    <summary className="cursor-pointer font-medium">View Bonuses</summary>
                    <ul className="space-y-2 pl-4">
                        {bonuses.map((bonus, idx) => (
                            <li key={`${bonus.type}_${idx}`} className="flex justify-between text-sm">
                                <span>{bonus.type}</span>
                                <span>{bonus.totalBonus}</span>
                            </li>
                        ))}
                    </ul>
                </details>
            </div>

            <div className="w-full max-w-screen-lg">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Nodes</h2>
                    <div className="flex space-x-2">
                        <Button onPress={handleResetAll} color="primary" aria-label="Reset all nodes to level 0">
                            Reset All
                        </Button>
                        <Button onPress={handleMaxAll} color="primary" aria-label="Maximize all nodes to their total level">
                            Max All
                        </Button>
                    </div>
                </div>
                {Object.entries(raidResearchData).map(([key, nodeGroup], outerIdx) => (
                    <div key={`${key}_${outerIdx}`} className="mb-4 flex space-x-4">
                        {nodeGroup.map((_, innerIdx) => {
                            const currentNodeIndex = outerIdx * nodeGroup.length + innerIdx;
                            const currentNode = currentNodes[currentNodeIndex];

                            if (!currentNode) {
                                return null;
                            }

                            return (
                                <div key={currentNode.id} className="flex-grow rounded-lg border p-4">
                                    <div className="flex flex-col items-center gap-2 text-left">
                                        <h3 className="text-lg font-bold">{currentNode.type}</h3>
                                        <p>Bonus per Level: {currentNode.levels.bonusPer}%</p>
                                        <p>
                                            Current Level: {currentNode.levels.current} / {currentNode.levels.total}
                                        </p>
                                        <p>Total Bonus: {currentNode.levels.current * currentNode.levels.bonusPer}%</p>

                                        <ButtonGroup>
                                            <Button
                                                onPress={() => handleDecrement(currentNodeIndex)}
                                                isIconOnly
                                                disabled={currentNode.levels.current === 0}
                                                aria-label={`Decrement ${currentNode.type}`}
                                            >
                                                <MinusIcon />
                                            </Button>
                                            <Button
                                                onPress={() => handleIncrement(currentNodeIndex)}
                                                isIconOnly
                                                disabled={currentNode.levels.current >= currentNode.levels.total}
                                                aria-label={`Increment ${currentNode.type}`}
                                            >
                                                <PlusIcon />
                                            </Button>
                                            <Button
                                                onPress={() => handleMax(currentNodeIndex)}
                                                isIconOnly
                                                disabled={currentNode.levels.current >= currentNode.levels.total}
                                                aria-label={`Max out ${currentNode.type}`}
                                            >
                                                Max
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NecrobearResearchTree;
