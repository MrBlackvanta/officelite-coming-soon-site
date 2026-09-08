import { Countdown } from "@/components/ui";
import { formatLaunchDate, nextLaunchDate } from "@/lib";

export function SignUpIntro() {
  const renderedAt = new Date();
  const launch = nextLaunchDate(renderedAt);

  return (
    <div className="mt-20 text-center md:mt-26 xl:mt-38.5 xl:w-135 xl:text-left">
      <h1 className="text-h1 text-ink xl:text-display font-bold">
        Work smarter. Save time.
      </h1>
      <p className="text-lead-sm text-muted xl:text-lead mx-auto mt-4 max-w-143 md:mt-6 xl:max-w-none">
        Easily manage your projects. Get on the list and receive in-app perks
        available only to early subscribers. We are moving into final
        development and getting ready for official launch soon.
      </p>
      <h2 className="text-eyebrow text-ink mt-16 md:mt-10">
        Coming {formatLaunchDate(launch)}
      </h2>
      <Countdown
        target={launch.getTime()}
        renderedAt={renderedAt.getTime()}
        tone="light"
        className="mt-4.5 md:mt-2 xl:justify-start"
      />
    </div>
  );
}
