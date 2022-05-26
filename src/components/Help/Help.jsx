import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./Help.css"
import HelpCard from "./HelpCard"


const Help = () => {
    const [help, setHelp] = useState([])
    const [image, setImage] = useState([])
      useEffect(() => {
      axios.get("http://localhost:8000/help")
        .then(response => {
           setHelp(prev => [...prev, ...response.data])
         })
      }, [])
    useEffect(() => {
      axios.get("http://localhost:8000/image")
        .then(response => {
           setImage(response.data)
         })
    }, [])
    return (
        <div className='help-main-div'>
            <div className='container'>
                <div className='help-inner-div'>
                    {image.map((item) => (
                        <div className='help-inner-image' key={item.id}>
                        <img src={item.img} alt="help-main-pic" />
                    </div>
                    ))}
                    <div className='help-inner-info'>
                        <h3>Помощь</h3>
                        {help.map((item) => (
                          <HelpCard item={item} key={item.id}/>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Help;