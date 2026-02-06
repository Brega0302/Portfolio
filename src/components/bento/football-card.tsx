"use client";

import { BentoCard } from "./bento-grid";
import { Football3D } from "@/src/components/canvas/football-3d";

export function FootballCard() {
  return (
    <BentoCard className="overflow-hidden">
      <div className="flex flex-col items-center justify-center h-full min-h-[200px]">
        <div className="w-24 h-24 mb-3">
          <Football3D className="w-full h-full" />
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Football enthusiast
          <br />
          <span className="text-xs">when not coding</span>
        </p>
      </div>
    </BentoCard>
  );
}
