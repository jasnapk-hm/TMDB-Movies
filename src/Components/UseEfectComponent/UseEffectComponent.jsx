
import { useEffect, useState } from 'react';
import { useDispatch,} from 'react-redux';
import PropTypes from "prop-types";

const CustomFetchApi = (actionFunction, ids) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await dispatch(actionFunction(ids));
                console.log("val", result);
                setData(result);
                setIsLoading(false);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [actionFunction, ids, dispatch]);

    console.log("data....",data)
    return  [data, isLoading, error];
};
CustomFetchApi.propTypes = {
    actionFunction: PropTypes.func.isRequired,
    ids: PropTypes.number.isRequired,
};
export default CustomFetchApi;
