import React from 'react';

export default function Iframe({src, height = 450, width = 600}) {
  return (
    <iframe
      style={{
        width, height, border: 0
      }}
      src={src}
      allowFullScreen="" loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"></iframe>
  );
}
