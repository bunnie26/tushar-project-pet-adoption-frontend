import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Skeleton,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSinglePetData } from '../services/hooks';

const SinglePetPage = () => {
  const { petId } = useParams();
  const { data: petData, isLoading } = useSinglePetData(petId);

  return (
    <Box
      sx={{
        background: '#f1f1f1',
        padding: 4,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 12,
        minHeight: '75vh',
      }}
    >
      <Typography variant="h5" component="div" sx={{ mb: 2, color: '#FF842D' }}>
        {isLoading ? <Skeleton variant="text" width={200} height={40} /> : petData.name}
      </Typography>
      {isLoading ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                border: '2px solid #FF842D',
                borderRadius: '8px',
                minHeight: '100%',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  paddingTop: '75%', // 4:3 aspect ratio (adjust as needed)
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  animation="wave"
                  sx={{ borderRadius: '8px' }}
                />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <div>
              <Skeleton variant="text" width="80%" height={40} />
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton variant="text" width="70%" height={24} />
              <Skeleton variant="text" width="50%" height={24} />
              <Skeleton variant="text" width="80%" height={24} />
              <Skeleton variant="text" width="100%" height={120} />
            </div>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {/* Replace with actual pet details once loaded */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                border: '2px solid #FF842D',
                borderRadius: '8px',
                minHeight: '100%',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  paddingTop: '75%', // 4:3 aspect ratio (adjust as needed)
                }}
              >
                <img
                  src={petData.photo}
                  alt={petData.name}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <div>
              <Typography variant="h6" sx={{ mb: 0 }}>
                Pet Details
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                <strong>Gender:</strong> {petData.gender ? petData.gender:"-"}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Age:</strong> {petData.age}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Breed:</strong> {petData.breed}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Size:</strong> {petData.size}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Vaccination:</strong> {petData.vaccination ? "Fully Vaccinated":"-"}
              </Typography>
              <Typography variant="body2" sx={{ mb: 4, mt: 2, fontSize: '1rem' }}>
                {petData.description}
              </Typography>
            </div>
            <Typography variant="h6" sx={{ mb: 2, color: '#FF842D' }}>
              Additional Information
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
              Sed cursus ante dapibus diam.
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
              Sed cursus ante dapibus diam.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{
                mt: 4,
                backgroundColor: '#FF842D',
                '&:hover': {
                  backgroundColor: '#FF842D',
                  opacity: 0.9,
                },
              }}
            >
              Adopt {petData.name}
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default SinglePetPage;
