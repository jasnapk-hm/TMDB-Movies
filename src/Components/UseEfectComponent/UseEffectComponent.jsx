import { useEffect, useState } from 'react';

const CustomFetchApi = (dispatch,actionFunction, ids) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    // const dispatch = useDispatch()
    useEffect(() => {
        const fetchData = async () => {
            setIsPending(true);
            try {
                const result = await dispatch(actionFunction(ids));
                setData(result)
                setIsPending(false);
                setError(null);
            } catch (error) {
                setError(`${error} Could not Fetch Data `);
                setIsPending(false);
            }
        };
        fetchData();
    },[]);

    return { data, isPending, error };
};


export default CustomFetchApi;
