import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShowDetails.scss'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Container from '../../Components/Container/Container';
import { saveAs } from "file-saver";
import HashLoader from "react-spinners/HashLoader";
import { Link } from 'react-router-dom';
export default function ShowDetails() {
    const [isloading, loading] = useState(true)
    const [getData, setData] = useState([]);

    const settings = {
        dots: false,
        lazyLoad: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2
    };
    useEffect(async () => {
        fetchData()
    }, []);


    const fetchData = async (getPage) => {
        loading(true)
        const result = await axios(
            `https://www.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=f923748599177f88ddbd627b80961c2b&group_id=96697731%40N00&per_page=1000&format=json&nojsoncallback=1`,
        );
        const response = result.data.photos;
        setData(response.photo);
        loading(false)
    }
    console.log(getData, 'getData')
    return (
        <div className="ShowDetails">
            <Container>

                {isloading ? <div className="Loader"> <HashLoader color={"#f0483e"} margin={2} size={150} /> </div> :
                    <>
                     <div className="show-slideshow">
                            <Link to="/" >Show Grid</Link>

                        </div>
                        <Slider {...settings}>
                            {getData.map((list) =>
                                <>
                                    <div className="card">
                                        <img loading="lazy" alt="image" src={`https://live.staticflickr.com/${list.server}/${list.id}_${list.secret}_z.jpg`} />
                                    </div>
                                    <div className="info">
                                        <div className="l-data">
                                            <h2>{list.title}</h2>
                                            <p>by <a href="https://www.flickr.com/groups/macintoshe">{list.ownername}</a></p>
                                        </div>
                                        <div className="r-data">
                                            <button className="save-as" onClick={() => saveAs(`https://live.staticflickr.com/${list.server}/${list.id}_${list.secret}_z.jpg`, 'download.jpg')} >Download Original</button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </Slider>
                    </>
                }
            </Container>
        </div>
    )
}
