import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import axios from 'axios';
import "./Main.css"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Hits from '../Hits/Hits';
import BrandNew from '../BrandNew/BrandNew';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Slider from '../Slider/Slider';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';


const Main = () => {
    const [hits, setHits] = useState([])
    const [fetching, setFetching] = useState(true)
    const [fetch, setFetch] = useState(true)
    const [brandnew, setBrandnew] = useState([])
    const [fetchCollection, setFetchCollection] = useState(true)
    const [collection, setCollection] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [page, setPage]=useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [totalNew, setTotalNew] = useState(0)
    const [pageColl, setPageColl]=useState(1)
    const [totalColl, setTotalColl] = useState(0)
    const [pluses, setPluses] = useState([])
    const [open, setOpen] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [success, setSuccess] = useState(false)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
    if (fetching) {
      axios.get(`http://localhost:8000/hits?_limit=8&_page=${currentPage}`)
        .then(response => {
            setHits(prev => [...prev, ...response.data])
            setCurrentPage(prevState => prevState + 1)
             setTotalCount(response.headers['x-total-count'])
         })
        .finally(()=>setFetching(false))
    }
    }, [fetching])
    
    useEffect(() => {
    if (fetch) {
      axios.get(`http://localhost:8000/brandnew?_limit=4&_page=${page}`)
        .then(response => {
            setBrandnew(prev => [...prev, ...response.data])
            setPage(prevState => prevState + 1)
            setTotalNew(response.headers['x-total-count'])
         })
        .finally(()=>setFetch(false))
    }
    }, [fetch])


    useEffect(() => {
    if (fetchCollection) {
      axios.get(`http://localhost:8000/collection?_limit=4`)
        .then(response => {
            setCollection(prev => [...prev, ...response.data])
            setPageColl(prevState => prevState + 1)
            setTotalColl(response.headers['x-total-count'])
         })
        .finally(()=>setFetchCollection(false))
    }
    }, [fetchCollection])


     useEffect(() => {
      axios.get("http://localhost:8000/pluses")
        .then(response => {
            setPluses(prev => [...prev, ...response.data])
         })
    }, [])
    
   
    const clickHandler = () => {
        if (hits.length < totalCount) {
            setFetching(true)
        }
    }
    const clickNew = () => {
        if (brandnew.length < totalNew) {
            setFetch(true)
        }
    }
    const clickColl = () => {
        if (collection.length < totalColl) {
            setFetchCollection(true)
        }
    }

    function topFunction() {
    document.documentElement.scrollTop = 0;
    }
    
    const toggle = () => {
        open ? setOpen(false):setOpen(true)
    }
    
    useEffect(() => {
        setScreenWidth(window.innerWidth)
    }, [screenWidth])

    return (
        <div className='main'>
            {
                open ?
                <div style={{ position: "fixed", top: "70%", left: "82%", m: 0, background: "transparent", zIndex: "3" }}>
                    <a className='main-icons' target="_blank" href="https://web.telegram.org/"><img src={require('../../images/telegram (1).png')} alt="telegram" /></a>
                    <a className='main-icons' target="_blank" href="https://web.whatsapp.com/"><img src={require('../../images/whatsapp.png')} alt="wa" /></a>
                    <span className='main-icons' href=""><img onClick={()=>setOpenDialog(true)}  src={require('../../images/telephone.png')} alt="phone" /></span>
                    </div> : null} 
                <Slider/>
                <div className='container'>
                <h3 className='hit-main-title'>Хит продаж</h3>
                <div className='swim-buttons'>
                    <img onClick={()=>topFunction()} width="28px" height="28px" style={{ marginBottom: "20px" }} src={require('../../images/arrow-up.png')} alt="arrow up" />
                    {open ? <img className='main-chat' width={19} onClick={() => toggle()} src={require('../../images/cancel.png')} alt="cancel" />  : <img className='main-chat' onClick={() => toggle()} width="28px" height="28px" src={require('../../images/chat (1) 1.png')} alt="chat" />}
                </div>
                <div className='not-table-cards'>
                    {hits.map((item) => (
                        <Hits item={item} key={item.id} />))}
                    </div>
                    <div className='table-cards'>
                     <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 262 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {hits.map((item) => (
                                        <TableCell key={item.id}>
                                            <Hits item={item} key={item.id} />
                                        </TableCell>))}
                                </TableRow>
                            </TableHead>
                        </Table>
                        </TableContainer> 
                        </div>
                {hits.length < totalCount ? <div className='hit-button-div'>
                    <button className='hit-button' onClick={clickHandler}>Еще</button>
                </div>: null}
            </div>
             <div>
            <div className='container'>
                <h3 className='hit-main-title'>Новинки</h3>
                    <div className='not-table-cards'>
                    {brandnew.map((item) => (
                        <BrandNew item={item} key={item.id} />))}
                    </div>
                    <div className='table-cards'>
                        <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 262 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {brandnew.map((item) => (
                                        <TableCell key={item.id}>
                                            <BrandNew item={item} key={item.id}/>
                                        </TableCell>))}
                                </TableRow>
                            </TableHead>
                        </Table>
                        </TableContainer>
                    </div>
                    {brandnew.length < totalNew ?  <div className='hit-button-div'>
                    <button className='hit-button' onClick={clickNew}>Еще</button>
                    </div>: null}
            </div>
            
        </div>
            <div className='container'>
                <h3 className='hit-main-title'>Хит продаж</h3>
                <div className='card-div'>
                    <div className='not-table-cards'>
                    {collection.map((item) => (
                        <Card sx={{width: "280px",height: "374px",marginRight: "8px",position: "relative"}} key={item.id} square={true}>
                            <CardMedia sx={{ width: "286px",height: "330px", }}
                                component="img"
                                height="140"
                                image={item.img}
                                alt="image"
                                />
                                <div className='collection-words'>
                                    <p>{item.text}</p>
                                </div>
                                <Link style={{textDecoration: 'none'}} to={'/summer'}>
                                    <button className='collection-bottom'>Смотреть все
                                        <ArrowForwardIosIcon sx={{ fill: '#fff'}} />
                                    </button>
                                </Link>
                            </Card>))}
                    </div>
                    <div className='table-cards'>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 262 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {collection.map((item) => (
                                        <TableCell key={item.id}>
                                            <Card sx={{width: "286px",height: "374px",position: "relative"}} square={true}>
                                                <CardMedia sx={{ width: "286px",height: "330px", }}
                                                component="img"
                                                height="140"
                                                image={item.img}
                                                alt="image"
                                            />
                                                <div className='collection-words'>
                                                    <p>{item.text}</p>
                                                </div>
                                                <Link style={{textDecoration: 'none'}} to={'/collection'}>
                                                    <button className='collection-bottom'>Смотреть все
                                                        <ArrowForwardIosIcon sx={{ fill: '#fff'}} />
                                                    </button>
                                                </Link>
                                        </Card>
                                        </TableCell>))}
                                </TableRow>
                            </TableHead>
                        </Table>
                        </TableContainer>
                        </div>
                </div>
                {collection.length < totalColl ? <div className='hit-button-div'>
                    <button className='hit-button' onClick={clickColl}>Еще</button>
                </div>: null}
            </div>
            <div className='advantages'>
                <div className='container'>
                    <h3>Наши преимущества</h3>
                    <div className='advantages-outter'>
                    {pluses.map((item) => (
                            <div className='advantages-inner' key={item.id}>
                            <img src={item.img} alt="pluses image" />
                            <h5>{item.title}</h5>
                            <p>{item.text}</p>
                            </div>
                    ))}
                    </div>
                </div>
            </div>
             <Dialog
            onClose={()=>setOpenDialog(false)}
            open={openDialog}
            >
                <div className='call-dialog-inner'>
                    <button className='delete'>
                    <CloseIcon onClick={() => {
                        setOpenDialog(false)
                        setOpen(false)
                        }} />
                        </button>
                <DialogContent>
                <h1 className='dialog-title'>Если у Вас остались вопросы</h1>
                <Typography>
                    <span className='dialog-text'>Оставьте заявку и мы обязательно Вам перезвоним</span>
                </Typography>
                <Typography>
                <input  onChange={(e)=>setName(e.target.value)} className='input1 input' type="text" placeholder='Как к Вам обращаться?'/>
                </Typography>
                <Typography>
                    <input onChange={(e)=>setPhone(e.target.value)} className='input2 input' type="number" placeholder='Номер телефона'/>
                </Typography>
                    </DialogContent>
                    {name && phone ? <button className='dialog-button-active' onClick={() => {
                        setName("") && setPhone("")
                        setSuccess(true)
                        setOpenDialog(false) 
                    }}> Заказать звонок </button>
                        : <button disabled className='dialog-button'>
                    Заказать звонок
                </button>}
            </div>
            </Dialog>
            <Dialog
                PaperProps={{ sx: { width: "335px", height: "264px" }}}
            onClose={()=>setSuccess(false)}
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
                }}>
                    Продолжить покупки
                </button>
                </DialogContent>
            </div>
        </Dialog>
        </div>
    );
};

export default Main;