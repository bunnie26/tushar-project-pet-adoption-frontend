import { useQuery } from "react-query";
import { getAllPets, getSinglePet, getUserProfile } from "./services";

export const useAllPetsData = () => {
  return useQuery(["petsData"], () => {
    return getAllPets();
  });
};

export const useSinglePetData = (data) => {
  return useQuery(["singlePetData", data], () => {
    return getSinglePet(data);
  });
};

export const useGetProfileData = (data) => {
  return useQuery(["userProfileData", data], () => {
    return getUserProfile(data);
  });
};
