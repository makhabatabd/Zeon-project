import React, { useContext, useState } from 'react';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { favoriteContext } from '../../context/favoriteContext';
import Color from '../Colors/Color';

const NewCard = ({ item }) => {
    const { addDelToFav, isProdInFav } = useContext(favoriteContext)
    const [inFav, setInFav] = useState(isProdInFav(item.id))
    const discount = Math.ceil(item.price - (item.price * item.discount / 100))
    return (
        <Card sx={{width:"226px", height: "430px", marginRight: "8px", border:"none", backgroundColor:"transparent", color:"rgba(0, 0, 0, 0)", boxShadow:"none"}} key={item.id} square={true}>
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
                        className='favorite-hover'
                        onClick={() => {
                            addDelToFav(item);
                            setInFav(isProdInFav(item.id));
                        }}
                    />
                )}
            {item.discount ? <div className='red-discount'><span>{item.discount}%</span></div>: null}
                <CardMedia
                    sx={{height:"332px"}}
                component="img"
                image={item.img}
                alt="image"
            />
            <CardContent>
            {item.discount ?
                <div style={{marginBottom:"10px"}}><span style={{marginRight:"8px"}} className='price-discount'>{item.price.toLocaleString().replace(',', ' ')} p</span><span className='discount'>{discount.toLocaleString().replace(',', ' ')} p</span></div> :  
                <Typography className='hit-price' variant="body2" color="text.secondary"><span className='discount'>{item.price.toLocaleString().replace(',', ' ')} p</span>
                </Typography>
            }  
            <Typography sx={{fontSize:"14px", fontWeight: "500", color: "#393939", marign:"8px 0 6px 0", fontFamily: "'Montserrat', sans-serif"}} gutterBottom variant="h5" component="div">
                {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Размер : {item.size}
            </Typography>
                <Color/>
            </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default NewCard;