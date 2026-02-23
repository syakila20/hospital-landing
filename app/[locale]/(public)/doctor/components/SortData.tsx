import SvgCircleDown from "@/app/components/Icon/CircleDown";
import clsx from "clsx";

interface OptionSort {
  key: number;
  label: string;
  value: string;
}

interface ISortData {
  option: OptionSort[];
  onChange: (val: string, sort: "asc" | "dsc") => void;
  value: string[];
}

const SortData = ({ option, onChange, value }: ISortData) => {
  const labelSort = value[0];
  const sortBy = value[1];
  return (
    <div className="flex">
      {option?.map((item, idx) => {
        return (
          <div className="flex gap-2 items-center px-2 py-1" key={idx}>
            <span
              className={clsx(
                "text-slate-500 text-sm",
                labelSort === item?.value ? "text-slate-700" : "text-slate-500",
              )}
            >
              {item?.label}
            </span>
            <div className="flex">
              <SvgCircleDown
                onClick={() => onChange(item?.value, "asc")}
                className={clsx(
                  "rotate-180 hover:text-slate-700 text-gray-400 cursor-pointer",
                  sortBy === "asc" && "text-slate-700",
                )}
              />
              <SvgCircleDown
                onClick={() => onChange(item?.value, "dsc")}
                className={clsx(
                  "hover:text-slate-700 text-gray-400 cursor-pointer",
                  sortBy === "dsc" && "text-slate-700",
                )}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SortData;
