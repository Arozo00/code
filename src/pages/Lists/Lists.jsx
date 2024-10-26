/* eslint-disable no-unused-vars */
import React from "react";
import ListFetcher from "../../components/Fetcher/listFetcher";
import { useDispatch, useSelector } from "react-redux";
import CardList from "../../components/Card/CardList";
const Lists = () => {
  const list = useSelector((state) => state.list.list);
  return (
    <div className="bg-base-100 min-h-screen p-8">
      <ListFetcher />
      <h1 className="text-4xl font-bold mb-6 text-center"> List kamu</h1>
      <p>Total list: {list.total_results}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {list?.results?.map((list) => (
          <div key={list.id} className="">
            <CardList
              imgUrl={list.poster_path}
              title={list.name}
              id={list.id}
              desc={list.description}
              itemCount={list.item_count}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lists;
