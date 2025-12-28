import { useMemo } from 'react';
import { useRaidList } from '../api/get-raid-list';

export function useIsRaidStarted(): boolean {
  const { data: raidList } = useRaidList();

  return useMemo(() => {
    const startedAt = raidList?.raids[0]?.started_at;
    if (!startedAt) return false;

    const startTime = new Date(startedAt);
    if (!isFinite(+startTime)) return false;

    const nowUTC =
      new Date().getTime() - new Date().getTimezoneOffset() * 60000;
    return nowUTC > startTime.getTime();
  }, [raidList?.raids]);
}
