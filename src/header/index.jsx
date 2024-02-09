import React from 'react';
import { Average } from './average';
import { RegionPicker } from './select';
import './index.css';

export const Header = () => (
    <div className='control'>
        <div className='section'>
            <Average />
        </div>

        <div className='section'>
            <RegionPicker />
        </div>
    </div>
)
