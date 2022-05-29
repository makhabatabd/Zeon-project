import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { useSearchParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from "@material-ui/styles";
import { summerContext } from '../../context/SummerCollection';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import New from '../New/New';
import "./Summer.css"

const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
        color: "#979797",
        backgroundColor: "white"
    },
  },
}));

const Summer = () => {
    const {summer, getSummer, summerCount} = useContext(summerContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(+searchParams.get("_page") || 1);
    const classes = useStyles();
    
    useEffect(() => {
    setSearchParams({
        _limit: 12,
        _page: page,
    });
    }, []);

    useEffect(() => {
    getSummer();
  }, [searchParams]);

    useEffect(() => {
    setSearchParams({
        _limit: 12,
      _page: page,
    });
    }, [page]);

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
    return (
        <>
            <div className='container'>
                <h3 className='summer-title'>Коллекция Лето 2022</h3>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    {summer.map((item) => (
                        <Card style={cardStyle} key={item.id} square={true}>
                        <CardActionArea>
                        <img className='favorite' src={require('../../images/favorite.png')} alt="little heart" />
                        <CardMedia style={imageStyle}
                            component="img"
                            height="140"
                            image={item.img}
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
                <div style={{display:"flex", justifyContent: "flex-end", margin: "16px 25px 49px 0"}}>
                    <Pagination
                    variant="outlined" classes={{ ul: classes.ul }} shape="rounded"
                    color="primary"
                    count={summerCount}
                    page={+page}
                    onChange={(event, pageVal) => setPage(pageVal)}
                    />
                </div>
            </div>
            <New/>
        </>
    );
};

export default Summer;