import { useCallback, useMemo, useState } from 'react';
import { NFTStorage } from 'nft.storage';
import { Metadata } from '@lib';
import type { IMetadataPrams } from '@lib';
import type { CIDString } from 'nft.storage';
import type { CheckResult, StatusResult } from 'nft.storage/src/lib/interface';

const NFT_STORAGE_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY as string;

export const useIpfsStorage = () => {
  const [isStoreLoading, setIsStoreLoading] = useState<boolean>(false);
  const [isCheckLoading, setIsCheckLoading] = useState<boolean>(false);
  const [isStatusLoading, setIsStatusLoading] = useState<boolean>(false);

  const nftStorage = useMemo<NFTStorage>(() => {
    return new NFTStorage({ token: NFT_STORAGE_KEY });
  }, []);

  const store = useCallback<(metadata: IMetadataPrams) => Promise<CIDString | undefined>>(
    async (metadata: IMetadataPrams) => {
      if (typeof metadata.files === undefined || !Array.isArray(metadata.files) || metadata.files.length === 0) return undefined;
      setIsStoreLoading(true);
      const cid = await nftStorage.storeDirectory(
        new Metadata({
          address: metadata.address ?? '',
          policyID: metadata.policyID ?? 0,
          description: 'InsureFi media files of claiming',
          files: metadata.files
        }).toFilesSource()
      );
      setIsStoreLoading(false);
      return cid;
    },
    [nftStorage]
  );

  const check = useCallback<(cid: string) => Promise<CheckResult>>(
    async (cid: string) => {
      setIsCheckLoading(true);
      const checkResult = await nftStorage.check(cid);
      setIsCheckLoading(false);
      return checkResult;
    },
    [nftStorage]
  );

  const status = useCallback<(cid: string) => Promise<StatusResult>>(
    async (cid: string) => {
      setIsStatusLoading(true);
      const statusResult = await nftStorage.status(cid);
      setIsStatusLoading(false);
      return statusResult;
    },
    [nftStorage]
  );

  return { store, check, status, isStoreLoading, isCheckLoading, isStatusLoading };
};
