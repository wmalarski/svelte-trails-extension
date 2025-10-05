import { getContext, setContext } from "svelte";

export type OriginContextState = {
  origin?: string;
};

const ORIGIN_CONTEXT_KEY = "origin";

export const setOriginContext = (context: OriginContextState) => {
  setContext(ORIGIN_CONTEXT_KEY, context);
};

export const getOriginContext = () => {
  return getContext(ORIGIN_CONTEXT_KEY) as OriginContextState;
};
