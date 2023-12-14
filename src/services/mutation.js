import { useMutation } from "react-query";
import { DonatePet, Login, Signup, updateUserProfile } from "./services";


export const useLoginData = (options) => {
    return useMutation((data) => Login(data), { ...options });
};

export const useSignupData = (options) => {
    return useMutation((data) => Signup(data), { ...options });
};

export const useDonatePet = (options) => {
    return useMutation((data) => DonatePet(data), { ...options });
};

export const useUpdateUserData = (options) => {
    return useMutation((data) => updateUserProfile(data), { ...options });
};