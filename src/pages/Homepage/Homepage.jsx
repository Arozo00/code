/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Card from "../../components/Card/Card";
import TrendMovieFetcher from "../../components/Fetcher/TrendingMovieFetcher";
import { useDispatch, useSelector } from "react-redux";

const Homepage = () => {
  const trend = useSelector((state) => state.trend.trend);
  

  return (
    <div className="bg-base-100  min-h-screen">
      {/* Hero Section */}
      <div
        className="hero h-96 bg-base-300 object-cover"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280/dIWwZW7dJJtqC6CgWzYkNVKIUm8.jpg)`,
        }}
      >
        <div className="w-full h-96 object-cover bg-slate-800 opacity-60"></div>
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-white">Selamat datang di myude movie</h1>
            <p className="py-6 text-white">
            Temukan koleksi film yang dikurasi khusus untuk Anda. Dari film terbaru hingga film favorit sepanjang masa.
            </p>
            <button className="btn btn-primary">Cari Movie</button>
          </div>
        </div>
      </div>

      <div className="py-10">
        <TrendMovieFetcher />
        <h2 className="text-3xl text-center font-semibold mb-8">Trending</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mx-auto max-w-6xl px-4">
          {trend?.map((movie) => (
            <div key={movie.id} className="">
              <Card
                imgUrl={movie.poster_path}
                title={movie.media_type === "tv" ? movie.name : movie.title}
                id={movie.id}
                desc={movie.overview}
                rating={movie.vote_average}
                mediaType={movie.media_type}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-base-300 text-center py-4 mt-10">
        <p>© 2024 Movies Hub. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;

{
  /* <div className="bg-gray-800 p-4 rounded shadow hover:bg-gray-700">
            <h3 className="text-xl"></h3>
          </div>
          <div className="bg-gray-800 p-4 rounded shadow hover:bg-gray-700">
            <h3 className="text-xl"></h3>
          </div>
          <div className="bg-gray-800 p-4 rounded shadow hover:bg-gray-700">
            <h3 className="text-xl"></h3>
          </div>
          <div className="bg-gray-800 p-4 rounded shadow hover:bg-gray-700">
            <h3 className="text-xl"></h3>
          </div> */
}
