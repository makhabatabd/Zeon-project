import React, { useContext, useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { favoriteContext } from "../../context/favoriteContext";
import { CardActionArea } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate, useParams } from 'react-router-dom';
import Color from '../Colors/Color';
import { summerContext } from '../../context/SummerCollection';

const Random = ({ item }) => {
    const discount = Math.ceil(item.price - (item.price * item.discount / 100))
    const { addDelToFav, isProdInFav } = useContext(favoriteContext)
    const [inFav, setInFav] = useState(isProdInFav(item.id))
    const navigate = useNavigate()
    const [pic, setPic] = useState(item.img)
    const [hover, setHover] = useState("sm-hover")

    const handleMouse = (event) => {
        var mouseX = event.nativeEvent.offsetX; 
        let cardWidth = event.target.clientWidth
        let specWidth = Math.ceil(cardWidth / 4)

        if (mouseX > 1 && mouseX < specWidth) {
            setPic(item.img)
            setHover("sm-hover-1")
        }if (mouseX > specWidth && mouseX < specWidth * 2) {
            setPic(item.img2)
            setHover("sm-hover-2")
        } else if (
            mouseX > specWidth * 2 && mouseX < specWidth * 3) {
            setPic(item.img3)
            setHover("sm-hover-3")
        } else if (
            mouseX > specWidth * 3 && mouseX < specWidth * 4) {
            setPic(item.img4)
            setHover("sm-hover-4")
             }
    }
    const handleLeave = () => {
        setPic(item.img)
        setHover("hover")
    }

    const cardStyle = {
        width: "226px", 
        marginRight: "8px", 
        border: "none", 
        backgroundColor: "transparent", 
        color: "rgba(0, 0, 0, 0)", 
        boxShadow: "none",
    }

    return (
        <div className='sm-card-outter'>
        <Card className='sm-card' onMouseMove={(e) => handleMouse(e)} onMouseLeave={() => handleLeave()} style={cardStyle} sx={{ height: "430px" }} key={item.id} square={true}>
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
                    className='sm-favorite-hover'
                    onClick={() => {
                    addDelToFav(item);
                    setInFav(isProdInFav(item.id));
                    }}
                />)}
                    <CardMedia
                        onClick={() => navigate(`/details/${item.id}`)}
                    sx={{height:"332px"}}
                        className="photos"
                        height="140"
                        component="img"
                        image={pic}
                        alt="fav image"
                    />
                    <div className={hover}></div>
                    <CardContent>
                         <Typography gutterBottom variant="h5" component="div">
                                {item.title}
                        </Typography>
                            {item.discount ?
                        <div><span className='discount'>{discount.toLocaleString().replace(',', ' ')} p</span><span className='price-discount'>{item.price.toLocaleString().replace(',', ' ')} p</span></div> :  
                                <Typography className='hit-price' variant="body2" color="text.secondary"><span className='discount'>{item.price.toLocaleString().replace(',', ' ')} p</span>
                                </Typography>
                            }   
                            <Typography variant="body2" color="text.secondary">
                                Размер : {item.size}
                        </Typography>
                        <Color/>
                    </CardContent>
                </CardActionArea>
            </Card>
            </div>
    );
};

export default Random;