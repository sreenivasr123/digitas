import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShowProducts.scss'
import { saveAs } from "file-saver";
import Container from '../../Components/Container/Container';
import HashLoader from "react-spinners/HashLoader";
import Button from '../../Components/Button/Button';
import { Link } from 'react-router-dom';

export default function ShowProducts(props) {


    const [isloading, loading] = useState(true)
    const [getData, setData] = useState("");
    const [getPage, setpage] = useState(1)
    const [inputvalue, setinputValue] = useState("")


    useEffect(async () => {
        fetchData()
    }, []);


    const fetchData = async (getPage) => {
        loading(true)
        const result = await axios(
            `https://www.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=f923748599177f88ddbd627b80961c2b&group_id=96697731%40N00&per_page=20&page=${getPage}&format=json&nojsoncallback=1`,
        );
        const response = result.data
        setData(response);
        loading(false)
    }
    console.log(getData, 'getData')


    const NextBtn = (event) => {
        event.preventDefault();
        setpage(getPage + 1)
        fetchData(getPage + 1)

    }


    const PrevBtn = (event) => {
        event.preventDefault();
        setpage(getPage - 1)
        fetchData(getPage - 1)

    }
    const validateInput = (event) => {
        event.preventDefault()
        fetchData(inputvalue)
        setpage(Number(inputvalue))
        setinputValue("")
    }

    const gridData = getData.photos

    return (
        <div className="ShowProducts">
            <Container>
                {isloading ? <div className="Loader"> <HashLoader color={"#f0483e"} margin={2} size={150} /> </div> :
                    <>

                        <div className="show-slideshow">
                            <Link to="/slideshow" >Show slideshow</Link>

                        </div>
                        <div className="grid-thumbnails">
                            {gridData.photo.map((list) =>
                                <div className="card" key={list.id}>
                                    <img loading="lazy" alt="image" src={`https://live.staticflickr.com/${list.server}/${list.id}_${list.secret}_m.jpg`} />
                                    <button className="save-as" onClick={() => saveAs(`https://live.staticflickr.com/${list.server}/${list.id}_${list.secret}_z.jpg`, 'download.jpg')} >Download Original</button>
                                </div>

                            )}
                        </div>
                        <div className="pagination">
                            <div className="action-lt">

                                <p>{`showing page ${gridData.page} of ${gridData.pages}`}</p>
                                <form onSubmit={(event) => validateInput(event)}>
                                    <span>Go to page</span>
                                    <input type="number" onChange={(e) => setinputValue(e.target.value)} />
                                    <input type="submit" value="Go" />
                                </form>

                            </div>

                            <div className="action-rt">
                                <Button onClick={(event) => PrevBtn(event)} value="Previous" />
                                <Button onClick={(event) => NextBtn(event)} value="Next" />
                            </div>
                        </div>
                    </>
                }
            </Container>
        </div>

    )
}
