import { atom } from "jotai"

export const errorAllAtom = atom(false);
errorAllAtom.debugLabel = "errorAllAtom"

export type UserTypes = "dev" | "adm" | "geral";
export const userTypeAtom = atom<UserTypes>("geral");
userTypeAtom.debugLabel = "userTypeAtom"