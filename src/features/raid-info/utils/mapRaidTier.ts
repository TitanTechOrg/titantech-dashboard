import { AttacksRaidTierMapping } from "../constants";
import { RaidTierType } from "../types";

export const mapRaidTier = (raidTier: RaidTierType) => {
    switch (raidTier) {
        case "Tier One":
            return AttacksRaidTierMapping["Tier One"].valueOf();
        case "Tier Two":
            return AttacksRaidTierMapping["Tier Two"].valueOf();
        case "Tier Three":
            return AttacksRaidTierMapping["Tier Three"].valueOf();
        case "Tier Four":
            return AttacksRaidTierMapping["Tier Four"].valueOf();
        case "Master Tier":
            return AttacksRaidTierMapping["Master Tier"].valueOf();
        default:
            return AttacksRaidTierMapping["Master Tier"].valueOf();
    }
};