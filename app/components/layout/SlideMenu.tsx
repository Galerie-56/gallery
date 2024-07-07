import { useState, Fragment, useEffect } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogBackdrop,
} from "@headlessui/react";
import { X as Close, AlignLeft as Hamburger } from "lucide-react";
import { clsx } from "clsx";
import { useNavigation } from "@remix-run/react";
import { MobileMenu } from "./MobileMenu";

export const SlideMenu = ({ ...props }) => {
  const transition = useNavigation();
  const isLoading = transition.state === "loading";
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isLoading) {
      setIsOpen(false);
    }
  }, [isLoading]);
  return (
    <div {...props}>
      <button aria-label="open menu ">
        <Hamburger
          className={clsx(
            "text-[38px] text-primary hover:text-black transition duration-300 bg-transparent"
          )}
          onClick={() => setIsOpen(true)}
        />
      </button>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className={clsx("fixed inset-0 overflow-hidden", "z-50")}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <div className={clsx("absolute inset-0 overflow-hidden")}>
            {/* Overlay */}
            <TransitionChild
              as="div"
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <DialogBackdrop className="fixed inset-0 bg-black/60" />
            </TransitionChild>
            <div
              className={clsx(
                "fixed inset-y-0 right-0",
                "flex"
                // "w-[14.5rem] z-50"
              )}
            >
              {/* Sliding panel */}
              <TransitionChild
                as="div"
                enter=" transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className={clsx("relative", "w-screen md:w-[350px]")}>
                  {/* Panel content */}
                  <div
                    className={clsx(
                      "flex flex-col",
                      "h-screen",
                      "overflow-y-scroll",
                      "shadow-xl",
                      "p-10",
                      "bg-white "
                    )}
                  >
                    <div className="flex justify-end mb-5">
                      <button aria-label="close menu">
                        <Close
                          className="text-[24px] text-primary transition-colors duration-300 hover:text-black"
                          onClick={() => setIsOpen(false)}
                        />
                      </button>
                    </div>

                    <MobileMenu />
                  </div>
                  {/* End of panel content */}
                </div>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
