import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { allContext } from '../../context/AllContext';
import SearchIcon from '@mui/icons-material/Search';
import "./Search.css"
import { useRef } from 'react';
import { red } from '@mui/material/colors';


const Search = () => {
    const { getAllProducts, data } = useContext(allContext)
    useEffect(() => {
        getAllProducts()
    }, [])
    const allData = data.reduce((acc, val) => acc.concat(val), [])
    const [filteredData, setFilteredData] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [show, setShow] = useState(false)
    const navigate = useNavigate()

    const ref = useRef()
    const handleFilter = (event) => {
        setShow(true)
        const searchWord = event.target.value;
        setSearchValue(searchWord);
        const newFilter = allData.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setSearchValue("");
    };
    
    const handleNavigate = (e) => {
        e.preventDefault()
        navigate(`/searchpage/${searchValue}`)
        clearInput()
        ref.current.value = ""
        setShow(false)
    }

    const inputHandler = () => {
        if (searchValue !== "") {
            setShow(true)
        }
    }

    return (
        <div>
            <div className='search'>
                <div className='search-inputs'>
                    <input onBlur={() => setTimeout(() => setShow(false), 300)} onClick={() => inputHandler()} ref={ref} onChange={handleFilter} placeholder='Поиск' type="text" />
                    <div className='search-icon'>
                        <SearchIcon onClick={handleNavigate}/>
                    </div>
                </div>
            </div>
            {filteredData.length != 0 && show && (
                <div className='data-result-outter'>
                <div className="data-result">
                    {filteredData.map((value, key) => (
                        <Link onClick={()=>ref.current.value =""} className='data-item' to={`/searchpage/${value.title}`} >
                            {value.title}
                        </Link>
                    ))}
                </div>
                </div>
            )
            }
        </div>
    );
}

export default Search;