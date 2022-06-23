import React, { useEffect, useState } from 'react';
import { Menu } from '@mui/icons-material';
import { AppBar, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import { FetchDogsByBreed } from 'helper/FetchDogsByBreed';
import { FetchRandomDogs } from 'helper/FetchRandomDogs';

import Filters from './Filters';
import ImageMasonry from './Masonry';

const Page = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [images, setImages] = useState<any>({ message: [] });
  const [breed, setBreed] = useState('');
  const [subBreed, setSubBreed] = useState('');
  const [limit, setLimit] = useState('');

  useEffect(() => {
    (async () => {
      const randomDogs = await FetchRandomDogs({ limit: 12 });
      setImages(randomDogs);
    })();
  }, []);

  useEffect(() => {
    if (breed) {
      (async () => {
        const dogsByBreed = await FetchDogsByBreed({ breed, subBreed, limit });
        setImages(dogsByBreed);
      })();
    }
  }, [breed, subBreed, limit]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getBreed = (breed: string) => setBreed(breed);
  const getSubBreed = (subBreed: string) => setSubBreed(subBreed);
  const fetchLimit = (limit: string) => setLimit(limit);

  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}>
              <Menu />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              <Link
                component={Button}
                variant="h6"
                onClick={() => {
                  console.info("I'm a button.");
                }}
                href={'/'}
                sx={{ color: '#fff' }}>
                DOGS
              </Link>
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                {breed && breed.toUpperCase()}
                {subBreed && ` / ${subBreed.toUpperCase()}`}
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ paddingTop: '80px' }}>
        <Filters fetchBreed={getBreed} fetchSubBreed={getSubBreed} fetchLimit={fetchLimit} />
        <ImageMasonry images={images?.message.length ? images.message : []} />
      </Box>
    </div>
  );
};

export default Page;
