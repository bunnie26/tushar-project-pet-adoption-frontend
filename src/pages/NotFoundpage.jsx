import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button ,Box} from '@mui/material';

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        background: '#f1f1f1',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
        minHeight: '75vh',
      }}
    >
    <Container sx={{ textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Maybe you can find a pet to adopt instead!
      </Typography>
      {/* Add pet adoption-related content, images, or links */}
      <Button component={Link} to="/" variant="contained" color="primary" size="large" sx={{ marginTop: '20px' }}>
        Explore Pets
      </Button>
    </Container></Box>
  );
};

export default NotFoundPage;
