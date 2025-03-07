import React from 'react';
import { logo } from '../assets';

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-around items-center w-full pt-3 mb-10">
        <img
          src={logo}
          alt="logo"
          className="w-28 object-contain"
        />

        <button
          type="button"
          className="black_btn"
          onClick={() => {
            window.open('https://github.com/GustinRhezaRNA');
          }}
        >
          Github
        </button>
      </nav>
      <h1 className="head_text">
        Summarize Article with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">Simplify your article with the power of OpenAI GPT-4 that can summarize your article in a few seconds into a few sentences.</h2>
    </header>
  );
};

export default Hero;
