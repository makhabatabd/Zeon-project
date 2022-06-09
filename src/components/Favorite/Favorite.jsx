import React, { useContext, useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./Favorite.css";
import { favoriteContext } from "../../context/favoriteContext";
import { CardActionArea } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import Random from "../Random/Random";
import Color from "../Colors/Color";
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";

const Favorite = () => {
    const { fav, getFav, deleteProdInFav, favoriteLength } = useContext(favoriteContext)
    const [extraProducts, setExtraProducts] = useState([])
    const [limit, setLimit] = useState(0)
    const navigate = useNavigate()
   
    useEffect(() => {
        if (window.innerWidth < 321) {
            changeLimit(4)
        }
        else {
            changeLimit(limit +12)
        }
    }, [])
    
    useEffect(() => {
        getFav()
    }, [])

     const changeLimit = (number) => {
         if (window.innerWidth < 321) {
             setLimit(prev => prev + number)
            } else {
                setLimit(prev => prev + number)
            } 
    }

    const ScrollHandler = (e) => { 
        if (window.innerWidth < 321) {
            if (
                e.target.documentElement.scrollHeight - 400 - (e.target.documentElement.scrollTop + window.innerHeight) < 0
            ) {
                changeLimit(4)
            }
        } else {
            e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && changeLimit(12)
        }
    
        
    } 
 
  useEffect(() => { 
    document.addEventListener('scroll', ScrollHandler) 
 
    return () => { 
      document.removeEventListener('scroll', ScrollHandler) 
    } 
  }, [])
    
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
        <div className="fav-div">
            <div className="container">
                <h3 className='fav-main-title'>Избранное</h3>
                <div>
                    {fav?.products.length > 0 ? (
                        <>
                            <p className="fav-main-text">Товары в избранном {favoriteLength}</p>
                            <div style={{display:"flex", flexWrap:"wrap"}}>
                                {fav.products
                                    .filter((i, k)=> k < limit)
                                    .map((item1) => (
                                <Card key={item1.item.id} square={true}>
                                    <CardActionArea>
                                        <FavoriteIcon
                                            className='favorite'
                                            style={{ color: "red", position: "absolute", top: "2%", right: "5%"}}
                                            onClick={() => {
                                               deleteProdInFav(item1.item.id)
                                            }}
                                        />
                                        <CardMedia
                                            className="photos"
                                            height="140"
                                            component="img"
                                            image={item1.item.img}
                                            alt="fav image"
                                            onClick={() => navigate(`/details/56`)}
                                        />
                                        <CardContent>
                                             <Typography gutterBottom variant="h5" component="div">
                                                {item1.item.title}
                                            </Typography>
                                            {item1.item.discount ?
                                                <div><span className='discount'>{Math.ceil(item1.item.price - (item1.item.price * item1.item.discount / 100)).toLocaleString().replace(',', ' ')} p</span><span className='price-discount'>{item1.item.price.toLocaleString().replace(',', ' ')} p</span></div> :  
                                                <Typography className='hit-price' variant="body2" color="text.secondary"><span className='discount'>{item1.item.price.toLocaleString().replace(',', ' ')} p</span>
                                                </Typography>
                                            }   
                                            <Typography variant="body2" color="text.secondary">
                                                Размер : {item1.item.size}
                                            </Typography>
                                            <Color/>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            ))}
                        </div>
                        </>
                    ) : (
                            <>
                            <div>
                                <p className="favorite-text">У вас пока нет избранных товаров</p>
                                <h3 className="favorite-title">Возможно Вас заинтересует</h3>
                                </div>
                                <div className="maybe-cards">
                                    {extraProducts.map((item) => (
                                        <Random item={item} key={item.id}/>
                                    ))}
                                </div>
                                  <div className='maybe-table-cards'>
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
                        </>
                    )}
                </div>
            </div>
        </div>

    );
};

export default Favorite;