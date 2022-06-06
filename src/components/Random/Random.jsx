import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { favoriteContext } from "../../context/favoriteContext";
import { CardActionArea } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from 'react-router-dom';
import Color from '../Colors/Color';

const Random = ({ item }) => {
    const discount = Math.ceil(item.price - (item.price * item.discount / 100))
    const { addDelToFav, isProdInFav } = useContext(favoriteContext)
    const [inFav, setInFav] = useState(isProdInFav(item.id))
    return (
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
                />)}
                    <CardMedia
                    sx={{height:"332px"}}
                        className="photos"
                        height="140"
                        component="img"
                        image={item.img}
                        alt="fav image"
                    />
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
    );
};

export default Random;