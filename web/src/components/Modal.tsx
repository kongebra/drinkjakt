import React from "react";

import clsx from "clsx";

import { Dialog, Transition } from "@headlessui/react";

import { FaTimes } from "react-icons/fa";

export interface ModalProps {
  open: boolean;

  title: React.ReactNode;

  onClose: () => void;

  textAlign?: "left" | "center" | "right";
}

const Modal: React.FC<ModalProps> = ({
  children,
  open,
  onClose,
  title,
  textAlign = "left",
}) => {
  return (
    <Transition appear show={open} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        open={open}
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-slate-800 bg-opacity-50" />
          </Transition.Child>

          {/* <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span> */}

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={clsx(
                "inline-block w-full max-w-md p-6 my-8 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-5",
                `text-${textAlign}`
              )}
            >
              <button
                type="button"
                className="absolute top-[1rem] right-[1rem] hover:text-teal-500 transition-colors"
                onClick={onClose}
              >
                <FaTimes />
              </button>

              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 mb-10"
              >
                {title}
              </Dialog.Title>

              <div className="mt-2">{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
