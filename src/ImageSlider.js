import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const GET_IMAGES = gql`
  query {
    photoSlider {
      id
      intervalTime
      photos {
        id
        image {
          url
        }
      }
    }
  }
`;

const ImageSlider = () => {
  const { error, loading, data } = useQuery(GET_IMAGES, { pollInterval: 2 * 60 * 1000 });

  if (error || loading || !data || !data.photoSlider) return null;

  const {
    photoSlider: { intervalTime, photos },
  } = data;

  if (photos.length > 0 && intervalTime) {
    const settings = {
      showArrows: false,
      showStatus: false,
      showIndicators: false,
      showThumbs: false,
      infiniteLoop: true,
      autoPlay: true,
      stopOnHover: false,
      interval: intervalTime * 1000,
      transitionTime: 500,
    };

    return (
      <Carousel {...settings}>
        {photos.map(photo => {
          const { id, image } = photo;
          return (
            <div
              key={id}
              style={{
                width: '100vw',
                height: '100vh',
                backgroundImage: `url(${image.url})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
              }}
            />
          );
        })}
      </Carousel>
    );
  }
};

export default ImageSlider;
