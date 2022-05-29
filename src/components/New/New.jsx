import React, { useContext, useEffect } from 'react';
import { newContext } from '../../context/Brandnew';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const New = () => {
     const cardStyle = {
        width: "226px",
        height: "435px",
        marginRight: "8px",
        width: "19%", 
        marginBottom: "64px", 
        position: "relative",
        border: "none", 
        boxShadow:"none"
    }
    const imageStyle = {
        width: "226px", 
        height: "330px"
    };

    const titleStyle = { 
        fontSize: "14px",
        fontWeight: "500",
        lineHeight: "17px",
        color: "#393939",
        margin: "0 0 6px 0"
    }
    const priceStyle = { 
        fontWeight: "500",
        fontSize: "14px", 
        margin: "0 0 8px 0", 
        color: "#1D1D1B",
    }

    const cardContent = {
        padding: "6px 8px"
    }

    const sizeStyle = { 
        fontWeight: "500",
        fontSize: "13px", 
        margin: "0 0 16px 0",
        color: "#979797",
    }
    const { newClothes, getNew } = useContext(newContext)
    useEffect(() => {
    getNew();
    }, []);
    return (
        <div className='container'>
                <h3 className='hit-main-title'>Новинки</h3>
                <div style={{display: "flex", flexWrap: "wrap" ,}}>
                    {newClothes.map((item) => (
                    <Card style={cardStyle} key={item.id} square={true}>
                        <CardActionArea>
                        <img className='favorite' src={require('../../images/favorite.png')} alt="little heart" />
                        <CardMedia style={imageStyle}
                            component="img"
                            image={item.img}
                            alt="image"
                        />
                        <CardContent style={cardContent}>
                        <Typography style={priceStyle}  className='hit-price' variant="body2" color="text.secondary">
                            {item.price}
                        </Typography>
                        <Typography style={titleStyle} gutterBottom variant="h5" component="div">
                            {item.title}
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
            </div>
    );
};

export default New;