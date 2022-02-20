import { useCallback, useMemo, useState } from "react";

export interface UsePaginationProps<T> {
  initialData?: Array<T>;
  initialPageIndex?: number;
  initialPageSize?: number;
}

export interface UsePaginationReturnType<T> {
  setData: (data: Array<T>) => void;
  page: Array<T>;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  pageIndex: number;
  pageCount: number;
  nextPage: () => void;
  previousPage: () => void;
  gotoPage: (pageIndex: number) => void;
  canNextPage: boolean;
  canPreviousPage: boolean;
}

export function usePagination<T>(
  options?: UsePaginationProps<T>
): UsePaginationReturnType<T> {
  const [data, setData] = useState<Array<T>>(options?.initialData || []);
  const [pageIndex, setPageIndex] = useState<number>(
    options?.initialPageIndex || 0
  );
  const [pageSize, setPageSize] = useState<number>(
    options?.initialPageSize || 10
  );

  const pageCount = useMemo(() => {
    const count = Math.floor(data.length / pageSize);

    if (count === 0) {
      return 1;
    }

    return count;
  }, [data.length, pageSize]);

  const page = useMemo(() => {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;

    return data.slice(startIndex, endIndex);
  }, [data, pageIndex, pageSize]);

  const canNextPage = useMemo(() => {
    return pageIndex + 1 < pageCount;
  }, [pageIndex, pageCount]);

  const canPreviousPage = useMemo(() => {
    return pageIndex > 0;
  }, [pageIndex]);

  const nextPage = useCallback(() => {
    if (canNextPage) {
      setPageIndex((pageIndex) => pageIndex + 1);
    }
  }, [canNextPage]);

  const previousPage = useCallback(() => {
    if (canPreviousPage) {
      setPageIndex((pageIndex) => pageIndex - 1);
    }
  }, [canPreviousPage]);

  const gotoPage = useCallback(
    (pageIndex: number) => {
      if (pageIndex >= 0 && pageIndex < pageCount) {
        setPageIndex(pageIndex);
      }
    },
    [pageCount]
  );

  return {
    // NEW API
    setData,
    page,
    pageSize,
    setPageSize,
    pageIndex,
    pageCount,
    nextPage,
    previousPage,
    gotoPage,
    canNextPage,
    canPreviousPage,
  };
}
