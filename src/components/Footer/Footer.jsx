import React from 'react';
import "./Footer.css"
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='container'>
            <div className='footer-inner'>
                <div className='footer-inner-part1'>
                    <img src={require('../../images/logo-white.png')} alt="Zeon Logo" />
                </div>
                <div className='footer-inner-part2'>
                    <h5>Компания</h5>
                    <Link style={{textDecoration: 'none'}} to={'/about'}>
                        <p>О нас</p>
                    </Link>
                    <Link style={{textDecoration: 'none'}} to={'/news'}>
                        <p>Новости</p>
                    </Link>
                    <Link style={{textDecoration: 'none'}} to={'/help'}>
                        <p>Помощь</p>
                    </Link>
                </div>
                <div className='footer-inner-part3'>
                    <h5>Контакты</h5>
                    <div className='contacts'>
                        <img src={require('../../images/phonecall.png')} alt="the phone call" />
                        <p><a href='tel:+996 500 123 456'>+996 500 123 456</a></p>
                    </div>
                    <div className='contacts'>
                        <img src={require('../../images/phonecall.png')} alt="the phone call" />
                        <p><a href='tel:+996 500 123 456'>+996 500 123 456</a></p>
                    </div>
                    <div className='contacts'>
                        <img src={require('../../images/mail.png')} alt="email" />
                        <p><a href='zeon.ithub@gmail.com'>zeon.ithub@gmail.com</a></p>
                    </div>
                </div>
                <div className='footer-inner-part4'>
                    <h5>Мы в социальных сетях</h5>
                    <div className='contacts'>
                        <img src={require('../../images/insta.png')} alt="the phone call" />
                        <p>Instagram</p>
                    </div>
                    <div className='contacts'>
                        <img src={require('../../images/telegram.png')} alt="the phone call" />
                        <p>Telegram</p>
                    </div>
                    <div className='contacts'>
                        <img src={require('../../images/phonecall.png')} alt="the phone call" />
                        <p>Whatsapp</p>
                    </div>
                </div>
            </div>
            <p className='fotter-bottom'>Developed by Zeon 2020</p>
            </div>
        </div>
    );
};

export default Footer;