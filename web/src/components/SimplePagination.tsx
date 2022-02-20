import React from "react";

import clsx from "clsx";

import { UsePaginationReturnType } from "hooks";

import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

const SimplePagination: React.FC<UsePaginationReturnType<any>> = ({
  canNextPage,
  canPreviousPage,
  nextPage,
  previousPage,
  pageIndex,
  pageCount,
}) => {
  return (
    <div className="flex justify-center items-center gap-3 mb-5">
      <button
        type="button"
        className={clsx(
          "rounded-full w-8 h-8 flex justify-center items-center cursor-pointer disabled:cursor-not-allowed",
          canPreviousPage
            ? "bg-teal-100 hover:bg-teal-200 active:bg-teal-300"
            : "bg-stone-300 text-stone-500"
        )}
        onClick={() => {
          if (canPreviousPage) {
            previousPage();
          }
        }}
        disabled={!canPreviousPage}
      >
        <FaCaretLeft />
      </button>
      <span>{`Side ${pageIndex + 1} av ${pageCount}`}</span>
      <button
        type="button"
        className={clsx(
          "rounded-full w-8 h-8 flex justify-center items-center cursor-pointer disabled:cursor-not-allowed",
          canNextPage
            ? "bg-teal-100 hover:bg-teal-200 active:bg-teal-300"
            : "bg-stone-300 text-stone-500",
          { "pointer-events-none": !canNextPage }
        )}
        onClick={() => {
          if (canNextPage) {
            nextPage();
          }
        }}
        disabled={!canNextPage}
      >
        <FaCaretRight />
      </button>
    </div>
  );
};

export default SimplePagination;
