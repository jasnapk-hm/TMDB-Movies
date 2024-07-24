import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

const useFetchApi = (actionFunction, ids) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(actionFunction(ids));
        // console.log("val", result);
        setData(result);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [actionFunction, ids, dispatch]);

  return [data, isLoading, error];
};
useFetchApi.propTypes = {
  actionFunction: PropTypes.func,
  ids: PropTypes.number,
};

export default useFetchApi;
