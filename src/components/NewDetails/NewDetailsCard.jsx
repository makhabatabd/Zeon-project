import React, { useContext, useEffect, useState } from 'react';
import { favoriteContext } from '../../context/favoriteContext';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { cartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import {Link} from "react-router-dom"

const NewDetailsCard = ({item, id, colors}) => {
    const { addDelToFav, isProdInFav } = useContext(favoriteContext)
    const [inFav, setInFav] = useState(isProdInFav(item.id))
    const {getCart,addProductToCart, checkItemInCart } = useContext(cartContext);
    const [toggleColor, setToggleColor] = useState(item.color)
    const [checkItem, setCheckItem] = useState(checkItemInCart(item.id, item.color = toggleColor));
    const navigate = useNavigate()
    useEffect(() => {
        getCart()
    }, [])
    useEffect(() => {
        setCheckItem(checkItemInCart(item.id, item.color=toggleColor));
    }, [toggleColor])
    return (
        <>
            <div className='breadcrumps'>
                <div className='container'>
                <span className='breadcrumps-span'>
                    <Link style={{textDecoration: 'none'}} to={'/'}>
                        <span>Главная</span>
                        </Link>
                        <span>/</span>
                    <Link style={{textDecoration: 'none'}} to={'/collection'}>
                        <span>Коллекции</span>
                        </Link>
                        <span>/</span>
                    <Link style={{textDecoration: 'none'}} to={'/summer'}>
                        <span>Новинки</span>
                        </Link>
                        <span>/</span>
                    <Link style={{textDecoration: 'none'}} to={`/details/${item.id}`}>
                        <span className='item-title'>{item.title}</span>
                        </Link>
                    </span>
                 </div>
            </div>
        <div className='main-div-details'>
            <div className='container'>
                <div className='main-div-inner'>
                    <div className='main-pics'>
                    <div className='main-div-pic'>
                        <img width="100%" src={item.img} alt="1" />
                    </div>
                    <div className='main-div-pic'>
                        <img width="100%" src={item.img4} alt="2" />
                    </div>
                    <div className='main-div-pic'>
                        <img width="100%" src={item.img3} alt="3" />
                    </div>
                    <div className='main-div-pic'>
                        <img width="100%" src={item.img2} alt="4" />
                    </div>
                    </div>
                    <div className='table-pics'>
                     <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 262 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                        <TableCell>
                                              <img width="100%" src={item.img} alt="1" />
                                        </TableCell>
                                        <TableCell>
                                              <img width="100%" src={item.img4} alt="2" />
                                        </TableCell>
                                        <TableCell>
                                              <img width="100%" src={item.img3} alt="3" />
                                        </TableCell>
                                        <TableCell>
                                              <img width="100%" src={item.img2} alt="4" />
                                        </TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                        </TableContainer> 
                        </div>
                <div className='details-info'>
                    <div className='details-info-inner'>
                        <div className='details-title'>{item.title}</div>
                        <div className='articul-name'><span className='artikul'>Артикул:</span>{item.artikul}</div>
                        <div className='details-circles'>
                        <p>Цвет</p>
                        <div className='detail-circles'>
                                        {colors.map((el) => (
                                            <div key={item.id + el.color} onClick={() => setToggleColor(el.color)} className={toggleColor === el.color ? "active" : "not-active"}>
                                                <div className='circles' style={{ backgroundColor: el.color }} ></div>
                                            </div>
                                        ))}
                            </div>
                        </div>
                        <p className='details-price'>{item.price.toLocaleString().replace(',', ' ')} p</p>
                        <p className='details-text-intro'>О товаре:</p>
                            <p className='details-text'>{item.text}</p>
                        <div className='details-bottom'> 
                            <div className='details-info-bottom'>
                                    <p><span>Размерный ряд: </span>{item.size}</p>
                                    <p><span>Количество в линейки:</span>{item.amount}</p>
                            </div>
                            <div className='details-info-bot'>
                                <p><span>Состав ткани: </span>{item.made}</p>
                                <p><span>Материал: </span>{item.material}</p>
                            </div>
                            </div>
                            <div style={{ display: "flex" }}>
                                <div style={{marginRight: "8px"}}>
                                    {checkItem ? <button onClick={() => {
                                        navigate("/cart");
                                        }} className='details-button-cart'>
                                            Перейти в корзину
                                    </button>  : <button className="details-button" onClick={() => {
                                            addProductToCart(item);
                                            setCheckItem(true)

                                        }}>
                                        <img style={{marginRight:"10px", marginBottom:"-3px"}} width="20px" src="https://cdn.discordapp.com/attachments/979601812472598619/980774983724830730/unknown.png" alt="cart" />
                                            Добавить в корзину
                                    </button>}
                                </div>
                                <div style={{ backgroundColor: "black"}}>
                                    {inFav ? (
                                            <FavoriteIcon
                                                className='favorite'
                                            style={{ color: "red", padding:"10px", width:"30px", height:"37px" }}
                                            onClick={() => {
                                                addDelToFav(item);
                                                setInFav(isProdInFav(item.id));
                                            }}
                                        />
                                    ) : (
                                                <FavoriteBorderIcon
                                                    className='favorite-hover'
                                            style={{ color: "white", padding:"10px", width:"30px", height:"37px" }}
                                            onClick={() => {
                                                addDelToFav(item);
                                                setInFav(isProdInFav(item.id));
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            </>
    );
};

export default NewDetailsCard;