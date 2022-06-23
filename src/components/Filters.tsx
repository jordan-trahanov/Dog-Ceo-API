import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FetchBreeds } from 'helper/FetchBreeds';
import { v4 } from 'uuid';

const numberOfImages = ['12', '24', '36', '48', '60', '72', '84', '96'];

const Filters = ({ fetchBreed, fetchSubBreed, fetchLimit }: any) => {
  const [breeds, setBreeds] = useState<any>([]);
  const [breedSelect, setBreedSelect] = useState('');
  const [subBreeds, setSubBreeds] = useState([]);
  const [subBreedSelect, setSubBreedSelect] = useState('');
  const [numberSelect, setNumberSelect] = useState(numberOfImages[0]);

  useEffect(() => {
    (async () => {
      const dogsBreeds = await FetchBreeds();
      if (dogsBreeds.status === 'success') {
        const awe = Object.keys(dogsBreeds.message);
        setBreeds(awe.map((item: any) => ({ breed: item, sub_breed: dogsBreeds.message[item] })));
      }
    })();
  }, []);

  useEffect(() => {
    fetchBreed(breedSelect);
  }, [fetchBreed, breedSelect]);

  useEffect(() => {
    fetchSubBreed(subBreedSelect);
  }, [fetchSubBreed, subBreedSelect]);

  const handleBreedChange = (event: SelectChangeEvent) => {
    const breed = breeds.filter((item: any) => item.breed === event.target.value);
    setSubBreeds(breed[0].sub_breed);
    setBreedSelect(event.target.value as string);
    setSubBreedSelect('');
  };

  const handleSubBreedChange = (event: SelectChangeEvent) => {
    setSubBreedSelect(event.target.value as string);
  };

  const handleNumberChange = (event: SelectChangeEvent) => {
    setNumberSelect(event.target.value as string);
    fetchLimit(event.target.value as string);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Breeds</InputLabel>
          <Select value={breedSelect} label="Breeds" disabled={breeds.length === 0} onChange={handleBreedChange}>
            {breeds.map((item: { breed: string; sub_breed: string[] }) => (
              <MenuItem key={v4()} value={item.breed}>
                {item.breed}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {subBreeds.length > 0 && (
          <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Sub breed</InputLabel>
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

        <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Number of images</InputLabel>
          <Select value={numberSelect} label="Number of images" onChange={handleNumberChange}>
            {numberOfImages.map((item: string) => (
              <MenuItem key={v4()} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default Filters;
