import {
  objectToArray,
  onStorageChange,
} from "$lib/integrations/browser/storage";

const STORAGE_PARTICIPANT_KEY = "participant";

type StorageShape = {
  [STORAGE_PARTICIPANT_KEY]: string[];
};

export const getSavedParticipants = async () => {
  const data = await chrome.storage.local.get<StorageShape>(
    STORAGE_PARTICIPANT_KEY,
  );
  return objectToArray(data[STORAGE_PARTICIPANT_KEY]) ?? [];
};

export const setSavedParticipants = (participants: string[]) => {
  return chrome.storage.local.set<StorageShape>({
    [STORAGE_PARTICIPANT_KEY]: participants,
  });
};

export const onSavedParticipantsChange = (
  callback: (participants: string[]) => void,
) => {
  return onStorageChange(STORAGE_PARTICIPANT_KEY, (change) => {
    callback((objectToArray(change.newValue) ?? []) as string[]);
  });
};
