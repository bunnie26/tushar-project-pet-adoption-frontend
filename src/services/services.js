import axiosWithAuth, { axiosWithoutAuth } from "./axios";

export async function Login(data) {
  const { email, password } = data;
  const res = await axiosWithoutAuth.post(`/api/user/login/`, {
    email: email,
    password: password,
  });
  return res.data;
}

export async function Signup(data) {
  const { name, email, password, password2 } = data;
  const res = await axiosWithoutAuth.post(`/api/user/register/`, {
    email: email,
    name: name,
    password: password,
    password2: password2,
  });
  return res.data;
}

export async function getAllPets() {
  const res = await axiosWithAuth.get(`/api/pets/`);
  return res.data;
}

export async function getSinglePet(data) {
  const res = await axiosWithAuth.get(`/api/pets/${data}`);
  return res.data;
}

export async function getUserProfile() {
  const res = await axiosWithAuth.get(`/api/user/profile/`);
  return res.data;
}

export async function updateUserProfile(data) {
  const res = await axiosWithAuth.patch(`api/user/profile/update/`,{
    "email": data.email,
    "name": data.name,
    "phone_number": data.phone_number,
    "country": data.country,
    "state": data.state,
    "zip_code": data.zip_code,
    "address": data.address
  });
  return res.data;
}

export async function DonatePet(data) {
  const res = await axiosWithAuth.post(`/api/pets/`, {
    name: data.name,
    pet_type: data.pet_type,
    age: data.age,
    size: data.size,
    breed: data.breed,
    description: data.description,
    photo: data.photo,
    available_for_adoption: true,
    adopted: false,
    vaccination:data.vaccination,
    donation_reason:data.donation_reason,
    gender:data.gender
  });
  return res.data;
}
