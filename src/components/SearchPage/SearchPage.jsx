import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { allContext } from '../../context/AllContext';
import SearchPageCard from './SearchPageCard';
import "./SearchPage.css"
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Random from "../Random/Random";
import axios from 'axios';

const SearchPage = () => {
    const { getAllProducts, data } = useContext(allContext)
    useEffect(() => {
        getAllProducts()
    }, [])
    const allData = data.reduce((acc, val) => acc.concat(val), [])
    const [extraProducts, setExtraProducts] = useState([])
    const params = useParams()
    const searchItem = params.searchValue

    const newFilter = allData.filter((value) => {
            return value.title.toLowerCase().includes(searchItem.toLowerCase());
    });
        useEffect(() => {
      axios.get(`http://localhost:8000/summer?_limit=2`)
        .then(response => {
           setExtraProducts(prev => [...prev, ...response.data])
         })
     }, [])
    useEffect(() => {
      axios.get(`http://localhost:8000/new?_limit=1`)
        .then(response => {
           setExtraProducts(prev => [...prev, ...response.data])
         })
    }, [])
    useEffect(() => {
      axios.get(`http://localhost:8000/hits?_limit=1`)
        .then(response => {
           setExtraProducts(prev => [...prev, ...response.data])
         })
    }, [])
    useEffect(() => {
      axios.get(`http://localhost:8000/brandnew?_limit=1`)
        .then(response => {
           setExtraProducts(prev => [...prev, ...response.data])
         })
    }, [])
    
    return (
        <div className='search-page'>
            {newFilter.length > 0 ? (
            <div className='container'>
            <h2 className='search-title'>Результаты поиска по запросу: {searchItem}</h2>
            <div className='search-cards'>
            {newFilter.map((item) => (
                <SearchPageCard item={item} key={item.id}/>
            ))}
        </div>
            </div>
            ) : (
                    <div className='container'>
                    <div>
                        <h2 className='search-title'>Результаты поиска по запросу: {searchItem}</h2>
                        <p className="search-text">По Вашему запросу ничего не найдено.</p>
                        </div>
                         <h3 className="favorite-title">Возможно Вас заинтересует</h3>
                        <div className="search-random-cards">
                            {extraProducts.map((item) => (
                                <Random item={item} key={item.id}/>
                            ))}
                                </div>
                                  <div className='search-table-cards'>
                                        <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 262 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    {extraProducts.map((item) => (
                                                        <TableCell key={item.id}>
                                                            <Random item={item} key={item.id}/>
                                                        </TableCell>))}
                                                </TableRow>
                                            </TableHead>
                                        </Table>
                                        </TableContainer>
                                </div>
                    </div>)}
        </div>
                                
    );
};

export default SearchPage;