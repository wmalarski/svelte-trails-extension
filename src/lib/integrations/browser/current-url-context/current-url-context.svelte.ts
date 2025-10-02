import { getContext, setContext } from "svelte";

const key = "current-url";

type CurrentUrlContextState = {
  url: string;
};

export const setCurrentUrlContext = (context: CurrentUrlContextState) => {
  setContext(key, context);
};

export const getCurrentUrlContext = () => {
  return getContext(key) as CurrentUrlContextState;
};
