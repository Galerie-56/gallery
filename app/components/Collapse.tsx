// @ts-nocheck
import React, { useState } from "react";
import Collapse from "@kunukn/react-collapse";

import { GoChevronRight as ChevronRight } from "react-icons/go";

export const Collapsible = ({ trigger, children, className, ...props }) => {
  const [open, setOpen] = useState(false);

  return (
    <div {...props}>
      <button
        aria-label="Open menu item"
        onClick={() => setOpen(!open)}
        className={`flex w-full justify-between ${className ? className : ""} `}
      >
        <div className="uppercase">{trigger}</div>

        <ChevronRight
          className={`font-bold text-[20px] text-primary lg:hidden ${
            open && "transform rotate-90"
          }`}
        />
      </button>
      <Collapse className="duration-500 ease-out " isOpen={open}>
        {children}
      </Collapse>
    </div>
  );
};
