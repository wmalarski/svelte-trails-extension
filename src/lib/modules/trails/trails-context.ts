import { getContext, setContext } from "svelte";

const key = "origin";

export type OriginContextState = {
  origin?: string;
};

export const setOriginContext = (context: OriginContextState) => {
  setContext(key, context);
};

export const getOriginContext = () => {
  return getContext(key) as OriginContextState;
};
