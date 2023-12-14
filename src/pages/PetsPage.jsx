import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";
import { useAllPetsData } from "../services/hooks";
const PetsPage = () => {
  const navigate = useNavigate();
  const pets = useAllPetsData();
  const isLoading = pets.isLoading;
  const isError = pets.isError;
  const petsArray = pets?.data || [];
  const dummyPets = Array.from({ length: 16 }, (_, index) => ({
    id: index + 1,
    name: `Pet ${index + 1}`,
    image: "https://placekitten.com/300/300", // Replace with actual image URLs
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  }));

  const [selectedType, setSelectedType] = useState("Select Type");
  const [selectedBreed, setSelectedBreed] = useState("Select Breed");
  const [selectedAge, setSelectedAge] = useState("Select Age");
  const [selectedSize, setSelectedSize] = useState("Select Size");
  const [selectedGender, setSelectedGender] = useState("Select Gender");

  const petTypes = ["Dog", "Cat"];
  const petBreeds = ["Labrador", "Golden Retriever"];
  const petAges = ["Puppy", "Adult"];
  const petSizes = ["Small", "Medium", "Large"];
  const petGenders = ["Male", "Female"];

  const handleTypeClick = () => {
    setSelectedType((prev) => (prev === "type" ? "" : "type"));
  };

  const handleBreedClick = () => {
    setSelectedBreed((prev) => (prev === "breed" ? "" : "breed"));
  };

  const handleAgeClick = () => {
    setSelectedAge((prev) => (prev === "age" ? "" : "age"));
  };

  const handleSizeClick = () => {
    setSelectedSize((prev) => (prev === "size" ? "" : "size"));
  };

  const handleGenderClick = () => {
    setSelectedGender((prev) => (prev === "gender" ? "" : "gender"));
  };


  const renderSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < 8; i++) {
      skeletons.push(
        <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
          <Card
            sx={{
              cursor: "pointer",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              bgcolor: "white",
              minWidth: "250px",
              border: "3px solid transparent",
            }}
          >
            <Skeleton
              variant="rectangular"
              width="100%"
              height={220}
              animation="wave"
            />
            <CardContent>
              <Typography variant="body1">
                <Skeleton />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    }
    return skeletons;
  };

  return (
    <Box
      sx={{
        background: "#f1f1f1",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "75vh",
      }}
    >
      <div className="bg-FF842D text-white w-full">
        {/* <Container maxWidth="100%" className="py-2" sx={{backgroundColor: '#FF842D'}}>
          
          <Grid container spacing={1} alignItems="center">
          
            <Grid item xs={12} md={2}>
              <div className="relative">
                <button
                  className="bg-white text-black py-2 px-4 rounded w-full flex justify-between items-center"
                  onClick={handleTypeClick}
                >
                  <span>{selectedType || 'Select Type'}</span>
                  <span className={`ml-2 ${selectedType === 'type' ? 'rotate-180' : ''}`}>{'▼'}</span>
                </button>
                <div
                  className={`absolute bg-white shadow-md mt-2 p-2 rounded w-full ${
                    selectedType === 'type' ? 'block' : 'hidden'
                  }`}
                >
                  {petTypes.map((type) => (
                    <button
                      key={type}
                      className="w-full py-2 px-4 text-black"
                      onClick={() => {
                        handleTypeClick();
                        setSelectedType(type);
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={2}>
              <div className="relative">
                <button
                  className="bg-white text-black py-2 px-4 rounded w-full flex justify-between items-center"
                  onClick={handleBreedClick}
                >
                  <span>{selectedBreed || 'Select Breed'}</span>
                  <span className={`ml-2 ${selectedBreed === 'breed' ? 'rotate-180' : ''}`}>{'▼'}</span>
                </button>
                <div
                  className={`absolute bg-white shadow-md mt-2 p-2 rounded w-full ${
                    selectedBreed === 'breed' ? 'block' : 'hidden'
                  }`}
                >
                  {petBreeds.map((breed) => (
                    <button
                      key={breed}
                      className="w-full py-2 px-4 text-black"
                      onClick={() => {
                        handleBreedClick();
                        setSelectedBreed(breed);
                      }}
                    >
                      {breed}
                    </button>
                  ))}
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={2}>
              <div className="relative">
                <button
                  className="bg-white text-black py-2 px-4 rounded w-full flex justify-between items-center"
                  onClick={handleAgeClick}
                >
                  <span>{selectedAge || 'Select Age'}</span>
                  <span className={`ml-2 ${selectedAge === 'age' ? 'rotate-180' : ''}`}>{'▼'}</span>
                </button>
                <div
                  className={`absolute bg-white shadow-md mt-2 p-2 rounded w-full ${
                    selectedAge === 'age' ? 'block' : 'hidden'
                  }`}
                >
                  {petAges.map((age) => (
                    <button
                      key={age}
                      className="w-full py-2 px-4 text-black"
                      onClick={() => {
                        handleAgeClick();
                        setSelectedAge(age);
                      }}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={2}>
              <div className="relative">
                <button
                  className="bg-white text-black py-2 px-4 rounded w-full flex justify-between items-center"
                  onClick={handleSizeClick}
                >
                  <span>{selectedSize || 'Select Size'}</span>
                  <span className={`ml-2 ${selectedSize === 'size' ? 'rotate-180' : ''}`}>{'▼'}</span>
                </button>
                <div
                  className={`absolute bg-white shadow-md mt-2 p-2 rounded w-full ${
                    selectedSize === 'size' ? 'block' : 'hidden'
                  }`}
                >
                  {petSizes.map((size) => (
                    <button
                      key={size}
                      className="w-full py-2 px-4 text-black"
                      onClick={() => {
                        handleSizeClick();
                        setSelectedSize(size);
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={2}>
              <div className="relative">
                <button
                  className="bg-white text-black py-2 px-4 rounded w-full flex justify-between items-center"
                  onClick={handleGenderClick}
                >
                  <span>{selectedGender || 'Select Gender'}</span>
                  <span className={`ml-2 ${selectedGender === 'gender' ? 'rotate-180' : ''}`}>{'▼'}</span>
                </button>
                <div
                  className={`absolute bg-white shadow-md mt-2 p-2 rounded w-full ${
                    selectedGender === 'gender' ? 'block' : 'hidden'
                  }`}
                >
                  {petGenders.map((gender) => (
                    <button
                      key={gender}
                      className="w-full py-2 px-4 text-black"
                      onClick={() => {
                        handleGenderClick();
                        setSelectedGender(gender);
                      }}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>
            </Grid>
          </Grid>


          
        </Container> */}
        <Container maxWidth="xl" className="py-4">
          <Grid container spacing={2} alignItems="center">
            
            { isLoading  ? (
            renderSkeletons()
          ) :  petsArray.map((pet) => (
              <Grid item key={pet.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    border: "3px solid transparent",
                    "&:hover": {
                      border: "3px solid #FF842D",
                    },
                  }}
                  onClick={()=>{navigate(`/pets/${pet.id}`)}}
                >
                  <CardMedia
                    component="img"
                    alt={pet.name}
                    height="140"
                    sx={{height:"140px !important"}}
                    image={
                      pet.photo !== "https://example.com/image.jpg" ? pet.photo : "https://placekitten.com/300/300"
                    }
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {pet.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {pet.description}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        mt: 2,
                        backgroundColor: "#FF842D",
                        "&:hover": {
                          backgroundColor: "#FF842D",
                          opacity: 0.9,
                        },
                      }}
                    >
                      Adopt {pet.name}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </Box>
  );
};

export default PetsPage;
