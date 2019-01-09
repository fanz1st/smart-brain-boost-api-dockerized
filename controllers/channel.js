const moment = require('moment');
const uuidv1 = require('uuid/v1');

const createChannel = (req,res,db)=>{
  const { user_id , name , description  , type} = req.body
  const dateTime = moment().format('YYYY-MM-DDTHH:mm:ss')

  db('channels').returning('*').insert({
   user_id: user_id,
   cid: uuidv1(dateTime),
   name: name.toLowerCase(),
   type: type,
   description: description,
   created_at: dateTime
  })
  .then(channel=>{
  	res.json(channel[0])
  })
  .catch(err=>{ res.status(400).json('could not create channel')})
}

const updateChannel= (req,res,db)=>{
  const { id } = req.params
  const { name , description , type } = req.body
  db('channels').returning('*').where({id}).update({
   name: name.toLowerCase(),
   description: description,
   type: type
  })
  .then(channel=>{
  	res.json(channel[0])
  })
  .catch(err=>{ res.status(400).json('could not update channel')})
}

const removeChannel = (req,res,db)=>{
	const { id } = req.params
    db('channels').returning('*').where({id}).del()
    .then(channel=>{
    	res.json(channel[0])
    })
    .catch(err=>{ res.status(400).json('could not remove channel')})

}

const getChannel = (req,res,db)=>{
	const { id } = req.params
    db('channels').returning('*').where({id})
    .then(channel=>{
    	res.json(channel[0])
    })
    .catch(err=>{ res.status(400).json('could not get channel')})
}

const getUserChannel = (req,res,db)=>{
	const { user_id } = req.body
    db('channels').returning('*').where({user_id})
    .then(channel=>{
    	res.json(channel[0])
    })
    .catch(err=>{ res.status(400).json('could not get user channel')})
}

const subscribeToChannel = (req,res,db)=>{
	const { channel_id , user_id } = req.body 

	db('channel_subscriptions').returning('*').insert({
		channel_id: channel_id,
		user_id: user_id
	})
	.then(channel_subscription=>{
		res.json(channel_subscription[0])
	})
	.catch(err=>{ res.status(400).json('could not subscribe to channel')})
}

const unsubscribeFromChannel = (req,res,db)=>{
	const { channel_id , user_id } = req.body 

	db('channel_subscriptions').returning('*').where({
		channel_id: channel_id,
		user_id: user_id
	})
	.del()
	.then(channel_subscription=>{
		res.json(channel_subscription[0])
	})
	.catch(err=>{ res.status(400).json('could not unsubscribe from channel')})
}


const findChannel = (req,res,db)=>{
    const { search_params } = req.body

    let search = search_params.toLowerCase()

    db.select('*').from('channels')
    .where('channels.name', 'like', `%${search}%`)
    .then( channels=>{
      res.json(channels)
    })
    .catch(err=>{res.status(400).json('could not find channel')})
}


const addTrackToChannel = ( req,res, db)=>{
    const { channel_id , track_id } = req.body

    db('channel_tracks').returning('*').insert({
    	channel_id: channel_id,
    	track_id: track_id
    })
    .then(channel_tracks=>{
    	res.json(channel_tracks[0])
    })
    .catch(err=>{ res.status(400).json('could not add track to channel')})
}

const removeTrackFromChannel = ( req,res, db)=>{
    const { channel_id , track_id } = req.body

    db('channel_tracks').returning('*').where({
    	channel_id: channel_id,
    	track_id: track_id
    })
    .del()
    .then(channel_tracks=>{
    	res.json(channel_tracks[0])
    })
    .catch(err=>{ res.status(400).json('could not remove track from channel')})
}

const addVideoToChannel = ( req,res, db)=>{
   const { channel_id , video_id } = req.body

    db('channel_videos').returning('*').insert({
    	channel_id: channel_id,
    	video_id: video_id
    })
    .then(channel_videos=>{
    	res.json(channel_videos[0])
    })
    .catch(err=>{ res.status(400).json('could not add video to channel')})
}

const removeVideoFromChannel = ( req,res, db)=>{
   const { channel_id , video_id } = req.body

    db('channel_tracks').returning('*').insert({
    	channel_id: channel_id,
    	video_id: video_id
    })
    .then(channel_videos=>{
    	res.json(channel_videos[0])
    })
    .catch(err=>{ res.status(400).json('could not remove video from channel')})
}







module.exports = {
  createChannel , updateChannel , removeChannel , 
  getChannel, getUserChannel, subscribeToChannel , unsubscribeFromChannel,
  findChannel , addTrackToChannel , removeTrackFromChannel ,
  addVideoToChannel ,removeVideoFromChannel
}