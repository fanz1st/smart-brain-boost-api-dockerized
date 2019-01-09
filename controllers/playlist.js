const moment = require('moment');

const createPlaylist = (req,res,db)=>{
   const { user_id , title } = req.body 
   const dateTime = moment().format('YYYY-MM-DDTHH:mm:ss')

   db('playlists').returning('*').insert({
   	user_id: user_id,
   	title: title,
   	create_at: dateTime
   })
   .then(playlist=>{
   	res.json(playlist[0])
   })
   .catch(err=>{ res.status(400).json('could not create playlist')})
}

const updatePlaylist = (req,res,db)=>{
   const { id } = req.params
   const { user_id , title } = req.body 

   db('playlists').returning('*').where({id}).update({
   	title: title
   })
   .then(playlist=>{
   	res.json(playlist[0])
   })
   .catch(err=>{ res.status(400).json('could not update playlist')})
}

const removePlaylist = (req,res,db)=>{
   const { id } = req.params
   db('playlists').returning('*').where({id}).del()
   .then(playlist=>{
   	 res.json(playlist[0])
   })
   .catch(err=>{ res.status(400).json('could not remove playlist')})
}

const addTrackToPlaylist = (req,res,db)=>{
    const { playlist_id , track_id } = req.body 

    db('playlist_tracks').returning('*').insert({
    	playlist_id: playlist_id,
    	track_id: track_id
    })
    .then(playlist_track=>{
    	res.json(playlist_track)
    })
    .catch(err=>{ res.status(400).json('could not add track to playlist')})
}

const removeTrackFromPlaylist = (req,res,db)=>{
   const { playlist_id , track_id } = req.body 

    db('playlist_tracks').returning('*').where({
    	playlist_id: playlist_id,
    	track_id: track_id
    })
    .first()
    .del()
    .then(playlist_track=>{
    	res.json(playlist_track)
    })
    .catch(err=>{ res.status(400).json('could not remove track from playlist')})
}

const getUserPlaylists = (req,res,db)=>{
   const { user_id } = req.params

   db('playlists').returning('*').where({user_id})
   .then(playlists=>{
   	res.json(playlists)
   })
   .catch(err=>{ res.status(400).json('could not get playlists')})
}

const getPlaylist = (req,res,db)=>{
   const { id } = req.params

   db('playlists').returning('*').where({id})
   .then(playlist=>{
   	res.json(playlist[0])
   })
   .catch(err=>{ res.status(400).json('could not get playlist')})
}






module.exports = {
   createPlaylist , updatePlaylist ,
   removePlaylist , removeTrackFromPlaylist ,
   addTrackToPlaylist , getPlaylist , getUserPlaylists
}