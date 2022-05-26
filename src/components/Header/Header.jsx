import React, { useContext, useEffect, useState } from 'react';
import { headerContext } from '../../context/HeaderContext';
import "./Header.css"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
    const { getHeader, header } = useContext(headerContext)
    const [open, setOpen] = useState(false);
    const [showInput, setShowInput]= useState(false)
    useEffect(() => {
        getHeader()
    }, [])
    return (
        <div>
            {header.map((item) => (
                <div key={item.id}>
                    <div className='header-lines' style={{position:"relative"}}>
                        <div className='container'>
                            <Hidden xsDown smDown>
                            <div className='header-top'>
                                <div className='header-top-left'>
                                    <Link style={{textDecoration: 'none'}} to={'/about'}>
                                        <span>О нас</span>
                                    </Link>
                                    <span>Коллекции</span>
                                    <Link style={{textDecoration: 'none'}} to={'/news'}>
                                       <span>Новости</span>
                                    </Link>
                                </div>
                                <div className='header-top-right'>
                                    <p><span>Тел:</span><a style={{ textDecoration: "none" }} href={item.number}>{item.number}</a></p>
                                </div>
                                </div>
                            </Hidden>
                        </div>
                    </div>
                    <div className='header-lines'>
                        <div className='container'>
                            <div className='header-bottom'>
                                <Hidden smUp>
                                    <div style={{border:"1px solid #E0E0E0"}} onClick={() => setOpen(true)}>
                                    <MenuIcon style={{padding:"6px"}}/>
                                    </div>
                                </Hidden>
                                <div className='logo'>
                                    <img src={item.logo} alt="the logo" />
                                </div>
                                <div className='xs-search' >
                                    <span onClick={()=> setShowInput(v => !v)}>
                                    <SearchOutlinedIcon />
                                    </span>  
                                    {showInput ? <input placeholder='Поиск' type="text" className='input-field' style={{width: "300px",height: "30px", border: "none", border: "1px solid #E0E0E0", position:"absolute", top:"10%", left: "10px", marginBottom:"10px"}} /> : null} 
                                </div>
                        <div className='search'>
                            <div className='input-icon'>
                                <span className='icon'>
                                    <img width="26px" height="26px" src={require('../../images/small-header.png')} alt="search" />
                                </span>
                                <input className='input-field' placeholder='Поиск' type="text" />
                            </div>
                                </div>
                            <Hidden xsDown smDown>
                                <div className='header-extra-info'>
                                    <div>
                                        <img width="100%" src={require('../../images/heart-icon.png')} alt="the heart" />
                                    </div>
                                    <div>
                                        <span className='header-selected'>Избранное</span>
                                    </div>
                                    <div>
                                        <img width="100%" src={require('../../images/heart-icon.png')} alt="the heart" />
                                    </div>
                                    <div>
                                        <span className='header-cart'>Корзина</span>
                                    </div>
                                </div>
                            </Hidden>
                        </div>
                        </div>
                    </div>
                    <SwipeableDrawer
                        anchor="left"
                        open={open}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                    >
                        <div onClick={()=>setOpen(false)} classname="burger-list" style={{
                            display: "flex", flexDirection: "column", justifyContent: "space-between", height:"100%", padding: "16px", width: "250px"}}>
                            <div>
                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <p style={{ margin: "18px 0 18px 0px" }}>Меню</p>
                                <IconButton onClick={() => setOpen(false)}
                                onKeyPress={() => setOpen(false)}
                                role="button"
                                tabIndex={0}>
                                    <CloseIcon/>
                                </IconButton>
                                </div>
                                <div className='burger-top'>
                                        <div className='burger-top-left'>
                                            <Link style={{textDecoration: 'none'}} to={'/about'}>
                                            <p style={{fontWeight: "500", fontSize: "13px", margin: "0 0 20px 0"}}>О нас</p>
                                            </Link>
                                            <p style={{fontWeight: "500", fontSize: "13px", margin: "0 0 20px 0"}}>Коллекции</p>
                                            <Link style={{textDecoration: 'none'}} to={'/news'}>
                                            <p style={{fontWeight: "500", fontSize: "13px", margin: "0 0 20px 0"}}>Новости</p>
                                            </Link>
                                        </div>
                                </div>
                                    <div>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                                <img style={{marginRight: "6px"}} width="16px" src={require('../../images/heart-icon.png')} alt="the heart" />
                                                <p style={{fontWeight: "500", fontSize: "13px"}}>Избранное</p>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                                <img style={{marginRight: "6px"}} width="16px" src={require('../../images/heart-icon.png')} alt="the heart" />
                                                <p style={{fontWeight: "500", fontSize: "13px"}}>Корзина</p>
                                        </div >
                                    </div>
                            </div>
                                    <div className='burger-bottom'>
                                    <p style={{margin: "0px 0px 8px 0"}}>Свяжитесь с нами</p>
                                    <div className='burger-top-right'>
                                            <p style={{margin:"0 0 8px 0"}}>Тел:<a style={{ textDecoration: "none" }} href={item.number}>{item.number}</a></p>
                                    </div>
                                    <div className='footer-icons'>
                                        <a style={{marginRight: "6px"}} href=""><img src={require('../../images/telegram (1).png')} alt="telegram" /></a>
                                        <a style={{marginRight: "6px"}}  href=""><img src={require('../../images/whatsapp.png')} alt="wa" /></a>
                                        <a style={{marginRight: "6px"}}  href=""><img src={require('../../images/telephone.png')} alt="phone" /></a>
                                    </div>
                                    </div>
                        </div>
                    </SwipeableDrawer>
                </div>
            ))}
            </div>
    );
};

export default Header;