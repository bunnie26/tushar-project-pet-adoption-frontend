import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PetsIcon from "@mui/icons-material/Pets";
import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";
import { useAllPetsData } from "../services/hooks";
import shuffleArray from "../utils/shuffledArray";

const Homepage = () => {
  const navigate = useNavigate();
  const pets = useAllPetsData();
  const isLoading = pets.isLoading;
  const isError = pets.isError;
  const petsArray = pets?.data || [];

  const shuffledPets = shuffleArray(petsArray).slice(0, 3);
  // Sample data for How It Works category
  const howItWorksData = [
    {
      icon: (
        <ExploreIcon sx={{ fontSize: 48, color: "#2196f3", marginBottom: 2 }} />
      ),
      title: "Explore Profiles",
      description:
        "Browse through our profiles of charming pets looking for their forever homes.",
    },
    {
      icon: (
        <FavoriteIcon
          sx={{ fontSize: 48, color: "#f44336", marginBottom: 2 }}
        />
      ),
      title: "Meet Your Match",
      description:
        "Get to know your potential pet through heartwarming stories and photos.",
    },
    {
      icon: (
        <PetsIcon sx={{ fontSize: 48, color: "#4caf50", marginBottom: 2 }} />
      ),
      title: "Adoption Process",
      description:
        "Follow our simple adoption process to ensure a smooth transition for your new family member.",
    },
  ];

  const renderSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < 4; i++) {
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
    <div>
      <div className="banner flex flex-col justify-center w-full items-center">
        <Typography
          className="text-white"
          sx={{
            mr: 2,
            mb: 2,
            fontSize: 48,
            fontFamily: "monospace",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Embrace Unconditional Love: Adopt, Don't Shop!
        </Typography>
        <Box>
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              mr: 4,
              color: "#FF842D",
              borderColor: "#FF842D",
              "&:hover": {
                backgroundColor: "#FF842D",
                color: "#fff",
                border: "1px solid #FF842D",
              },
            }}
            onClick={()=>{navigate("/donate")}}
          >
            Donate
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#FF842D",
              "&:hover": {
                backgroundColor: "#FF842D",
                opacity: 0.9,
              },
            }}
            onClick={()=>{navigate("/pets")}}
          >
            Adopt
          </Button>
        </Box>
      </div>
      {/* How It Works Section */}
      <Box
        sx={{
          background: "linear-gradient(to bottom, #ffffff 0%, #f1f1f1 100%)",
          padding: 4,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 12,
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", mb: 1, color: "#FF842D" }}
        >
          READY TO WELCOME A FURRY FRIEND INTO YOUR HOME?
        </Typography>
        <span className="text-xl mb-12 text-gray-500">How It Works:</span>
        <Grid
          container
          spacing={3}
          className="cards"
          sx={{ width: "100%", maxWidth: "1200px" }}
        >
          {howItWorksData.map((card, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  cursor: "pointer",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  bgcolor: "white",
                }}
              >
                <CardContent>
                  {card.icon}
                  <Typography variant="h6" component="div">
                    {card.title}
                  </Typography>
                  <Typography variant="body2">{card.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Pets Available for Adoption Section */}
      <Box
        sx={{
          background: "white",
          padding: 4,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 12,
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", mb: 1, color: "#FF842D" }}
        >
          PETS AVAILABLE FOR ADOPTION
        </Typography>
        <span className="text-xl mb-12 text-gray-500">
          Meet Some of Our Furry Friends:
        </span>
        <Grid
          container
          spacing={3}
          className="cards"
          sx={{
            width: "100%",
            maxWidth: "1500px",
            justifyContent: "flex-start",
          }}
        >
          {isLoading  ? (
            renderSkeletons()
          ) : (
            shuffledPets.map((pet, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    cursor: "pointer",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "white",
                    minWidth: "250px",
                    border: "3px solid transparent",
                    "&:hover": {
                      border: "3px solid #FF842D",
                    },
                  }}
                  onClick={()=>{navigate(`/pets/${pet.id}`)}}
                >
                  <div sx={{ p: 2 }}>
                    <img
                      src={pet.photo}
                      alt={`Pet ${index + 1}`}
                      style={{
                        width: "100%",
                        marginBottom: 2,
                        height: "220px",
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        marginTop: 2,
                        px: 2,
                        pb: 1,
                      }}
                    >
                      {pet.name}
                    </Typography>
                  </div>
                </Card>
              </Grid>
            ))
          )}
          {!isError && !isLoading && (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
              onClick={() => {
                navigate("/pets");
              }}
              sx={{
                cursor: "pointer",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#18273C",
                minWidth: "250px",
                border: "3px solid transparent",
                "&:hover": {
                  border: "3px solid #FF842D",
                },
              }}
            >
              {/* Icon */}
              {/* ... */}

              <div>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: "bold", color: "#fff" }}
                >
                  Show All Pets
                </Typography>
              </div>
            </Card>
          </Grid>
        )}
        </Grid>
      </Box>
    </div>
  );
};

export default Homepage;
