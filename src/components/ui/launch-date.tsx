"use client";

import { formatLaunchDate } from "@/lib";

import { useLaunch } from "./use-launch";

type LaunchDateProps = {
  renderedAt: number;
};

export function LaunchDate({ renderedAt }: LaunchDateProps) {
  const { launch } = useLaunch(renderedAt);

  return formatLaunchDate(launch);
}
