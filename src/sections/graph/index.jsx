import React, { useContext, useMemo } from 'react';
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';
import { context, parseGraph } from '../../model';

export const Graph = () => {
    const { data, regions, selected } = useContext(context);
    const linesList = useMemo(() => selected.length ? selected : regions, [selected]);
    const { parsedData, maxData } = parseGraph(data);

    return (
        <>
            <p>линейный график с динамикой значения показателя по годам</p>

            <LineChart
                width={800}
                height={300}
                data={parsedData}
            >
                {selected.length > 0 && (
                    <Legend
                        layout='vertical'
                        verticalAlign='top'
                        align='right'
                        wrapperStyle={{ top: '-16px', right: '-48px' }}
                    />
                )}
                <CartesianGrid strokeDasharray='3 3'/>
                <XAxis dataKey='year'/>
                <YAxis/>
                <Line dataKey={maxData} stroke='transparent' dot={false} />
                {linesList.map(item => (
                    <Line
                        key={item}
                        type='monotone'
                        dataKey={item}
                        strokeWidth='1'
                        stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                    />
                ))}
            </LineChart>
        </>
    )
}

