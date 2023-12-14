import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Link, Typography } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
export const Footer = () => {
  return (
    <Box
      sx={{
        // position: 'sticky',
        bottom: 0,
        width: '100%',
        // backgroundColor: '#18273C',
        // color: 'white',
        // textAlign: 'center',
        // padding: '1rem',
        zIndex: 10,
      }}
    >
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "#18273C",
        paddingTop: "2rem",
        paddingBottom: "2rem",
        color: "white",
      }}
    >
      <Container maxWidth="lg">
        <Grid container justifyContent="center" alignItems="center" spacing={3} sx={{mb:4}}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mb: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 600,
                letterSpacing: '.3rem',
                // color: '#FF842D',
                textDecoration: 'none',
              }}
            >
              <span className='text-[#FF842D] mr-2 font-black'>PAW </span> ADOPTIONS
            </Typography>
            <Typography variant="body2">
              Welcome to Paw Adoptions, Adopt a furry friend today!
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Typography variant="body2">
              <Link href="#how-it-works" color="inherit" underline="hover">
                How It Works
              </Link>
            </Typography>
            <Typography variant="body2">
              <Link href="#available-pets" color="inherit" underline="hover">
                Available Pets
              </Link>
            </Typography>
            {/* Add more links as needed */}
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Email: info@pawadoptions.com
            </Typography>
            <Typography variant="body2">
              Phone: +1 (555) 123-4567
            </Typography>
            {/* Add more contact information as needed */}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Connect with Us
            </Typography>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Link href="https://www.facebook.com" color="inherit" target="_blank" rel="noopener">
                <FacebookIcon />
              </Link>
              <Link href="https://www.twitter.com" color="inherit" target="_blank" rel="noopener">
                <TwitterIcon />
              </Link>
              <Link href="https://www.instagram.com" color="inherit" target="_blank" rel="noopener">
                <InstagramIcon />
              </Link>
            </Box>
          </Grid>
        {/* </Grid> */}
      </Container>
    </Box>
    </Box>
  );
};