import React from 'react';

export const meta = ()=>([
    {title: 'aveo | Pharmacy Portal'},
    {name:'description', content:"Doctor Portal where a pharmacist can open patient's prescription." },
])

const Pharmacy = () => {
    return (
        <div className={'flex flex-col items-center justify-center'}>
            <h1>Pharmacy</h1>
        </div>
    )
};

export default Pharmacy;