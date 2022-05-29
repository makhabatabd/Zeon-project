import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useSearchParams } from 'react-router-dom';
import { collectionContext } from '../../context/Collection';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from "@material-ui/styles";
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
        color: "#979797",
        backgroundColor: "white"
    },
  },
}));


const Collection = () => {
    const {collection, getCollection, collectionCount} = useContext(collectionContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(+searchParams.get("_page") || 1);
    const classes = useStyles();
    
    useEffect(() => {
    setSearchParams({
        _limit: 8,
        _page: page,
    });
    }, []);

    useEffect(() => {
    getCollection();
  }, [searchParams]);

    useEffect(() => {
    setSearchParams({
        _limit: 8,
      _page: page,
    });
    }, [page]);

    const smallCard = {
        width: "286px",
        height: "374px",
        marginRight: "8px",
        marginBottom: "8px",
        width: "24%",
        position: "relative"
    }

    const smallCardPic = {
        width: "286px",
        height: "330px", 
    }
    return (
            <div className='container'>
                <h3 className='hit-main-title'>Хит продаж</h3>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {collection.map((item) => (
                        <Card style={smallCard} key={item.id} square={true}>
                        <CardMedia style={smallCardPic}
                            component="img"
                            height="140"
                            image={item.img}
                            alt="image"
                        />
                            <div className='collection-words'>
                                <p>{item.title}</p>
                            </div>
                            <Link style={{textDecoration: 'none'}} to={'/summer'}>
                            <button className='collection-bottom'>Смотреть все
                                <ArrowForwardIosIcon sx={{ fill: '#fff'}} />
                                </button>
                            </Link>
                    </Card>
                    ))}
            </div>
                <div style={{display:"flex", justifyContent: "flex-end", margin: "16px 25px 49px 0"}}>
                    <Pagination
                    variant="outlined" classes={{ ul: classes.ul }} shape="rounded"
                    color="primary"
                    count={collectionCount}
                    page={+page}
                    onChange={(event, pageVal) => setPage(pageVal)}
                    />
                </div>
            </div>
    );
};

export default Collection;