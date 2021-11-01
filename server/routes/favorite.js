import { response } from "express";
const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', (req, res)=>{
    //console.log("req : ", req)
    //getting favorite data from mongodb
    Favorite.find({ "movieId": req.body.movieId })
        .exec(( err, info) => {
            if(err) return res.status(400).send(err)
            //then sending number data to thr front
            res.status(200).json({ success:true, favoriteNumber: info.length })
        })   

})


router.post('/favorited', (req, res)=>{
    //to get data from DB to check putting into Favorite list...
    //console.log("req : ", req)
    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
        .exec(( err, info) => {
            if(err) return res.status(400).send(err)

            let result = false;
            if(info.length !== 0 ){ result = true }

            //then sending number data to thr front
            res.status(200).json({ success:true, favorited: result })
        })   

})

router.post('/removeFromFavorite', (req, res)=>{
    //to remove favorite data from DB...
    //console.log("req : ", req)
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec(( err, doc) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success:true, doc })
        })   

})

router.post('/addToFavorite', (req, res)=>{
    //to add favorite list to DB..
    //console.log("req : ", req)
    const favorite = new Favorite(req.body);
    
    Favorite.save(( err, doc ) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true })
        })   

})

module.exports = router;
