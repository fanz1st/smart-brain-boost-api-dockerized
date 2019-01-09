const moment = require('moment');


const createTrack = (req,res,db)=>{

    const { user_id , title , artist , album , producer , feat_artist,
           lyrics, album_art ,genre_id , genre , key , afile , etag, 
           published } = req.body

    const dateTime = moment().format('YYYY-MM-DDTHH:mm:ss')
           
    db('tracks').returning('*').insert({
      user_id: user_id,
      title: title,
      artist: artist,
      album: album,
      producer: producer,
      feat_artist: feat_artist,
      lyrics: lyrics,
      album_art: album_art,
      genre_id: genre_id,
      genre: genre,
      key: key,
      afile: afile,
      etag: etag,
      active: true,
      created_at: dateTime

    })
    .then(track=>{
    	res.json(track[0])
    })
    .catch(err=>{ res.status(400).json('could not create track')})
}

const updateTrack = (req,res,db)=>{
	const { id } = res.params
	const {  title , artist , album , producer , feat_artist,
           lyrics, album_art ,genre_id , genre , key , afile , etag } = req.body
    const dateTime = moment().format('YYYY-MM-DDTHH:mm:ss')
           
    db('tracks').returning('*').where({id}).update({
      title: title,
      artist: artist,
      album: album,
      producer: producer,
      feat_artist: feat_artist,
      lyrics: lyrics,
      album_art: album_art,
      genre_id: genre_id,
      genre: genre,
      key: key,
      afile: afile,
      etag: etag,
      updated_at: dateTime
    })
    .then(track=>{
    	res.json(track[0])
    })
    .catch(err=>{ res.status(400).json('could not create track')})
}

const publishTrack = (req,res,db)=>{
	const { id } = req.params

	db('tracks').returning('*').where({id}).update({
		published: true
	})
	.then(tracks=>{
		res.json(tracks[0])
	})
	.catch(err=>{ res.status(400).json('could not publish track')})

}

const concealTrack = (req,res,db)=>{
	const { id } = req.body

	db('tracks').returning('*').where({id}).update({
		published: false
	})
	.then(tracks=>{
		res.json(tracks[0])
	})
	.catch(err=>{ res.status(400).json('could not conceal track')})
}

const getTrack = (req,res,db)=>{
	const { id } = req.params

	db('tracks').returning('*').where({id})
	.then(tracks=>{
		res.json(tracks[0])
	})
	.catch(err=>{ res.status(400).json('could not get track')})
}

const getUserTracks = (req,res,db)=>{
	const { user_id } = req.params

	db('tracks').returning('*').where({user_id})
	.then(tracks=>{
		res.json(tracks)
	})
	.catch(err=>{ res.status(400).json('could not get user tracks')})
}

const createTrackPlay = (req,res,db)=>{
	const { track_id , user_id } = req.body
    const dateTime = moment().format('YYYY-MM-DDTHH:mm:ss')

	db.transaction(trx => {
    trx.insert({
        track_id: track_id,
		user_id: user_id,
		created_at: dateTime
    })
    .into('plays')
    .returning('*')
    .then(plays => {
      return trx('tracks').where({track_id})
        .increment('plays', 1)
        .then(tracks => {
          res.json(tracks[0])
        })

    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json('could not create play for track'))
}



const mostPlayedTracks = (req,res,db)=>{
   db('tracks').orderBy('plays', 'desc').limit(100)
   .then(tracks=>{
   	res.json(tracks)
   })
   .catch(err=>{ res.status(400).json('could not get 100 most played tracks')})
}

const newTracks = (req,res,db)=>{
	db('tracks').where('published', true).orderBy('created_at', 'asc').limit(100)
	.then(tracks=>{
		res.json(tracks)
	})
	.catch(err=>{ res.status(400).json('could not get new published tracks')})
}

const weekTopTracks = (req,res,db)=>{
	var today = moment().format('YYYY-MM-DDTHH:mm:ss')
    var week_ago = today.add(-7 , 'days')

    db.select('track_id').from('plays').havingNotNull('track_id').where('created_at','>', week_ago)
    .then(track_ids=>{
        var ids = []
        track_ids.forEach( (track)=>{
        	ids.push(track.track_id)
        })
        db('tracks').returning('*').whereIn('id', ids)
        .then(tracks=>{
        	res.json(tracks)
        })
        .catch(err=>{ res.status(400).json('could not get weeks top tracks')})
    })
    .catch(err=>{ res.status(400).json('could not get weeks top tracks plays')})

}

module.exports = {
  createTrack , updateTrack ,publishTrack ,concealTrack , getTrack , getUserTracks,
  createTrackPlay , mostPlayedTracks , newTracks , weekTopTracks
}

