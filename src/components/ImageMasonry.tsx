import * as React from 'react';
import { Masonry } from '@mui/lab';
import { Paper } from '@mui/material';
import { v4 } from 'uuid';

const ImageMasonry = ({ images }: { images: any[] }) => (
  <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2} sx={{ margin: 0 }}>
    {images?.map((item: string) => (
      <Paper key={v4()}>
        <img
          src={item}
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
);

export default ImageMasonry;
