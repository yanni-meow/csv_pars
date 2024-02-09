import { useState } from 'react';
import { context, useGetData } from './model';
import { Header } from './header';
import { Sections } from './sections';
import './App.css';

function App() {
    const { ready, defaultData, regions } = useGetData();
    const [selected, setSelected] = useState([]);
    const handleFilterData = list => setSelected(list);

    const value = {
        data: defaultData,
        regions,
        selected,
        setSelected: handleFilterData
    };

    if (!ready) return null;

    return (
        <div className='app'>
            <context.Provider value={value}>
                <Header />
                <Sections />
            </context.Provider>
        </div>
);
}

export default App;
