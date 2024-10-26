/* eslint-disable no-unused-vars */
import React from "react";
import { useParams } from "react-router-dom";

const Category = () => {
  const { category } = useParams();
  return (
    <div className="min-h-screen bg-base-100 ">
      {/* Page Header */}
      <header className="py-6 text-center">
        <h1 className="text-3xl font-bold">{category} Movies</h1>
        <p className="text-gray-400 mt-2">
          Cari movie {category.toLowerCase()} terbaik
        </p>
      </header>

      {/* Category Movies Grid */}
      <main className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Example of a movie card */}
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="card rounded-lg shadow-lg hover:shadow-xl transition duration-300 p-0"
            >
              <img
                src={`https://placehold.co/300x400?text=${category}+Movie`}
                alt={`${category} Movie`}
                className="rounded-t-lg w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">
                  Movie Title {index + 1}
                </h2>
                <p className="text-sm text-gray-400">2024 | 2h 30min</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Category;
