import React, { useContext, useState } from 'react';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { favoriteContext } from '../../context/favoriteContext';
import { Link } from 'react-router-dom';
import "./Brandnew.css"
import Color from '../Colors/Color';
const BrandNew = ({ item }) => {
    const { addDelToFav, isProdInFav } = useContext(favoriteContext)
    const [inFav, setInFav] = useState(isProdInFav(item.id))
    const discount = Math.ceil(item.price - (item.price * item.discount / 100))
    return (
       <Card square={true}>
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
                <Link to={`/newdetails/${item.id}`}>
                <CardMedia
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
                            <div><span className='discount'>{discount} p</span><span className='price-discount'>{item.price} p</span></div> :  <Typography className='hit-price' variant="body2" color="text.secondary"><p className='discount'>{item.price} p</p>
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

export default BrandNew;