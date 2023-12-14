// authAtom.js
import { atom } from "jotai";
import { atomWithStorage } from 'jotai/utils'

export const authAtom = atom({
  authToken: null,
  refreshToken: null,
}); // Initialize with null or default value

export const isLoggedIn = atom(false)