import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from '../materials/pexels-allan-so-1356596-2622179.jpg';
import image2 from '../materials/pexels-chrisjmitchell-1528361.jpg';
import image3 from '../materials/pexels-imjimmyqian-1710482.jpg';
import image4 from '../materials/pexels-jerry-wang-2135752-3768654.jpg';
import image5 from '../materials/pexels-leah-newhouse-50725-325521.jpg';
import image6 from '../materials/pexels-mikebirdy-242261.jpg';
import image7 from '../materials/pexels-pixabay-158028.jpg'

const Slideshow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [
    image1,
    image2,
    image3,
    image4,
    image5, 
    image6,
    image7,
  ];

  return (
    <div className="w-full h-screen overflow-hidden">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className='flex justify-center items-center h-screen'>
            <img src={image} alt={`Slide ${index + 1}`} className='w-full h-full object-cover rounded-3xl' />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slideshow;
