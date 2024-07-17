import { FC, memo } from "react";
import { Link } from "react-router-dom";

interface Pagination {
  pages: number;
  onClick?: (index: number) => void;
}

const Pagination: FC<Pagination> = memo(({ pages, onClick }) => {
  return (
    <ul className="text-base font-lovely flex gap-x-2 font-bold justify-center">
      {Array(pages)
        .fill(0)
        .map((_, i) => (
          <li className=" w-fit grid" key={i}>
            <Link
              to={`?page=${i + 1}`}
              className="w-full block p-1 px-3 border rounded-md bg-white"
            >
              {1 + i}
            </Link>
          </li>
        ))}
    </ul>
  );
});

export default Pagination;
