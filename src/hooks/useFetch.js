import { useState, useEffect } from "react";
import { makeRequest, makeAuthRequest } from "../makeRequest";

const useFetch = (url, authentication = false) => {
    const [data, setData] = useState(null);
    const [metadata, setMetadata] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        const fetch = async () => {
            try{
                if(url !== ""){
                    setLoading(true)
                    let res;
                    if(authentication) res = await makeAuthRequest.get(url)
                    else res = await makeRequest.get(url)
                    setData(res.data.data)
                    setMetadata(res.data.meta)
                }
            } catch(err) {
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