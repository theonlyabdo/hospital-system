import React from 'react';

export const meta = ()=>([
    {title: 'aveo | Doctor Portal'},
    {name:'description', content:"Doctor Portal where a doctor can open patient's records." },
])

const Doctor = ()=>  {
    return (
        <div className={'flex flex-col items-center justify-center'}>
            <h1>Doctor</h1>
        </div>
    )
};

export default Doctor;