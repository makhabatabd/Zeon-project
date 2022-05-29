import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css"
import image1 from "../../images/slider.png";
import image2 from "../../images/slider.png";
import image3 from "../../images/slider.png";
import "./Slider.css"

const Slider = () => {
    return (
        <div>
            <div className='container'>
                <AliceCarousel
                    autoPlay={true} autoPlayInterval="3000" autoPlayStrategy="none" infinite={true} disableButtonsControls={true} >
                <div className='slider-main-div'>
                    <div>
                        <h1>Lorem ipsum</h1>
                        <p>Lorem Lorem Ipsum Ipsum</p>
                    </div>
                    <img src={image1} alt="slider image" />
                    <div>
                        <h3>Sale</h3>
                        <p>30%</p>
                        <h3>for all</h3>
                    </div>
                </div>
                <div className='slider-main-div'>
                    <div>
                        <h1>Lorem ipsum</h1>
                        <p>Lorem Lorem Ipsum Ipsum</p>
                    </div>
                    <img src={image2} alt="slider image" />
                    <div>
                        <h3>Sale</h3>
                        <p>60%</p>
                        <h3>for all</h3>
                    </div>
                </div>
                <div className='slider-main-div'>
                    <div>
                        <h1>Lorem ipsum</h1>
                        <p>Lorem Lorem Ipsum Ipsum</p>
                     </div>
                    <img src={image3} alt="slider image" />
                    <div>
                        <h3>Sale</h3>
                        <p>50%</p>
                        <h3>for all</h3>
                    </div>
                </div>
            </AliceCarousel>
            </div>
        </div>
    );
};
export default Slider;