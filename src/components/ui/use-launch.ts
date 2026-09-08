"use client";

import { nextLaunchDate, secondsUntil } from "@/lib";
import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();

let currentSecond = Math.floor(Date.now() / 1000);
let timer: ReturnType<typeof setInterval> | undefined;

function tick() {
  const next = Math.floor(Date.now() / 1000);
  if (next === currentSecond) return;
  currentSecond = next;
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  timer ??= setInterval(tick, 200);

  return () => {
    listeners.delete(listener);
    if (listeners.size > 0) return;
    clearInterval(timer);
    timer = undefined;
  };
}

function getSnapshot() {
  return currentSecond;
}

export function useLaunch(renderedAt: number) {
  const second = useSyncExternalStore(subscribe, getSnapshot, () =>
    Math.floor(renderedAt / 1000),
  );
  const now = second * 1000;
  const launch = nextLaunchDate(new Date(now));

  return { launch, secondsLeft: secondsUntil(launch.getTime(), now) };
}
