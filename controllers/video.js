const moment = require('moment');
const processVideo = require('../lib/video_process');


const createVideo = (req,res,db)=>{
    const { user_id ,
		    name ,
		    description,
		    video_full,
		    published } = req.body 

	const dateTime = moment().format('YYYY-MM-DDTHH:mm:ss')	    
    
    db('videos').returning('*').insert({
    	user_id: user_id ,
	    name: name ,
	    description: description,
	    video_full: video_full,
	    published: published,
	    created_at: dateTime
    })
    .then(videos=>{
    	res.json(videos[0])
    })
    .catch(err=>{ res.status(400).json('could not create video')})

}

const updateVideo = (req,res,db)=>{
	const { id } = req.params

	const { name ,
		    description,
		    video_full,
		    video_clip,
		    video_poster,
		    videomini,
		    videosmall,
		    videomedium,
		    videolarge ,
		    published } = req.body 

	const dateTime = moment().format('YYYY-MM-DDTHH:mm:ss')	    
    
    db('videos').returning('*').where({id}).update({
    	
	    name: name ,
	    description: description,
	    video_full: video_full,
	    video_clip: video_clip,
	    video_poster: video_poster,
	    videomini: videomini,
	    videosmall: videosmall,
	    videomedium: videomedium,
	    videolarge: videolarge ,
	    published: published,
	    updated_at: dateTime
    })
    .then(videos=>{
    	res.json(videos[0])
    })
    .catch(err=>{ res.status(400).json('could not update video')})
}

const removeVideo = (req,res,db)=>{
	const { id } = req.params 

	db('videos').returning('*').where({id}).del()
	.then(videos=>{
		res.json(videos[0])
	})
	.catch(err=>{ res.status(400).json('could not remove video')})

}

const publishVideo = (req,res,db)=>{
	const { id } = req.params 

	db('videos').returning('*').where({id}).uodate({
		published: true
	})
	.then(videos=>{
		res.json(videos[0])
	})
	.catch(err=>{ res.status(400).json('could not published video')})

}

const concealVideo = (req,res,db)=>{
	const { id } = req.params 

	db('videos').returning('*').where({id}).update({
		published: false
	})
	.then(videos=>{
		res.json(videos[0])
	})
	.catch(err=>{ res.status(400).json('could not conceal video')})

}

const activateVideo = (req,res,db)=>{
	const { id } = req.params 

	db('videos').returning('*').where({id}).update({
		active: true
	})
	.then(videos=>{
		res.json(videos[0])
	})
	.catch(err=>{ res.status(400).json('could not activate video')})
}

const deactivateVideo = (req,res,db)=>{
	const { id } = req.params 

	db('videos').returning('*').where({id}).update({
		active: false
	})
	.then(videos=>{
		res.json(videos[0])
	})
	.catch(err=>{ res.status(400).json('could not deactivate video')})
}

const getVideo = (req,res,db)=>{
	const { id } = req.params 

	db('videos').returning('*').where({id})
	.then(videos=>{
		res.json(videos[0])
	})
	.catch(err=>{ res.status(400).json('could not get video')})
}

const getUserVideos = (req,res,db)=>{
	const { user_id } = req.params 

	db('videos').returning('*').where({user_id})
	.then(videos=>{
		res.json(videos)
	})
	.catch(err=>{ res.status(400).json('could not get videos')})
}

const createVideoPlay = (req,res,db)=>{
	const { video_id , user_id } = req.body
    const dateTime = moment().format('YYYY-MM-DDTHH:mm:ss')

	db.transaction(trx => {
    trx.insert({
        video_id: video_id,
		user_id: user_id,
		created_at: dateTime
    })
    .into('plays')
    .returning('*')
    .then(plays => {
      return trx('videos').where({video_id})
        .increment('plays', 1)
        .then(videos => {
          res.json(videos[0])
        })

    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json('could not create play for video'))
}

const mostPlayedVideos = (req,res,db)=>{
	db('videos').orderBy('plays', 'desc').limit(100)
    .then(videos=>{
    	res.json(videos)
    })
    .catch(err=>{ res.status(400).json('could not get 100 most played videos')})
}

const newVideos = (req,res,db)=>{
	db('videos').where('published', true).orderBy('created_at', 'asc').limit(100)
	.then(videos=>{
		res.json(videos)
	})
	.catch(err=>{ res.status(400).json('could not get new published videos')})
}

const weeksTopVideos = (req,res,db)=>{
	var today = moment().format('YYYY-MM-DDTHH:mm:ss')
    var week_ago = today.add(-7 , 'days')

    db.select('video_id').from('plays').havingNotNull('video_id').where('created_at','>', week_ago)
    .then(video_ids=>{
        var ids = []
        video_ids.forEach( (video)=>{
        	ids.push(video.video_id)
        })
        db('videos').returning('*').whereIn('id', ids)
        .then(videos=>{
        	res.json(videos)
        })
        .catch(err=>{ res.status(400).json('could not get weeks top videos')})
    })
    .catch(err=>{ res.status(400).json('could not get weeks top videos plays')})
}





module.exports = {
   createVideo , updateVideo , removeVideo , publishVideo , concealVideo ,
   activateVideo , deactivateVideo , getVideo , getUserVideos ,
   createVideoPlay , mostPlayedVideos , newVideos , weeksTopVideos
}



