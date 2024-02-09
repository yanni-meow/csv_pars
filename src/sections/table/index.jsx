import React, { useContext, useMemo, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { context, parseTable } from '../../model';
import './index.css';

const columnName = {
    region: 'Регион'
}

export const Table = () => {
    const [tab, setTab] = useState('as-is');
    const handleChangeTab = (event, newValue) => {
        setTab(newValue);
    };

    const { data, selected } = useContext(context);
    const parsedData = useMemo(() => {
        if (!selected?.length) return data;
        return data.filter(item => selected.includes(item[0]))
    }, [data, selected]);

    const { headers, list} = useMemo(() => parseTable(data), [data]);
    const parsedList = useMemo(() => {
        if (!selected?.length) return list;
        return list.filter(item => selected.includes(item.region))
    }, [data, selected])

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={handleChangeTab}>
                    <Tab label='регион, год, показатель' value='as-is'/>
                    <Tab label='регион, годы' value='norm'/>
                </Tabs>
            </Box>

            {tab === 'as-is' && (
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th scope='col'>Регион</th>
                            <th scope='col'>Год</th>
                            <th scope='col'>Показатель</th>
                        </tr>
                        </thead>
                        <tbody>
                        {parsedData.map(row => (
                            <tr key={`${row[0]}-${row[1]}`}>
                                <td>{row[0]}</td>
                                <td>{row[1]}</td>
                                <td>{row[2]}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {tab === 'norm' && (
                <table>
                    <thead>
                    <tr>
                        {headers.map(item =>
                            <th key={item} scope='col'>{columnName[item] || item}</th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {parsedList.map((item) => (
                        <tr key={item.key}>
                            {headers.map(header => (
                                <td key={item[header]}>
                                    {item[header]}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

