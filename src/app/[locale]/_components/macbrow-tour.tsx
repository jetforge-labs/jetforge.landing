"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";

export interface TourTab {
  id: string;
  label: string;
  hint: string;
  alt: string;
  src: string;
  /** Half the pixel size of the 2x render. */
  width: number;
  height: number;
}

interface MacbrowTourProps {
  title: string;
  text: string;
  tabsLabel: string;
  tabs: readonly TourTab[];
}

/** "Pro, in the notch": pick an item and its real screen drops from the edge. Tabs follow the WAI-ARIA tabs pattern. */
export function MacbrowTour({ title, text, tabsLabel, tabs }: MacbrowTourProps) {
  const uid = useId();
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number, focus = false) => {
    setActive(index);
    if (!focus) return;
    const button = buttons.current[index];
    button?.focus();
    button?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
    if (step) {
      event.preventDefault();
      select((index + step + tabs.length) % tabs.length, true);
    } else if (event.key === "Home") {
      event.preventDefault();
      select(0, true);
    } else if (event.key === "End") {
      event.preventDefault();
      select(tabs.length - 1, true);
    }
  };

  return (
    <div className="tour">
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
        <div className="tour-tabs" role="tablist" aria-label={tabsLabel}>
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              ref={(el) => {
                buttons.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${tab.id}`}
              aria-controls={`${uid}-panel-${tab.id}`}
              aria-selected={i === active}
              tabIndex={i === active ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(event) => onKeyDown(event, i)}
            >
              {tab.label} <small>{tab.hint}</small>
            </button>
          ))}
        </div>
      </div>
      <div className="tour-stage">
        {tabs.map((tab, i) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`${uid}-panel-${tab.id}`}
            aria-labelledby={`${uid}-tab-${tab.id}`}
            hidden={i !== active}
            tabIndex={0}
          >
            <Image
              className="render"
              src={tab.src}
              width={tab.width}
              height={tab.height}
              sizes="(max-width: 960px) 100vw, 760px"
              alt={tab.alt}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
