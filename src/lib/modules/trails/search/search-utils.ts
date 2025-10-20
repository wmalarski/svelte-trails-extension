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

export const applySort = (trails: TrailEntry[]) => {
  const copy = trails.map((trail) => ({
    time: new Date(trail.date).getTime(),
    trail,
  }));

  copy.sort((left, right) => left.time - right.time);

  return copy.map((entry) => entry.trail);
};
