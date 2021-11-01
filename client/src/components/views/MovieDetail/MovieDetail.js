import React, {useEffect, useState} from 'react'
import {API_URL, IMAGE_BASE_URL, API_KEY} from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';
import Favorite from './Sections/Favorite';

function MovieDetail(props) {

    let movieId = props.match.params.movieId;
    const [Movie, setMovie] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);

    useEffect(() => {

        console.log("props.match : ", props.match);
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
        
        fetch(endpointInfo)
            .then(response => response.json())
            .then(response =>{
                console.log("response : ",response);
                setMovie(response)
            })

        fetch(endpointCrew)
            .then(response => response.json())
            .then(response =>{
                console.log("crews response : ",response);
                setCasts(response.cast)
            })
    }, [])

    const toggleActorView = ()=>{
        setActorToggle(!ActorToggle);
    }

    return (
        <div>
            {/* header */}

            <MainImage             
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}
            />


            {/* body */}
            <div style={{ width: '85%', margin: '1rem auto'}}>

                <div style={{ display:'flex', justifyContent: 'flex-end'}}>
                    {/* <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/> */}
                </div>
                
                { /* Movie Info */}
                <MovieInfo 
                    movie={Movie}
                />

                <br />
                { /* Actors Grid */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={toggleActorView}>Toggle Actor View</button>
                </div>

                {ActorToggle &&
                
                    <Row gutter={[16, 16]}>
                        {/* Movies && Movies.map( (movie, index) => (
                            console.log("index : ",index);
                            <React.Fragment key={index}>
                                {console.log("index : ",index)}

                                <GridCards
                                    image={Casts.profile_path ? `${IMAGE_BASE_URL}w500${Casts.profile_path}` : null }
                                    characterName={Casts.name}
                                /> 

                            </React.Fragment>
                        )) */
                        Casts && Casts.map( (Casts, i) => {
                            //console.log("index : ",i);
                            //console.log("Casts.name : ",Casts.name);
                            return  <GridCards
                                    image={Casts.profile_path ? `${IMAGE_BASE_URL}w500${Casts.profile_path}` : null }
                                    characterName={Casts.name}
                                    key={i} 
                            />
                        })
                        }
                    </Row>
                }
                

            </div>


            
        </div>
    )
}

export default MovieDetail
