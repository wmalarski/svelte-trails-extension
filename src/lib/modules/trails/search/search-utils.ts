import type { TrailEntry } from "../trails-storage";

export const applyQueryFilter = (trails: TrailEntry[], query: string) => {
  if (query.length === 0) {
    return trails;
  }

  const queryLowercase = query.toLocaleLowerCase();

  return trails.filter(
    (trail) =>
      trail.name.toLocaleLowerCase().includes(queryLowercase) ||
      trail.participants.some((participant) =>
        participant.toLocaleLowerCase().includes(queryLowercase)
      )
  );
};
