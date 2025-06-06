import React from 'react';
import Lottie from 'lottie-react';
import animation1 from '../animations/animation1.json';
import animation2 from '../animations/animation2.json';

export const HeroAnimations = () => {
  return (
    <>
      {/* First Animation - Top Left */}
      <div className="absolute left-0 md:left-10 top-10 w-32 h-32 md:w-40 md:h-40 opacity-30 md:opacity-40">
        <Lottie 
          animationData={animation1} 
          loop={true}
          className="w-full h-full"
        />
      </div>
      
      {/* Second Animation - Bottom Right (Larger) */}
      <div className="absolute right-0 md:right-10 bottom-0 md:bottom-10 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 opacity-25 md:opacity-35">
        <Lottie 
          animationData={animation2} 
          loop={true}
          className="w-full h-full"
        />
      </div>
    </>
  );
};
