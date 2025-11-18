import React from 'react';

export const meta = ()=>([
    {title: 'aveo | Nurse Portal'},
    {name:'description', content:"Nurse Portal where a nurse can open patient's records." },
])

const Nurse = ()=>  {
    return (
        <div className={'flex flex-col items-center justify-center'}>
            <h1>Nurse</h1>
        </div>
    )
};

export default Nurse;