import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { FetchDogsByBreed } from 'helper/FetchDogsByBreed';
import { FetchRandomDogs } from 'helper/FetchRandomDogs';

import ApplicationBar from './ApplicationBar';
import Filters from './Filters';
import ImageMasonry from './ImageMasonry';
import Loading from './Loading';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<any>({ message: [] });
  const [breed, setBreed] = useState('');
  const [subBreed, setSubBreed] = useState('');
  const [limit, setLimit] = useState('');

  // Fetch random dogs initially
  useEffect(() => {
    setLoading(true);
    (async () => {
      const randomDogs = await FetchRandomDogs({ limit: 12 });
      setImages(randomDogs);
      setLoading(false);
    })();
  }, []);

  // Fetch dogs based on filters
  useEffect(() => {
    setLoading(true);
    (async () => {
      if (breed) {
        const dogsByBreed = await FetchDogsByBreed({ breed, subBreed, limit });
        setImages(dogsByBreed);
        setLoading(false);
      } else {
        const randomDogs = await FetchRandomDogs({ limit });
        setImages(randomDogs);
        setLoading(false);
      }
    })();
  }, [breed, subBreed, limit]);

  const getBreedValue = (breed: string) => setBreed(breed);
  const getSubBreedValue = (subBreed: string) => setSubBreed(subBreed);
  const fetchLimitValue = (limit: string) => setLimit(limit);

  return (
    <>
      <ApplicationBar breed={breed} subBreed={subBreed} />
      <Box sx={{ paddingTop: '88px' }}>
        <Filters fetchBreed={getBreedValue} fetchSubBreed={getSubBreedValue} fetchLimit={fetchLimitValue} />
        {loading && <Loading />}
      </Box>
      <Box sx={{ paddingTop: '24px' }}>
        {!loading && <ImageMasonry images={images?.message.length ? images.message : []} />}
      </Box>
    </>
  );
};

export default Page;
