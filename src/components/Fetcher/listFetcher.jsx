import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setMovieDetail } from "../../Store/Action/detailAction";
import { setList } from "../../Store/Action/movieAction";

const listFetcher = ({}) => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const apiToken = import.meta.env.VITE_TMDB_API_TOKEN;
  const accId = import.meta.env.VITE_TMDB_ACC_ID;

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const listFetcher = useCallback(async () => {
    setLoading(true);
    try {
      const header = {
        accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
      };
      const response = await axios.get(
        `https://api.themoviedb.org/3/account/${accId}/lists?api_key=${apiKey}`,
        { headers: header }
      );
      const movieData = response.data;
      console.log(movieData);
      console.log(
        `https://api.themoviedb.org/3/account/${accId}/lists?api_key=${apiKey}`
      );
      dispatch(setList(movieData));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, apiKey, apiToken, accId]);

  useEffect(() => {
    listFetcher();
  }, [listFetcher]);

  return loading ? <div className="spinner"></div> : null;
};

listFetcher.propTypes = {};

export default listFetcher;
