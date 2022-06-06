import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { favoriteContext } from '../../context/favoriteContext';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import Color from '../Colors/Color';
import { summerContext } from '../../context/SummerCollection';

const SimiliarCard = ({ item }) => {
    const { addDelToFav, isProdInFav } = useContext(favoriteContext)
    const {getOneProduct} = useContext(summerContext)
    const [inFav, setInFav] = useState(isProdInFav(item.id))
    const discount = Math.ceil(item.price - (item.price * item.discount / 100))
    useEffect(() => {
        getOneProduct(item.id)
    }, [item.id])
    return (
        <Link style={{textDecoration:"none"}} to={`/details/${item.id}`}>
        <Card sx={{width:"226px", height: "435px", marginRight:"8px", border:"none", backgroundColor:"transparent", color:"rgba(0, 0, 0, 0)", boxShadow:"none"}} key={item.id} square={true}>
            <CardActionArea>
            {inFav ? (
                <FavoriteIcon
                className='favorite'
                style={{ color: "red" }}
                onClick={() => {
                addDelToFav(item);
                setInFav(isProdInFav(item.id));
                }}
            />
            ) : (
                <FavoriteBorderIcon
                style={{ color: "white" }}
                className='favorite'
                onClick={() => {
                addDelToFav(item);
                setInFav(isProdInFav(item.id));
                }}
            />
                )}
            {item.discount ? <div className='red-discount'><span>{item.discount}%</span></div>: null}
            <Link to={`/details/${item.id}`} >
                <CardMedia sx={{height:"332px"}}
                    component="img"
                    height="140"
                    image={item.img}
                    alt="hits image"
                />
            </Link>
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                    </Typography>
                {item.discount ?
                <div><span className='discount'>{discount} p</span><span className='price-discount'>{item.price} p</span></div> :  
                <Typography className='hit-price' variant="body2" color="text.secondary"><p className='discount'>{item.price} p</p>
                </Typography>
                }  
                <Typography variant="body2" color="text.secondary">
                        Размер : {item.size}
                </Typography>
                    <Color/>
                </CardContent>
            </CardActionArea>
            </Card>
            </Link>
    );
};

export default SimiliarCard;