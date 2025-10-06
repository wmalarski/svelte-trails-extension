import { getContext, onMount, setContext } from "svelte";
import {
  getSavedParticipants,
  onSavedParticipantsChange,
  setSavedParticipants,
} from "./participants-storage";

export const createParticipantsContext = () => {
  let participants = $state<string[]>([]);

  const add = async (newParticipant: string) => {
    participants.push(newParticipant);
    await setSavedParticipants(participants);
  };

  const remove = async (participant: string) => {
    participants.splice(participants.indexOf(participant), 1);
    await setSavedParticipants(participants);
  };

  onMount(() => {
    const initialFetch = async () => {
      participants = await getSavedParticipants();
    };
    initialFetch();
    return onSavedParticipantsChange((updatedParticipants) => {
      participants = updatedParticipants;
    });
  });

  return {
    add,
    get participants() {
      return participants;
    },
    remove,
  };
};

const PARTICIPANTS_CONTEXT_KEY = "participants";

export type ParticipantsContextState = ReturnType<
  typeof createParticipantsContext
>;

export const setParticipantsContext = (context: ParticipantsContextState) => {
  setContext(PARTICIPANTS_CONTEXT_KEY, context);
};

export const getParticipantsContext = () => {
  return getContext(PARTICIPANTS_CONTEXT_KEY) as ParticipantsContextState;
};
