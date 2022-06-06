import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Color = () => {
    const [colors, setColors] = useState([])
    useEffect(() => {
      axios.get("http://localhost:8000/colors")
        .then(response => {
            setColors(prev => [...prev, ...response.data])
         })
    }, [])
    return (
        <div>
            <div className='colorful-circles'>
            {colors.map((item) => (
                <div key={item.id} style={{backgroundColor: item.color}} className='circle'></div>
            ))}
            </div>
        </div>
    );
};

export default Color;