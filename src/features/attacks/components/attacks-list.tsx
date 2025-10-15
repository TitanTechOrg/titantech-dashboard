import { RaidLog } from '@/features/attacks';
import { RaidLogs } from '@/features/attacks/types';
import { Button, Spinner } from '@heroui/react';
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';

type AttacksListProps = {
  pages: RaidLogs[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isFetching: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<RaidLogs, unknown>, Error>
  >;
};

export function AttacksList({
  pages,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: AttacksListProps) {
  return (
    <>
      {pages.map(({ attack_logs }: RaidLogs, index: number) => (
        <RaidLog key={`raid-log-page-${index}`} data={attack_logs} />
      ))}
      <div>
        <Button
          color="primary"
          variant="bordered"
          onPress={() => fetchNextPage()}
          isDisabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? (
            <Spinner />
          ) : hasNextPage ? (
            'Load More'
          ) : (
            'Nothing more to load'
          )}
        </Button>
      </div>
    </>
  );
}
