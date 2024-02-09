import React, { useContext } from 'react';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { context } from '../../model';
import './index.css';

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 300,
            width: 400
        }
    }
};

export const RegionPicker = () => {
    const { regions, selected, setSelected } = useContext(context);

    return (
        <>
            <p>выпадающий список с регионами</p>

            <FormControl sx={{m: 1, width: 400}}>
                <InputLabel id='label'>Регион</InputLabel>
                <Select
                    labelId='label'
                    id='demo-simple-select-standard'
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                    multiple
                    input={<OutlinedInput label='Регион'/>}
                    MenuProps={MenuProps}
                >
                    {regions.map(option =>
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
        </>
    )
}


