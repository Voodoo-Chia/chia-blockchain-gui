import type { NFTInfo } from '@chia-network/api';
import { useGetNFTsQuery, useGetNFTsCountQuery } from '@chia-network/api-react';
import { useEffect, useMemo, useState } from 'react';

type UseFetchNFTsResult = {
  nfts: NFTInfo[];
  isLoading: boolean;
};

type PaginationParams = {
  startIndex: number;
  num: number;
  total: number;
};

export default function useFetchNFTs(
  walletIds: number[],
  queryOpts: undefined | Record<string, any> = {}
): UseFetchNFTsResult {
  const [paginationParamsByWalletId, setPaginationParamsByWalletId] = useState<{
    [walletId: number]: PaginationParams;
  }>({});
  const { data: nftsCount, isLoading: isLoadingNFTsCount } = useGetNFTsCountQuery({ walletIds }, queryOpts);
  const countsByWalletId = nftsCount?.countsByWalletId ?? {};
  console.log('isLoadingNFTsCount:');
  console.log(isLoadingNFTsCount);
  console.log('nftsCount:');
  console.log(nftsCount);
  const { data, isLoading }: { data: { [walletId: number]: NFTInfo[] }; isLoading: boolean } = useGetNFTsQuery(
    { walletIds },
    { skip: isLoadingNFTsCount, ...queryOpts }
  );

  const nfts = useMemo(
    () =>
      // Convert [ { <wallet_id>: IncompleteNFTInfo[] }, { <wallet_id>: IncompleteNFTInfo[] } ] to NFTInfo[]
      Object.entries(data ?? []).flatMap(([walletId, nftsLocal]) =>
        nftsLocal.map((nft) => ({
          ...nft,
          walletId: Number(walletId), // Add in the source wallet id
        }))
      ),
    [data]
  );

  useEffect(() => {
    if (isLoadingNFTsCount) {
      return;
    }

    const newPaginationParamsByWalletId: { [walletId: number]: PaginationParams } = { ...paginationParamsByWalletId };
    Object.entries(countsByWalletId).forEach(([walletId, count]: [number, number]) => {
      if (!(walletId in newPaginationParamsByWalletId)) {
        newPaginationParamsByWalletId[walletId] = {
          startIndex: 0,
          num: Math.min(count, 5),
          total: count,
        };
      }

      // if (walletId in paginationParamsByWalletId) {
      //   return;
      // }

      // setPaginationParamsByWalletId((prevPaginationParamsByWalletId) => ({
      //   ...prevPaginationParamsByWalletId,
      //   [walletId]: {
      //     startIndex: 0,
      //     num: count,
      //     total: count,
      //   },
      // }));
    });
  }, [isLoadingNFTsCount, paginationParamsByWalletId, countsByWalletId]);

  return { isLoading, nfts };
}
