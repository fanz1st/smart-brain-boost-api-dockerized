const moment = require('moment');

const setupTrackGenres = (req,res,db)=>{
   let genres = [
        { name: 'Alternative' , color: "#ff3333"},
        { name: 'Accoustic' , color: "#ff6b33"},
        { name: 'Blues' , color: "#ffa833"},
        { name: 'Christan/Gospel' , color: "#ffe333"},
        { name: 'Classical' , color: "#559a03"},
        { name: 'Country' , color: "#039a55"},
        { name: 'Dance' , color: "#039a8f"},
        { name: 'Electronic' , color: "#035c9a"},
        { name: 'Hip-Hop/Rap' , color: "#8575b5"},
        { name: 'Jazz' , color: "#b5759e"},
        { name: 'k-Pop' , color: "#b57579"},
        { name: 'Latino' , color: "#f97878"},
        { name: 'Metal' , color: "#d8f978"},
        { name: 'Pop' , color: " #fd9703"},
        { name: 'R&B/Soul' , color: "#c1c1c2"},
        { name: 'Reggae' , color: "#5fb974"},
        { name: 'Rock', color: "#5fb974"},
        { name: 'Singer/Songwriter', color: "#5fb9b6"},
        { name: 'World' , color: "#3d2368"},
    ];

    db('genres').returning('*').insert(genres)
    .then(genre=>{
    	res.json(genre)
    })
    .catch(err=>{res.status(400).json('could not create genres ')})
}


const setupPodcastGenres = (req,res,db)=>{
     let genres = [
        { name: 'Arts' , color: "#ff3333"},
        { name: 'Business' , color: "#ff6b33"},
        { name: 'Comedy' , color: "#ffa833"},
        { name: 'Education' , color: "#ffe333"},
        { name: 'Government' , color: "#559a03"},
        { name: 'Health & Fitness' , color: "#039a55"},
        { name: 'History' , color: "#039a8f"},
        { name: 'Kids & Family' , color: "#035c9a"},
        { name: 'Leisure' , color: "#8575b5"},
        { name: 'Music' , color: "#b5759e"},
        { name: 'News' , color: "#b57579"},
        { name: 'Religion & Sprituality' , color: "#f97878"},
        { name: 'Science' , color: "#d8f978"},
        { name: 'Society & Culture' , color: " #fd9703"},
        { name: 'Technology' , color: "#c1c1c2"},
        { name: 'True Crime' , color: "#5fb974"},
        { name: 'TV & Film', color: "#5fb974"}
    ];

    db('podcast_genres').returning('*').insert(genres)
    .then(genre=>{
        res.json(genre)
    })
    .catch(err=>{res.status(400).json('could not create podcast genres ')})
}


const getGenreTracks = (req,res,db)=>{
	const { genre_id } = req.params

	db('tracks').returning('*').where({genre_id})
	.then(tracks=>{
		res.json(tracks)
	})
	.catch(err=>{ res.status(400).json("could not get genre tracks")})
}

const getGenres = ( req,res,db) =>{
    db('genres').returning('*')
    .then(genres=>{
        res.json(genres)
    })
    .catch(err=>{ res.status(400).json("could not get genres")})
}

const getPodcastGenres = ( req,res,db) =>{
    db('podcast_genres').returning('*')
    .then(genres=>{
        res.json(genres)
    })
    .catch(err=>{ res.status(400).json("could not get genres")})
}




module.exports = {
   setupTrackGenres, getGenreTracks , getGenres,
   setupPodcastGenres ,getPodcastGenres
}
