import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FetchBreeds } from 'helper/FetchBreeds';
import { v4 } from 'uuid';

// Number of images to fetch
const numberOfImages = ['12', '24', '36', '48', '60', '72', '84', '96'];

const Filters = ({ fetchBreed, fetchSubBreed, fetchLimit }: any) => {
  const [breeds, setBreeds] = useState<any>([]);
  const [breedSelect, setBreedSelect] = useState('');
  const [subBreeds, setSubBreeds] = useState([]);
  const [subBreedSelect, setSubBreedSelect] = useState('');
  const [numberSelect, setNumberSelect] = useState(numberOfImages[0]);

  // Fetch random dogs
  useEffect(() => {
    (async () => {
      const dogsBreeds = await FetchBreeds();
      if (dogsBreeds.status === 'success') {
        const awe = Object.keys(dogsBreeds.message);
        setBreeds(awe.map((item: any) => ({ breed: item, sub_breed: dogsBreeds.message[item] })));
      }
    })();
  }, []);

  // Fetch dogs by breed
  useEffect(() => {
    fetchBreed(breedSelect);
  }, [fetchBreed, breedSelect]);

  // Fetch dogs by sub breed
  useEffect(() => {
    fetchSubBreed(subBreedSelect);
  }, [fetchSubBreed, subBreedSelect]);

  const handleBreedChange = (event: SelectChangeEvent) => {
    if (event.target.value) {
      // Set breeds and set sub breeds
      const breed = breeds.filter((item: any) => item.breed === event.target.value);
      setSubBreeds(breed[0].sub_breed);
      setBreedSelect(event.target.value as string);
      setSubBreedSelect('');
    } else {
      // Clear sub breeds
      setSubBreeds([]);
      setBreedSelect('');
      setSubBreedSelect('');
      setNumberSelect(numberOfImages[0]);
    }
  };

  // On sub breed change
  const handleSubBreedChange = (event: SelectChangeEvent) => {
    setSubBreedSelect(event.target.value as string);
  };

  // On images number change
  const handleNumberChange = (event: SelectChangeEvent) => {
    setNumberSelect(event.target.value as string);
    fetchLimit(event.target.value as string);
  };

  return (
    <Box sx={{ display: { xs: 'block', sm: 'flex' }, padding: '8px' }}>
      {/* Show breed field */}
      <FormControl fullWidth sx={{ mr: { xs: 0, sm: 2 }, mb: { xs: '24px', sm: 0 }, minWidth: 120 }}>
        <InputLabel>
          <strong>Breeds</strong>
        </InputLabel>
        <Select value={breedSelect} label="Breeds" disabled={breeds.length === 0} onChange={handleBreedChange}>
          <MenuItem key={v4()} value={''}>
            <br />
          </MenuItem>
          {breeds.map((item: { breed: string; sub_breed: string[] }) => (
            <MenuItem key={v4()} value={item.breed}>
              {item.breed}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Show sub breed field if theare are values to show */}
      {subBreeds.length > 0 && (
        <FormControl fullWidth sx={{ mr: { xs: 0, sm: 2 }, mb: { xs: '24px', sm: 0 }, minWidth: 120 }}>
          <InputLabel>
            <strong>Sub breed</strong>
          </InputLabel>
          <Select
            value={subBreedSelect}
            label="Sub breed"
            disabled={breeds.length === 0}
            onChange={handleSubBreedChange}>
            {subBreeds.map((item: string) => (
              <MenuItem key={v4()} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Show number of images field  */}
      <FormControl fullWidth sx={{ mb: { xs: '24px', sm: 0 }, minWidth: 120 }}>
        <InputLabel>
          <strong>Number of images</strong>
        </InputLabel>
        <Select value={numberSelect} label="Number of images" onChange={handleNumberChange}>
          {numberOfImages.map((item: string) => (
            <MenuItem key={v4()} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filters;
