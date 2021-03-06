import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from '../../context/CartContext';
import CloseIcon from '@mui/icons-material/Close';
import "./Cart.css"
import Order from "../Order/Order"
import axios from 'axios';
import Random from '../Random/Random';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
    
const Cart = () => {
    const { getCart, cart, deleteFromCart, changeProductCount} = useContext(cartContext);
    const [open, setOpen] = useState(false)
    const [extraProducts, setExtraProducts] = useState([])
    const [info, setInfo] = useState(false)
    const [button, setButton] = useState(false)
    const total = cart.totalPrice - cart.cartDiscount
  useEffect(() => {
    getCart();
  }, []);
    useEffect(() => {
      axios.get(`http://localhost:8000/summer?_limit=2`)
        .then(response => {
           setExtraProducts(prev => [...prev, ...response.data])
         })
     }, [])
    useEffect(() => {
      axios.get(`http://localhost:8000/hits?_limit=2`)
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
        <div className='main-div'>
            <div className='container'>
                {cart.products?.length > 0 ? (
                    <div className='main-cart-div'> 
                        <div style={{marginRight: "16px"}}>
                            {cart.products?.map((item) => {
                            return (
                        <div style={{display:"flex", flexDirection:"column"}} key={item.item.id+item.item.color}>
                        <div className='cart-inner' >
                        <div className='cart-card'>
                            <div className='cart-card-inner'>
                                <div className='cart-pic'>
                                    <img width={112} src={item.item.img} alt="the main image" />
                                </div>
                                <div className='cart-info'>
                                    <h1 className='cart-title'>{item.item.title}</h1>
                                                <div style={{display:"flex", alignItems:"center"}}>
                                                    <p className='cart-color'>????????:</p>
                                                    <div style={{width:"16px", height:"16px", border:"1px solid #E7E7E7", display:"flex", justifyContent:"center", alignItems:"center"}}>
                                                    <span style={{backgroundColor: item.item.color, width:"8px", height:"8px", borderRadius:"50%"}}></span>
                                                    </div>
                                                </div>
                                                <p className='cart-title'>????????????: {item.item.size}</p>
                                    <div className='cart-price'>{item.item.discount ?
                                                    <div><span className='discount'>{Math.ceil(item.item.price - (item.item.price * item.item.discount / 100)).toLocaleString().replace(',', ' ')} p</span><span className='price-discount'>{item.item.price.toLocaleString().replace(',', ' ')} p</span></div> : <p className='discount'>{item.item.price.toLocaleString().replace(',', ' ')} p</p>} </div>
                                <button className='count'
                                    onClick={() =>
                                    changeProductCount(item.count - 1, item.item.color, item.item.id)
                                    }
                                >
                                    -
                                </button>
                                    <input
                                    style={{ width: "32px", background:"transparent", ooutline:"none", border:"none", textAlign:"center"}}
                                    type="number"
                                    disabled
                                    value={item.count}
                                />
                                <button className='count'
                                    onClick={() =>
                                    changeProductCount(item.count + 1, item.item.color, item.item.id)
                                    }
                                >
                                    +
                                </button>
                                <button className='cart-delete'>
                                        <CloseIcon sx={{width: "20px"}} onClick={()=>deleteFromCart(item.item.id,item.item.color)}/>
                                </button>
                                </div>
                            </div>
                        </div>
                        </div>
                       </div>
                        )
                        })}
                        </div>
                        <div className='cart-payment'>
                            <div className='mini-payment'>
                                 {info ?  <div className='mini-payment-inner'>
                                <h3 className='cart-payment-title'>?????????? ????????????</h3>
                                <div className='payment-info'>
                                    <span> ???????????????????? ????????????:</span>
                                    <p>{cart.totalCount} ???????????? ({cart.totalCount * 5} ????.) </p>
                                </div>
                                <div className='payment-info'>
                                    <span>??????????????????: </span>
                                    <p>{cart.totalPrice.toLocaleString().replace(',', ' ')} ????????????</p>
                                </div>
                                <div className='payment-info'> 
                                    <span>???????????? :</span>
                                    <p>{cart.cartDiscount.toLocaleString().replace(',', ' ')} ????????????</p>
                                </div>
                                <hr className='hr'/>
                                <div className='payment-info'>
                                <span>?????????? ?? ????????????</span>
                                <p>{total.toLocaleString().replace(',', ' ')} ????????????</p>
                                    </div>
                                    {button ?  <button className='mini-info-btn' onClick={() => {
                                    setInfo(false)
                                    setButton(false)
                                }}>????????????</button>: <button className='mini-info-btn' onClick={() => {
                                    setInfo(true)
                                    setButton(true)
                                }}>???????????????????? ?? ????????????</button>}
                                <button onClick={() => {
                                    setOpen(true)
                                }} className='payment-button'>???????????????? ??????????</button>
                            </div>: <div className='payment-total-info'>
                                <span>?????????? ?? ????????????</span>
                                <p>{total.toLocaleString().replace(',', ' ')} ????????????</p>
                                {button ?  <button className='mini-info-btn' onClick={() => {
                                    setInfo(false)
                                    setButton(false)
                                }}>????????????</button>: <button className='mini-info-btn' onClick={() => {
                                    setInfo(true)
                                    setButton(true)
                                }}>???????????????????? ?? ????????????</button>}
                                <button onClick={() => {
                                    setOpen(true)
                                }} className='payment-button'>???????????????? ??????????</button>
                                </div>}
                            </div>
                            <div className='cart-payment-inner'>
                                <h3 className='cart-payment-title'>?????????? ????????????</h3>
                                <div className='payment-info'>
                                    <span> ???????????????????? ????????????:</span>
                                    <p>{cart.totalCount} ????</p>
                                </div>
                                <div className='payment-info'>
                                    <span>???????????????????? ??????????????:</span>
                                    <p>{cart.totalCount * 5} ????</p>
                                </div>
                                <div className='payment-info'>
                                    <span>??????????????????: </span>
                                    <p>{cart.totalPrice.toLocaleString().replace(',', ' ')} ????????????</p>
                                </div>
                                <div className='payment-info'> 
                                    <span>???????????? :</span>
                                    <p>{cart.cartDiscount.toLocaleString().replace(',', ' ')} ????????????</p>
                                </div>
                                <hr style={{ width: "387px", border: "dashed 1px #BFBFBF", margin:"12px 0 12px 0" }} />
                                <div className='payment-info'>
                                <span>?????????? ?? ????????????</span>
                                <p>{total.toLocaleString().replace(',', ' ')} ????????????</p>
                                </div>
                                <button onClick={() => {
                                    setOpen(true)
                                }} className='payment-button'>???????????????? ??????????</button>
                                <Order open={open} setOpen={setOpen} />
                            </div>
                        </div>
                    </div>)  :  <>
                            <div>
                                <h1 className='cart-bottom-title'>??????????????</h1>
                                <p className="favorite-text">?? ?????? ???????? ?????? ?????????????? ?? ??????????????</p>
                                <h3 className="favorite-title">???????????????? ?????? ????????????????????????</h3>
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
                        </>}
            </div>
        </div>
    );
};

export default Cart;