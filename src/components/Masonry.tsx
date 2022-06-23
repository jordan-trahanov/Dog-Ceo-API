import * as React from 'react';
import { Masonry } from '@mui/lab';
import { Box, Paper } from '@mui/material';
import { v4 } from 'uuid';

const ImageMasonry = ({ images }: { images: any[] }) => (
  <Box>
    <Masonry columns={4} spacing={2} sx={{ margin: 0 }}>
      {images?.map((item: { img: any; title: string | undefined }) => (
        <Paper key={v4()}>
          <img
            src={`${item}`}
            loading="lazy"
            style={{
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
              display: 'block',
              width: '100%',
            }}
          />
        </Paper>
      ))}
    </Masonry>
  </Box>
);

export default ImageMasonry;
