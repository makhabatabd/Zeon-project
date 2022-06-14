import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from '../../context/CartContext';

const Color = ({id}) => {
    const [colors, setColors] = useState([])
    const { isProdInCart, getColors } = useContext(cartContext)
    const [inCart, setInCart] = useState(isProdInCart(id))
    useEffect(() => {
      axios.get("http://localhost:8000/colors")
        .then(response => {
            setColors(response.data)
        })
    }, [])
    return (
        <div>
            <div className='colorful-circles'>
                {colors.map((item) => {
                    id == inCart[0]?.item?.id && inCart.map(i => {
                        if (i?.item.color == item.color) {
                            item.status = true 
                        } 
                    })
                    return <div key={item.id} style={{ backgroundColor: item.color }} className={item.status ? "circle-circle" : "circle"}></div>
                })}
            </div>
        </div>
    );
};

export default Color;