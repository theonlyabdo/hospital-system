import React from 'react';

export const meta = ()=>([
    {title: 'aveo | Laboratory Portal'},
    {name:'description', content:"Lab portal where you can view and manage laboratory orders and reports." },
])

const Laboratory = () => {
    return (
        <div className={'flex justify-center items-center'}>
            <h1>Laboratory</h1>
        </div>
    )
};

export default Laboratory;