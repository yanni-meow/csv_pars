import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { context, parseLastYear } from '../../model';
import './index.css';

export const Average = () => {
    const { data, selected } = useContext(context);
    const parsedData = useMemo(() => parseLastYear(data), [data]);

    const holeAverage = useMemo(() => {
        const values = Object.values(parsedData);
        return values.reduce(
            (accumulator, item) => accumulator + Number(item), 0
        ) / values.length
    }, [parsedData])

    const average = useMemo(() => {
        if (selected.length) {
            const sum = selected.reduce((accumulator, item) => accumulator + Number(parsedData[item]), 0);
            return sum / selected.length
        }
        return holeAverage;
    }, [holeAverage, selected]);

    if (!average) return null;

    return (
        <>
            <p>
                числовой показатель со средним значением<br/>
                по {selected.length ? <b>выбранным регионам</b> : <b>всей стране</b>} за 2023 год
            </p>

            <div
                className={classNames('count', {'green': average > holeAverage, 'red': average < holeAverage})}
            >
                {Math.round(average)}
            </div>
        </>
    )
}

