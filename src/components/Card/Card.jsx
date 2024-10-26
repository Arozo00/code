/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const Card = ({ imgUrl, title, id, rating, desc, mediaType }) => {
  return (
    <div className="card bg-base-100 shadow-xl rounded-lg overflow-hidden">
      <img
        src={`https://image.tmdb.org/t/p/w500${imgUrl}`}
        alt={title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-400 mb-4 line-clamp-2">{desc}</p>
        <div className="flex justify-between items-center">
          <Link to={`/detail/${mediaType === "tv" ? "tv" : "movie"}/${id}`}>
            <button className="btn btn-primary">Watch Now</button>
          </Link>
          <p className="text-gray-500">Rating: {rating}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
