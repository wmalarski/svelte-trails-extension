import { getContext, setContext } from "svelte";

const key = "current-url";

type CurrentUrlContextState = {
  url: string;
};

export const setCurrentUrlContext = (user: CurrentUrlContextState) => {
  setContext(key, user);
};

export const getCurrentUrlContext = () => {
  return getContext(key) as CurrentUrlContextState;
};
