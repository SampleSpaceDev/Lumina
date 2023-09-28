import { APIContext } from "../contexts";
import { useContext, useEffect, useState } from "react";
import { APP } from "../constants";

export function useAPIContext(slug?: string, type?: string) {
    const { apiData, setApiData } = useContext(APIContext);

    const [fetchStatus, setFetchStatus] = useState(false);
    useEffect(() => {
        async function fetchFromApi() {
            const href = window.location.href;
            const url = `${APP.api}${type}/${slug}`;

            return fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (window.location.href === href) {
                        setApiData(data);
                        setFetchStatus(true);
                    }
                });
        }

        if (slug) {
            setApiData({});
            fetchFromApi();
        }
    }, [slug, type, setApiData]);

    if (slug) {
        return fetchStatus ? apiData : {};
    } else {
        return apiData;
    }
}