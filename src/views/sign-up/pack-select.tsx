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

const optionId = (id: string) => `pack-option-${id}`;

export function PackSelect({ packs, value, onChange }: PackSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  const selectedIndex = packs.findIndex((pack) => pack.id === value);
  const selected = packs[selectedIndex];

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

  const choose = (index: number) => {
    onChange(packs[index].id);
    setOpen(false);
  };

  const step = (offset: number) => {
    if (!open) return openAt(selectedIndex);
    setActiveIndex(
      Math.min(Math.max(activeIndex + offset, 0), packs.length - 1),
    );
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
        return open
          ? setActiveIndex(packs.length - 1)
          : openAt(packs.length - 1);
      case "Enter":
      case " ":
        event.preventDefault();
        return open ? choose(activeIndex) : openAt(selectedIndex);
      case "Escape":
        return setOpen(false);
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
            open ? optionId(packs[activeIndex].id) : undefined
          }
          onClick={() => (open ? setOpen(false) : openAt(selectedIndex))}
          onKeyDown={handleKeyDown}
          className="v-focus-ring outline-brand border-hairline flex w-full items-center justify-between border-b ps-4 pe-6 pb-4"
        >
          <PackLabel pack={selected} />
          <ChevronDownIcon
            className={cn(
              "text-brand motion-safe:transition-transform",
              open && "rotate-180",
            )}
          />
        </button>
        {open && (
          <ul
            role="listbox"
            id={listboxId}
            aria-labelledby={labelId}
            className="bg-surface border-hairline/30 divide-hairline/30 shadow-panel absolute inset-x-0 top-full z-10 -mx-1 mt-2 divide-y rounded-lg border px-6 py-2 md:px-8"
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
                  "flex cursor-pointer items-center justify-between gap-2 py-4",
                  index === activeIndex && "bg-tile",
                )}
              >
                <PackLabel pack={pack} />
                {pack.id === value && <CheckIcon className="text-brand" />}
              </li>
            ))}
          </ul>
        )}
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
