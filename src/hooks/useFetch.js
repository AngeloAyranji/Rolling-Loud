import { useState, useEffect } from "react";
import axios from "axios";
import { makeRequest, makeAuthRequest } from "../makeRequest";

const useFetch = (url, authentication = false) => {
    const [data, setData] = useState(null);
    const [metadata, setMetadata] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                if (url !== "") {
                    setLoading(true)
                    let res;
                    if (authentication) {
                        res = await axios.create({
                            baseURL: process.env.REACT_APP_BACKEND_URL,
                            headers: {
                                Authorization: "bearer " + localStorage.getItem("jwt")
                            }
                        }).get(url)
                    }
                    else res = await makeRequest.get(url)
                    setData(res.data.data)
                    setMetadata(res.data.meta)
                }
            } catch (err) {
                console.log("error: ", err)
                setError(true)
            }
            setLoading(false)
        }

        fetch()

    }, [url, authentication])

    return { data, metadata, loading, error }
}

export default useFetch;