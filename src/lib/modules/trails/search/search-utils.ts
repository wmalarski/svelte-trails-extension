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
        participant.toLocaleLowerCase().includes(queryLowercase),
      ),
  );
};

type TrailTimeTuple = {
  trail: TrailEntry;
  time: number;
};

export const mapToTrailTimeTuples = (
  trails: TrailEntry[],
): TrailTimeTuple[] => {
  return trails.map((trail) => ({
    time: new Date(trail.date).getTime(),
    trail,
  }));
};

export const mapToTrailEntry = (trails: TrailTimeTuple[]): TrailEntry[] => {
  return trails.map((tuple) => tuple.trail);
};

export const applyDatesFilter = (
  tuples: TrailTimeTuple[],
  minDate?: Date,
  maxDate?: Date,
) => {
  let result = tuples;

  if (minDate) {
    const minTime = minDate.getTime();
    result = result.filter((tuple) => tuple.time >= minTime);
  }

  if (maxDate) {
    const maxTime = maxDate.getTime();
    result = result.filter((tuple) => tuple.time <= maxTime);
  }

  return result;
};

export const applySort = (tuples: TrailTimeTuple[]) => {
  const copy = [...tuples];

  copy.sort((left, right) => left.time - right.time);

  return copy;
};
