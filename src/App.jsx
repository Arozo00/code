/* eslint-disable no-unused-vars */
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage/Homepage";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieFetcher from "./components/Fetcher/MovieFetcher";
import { useState } from "react";
import Category from "./pages/Category/Category";
import Detail from "./pages/Detail/Detail";
import { Provider } from "react-redux";
import store from "./Store/store";
import Search from "./pages/Search";
import Lists from "./pages/Lists/Lists";
import ListItemsView from "./pages/Lists/ListsItemsView";
import Rated from "./pages/Rated/Rated";

function App() {
  const [data, setData] = useState();


  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <MovieFetcher onFetch={setData} />
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/detail/:mediaType/:id" element={<Detail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/lists/:id" element={<ListItemsView />} />
            <Route path="/rated" element={<Rated />} />
            <Route path="/*" element={<Homepage />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
