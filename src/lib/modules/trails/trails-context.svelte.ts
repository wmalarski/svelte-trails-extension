import { getContext, onMount, setContext } from "svelte";
import {
  getSavedTrails,
  onSavedTrailsChange,
  setSavedTrails,
  type TrailEntry,
} from "./trails-storage";

export const createTrailsContext = () => {
  let trails = $state<TrailEntry[]>([]);

  const add = async (config: Omit<TrailEntry, "id">) => {
    const maxId = trails.reduce(
      (previous, current) => Math.max(previous, current.id),
      0
    );
    const newEntry = { id: maxId + 1, ...config };
    const updated = [...trails, newEntry];
    await setSavedTrails(updated);
  };

  const update = async (config: TrailEntry) => {
    const updated = trails.map((entry) =>
      entry.id === config.id ? config : entry
    );
    await setSavedTrails(updated);
  };

  const remove = async (id: number) => {
    const updated = trails.filter((entry) => entry.id !== id);
    await setSavedTrails(updated);
  };

  onMount(() => {
    const initialFetch = async () => {
      trails = await getSavedTrails();
    };
    initialFetch();
    return onSavedTrailsChange((updatedTrails) => {
      trails = updatedTrails;
    });
  });

  return {
    add,
    remove,
    get trails() {
      return trails;
    },
    update,
  };
};

const TRAILS_CONTEXT_KEY = "trails";

export type TrailsContextState = ReturnType<typeof createTrailsContext>;

export const setTrailsContext = (context: TrailsContextState) => {
  setContext(TRAILS_CONTEXT_KEY, context);
};

export const getTrailsContext = () => {
  return getContext(TRAILS_CONTEXT_KEY) as TrailsContextState;
};
