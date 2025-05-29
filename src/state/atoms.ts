import { atom } from "jotai"

export const errorAllAtom = atom(false);
export const userTypeAtom = atom<"dev" | "adm" | "geral">("geral");