import { useEffect, useRef } from "react";

export default function TopBar({
  categories,
  selected,
  setSelected,
}: TopBarProps) {
  const topBarRef = useRef(null);

  useEffect(() => {
    if (selected) {
      const element = document.getElementById(selected);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selected]);

  return (
    <>
      <div
        ref={topBarRef}
        className="p-2 py-3 overflow-auto flex items-center gap-2 w-full sticky top-0 bg-white z-10 shadow-md backdrop-filter backdrop-blur-lg bg-opacity-90 scrollbar-hide">
        {categories?.map((category, i) => (
          <a key={i} href={`#${category.name}`}>
            <div
              className={`whitespace-nowrap border shadow-md py-1 px-4 rounded-full text-sm cursor-pointer flex items-center gap-2 bg-white
                  backdrop-filter
                  backdrop-blur-lg
                  text-title
                  bg-opacity-60  ${
                    selected === category.name ? "selected scale-125 mx-4" : ""
                  }`}>
              <div onClick={() => setSelected(category.name)}>
                {category.name}
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
