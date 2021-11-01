import React, {useEffect, useState} from 'react';
import { FaCode } from "react-icons/fa";
import {API_URL, IMAGE_BASE_URL, API_KEY} from '../../Config';
import MainImage from './Sections/MainImage';
import axios from 'axios';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';

function LandingPage() {

    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {

        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

        fetchMoives(endpoint);

    }, []);

    const fetchMoives = (endpoint) =>{

        fetch(endpoint)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                console.log(response.results);
            //var arr=response.results;
            setMovies([...Movies, ...response.results]);
            setMainMovieImage(response.results[0]);
            setCurrentPage(response.page);
            });

    }

    const loadMoreItems = () => {

        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage +1 }`;

        fetchMoives(endpoint);
    }


    return (
        <div style={{ width: '100%', margin: 0 }}>
            
            {/* Main Image  */}
            {MainMovieImage && (
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />
            )}

            <div style={{ width: '85%', margin: '1rem auto' }}>
                <h2>Movies by latest</h2>
                <hr />

                <Row gutter={[16, 16]}>
                    {/* Movies && Movies.map( (movie, index) => (
                        console.log("index : ",index);
                        <React.Fragment key={index}>
                            {console.log("index : ",index)}

                            <GridCards
                                landingPage 
                                image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null }
                                movieId={movie.id} 
                                movieName={movie.original_title} 
                            /> 

                        </React.Fragment>
                    )) */
                    Movies && Movies.map( (movie, i) => {
                        //console.log("index : ",i);
                        //console.log("movie.original_title : ",movie.original_title);
                        return  <GridCards
                                landingPage 
                                image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null }
                                movieId={movie.id} 
                                movieName={movie.original_title}
                                key={i} 
                        />
                    })
                    }
                </Row>

            </div>

            <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>

        </div>
    )
}

export default LandingPage
