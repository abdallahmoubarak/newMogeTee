import { useEffect, useRef } from "react";

export default function TopBar({
  categories,
  selected,
  setSelected,
  setScroll,
}: TopBarProps) {
  const topBarRef = useRef<HTMLDivElement>(null);

  // Scroll to the selected category when the selected changes
  useEffect(() => {
    if (topBarRef.current) {
      const selectedCategory = topBarRef.current.querySelector(
        ".selected",
      ) as HTMLDivElement;

      if (selectedCategory) {
        // if the device is mobile, scroll to the selected category
        if (window.innerWidth < 768) {
          const topBarContainer = topBarRef.current;
          const containerWidth = topBarContainer.offsetWidth;
          const selectedCategoryWidth = selectedCategory.offsetWidth;
          const selectedCategoryLeftOffset = selectedCategory.offsetLeft;

          let scrollOffset;
          if (selectedCategoryLeftOffset < containerWidth / 2) {
            scrollOffset = 0;
          } else if (
            selectedCategoryLeftOffset + selectedCategoryWidth >
            containerWidth
          ) {
            scrollOffset =
              window.innerWidth / 2 +
              selectedCategoryLeftOffset +
              selectedCategoryWidth -
              containerWidth;
          } else {
            scrollOffset =
              100 + selectedCategoryLeftOffset - containerWidth / 2;
          }

          topBarContainer.scrollTo({
            left: scrollOffset,
            behavior: "smooth",
          });
        } else {
          selectedCategory.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    }
  }, [selected]);

  return (
    <>
      <div
        id="topBar"
        ref={topBarRef}
        className="p-2 py-3 overflow-auto flex items-center gap-2 w-full sticky top-0 bg-white z-10 shadow-md backdrop-filter backdrop-blur-lg bg-opacity-90 scrollbar-hide">
        {categories?.map((category, i) => (
          <div
            key={i}
            onClick={() => {
              setSelected(category.name);
              setScroll(true);
            }}
            className={`whitespace-nowrap border shadow-md py-1 px-4 rounded-full text-sm cursor-pointer flex items-center gap-2 bg-white backdrop-filter backdrop-blur-lg  bg-opacity-60 select-none
              ${
                selected === category.name
                  ? "selected scale-125 mx-4 text-title"
                  : ""
              }`}>
            {category.name}
          </div>
        ))}
      </div>
    </>
  );
}
