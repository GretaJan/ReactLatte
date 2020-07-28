import React, { useState, useEffect } from 'react';
import slider1 from '../../../images/slider-1.jpg';
import slider2 from '../../../images/slider-2.jpg';
// Owl carousel
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.min.css';
// import 'owl.carousel/dist/assets/owl.theme.default.min.css';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faCircle } from "@fortawesome/free-solid-svg-icons";

const owlOptions = {
    items: 1,
    autoplay: false,
    loop: true,
    nav: true,
    dots: false
};


function Carousel() {
    const [slide, setSlide] = useState(0);
    const carouselArray = [slider1, slider2];
    const carouselLength = carouselArray.length - 1;
    const dotsDiv = faCircle;
    const [dotsArray, setDotsArray] = useState([]);

    useEffect(() => {
        let newArray = [];
        for(var i = 0; i < carouselArray.length; i++ ) {
            newArray.push(dotsDiv);
        }
        setDotsArray(newArray);
    }, [])

    const leftHandle = () => {
        slide === 0 && setSlide(carouselLength);
        slide === carouselLength &&  setSlide(0);
        slide !== 0 || slide === carouselLength && setSlide(slide - 1);

    }
    const rightHandle = () => {
        slide === carouselLength ? setSlide(0) : setSlide(slide + 1);
    }


    return (
        // <OwlCarousel className="owl-theme" items={owlOptions.items} autoplay={owlOptions.autoplay} loop={owlOptions.loop} nav={owlOptions.nav} dots={owlOptions.dots}> 
        //                     <div><img src={slider1} alt="biolatte-slider1"/></div>
        //                     <div><img src={slider2}  alt="biolatte-slider2" /></div>
        // </OwlCarousel> 
        <div className="carousel-theme" >
            <div className="wrap-carousel-items">
                <div className="wrap-carousel-images"><img src={carouselArray[slide]} alt="biolatte"/></div>
                <span className="left-handle" onClick={() => leftHandle() }>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </span>
                <span className="right-handle" onClick={() => rightHandle()}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </span>
                <span className="bottom-nav">
                    { dotsArray.map((item, index) => (
                        <FontAwesomeIcon key={index} onClick={() => setSlide(index)} className={slide == index ? "activeDot" : "inactiveDot"} icon={item} />
                    ))
                    }
                </span>
            </div>
        </div>
    )
}

export default Carousel