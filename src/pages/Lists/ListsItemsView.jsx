/* eslint-disable no-unused-vars */
import React from "react";
import ListItemsFetcher from "../../components/Fetcher/listItemsFetcher";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import { useParams } from "react-router-dom";
const ListItemsView = () => {
  const list = useSelector((state) => state.list.list);
  const { id } = useParams();

  return (
    <div className="bg-base-100 min-h-screen p-8">
      <ListItemsFetcher id={id} />
      <h1 className="text-4xl font-bold mb-6 text-center">List Details</h1>
      <p>Name : {list.name}</p>
      <p>Created by : {list.created_by}</p>
      <p>Items count : {list.item_count}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {list?.items?.map((movie) => (
          <div key={movie.id} className="">
            <Card
              imgUrl={movie.poster_path}
              title={movie.name || movie.title}
              id={movie.id}
              desc={movie.overview}
              rating={movie.vote_average}
              mediaType={movie.media_type}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListItemsView;
