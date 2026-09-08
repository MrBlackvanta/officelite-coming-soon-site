"use client";

import { CheckIcon, ChevronDownIcon } from "@/components/icons";
import type { Pack } from "@/data";
import { cn } from "@/lib";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";

type PackSelectProps = {
  packs: Pack[];
  value: string;
  onChange: (id: string) => void;
};

const labelId = "pack-label";
const triggerId = "pack-trigger";
const listboxId = "pack-listbox";

const noActiveOption = -1;

const optionId = (id: string) => `pack-option-${id}`;

export function PackSelect({ packs, value, onChange }: PackSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(noActiveOption);
  const rootRef = useRef<HTMLDivElement>(null);

  const selectedIndex = packs.findIndex((pack) => pack.id === value);
  const selected = packs[selectedIndex];
  const lastIndex = packs.length - 1;

  useEffect(() => {
    if (!open) return;

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () =>
      document.removeEventListener("pointerdown", closeOnOutsidePress);
  }, [open]);

  const openAt = (index: number) => {
    setActiveIndex(index);
    setOpen(true);
  };

  const close = () => {
    setActiveIndex(noActiveOption);
    setOpen(false);
  };

  const choose = (index: number) => {
    if (index !== noActiveOption) onChange(packs[index].id);
    close();
  };

  const step = (offset: number) => {
    if (!open) return openAt(selectedIndex);
    setActiveIndex(Math.min(Math.max(activeIndex + offset, 0), lastIndex));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        return step(1);
      case "ArrowUp":
        event.preventDefault();
        return step(-1);
      case "Home":
        event.preventDefault();
        return open ? setActiveIndex(0) : openAt(0);
      case "End":
        event.preventDefault();
        return open ? setActiveIndex(lastIndex) : openAt(lastIndex);
      case "Enter":
      case " ":
        event.preventDefault();
        return open ? choose(activeIndex) : openAt(selectedIndex);
      case "Escape":
        return close();
      case "Tab":
        if (open) choose(activeIndex);
        return;
    }
  };

  return (
    <div ref={rootRef} className="min-h-17.25">
      <span id={labelId} className="sr-only">
        Pack
      </span>
      <div className="relative">
        <button
          type="button"
          id={triggerId}
          role="combobox"
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-expanded={open}
          aria-labelledby={`${labelId} ${triggerId}`}
          aria-activedescendant={
            open && activeIndex !== noActiveOption
              ? optionId(packs[activeIndex].id)
              : undefined
          }
          onClick={() => (open ? close() : openAt(noActiveOption))}
          onKeyDown={handleKeyDown}
          className="v-field-focus border-hairline flex w-full items-center justify-between border-b ps-4 pe-6 pb-4"
        >
          <PackLabel pack={selected} />
          <ChevronDownIcon
            className={cn(
              "text-brand motion-safe:transition-transform",
              open && "rotate-180",
            )}
          />
        </button>
        <ul
          role="listbox"
          id={listboxId}
          aria-labelledby={labelId}
          data-closed={open ? undefined : ""}
          onPointerLeave={() => setActiveIndex(noActiveOption)}
          className="v-popover bg-surface border-hairline/30 shadow-panel absolute inset-x-0 top-full z-10 -mx-1 mt-2 rounded-lg border py-2"
        >
          {packs.map((pack, index) => (
            <li
              key={pack.id}
              id={optionId(pack.id)}
              role="option"
              aria-selected={pack.id === value}
              onClick={() => choose(index)}
              onPointerMove={() => setActiveIndex(index)}
              className={cn(
                "cursor-pointer px-6 motion-safe:transition-colors md:px-8",
                index === activeIndex && "bg-tile",
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-between gap-2 py-4",
                  index !== lastIndex && "border-hairline/30 border-b",
                )}
              >
                <PackLabel pack={pack} />
                {pack.id === value && <CheckIcon className="text-brand" />}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

type PackLabelProps = {
  pack: Pack;
};

function PackLabel({ pack }: PackLabelProps) {
  return (
    <span className="text-body flex gap-2 font-bold">
      <span className="text-ink">{pack.name}</span>
      <span className="text-muted">{pack.price}</span>
    </span>
  );
}
