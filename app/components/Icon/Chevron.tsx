import { SvgTextProps } from "./type";

const SvgChevronLeft = ({
  className,
  height = "18px",
  style,
}: SvgTextProps) => {
  return (
    // <svg
    //
    //   viewBox="0 0 24 24"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <rect width="24" height="24" fill="transparent" />
    //   <path
    //     d="M14.5 17L9.5 12L14.5 7"
    //     stroke="currentColor"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //   />
    // </svg>
    <svg
      fill="none"
      width="auto"
      height={height}
      style={style}
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 12H18M6 12L11 7M6 12L11 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SvgChevronLeft;
