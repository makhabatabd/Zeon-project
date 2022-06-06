import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { summerContext } from '../../context/SummerCollection';
import "./Details.css"
import DetailsCard from './DetailsCard';
import SummerCard from '../Summer/SummerCard';
import axios from 'axios';
import Similiar from '../Similar/Similiar';
const Details = () => {
    const { getOneProduct, oneSummer } = useContext(summerContext)
    const { summer, getSummer } = useContext(summerContext)
    const [colors, setColors] = useState([])
    const params = useParams();
    useEffect(() => {
    getSummer();
    }, []);

   useEffect(() => {
      axios.get("http://localhost:8000/colors?_limit=4")
        .then(response => {
            setColors(response.data)
         })
   }, [])
    
    useEffect(() => {
        getOneProduct(params.id)
    }, [])

    return (
        <div style={{backgroundColor: "#ECECEC"}}>
            {oneSummer ? (
                <DetailsCard colors={colors} id={params.id} item={oneSummer} />
            ) : <h1>Loading</h1>}
            <div className='container'>
                <p className='extra-products'>Похожие товары</p>
                <Similiar/>
            </div>
            
        </div>
    )
    
};

export default Details;