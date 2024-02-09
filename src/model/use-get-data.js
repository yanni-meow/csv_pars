import { useEffect, useMemo, useState } from 'react';
import * as Papa from 'papaparse';

export const useGetData = () => {
    const [ready, setReady] = useState(false);
    const [defaultData, setDefaultData] = useState([]);

    const regions = useMemo(() => new Set(
        defaultData
            .reduce((memo, item) => {
                memo.push(item[0])
                return memo
            }, [])
            .filter(item => !!item)
    ), [defaultData]);

    const load = function () {
        fetch('./data/index.csv')
            .then(response => response.text())
            .then(responseText => {
                const { data } = Papa.parse(responseText);
                data.splice(0, 1);
                setDefaultData(data);
            })
            .then(() => setReady(true))
    };

    useEffect(() => {
        load();
    }, [])

    return useMemo(() => ({
            ready,
            defaultData,
            regions: [...regions]
        }),
        [
            ready,
            defaultData,
            regions
        ])
}