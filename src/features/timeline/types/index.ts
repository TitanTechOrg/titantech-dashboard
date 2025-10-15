type TimelineAttacksPerHour = {
  hour: number;
  attacks: number;
};

type TimelineCycles = {
  cycle: number;
  hours: TimelineAttacksPerHour[];
};

export type Timeline = {
  cycles: TimelineCycles[];
};
