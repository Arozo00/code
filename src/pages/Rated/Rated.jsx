/* eslint-disable no-unused-vars */
import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setList } from "../../Store/Action/movieAction";
import DetailMovie from "../../components/Card/MoviePosterDetail";
import RatedFetcher from "../../components/Fetcher/RatedFetcher";

const Rated = () => {
  const [activeTab, setActiveTab] = useState("movies");
  const handleTabClick = (tab) => setActiveTab(tab);
  const uid = import.meta.env.VITE_TMDB_ACC_ID;
  const updateRatedData = (updatedItem) => {
    const updatedList = list.results.map((item) =>
      item.id === updatedItem.id
        ? { ...item, rating: updatedItem.rating }
        : item
    );
    dispatch(setList({ ...list, results: updatedList }));
  };

  const list = useSelector((state) => state.list.list);
  const dispatch = useDispatch();

  return (
    <div className="main text-left mx-6 my-4">
      <RatedFetcher type={activeTab} uid={uid} />
      <div role="tablist" className="tabs w-full tabs-bordered">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          aria-label="Movie"
          className={`tab px-6 ${activeTab === "movies" ? "tab-active" : ""}`}
          onClick={() => handleTabClick("movies")}
        />
        <div role="tabpanel" className="tab-content w-full p-10 justify-center">
          {list.item_count === 0 ? (
            <div className="flex w-full h-full justify-center align-middle text-slate-600 italic">
              There's no item to display.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-screen-xl">
              {(list?.results && list?.results.length > 0
                ? list.results
                : Array.from({ length: 4 })
              ).map((item, index) => (
                <div key={item?.id || `placeholder-${index}`} className="">
                  <DetailMovie
                    posterUrl={item?.poster_path || null}
                    title={item?.name || item?.title}
                    id={item?.id}
                    desc={item?.description || item?.overview}
                    myRating={item?.rating}
                    rateAvg={item?.vote_average}
                    type={"movie"}
                    incRatingOpt={true}
                    onRatingSubmit={updateRatedData}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className={`tab px-6 ${activeTab === "TV" ? "tab-active" : ""}`}
          onClick={() => handleTabClick("tv")}
          aria-label="TV"
        />
        <div role="tabpanel" className="tab-content w-full p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-screen-xl">
            {(list?.results && list?.results.length > 0
              ? list.results
              : Array.from({ length: 4 })
            ).map((item, index) => (
              <div key={item?.id || `placeholder-${index}`} className="">
                <DetailMovie
                  posterUrl={item?.poster_path || null}
                  title={item?.name || item?.title}
                  id={item?.id}
                  desc={item?.description || item?.overview}
                  myRating={item?.rating}
                  rateAvg={item?.vote_average}
                  type={"tv"}
                  incRatingOpt={true}
                  onRatingSubmit={updateRatedData}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rated;
