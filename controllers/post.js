const moment = require('moment');



const createPost = (req,res,db)=>{
  const { user_id , body , type , rating_id ,image_ids, video_ids , track_ids , book_id } = req.body
  const dateTime = moment().format('YYYY-MM-DDTHH:mm:ss')

   db('posts').returing('*').insert({
   	 user_id: user_id,
   	 body: body,
   	 type: type,
   	 rating_id: rating_id,
   	 book_id: book_id,
   	 created_at: dateTime
   })
   .then(post=>{
      switch(post[0].type){
	   	case 'text': 
            res.json(post[0])
	   	  break;
      case 'image': 
            createPostImages(post[0] , image_ids , res, db )
	   	  break;
	   	case 'video': 
            createPostVideos(post[0] , video_ids , res, db )
	   	  break;
	   	case 'track': 
            createPostTracks(post[0] , track_ids , res, db )
	   	  break;  
	   	default: 
            res.json(post[0])
	   	  break;  
	   }
   })


}


const createPostImages = (post , image_ids , res, db )=>{
    let post_images = []
     image_ids.forEach((image_id)=>{
     	post_images.push({post_id: post.id , image_id: image_id})
     })

    db('post_images').returning('*').insert(post_images)
    .then(posts_images=>{
        res.json({post: post , post_images: posts_images})
    })
    .catch(err=>{ res.status(400).json('could not create post_images')})
}

const createPostTracks = (post , track_ids , res, db )=>{
	let post_tracks = []
     track_ids.forEach((track_id)=>{
     	post_tracks.push({post_id: post.id , track_id: track_id})
     })

    db('post_tracks').returning('*').insert(post_tracks)
    .then(posts_tracks=>{
        res.json({post: post , post_tracks: posts_tracks})
    })
    .catch(err=>{ res.status(400).json('could not create post_tracks')})
}

const createPostVideos = (post , video_ids , res, db )=>{
	let post_videos = []
     video_ids.forEach((video_id)=>{
     	post_videos.push({post_id: post.id , video_id: video_id})
     })

    db('post_videos').returning('*').insert(post_videos)
    .then(posts_videos=>{
        res.json({post: post , post_videos: posts_videos})
    })
    .catch(err=>{ res.status(400).json('could not create post_videos')})
}




const removePost = (req,res,db)=>{
	const { id } = req.params

	db('posts').returning('*').where({id}).del()
	.then(post=>{
		res.json(post[0])
	})
	.catch(err=>{ res.status(400).json('could not remove post')})
}

const getPost = (req,res,db)=>{
	const { id } = req.params 
     
	

	db('posts').returning('*').where({id})
	.then(post=>{
	   
	   switch(post[0].type){
	   	case 'text': 
            res.json(post[0])
	   	  break;
        case 'image': 
            getPostImages(post[0] , res , db)
	   	  break;
	   	case 'video': 
            getPostVideos(post[0] , res , db)
	   	  break;
	   	case 'track': 
            getPostTracks(post[0] , res , db)
	   	  break; 
	   	case 'book': 
            getPostBook(post[0] , res , db)
	   	  break; 
	   	default: 
            res.json(post[0])
	   	  break;  
	   }
		

	})
	.catch(err=>{ res.status(400).json('could not get post')})
}


const getPostImages = (post, res , db)=>{
   db('post_images').returning('*').where({ post_id: post.id })
		.then(post_images=>{
			let image_ids = []

			post_images.forEach( (post_image)=>{
				image_ids.push(post_image.image_id)
			})

			return image_ids
		})
		.then(image_ids=>{
			db('images').returning('*').where( (builder)=> builder.whereIn('id', image_ids))
			       .then(images=>{
			       	  res.json({
			       	  	id: post.id,
			       	  	user_id: post.user_id,
			       	  	body: post.body,
			       	  	images: images,
			       	  	created_at: post.created_at
			       	  })
			       })
			       .catch(err=>{ res.status(400).json('could not get post images')})
		})
		.catch(err=>{ res.status(400).json('could not get post images')})
}


const getPostVideos = (post , res ,db)=>{
   db('post_videos').returning('*').where({ post_id: post.id })
      .then(post_videos=>{
      	let video_ids = []

      	post_videos.forEach((post_video)=>{
      		video_ids.push(post_video.video_id)
      	})
      	return video_ids
      })
      .then( video_ids=>{
      	db('videos').returning('*').where((builder)=> builder.whereIn('id', video_ids))
      	.then(videos=>{
           res.json({
		       	  	id: post.id,
		       	  	user_id: post.user_id,
		       	  	body: post.body,
		       	  	videos: videos,
		       	  	created_at: post.created_at
		       	  })
      	})
      	.catch(err=>{ res.status(400).json('could not get post videos')})
      })
      .catch(err=>{ res.status(400).json('could not get post_videos')})
}

const getPostTracks = (post , res ,db)=>{
   db('post_tracks').returning('*').where({ post_id: post.id })
      .then(post_tracks=>{
      	let track_ids = []

      	post_tracks.forEach((post_track)=>{
      		track_ids.push(post_track.track_id)
      	})
      	return track_ids
      })
      .then( track_ids=>{
      	db('tracks').returning('*').where((builder)=> builder.whereIn('id', track_ids))
      	.then(tracks=>{
           res.json({
		       	  	id: post.id,
		       	  	user_id: post.user_id,
		       	  	body: post.body,
		       	  	tracks: tracks,
		       	  	created_at: post.created_at
		       	  })
      	})
      	.catch(err=>{ res.status(400).json('could not get post tracks')})
      })
      .catch(err=>{ res.status(400).json('could not get post_tracks')})
}

const getPostBook = (post , res, db)=>{
   db('books').returning('*').where({id: post.book_id})
      	.then(book=>{
           res.json({
		       	  	id: post.id,
		       	  	user_id: post.user_id,
		       	  	body: post.body,
		       	  	book: book[0],
		       	  	created_at: post.created_at
		       	  })
      	})
      	.catch(err=>{ res.status(400).json('could not get post book')})
}



const getUserPosts = (req,res,db)=>{
	const { user_id } = req.params 

	db('posts').returning('*').where({user_id})
	.then(posts=>{
		res.json(posts)
	})
	.catch(err=>{ res.status(400).json('could not get user posts')})
}



const createRepost = ( req,res,db)=>{
  const { post_id , user_id } = req.body 
  const dateTime = moment().format('YYYY-MM-DDTHH:mm:ss')

  db('reposts').returning('*').insert({
    post_id: post_id,
    user_id: user_id,
    created_at: dateTime
  })
  .then(reposts=>{
    res.json(reposts[0])
  })
  .catch(err=>{ res.status(400).json('could not create reposts')})

}




module.exports = {
  getUserPosts , getPost , removePost , createPost , createRepost 
}