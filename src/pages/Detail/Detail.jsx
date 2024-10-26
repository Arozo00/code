/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DetailMovieFetcher from "../../components/Fetcher/DetailFetcher";
import RatingSlider from "../../components/RatingSlider";
import { useDispatch } from "react-redux";
import { setState } from "../../Store/Action/movieAction";
import axios from "axios";

const Detail = () => {
  const { id, mediaType } = useParams();
  const detail = useSelector((state) => state.detail.detail);
  const itemState = useSelector((state) => state.itemState.itemState);

  const [isRating, setIsRating] = useState(false); //The visibility of value slider
  const ratingValue = itemState?.rated?.value || null;
  const [tempRatingValue, setTempRatingValue] = useState(ratingValue || 0);
  const dispatch = useDispatch();

  if (!itemState) {
    // Optionally, render a loading state while waiting for itemState
    return <div>Loading...</div>;
  }
  const openRateMenu = () => setIsRating(true);

  const submitRating = async () => {
    const newRatingValue = tempRatingValue;
    setIsRating(true);

    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const apiRDT = import.meta.env.VITE_TMDB_API_TOKEN;

    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${apiRDT}`,
    };

    const body = { value: newRatingValue };

    try {
      let response;
      if (mediaType === "movie") {
        response = await axios.post(
          `https://api.themoviedb.org/3/movie/${itemState.id}/rating?api_key=${"621b69c65315805a216e33533f5689b1"}`,
          body,
          { headers }
        );
      } else if (mediaType === "tv") {
        response = await axios.post(
          `https://api.themoviedb.org/3/tv/${itemState.id}/rating?api_key=${"621b69c65315805a216e33533f5689b1"}`,
          body,
          { headers }
        );
      }
      const updatedItemState = {
        ...itemState,
        rated: { value: newRatingValue },
      };
      dispatch(setState(updatedItemState));
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error posting rating:",
        error.response?.data || error.message
      );
    } finally {
      setIsRating(false);
    }
  };

  const deleteRating = async () => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const apiRDT = import.meta.env.VITE_TMDB_API_TOKEN;

    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${apiRDT}`,
    };

    try {
      let response;
      if (mediaType === "movie") {
        response = await axios.delete(
          `https://api.themoviedb.org/3/movie/${itemState.id}/rating?api_key=${"621b69c65315805a216e33533f5689b1"}`,
          { headers }
        );
      } else if (mediaType === "tv") {
        response = await axios.delete(
          `https://api.themoviedb.org/3/tv/${itemState.id}/rating?api_key=${apiKey}`,
          { headers }
        );
      }
      const updatedItemState = {
        ...itemState,
        rated: "false",
      };
      dispatch(setState(updatedItemState));
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error deleting rating:",
        error.response?.data || error.message
      );
    } finally {
      setIsRating(false);
    }
  };

  return (
    <div className="">
      <DetailMovieFetcher id={id} type={mediaType} />

      <div className="container mx-auto p-10 bg-base-100  rounded-lg shadow-lg">

        {/* Movie Title, Poster and Rating */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">{detail.title || detail.name}</h1>
          <div className="flex items-center text-yellow-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
            <span className="text-xl font-semibold">
              {detail.vote_average}/10
            </span>
          </div>
        </div>

        {/* Movie Poster */}
        <div className="mb-6">
          <img
            src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
            alt="Movie Poster"
            className="rounded-lg shadow-lg w-64 mx-auto"
          />
        </div>

        {/* Movie Information */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Movie Details</h2>
          <p className="text-gray-400">{detail.details}</p>
        </div>

        <div className="rating-cont">
          {ratingValue === null ? (
            <div>
              <p>No rating given yet. Give one?</p>
              <button className="btn btn-primary mx-3" onClick={openRateMenu}>
                Give a rating
              </button>
            </div>
          ) : (
            <div>
              <p className="text-left">Your rating: {ratingValue}</p>
              <div className="flex gap-3">
                <button className="btn btn-primary" onClick={openRateMenu}>
                  Change rating
                </button>
                <button className="btn btn-warning" onClick={deleteRating}>
                  Delete my rating
                </button>
              </div>
            </div>
          )}

          {isRating && (
            <div>
              <RatingSlider
                value={tempRatingValue}
                onChange={(newValue) => setTempRatingValue(newValue)}
              />
              <button className="btn btn-success" onClick={submitRating}>
                Submit Rating
              </button>
            </div>
          )}
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold">Genre</h3>
            {detail.genres ? (
              detail.genres.map((genre) => (
                <div key={genre.id} className=" p-1 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold">{genre.name}</h3>
                </div>
              ))
            ) : (
              <p>Loading genres...</p>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold">Release Date</h3>
            <p className="text-gray-400">{detail.release_date}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Budget</h3>
            <p className="text-gray-400">{detail.budget}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Revenue</h3>
            <p className="text-gray-400">{detail.revenue}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Status</h3>
            <p className="text-gray-400">{detail.status}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Popularity</h3>
            <p className="text-gray-400">{detail.popularity}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Vote Count</h3>
            <p className="text-gray-400">{detail.vote_average}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
