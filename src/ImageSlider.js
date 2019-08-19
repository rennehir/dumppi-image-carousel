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

  if (error || loading || !data) return null;

  const {
    photoSlider: { intervalTime, photos },
  } = data;

  const settings = {
    showArrows: false,
    showStatus: false,
    showIndicators: false,
    showThumbs: false,
    infiniteLoop: true,
    autoPlay: true,
    transitionTime: 500,
    interval: intervalTime * 1000,
  };

  return (
    <Carousel {...settings}>
      {photos.map(photo => {
        const { id, image } = photo;
        return (
          <div key={id}>
            <img src={image.url} alt='' style={{ width: '100%' }} />
          </div>
        );
      })}
    </Carousel>
  );
};

export default ImageSlider;
