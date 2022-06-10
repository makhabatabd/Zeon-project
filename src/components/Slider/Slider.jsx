import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css"
import "./Slider.css"

const Slider = () => {
    return (
        <div className='slider'>
            <div className='container-slider'>
                <div className='slider-div'>
                <AliceCarousel autoPlay={true} autoPlayInterval={5000}  infinite={true}disableButtonsControls={true} >
                <div className='slider-main-div'>
                    <div className='slider-left'>
                        <h1>Lorem</h1>
                        <h2>ipsum</h2>
                        <p>Lorem Lorem</p>
                        <p>Ipsum Ipsum</p>
                    </div>
                    <img className='img' src="https://cdn.discordapp.com/attachments/981039569258557442/981421599955746826/unknown.png" alt="slider image" />
                    <div className='slider-right'>
                        <h3>Sale</h3>
                        <p>30%</p>
                        <h4>for all</h4>
                    </div>
                </div>
                <div className='slider-main-div'>
                    <div className='slider-left'>
                        <h1>Lorem</h1>
                        <h2>ipsum</h2>
                        <p>Lorem Lorem</p>
                        <p>Ipsum Ipsum</p>
                    </div>
                    <img className='img' src="https://cdn.discordapp.com/attachments/981039569258557442/981408439408418866/unknown.png" alt="slider image" />
                    <div className='slider-right'>
                        <h3>Sale</h3>
                        <p>60%</p>
                        <h3>for all</h3>
                    </div>
                </div>
                <div className='slider-main-div'>
                    <div className='slider-left'>
                        <h1>Lorem</h1>
                        <h2>ipsum</h2>
                        <p>Lorem Lorem</p>
                        <p>Ipsum Ipsum</p>
                     </div>
                    <img className='img' src="https://cdn.discordapp.com/attachments/981039569258557442/981408844779515934/unknown.png" alt="slider image" />
                    <div className='slider-right'>
                        <h3>Sale</h3>
                        <p>50%</p>
                        <h3>for all</h3>
                    </div>
                </div>
                    </AliceCarousel>
                </div>
            </div>
        </div>
    );
};
export default Slider;