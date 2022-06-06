import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import "./Order.css"
import { Link, useNavigate } from 'react-router-dom';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from 'react';
import { summerContext } from '../../context/SummerCollection';
import Alert from '@mui/material/Alert';

const Order = ({open, setOpen}) => {
    const {addOrder } = useContext(summerContext)
    const [phone, setPhone] = useState("")
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()
    const [error, setError] = useState(false);
    const [data, setData] = useState({
        name: "", 
        surname: "", 
        email: "", 
        country: "", 
        city: "", 
        phone: ""
    })
    const [checked, setChecked] = useState(false)
    const [button, setButton] = useState(false)

    const handleInputChange = (e) => {
        let newOrder = {
            ...data, 
            [e.target.name]: e.target.value, 
            phone
        }
        setData(newOrder)
        setButton(true)
  };
    function save() {
        if (
            !data.name || 
            !data.surname ||
            !data.email ||
            !data.country ||
            !data.city ||
            !checked
        ) {
            setError(true)
            return
        } 
        addOrder(data)
        setOpen(false)
        setSuccess(true)
    }
    function value(e) {
        let checked = e.target.checked
        if (checked) {
            setChecked(true)
        }
    }

    const handleClose = () => {
        setOpen(false);
        setError(false)
    };

    return (
        <div style={{ position: "relative" }}>
            <Dialog PaperProps={{ sx: { width: "480px", height: "740px" } }} open={open} onClose={handleClose}>
                {error ? <Alert sx={{position:"absolute", top:"0%", left:"0%"}} severity="error">Fill in</Alert> : null}
        <div className='dialog-inner'>
            <DialogContent>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
                <h2>Оформление заказа</h2>
                <CloseIcon onClick={handleClose} />
                </div>
            <label className='order-label' htmlFor="name">Ваше имя</label>
            <br/>
            <input onChange={handleInputChange} className='order-input' type="text" id='name' name='name' placeholder='Например Иван' />
            <br/>
            <label className='order-label'  htmlFor="surname">Ваше фамилия</label>
            <br/>
            <input onChange={handleInputChange} className='order-input' name='surname' id='surname' type="text" placeholder='Например Иванов' />
            <br />
            <div>
            <input onChange={handleInputChange}  pattern="[^@\s]+@[^@\s]+" className='email-input' type="email" id='email' name='email' placeholder='example@mail.com' />
            <br />
            <label className='email-label' htmlFor="email">Электронная почта</label>
            </div>
            <br/>
            <label className='order-label'  htmlFor="">Ваш номер телефона</label>
            <br/>
            <PhoneInput international value={phone} onChange={setPhone} defaultCountry="KG" className='phone-input' placeholder="Введите номер телефона"/>
            <br/>
            <label className='order-label'  htmlFor="country">Страна</label>
            <br/>
            <input onChange={handleInputChange} className='order-input' type="text" name='country' id='country' placeholder='Страна' />
            <br/>
            <label className='order-label'  htmlFor="city">Город</label>
            <br/>
            <input onChange={handleInputChange} className='order-input' type="text" name='city' id='city' placeholder='Город' />
            <br/>
            <input className='order-checkbox' type="checkbox" value={checked} onChange={value} name="checked"  />
            <label htmlFor="checked" className='label'>Согласен с условиями <Link style={{ textDecoration: 'none', color: "#2F80ED", fontSize:"15px" }} to={'/offerta'}>публичной оферты</Link></label>
                    {button ? <button onClick={() => save()
            } className='active-button'>Заказать</button> : <button className='order-button'>Заказать</button>}
        </DialogContent>
        </div>
        </Dialog>
        <Dialog
            PaperProps={{ sx: { width: "335px", height: "264px" }}}
                onClose={() => setSuccess(false)
                }
            open={success}
            >
                <div className='dialog-success'>
                <DialogContent>
                <img width="64px" style={{margin:"10px auto 0"}} src={require('../../images/tick.png')}alt="tick" />
                <h3 className='success-title'>Спасибо!</h3>
                <p className='success-text'>Ваша заявка была принята ожидайте, скоро Вам перезвонят</p>
                        <button className='success-button' onClick={() => {
                            setSuccess(false)
                            setOpen(false)
                            navigate("/")
                }}>
                    Продолжить покупки
                </button>
                </DialogContent>
            </div>
        </Dialog>
        </div>
    );
};

export default Order;