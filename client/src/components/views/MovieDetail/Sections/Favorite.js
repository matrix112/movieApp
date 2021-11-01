import Axios from 'axios';
//import { response } from 'express';
import React, {useEffect, useState} from 'react';
import { Button } from 'antd';

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] =  useState(0);
    const [Favorited, setFavorited] =  useState(false);

    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }    
    
    useEffect(() => {        

         Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response=>{
                console.log("response.data : ",response.data);
                if(response.data.success){
                    setFavoriteNumber(response.data.FavoriteNumber);
                }else{
                    alert('fail to get favorite number data...');
                }
            })
            
        Axios.post('/api/favorite/favorited', variables)
            .then(response=>{
                console.log("favorited : ",response.data);
                if(response.data.success){
                    setFavorited(response.data.favorited);
                }else{
                    alert('fail to get favorited data...');
                }
            })

    }, [])

    const onClickfavorite = () => {
        console.log("Favorited : ",Favorited);

        if(Favorited){
            Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response=>{
                console.log("removeFromFavorite : ",response.data);
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber - 1);
                    setFavorited(!Favorited);
                }else{
                    alert('fail to remove Favorited from favorite list...');
                }
            })
        }else{
            Axios.post('/api/favorite/addToFavorite', variables)
            .then(response=>{
                console.log("addToFavorite : ",response.data);
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber + 1);
                    setFavorited(!Favorited);
                }else{
                    alert('fail to add Favorited to favorite list...');
                }
            })

        }

    }

    return (
        <div>
            <Button onClick={onClickfavorite}>{Favorited? "Not favorite":"Add to Favorite"} {FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite
