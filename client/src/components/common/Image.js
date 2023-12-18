import React from 'react';

export default function Image({height = 'auto', width = 'auto', src, alt}) {
  return (
    <img
      style={{
        height,
        width
      }}
      src={src} alt={alt}
    />

  );
}
