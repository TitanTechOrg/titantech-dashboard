// import { keepPreviousData, useQuery } from '@tanstack/react-query';
// import { useMemo, useState } from 'react';
// import { Button, Pagination, Spinner } from '@nextui-org/react';
// import { ENDPOINTS, getRequest } from '@/lib/api/axios';
// import { RaidLogType } from '../dashboard/raid-log/types';
// import RaidLog from '../dashboard/raid-log';

// const PAGE_OFFSET: number = 25;

// export default function RaidLogListPage() {
//     const [page, setPage] = useState<number>(0);
//     const [currentPage, setCurrentPage] = useState(1);

//     const fetchRaidAttacks = async (page = 0) => {
//         // const token = localStorage.getItem('clan_token');
//         const data = await getRequest<RaidLogType>(ENDPOINTS.raid_attack_log + '?offset=' + page);
//         // const res = await instance.get(ENDPOINTS.raid_attack_log + '?offset=' + page, {
//         //     headers: { Authorization: token },
//         // });

//         const hasMore: boolean = (data.count as number) > ((page + PAGE_OFFSET) as number) && page >= 0;

//         data.hasMore = hasMore;
//         return data;
//     };

//     const { isPending, isError, error, data, isPlaceholderData } = useQuery({
//         queryKey: ['raid_attacks', page],
//         queryFn: () => fetchRaidAttacks(page),
//         placeholderData: keepPreviousData,
//     });

//     const maxPage = useMemo(() => Math.floor(data?.count ?? 0 / PAGE_OFFSET), [data?.count]);

//     const fetchNextPage = () => {
//         if (!isPlaceholderData && page / PAGE_OFFSET !== maxPage) {
//             setPage((old) => old + PAGE_OFFSET);
//             setCurrentPage((prev) => (prev < maxPage ? prev + 1 : prev));
//         }
//     };

//     const fetchPreviousPage = () => {
//         if (!isPlaceholderData && data && data.count > page) {
//             setPage((old) => Math.max(old - PAGE_OFFSET, 0));
//             setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
//         }
//     };

//     const fetchPage = (pageNumber: number) => {
//         setCurrentPage(pageNumber);
//         setPage(pageNumber === 1 ? pageNumber - 1 : pageNumber * PAGE_OFFSET);
//     };

//     return (
//         <div>
//             {isPending ? (
//                 <div className="flex item-center justify-center gap-5">
//                     <Spinner />
//                     Loading...
//                 </div>
//             ) : isError ? (
//                 <div>Error: {error.message}</div>
//             ) : (
//                 <div>
//                     <div className="flex flex-row gap-5 items-center">
//                         <Pagination total={maxPage} color="secondary" page={currentPage} onChange={fetchPage} />
//                         <div className="flex gap-2">
//                             <Button size="sm" variant="flat" color="secondary" onPress={fetchPreviousPage} isDisabled={currentPage === 1}>
//                                 Previous
//                             </Button>
//                             <Button size="sm" variant="flat" color="secondary" onPress={fetchNextPage} isDisabled={!data?.hasMore}>
//                                 Next
//                             </Button>
//                         </div>
//                     </div>
//                     <div className="flex flex-row">
//                         <RaidLog data={data.attack_logs} />
//                     </div>
//                     <div className="flex flex-row gap-5 items-center">
//                         <Pagination total={maxPage} color="secondary" page={currentPage} onChange={fetchPage} />
//                         <div className="flex gap-2">
//                             <Button size="sm" variant="flat" color="secondary" onPress={fetchPreviousPage} isDisabled={currentPage === 1}>
//                                 Previous
//                             </Button>
//                             <Button size="sm" variant="flat" color="secondary" onPress={fetchNextPage} isDisabled={!data?.hasMore}>
//                                 Next
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
