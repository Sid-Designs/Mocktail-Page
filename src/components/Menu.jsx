import React, { useState, useRef } from 'react';
import { sliderLists } from '../../constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Menu = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const contentRef = useRef();
  const totalSlides = sliderLists.length;

  const goToSlide = (index) => {
    setCurrentIndex((index + totalSlides) % totalSlides);
  };

  const getCocktailAt = (offset) =>
    sliderLists[(currentIndex + offset + totalSlides) % totalSlides];

  const currentCocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(1);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo('#title', { opacity: 0 }, { opacity: 1, duration: 1 });
    tl.fromTo('.cocktail img', { scale: 0, opacity: 0.1 }, { scale: 1, opacity: 1, duration: 0.7, ease: 'power1.inOut' });
    tl.fromTo('.details h2', { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, ease: 'power1.inOut' });

    return () => tl.kill();
  }, [currentIndex]);

  return (
    <section id='menu' aria-labelledby='menu-heading'>
      <img src="/images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf" />
      <img src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf" />

      <h2 id="menu-heading" className='sr-only'>Cocktail Menu</h2>

      <nav className='cocktail-tabs' aria-label='Cocktail Navigation'>
        {sliderLists.map((cocktail, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={cocktail.id}
              className={`${isActive ? 'text-white border-white' : 'text-white/50 border-white/50'}`}
              onClick={() => goToSlide(index)}
              aria-pressed={isActive}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>

      <div className='content'>
        <div className="arrows">
          <button className='text-left' onClick={() => goToSlide(currentIndex - 1)}>
            <span>{prevCocktail.name}</span>
            <img src="/images/right-arrow.png" alt="right-arrow" aria-hidden="true" />
          </button>
          <button className='text-left' onClick={() => goToSlide(currentIndex + 1)}>
            <span>{nextCocktail.name}</span>
            <img src="/images/left-arrow.png" alt="left-arrow" aria-hidden="true" />
          </button>
        </div>

        <div className="cocktail">
          <img src={currentCocktail.image} alt="cocktail image" className='object-contain' />
        </div>

        <div className="recipe">
          <div ref={contentRef} className='info'>
            <p>Receipe for:</p>
            <p id='title'>{currentCocktail.name}</p>
          </div>
          <div className='details'>
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
