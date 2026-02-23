import React, { useState, useRef } from "react";

type Position = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: Position;
  tooltipClassName?: string;
  delay?: number; // ms
}

const positionMap: Record<Position, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const arrowMap: Record<Position, string> = {
  top: "bottom-[-6px] left-1/2 -translate-x-1/2 border-t-gray-900",
  bottom: "top-[-6px] left-1/2 -translate-x-1/2 border-b-gray-900",
  left: "right-[-6px] top-1/2 -translate-y-1/2 border-l-gray-900",
  right: "left-[-6px] top-1/2 -translate-y-1/2 border-r-gray-900",
};

export const Tooltip = ({
  content,
  children,
  position = "right",
  tooltipClassName = "",
  delay = 150,
}: TooltipProps) => {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<number | null>(null);

  const show = () => {
    timerRef.current = window.setTimeout(() => {
      setOpen(true);
    }, delay);
  };

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {children}

      {open && (
        <div
          className={`
            absolute z-50
            ${positionMap[position]}
          `}
        >
          {/* Tooltip Box */}
          <div
            className={`
              relative
              inline-block w-fit max-w-max
              whitespace-nowrap
              bg-gray-900 text-white text-sm
              px-3 py-2 rounded-lg shadow-lg
              ${tooltipClassName}
            `}
          >
            {content}

            {/* Arrow */}
            <span
              className={`
                absolute
                w-0 h-0
                border-[6px]
                border-transparent
                ${arrowMap[position]}
              `}
            />
          </div>
        </div>
      )}
    </div>
  );
};
