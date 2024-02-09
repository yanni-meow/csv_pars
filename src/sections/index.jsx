import { Graph } from './graph';
import { Table } from './table';
import './index.css';

export const Sections = () => (
    <>
        <div className='section'>
            <Graph/>
        </div>
        <div className='section'>
            <Table/>
        </div>
    </>
)
