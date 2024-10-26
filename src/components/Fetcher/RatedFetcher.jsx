import { useCallback, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setList } from "../../Store/Action/movieAction";

const RatedFetcher = ({ type, uid }) => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const apiToken = import.meta.env.VITE_TMDB_API_TOKEN;
  if (!type) {
    type = "movies";
  }

  const dispatch = useDispatch();

  const ratedFetcher = useCallback(async () => {
    console.log(type);
    try {
      let headers = {
        accept: "application/json",
        Authorization: "Bearer " + apiToken,
      };

      let url = `https://api.themoviedb.org/3/account/${uid}/rated/${type}?api_key=${apiKey}`;
      const response = await axios.get(url, { headers });
      const movieData = response.data;
      console.log(movieData);
      console.log(url);
      dispatch(setList(movieData));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [dispatch, apiKey, apiToken, type, uid]);

  useEffect(() => {
    ratedFetcher();
  }, [ratedFetcher, type]);

  return null;
};

RatedFetcher.propTypes = {};

export default RatedFetcher;
