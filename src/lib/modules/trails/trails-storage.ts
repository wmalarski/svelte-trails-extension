import {
  objectToArray,
  onStorageChange,
} from "$lib/integrations/browser/storage";

export type TrailEntry = {
  id: number;
  name: string;
  participants: string[];
  date: Date;
  url: string;
};

const STORAGE_TRAILS_KEY = "trails";

type StorageShape = {
  [STORAGE_TRAILS_KEY]: TrailEntry[];
};

const normalizeStorageTrails = (trails: TrailEntry[]) => {
  return objectToArray(
    trails.map<TrailEntry>((entry) => ({
      ...entry,
      participants: objectToArray(entry.participants),
    })),
  );
};

export const getSavedTrails = async () => {
  const data = await chrome.storage.local.get<StorageShape>(STORAGE_TRAILS_KEY);
  const trails = data[STORAGE_TRAILS_KEY] ?? [];
  return normalizeStorageTrails(trails);
};

export const setSavedTrails = (trails: TrailEntry[]) => {
  return chrome.storage.local.set<StorageShape>({
    [STORAGE_TRAILS_KEY]: trails,
  });
};

export const onSavedTrailsChange = (
  callback: (trails: TrailEntry[]) => void,
) => {
  return onStorageChange(STORAGE_TRAILS_KEY, (change) => {
    const trails = change.newValue as TrailEntry[];
    callback(normalizeStorageTrails(trails));
  });
};
