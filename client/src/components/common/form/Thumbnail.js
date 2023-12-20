import PropTypes from 'prop-types';
import React from 'react';

const Thumbnail = ({file, urlImage}) => {
  const imageSrc = file ? file.preview : urlImage;

  return (
    <aside style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '16px'}}>
      <div
        style={{
          width: '70%',
          margin: '0 auto',
          height: 'auto',
          maxHeight: '315px',
          display: 'inline-flex',
          borderRadius: '16px'
        }}>
        <div style={{width: '100%', display: 'flex', minWidth: 0, overflow: 'hidden'}}>
          <img
            src={imageSrc}
            style={{display: 'block', width: '100%', height: '100%', borderRadius: '16px'}}
            onLoad={() => {
              if (file) URL.revokeObjectURL(file.preview);
            }}
            alt="image"
          />
        </div>
      </div>
    </aside>
  );
};

Thumbnail.propTypes = {
  file: PropTypes.object,
  urlImage: PropTypes.string,
};

export default Thumbnail;
