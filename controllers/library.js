const moment = require('moment');


const createLibrary = (req,res,db)=>{
	const { user_id  } = req.body

	db('libraries').returning('*').insert({
		user_id: user_id
	})
	.then(library=>{
		res.json(library[0])
	})
	.catch(err=>{ res.status(400).json('could not create library')})
}

const getUserLibrary = (req,res,db)=>{
   const { user_id } = req.params

   db('libraries').returning('*').where({user_id})
   .then(libraries=>{
      res.json(libraries[0])
   })
   .catch(err=>{ res.status(400).json('could not get user library')})
}


const getLibraryTracks = (req,res,db)=>{
	const { id } = req.params

    db('library_tracks').returning('*').where({library_id: id})
    .then(library_tracks=>{
    	let track_ids = []

    	library_tracks.forEach( (library_track)=>{
    		track_ids.push(library_track.track_id)
    	})

    	return track_ids
    })
    .then( track_ids=>{
    	db('tracks').returning('*').where( (builder)=>
          builder.whereIn('id', track_ids)
    	).then(tracks=>{
    		res.json(tracks)
    	})
    	.catch(err=>{ res.status(400).json('could not get library tracks')})

    })
    .catch(err=>{ res.status(400).json('could not get library')})
}

const addToLibrary = (req,res,db)=>{
   const { library_id , track_id } = req.body

   db('library_tracks').returning('*').insert({
   	library_id: library_id,
   	track_id: track_id
   })
   .then(library_track=>{
   	res.json(library_track)
   })
   .catch(err=>{ res.status(400).json('could not add track to library')})
}

const removeFromLibrary = (req,res,db)=>{
   const { library_id , track_id } = req.body

   db('library_tracks').returning('*').where({
   	library_id: library_id,
   	track_id: track_id
   })
   .del()
   .then(library_track=>{
   	res.json(library_track)
   })
   .catch(err=>{ res.status(400).json('could notremove track from library')})
}


module.exports = {
   createLibrary , getLibraryTracks ,addToLibrary , removeFromLibrary , getUserLibrary
}
