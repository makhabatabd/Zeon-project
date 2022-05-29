import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from 'axios';
import "./Main.css"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Main = () => {
    const [hits, setHits] = useState([])
    const [fetching, setFetching] = useState(true)
    const [fetch, setFetch] = useState(true)
    const [brandnew, setBrandnew] = useState([])
    const [fetchCollection, setFetchCollection] = useState(true)
    const [collection, setCollection] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [page, setPage]=useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [totalNew, setTotalNew] = useState(0)
    const [pageColl, setPageColl]=useState(1)
    const [totalColl, setTotalColl] = useState(0)
    const [pluses, setPluses] = useState([])
    useEffect(() => {
    if (fetching) {
      axios.get(`http://localhost:8000/hits?_limit=8&_page=${currentPage}`)
        .then(response => {
            setHits(prev => [...prev, ...response.data])
            setCurrentPage(prevState => prevState + 1)
             setTotalCount(response.headers['x-total-count'])
         })
        .finally(()=>setFetching(false))
    }
    }, [fetching])
    
    useEffect(() => {
    if (fetch) {
      axios.get(`http://localhost:8000/brandnew?_limit=4&_page=${page}`)
        .then(response => {
            setBrandnew(prev => [...prev, ...response.data])
            setPage(prevState => prevState + 1)
            setTotalNew(response.headers['x-total-count'])
         })
        .finally(()=>setFetch(false))
    }
    }, [fetch])


    useEffect(() => {
    if (fetchCollection) {
      axios.get(`http://localhost:8000/collection?_limit=4`)
        .then(response => {
            setCollection(prev => [...prev, ...response.data])
            setPageColl(prevState => prevState + 1)
            setTotalColl(response.headers['x-total-count'])
         })
        .finally(()=>setFetchCollection(false))
    }
    }, [fetchCollection])


     useEffect(() => {
      axios.get("http://localhost:8000/pluses")
        .then(response => {
            setPluses(prev => [...prev, ...response.data])
         })
    }, [])
    
   
    const clickHandler = () => {
        if (hits.length < totalCount) {
            setFetching(true)
        }
    }
    const clickNew = () => {
        if (brandnew.length < totalNew) {
            setFetch(true)
        }
    }
    const clickColl = () => {
        if (collection.length < totalColl) {
            setFetchCollection(true)
        }
    }
    const cardStyle = {
        width: "286px",
        height: "536px",
        marginRight: "8px",
        width: "24%", 
        marginBottom: "8px", 
        borderRadius: "none",
        position:"relative"
    }
    const imageStyle = {
        width: "286px", 
        height: "437px"
    };

    const titleStyle = { 
        fontSize: "14px",
        lineHeight: "17px",
        color: "#393939",
        margin: "6px 0"
    }
    const priceStyle = { 
        fontWeight: "500",
        fontSize: "16px",
        lineHeight: "20px",
        color: "#393939",
        margin: "0", 
        color:"black"
    }

    const cardContent = {
        padding: "6px 8px"
    }

    const sizeStyle = { 
        fontSize: "13px",
        lineHeight: "16px",
        color: "#7C7C7C",
        margin: "6px 0"
    }

    const smallCard = {
        width: "286px",
        height: "374px",
        marginRight: "8px",
        width: "24%",
        position: "relative"
    }

    const smallCardPic = {
        width: "286px",
        height: "330px", 
    }
    return (
        <div className='main'>
            <div className='container'>
                <h3 className='hit-main-title'>Хит продаж</h3>
                <div style={{display: "flex", flexWrap: "wrap" ,}}>
                    {hits.map((item) => (
                    <Card style={cardStyle} key={item.id} square={true}>
                        <CardActionArea>
                        <img className='favorite' src={require('../../images/favorite.png')} alt="little heart" />
                        <CardMedia style={imageStyle}
                            component="img"
                            height="140"
                            image={item.image}
                            alt="hits image"
                        />
                        <CardContent style={cardContent}>
                        <Typography style={titleStyle} gutterBottom variant="h5" component="div">
                            {item.title}
                        </Typography>
                        <Typography style={priceStyle}  className='hit-price' variant="body2" color="text.secondary">
                            {item.price}
                        </Typography>
                        <Typography style={sizeStyle} variant="body2" color="text.secondary">
                            Размер : {item.size}
                        </Typography>
                            <div className='colorful-circles'>
                                <div className='circle-blue'></div>
                                <div className='circle-green'></div>
                                <div className='circle-marron'></div>
                                <div className='circle-brown'></div>
                                <div className='circle-purple'></div>
                                <div className='circle-white'></div>
                                <div className='circle-grey'></div>
                                <div className='circle-pink'></div>
                            </div>
                        </CardContent>
                        </CardActionArea>
                    </Card>
                    ))}
                </div>
                <div className='hit-button-div'>
                    <button className='hit-button' onClick={clickHandler}>Еще</button>
                </div>
            </div>
             <div className='container'>
                <h3 className='hit-main-title'>Новинки</h3>
                <div style={{display: "flex", flexWrap: "wrap" ,}}>
                    {brandnew.map((item) => (
                    <Card style={cardStyle} key={item.id} square={true}>
                        <CardActionArea>
                        <img className='favorite' src={require('../../images/favorite.png')} alt="little heart" />
                        <CardMedia style={imageStyle}
                            component="img"
                            height="140"
                            image={item.image}
                            alt="hits image"
                        />
                        <CardContent style={cardContent}>
                        <Typography style={titleStyle} gutterBottom variant="h5" component="div">
                            {item.title}
                        </Typography>
                        <Typography style={priceStyle}  className='hit-price' variant="body2" color="text.secondary">
                            {item.price}
                        </Typography>
                        <Typography style={sizeStyle} variant="body2" color="text.secondary">
                            Размер : {item.size}
                        </Typography>
                            <div className='colorful-circles'>
                                <div className='circle-blue'></div>
                                <div className='circle-green'></div>
                                <div className='circle-marron'></div>
                                <div className='circle-brown'></div>
                                <div className='circle-purple'></div>
                                <div className='circle-white'></div>
                                <div className='circle-grey'></div>
                                <div className='circle-pink'></div>
                            </div>
                        </CardContent>
                        </CardActionArea>
                    </Card>
                    ))}
                </div>
                <div className='hit-button-div'>
                    <button className='hit-button' onClick={clickNew}>Еще</button>
                </div>
            </div>
            <div className='container'>
                <h3 className='hit-main-title'>Хит продаж</h3>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    {collection.map((item) => (
                        <Card style={smallCard} key={item.id} square={true}>
                        <CardMedia style={smallCardPic}
                            component="img"
                            height="140"
                            image={item.img}
                            alt="image"
                        />
                            <div className='collection-words'>
                                <p>{item.text}</p>
                            </div>
                            <button className='collection-bottom'>Смотреть все
                                <ArrowForwardIosIcon sx={{ fill: '#fff'}} />
                            </button>
                    </Card>
                    ))}
                </div>
                <div className='hit-button-div'>
                    <button className='hit-button' onClick={clickColl}>Еще</button>
                </div>
            </div>
            <div className='advantages'>
                <div className='container'>
                    <h3>Наши преимущества</h3>
                    <div className='advantages-outter'>
                    {pluses.map((item) => (
                            <div className='advantages-inner' key={item.id}>
                            <img src={item.img} alt="pluses image" />
                            <h5>{item.title}</h5>
                            <p>{item.text}</p>
                            </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;