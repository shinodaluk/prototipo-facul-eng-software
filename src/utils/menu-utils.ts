import { userTypeAtom, UserTypes } from "@/state/atoms";
import { NavigationItem } from "@toolpad/core";
import { getDefaultStore } from "jotai";

export const isUser = (items: NavigationItem[], type: UserTypes) : NavigationItem[] => {
    const defaultStore = getDefaultStore()
    const userType = defaultStore.get(userTypeAtom)

    if(userType !== type) return [];

    return items
}

export const isUsers = (items: NavigationItem[], types: UserTypes[]) => {
    const defaultStore = getDefaultStore()
    const userType = defaultStore.get(userTypeAtom)

    if(!types.includes(userType)) return [];

    return items
}

export const isDev = (items: NavigationItem[]) => isUser(items, "dev");
export const isAdmin = (items: NavigationItem[]) => isUser(items, "adm");
export const isGeral = (items: NavigationItem[]) => isUser(items, "geral");