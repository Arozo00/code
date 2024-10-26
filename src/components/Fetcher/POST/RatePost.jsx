import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setState } from "../../../Store/Action/movieAction";

const RatePost = ({ id, type, ratingValue }) => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const apiRDT = import.meta.env.VITE_TMDB_API_TOKEN;

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchMovieDetails = useCallback(async () => {
    setLoading(true);
    try {
      const headers = {
        accept: "application/json",
        Authorization: `Bearer ${apiRDT}`,
      };
      const body = { value: ratingValue };

      let response;
      if (type === "movie") {
        response = await axios.post(
          `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${apiKey}`,
          body,
          { headers }
        );
      } else if (type === "tv") {
        response = await axios.post(
          `https://api.themoviedb.org/3/tv/${id}/rating?api_key=${apiKey}`,
          body,
          { headers }
        );
      }

      const stateData = response.data;
      console.log(stateData);
      dispatch(setState(stateData));
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  }, [dispatch, apiKey, apiRDT, id, type, ratingValue]);

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  return loading ? <div className="spinner"></div> : null;
};

RatePost.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["movie", "tv"]).isRequired,
  ratingValue: PropTypes.number.isRequired,
};

export default RatePost;
