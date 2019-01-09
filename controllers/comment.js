const moment = require('moment');


const createComment = (req,res,db)=>{
  const { user_id , post_id , track_id , book_id , video_id , image_id, body } = req.body
  const dateTime = moment().format('YYYY-MM-DDTHH:mm:ss')


  db('comments').returning('*').insert({
  	user_id: user_id , 
  	post_id: post_id , 
  	track_id: track_id , 
  	book_id: book_id ,
    video_id: video_id,
    image_id: image_id,
  	body: body,
  	created_at: dateTime

  })
  .then(comment=>{
  	res.json(comment[0])
  })
  .catch(err=>{res.status(400).json("could not create comment")})
}

const removeComment = (req,res,db)=>{
	const { id } = req.params
	db('comments').returning('*').where({id}).del()
	.then(comment=>{
  	  res.json(comment[0])
    })
    .catch(err=>{res.status(400).json("could not remove comment")})
}

const getPostComments = (req,res,db)=>{
	const { post_id } = req.params 
	db('comments').returning('*').where({post_id})
	.then(comments=>{
		req.json(comments)
	})
	.catch(err=>{ req.status(400).json("could not get post comments")})
}

const getBookComments = (req,res,db)=>{
	const { book_id } = req.params 
	db('comments').returning('*').where({book_id})
	.then(comments=>{
		req.json(comments)
	})
	.catch(err=>{ req.status(400).json("could not get book comments")})
}

const getTrackComments = (req,res,db)=>{
	const { track_id } = req.params 
	db('comments').returning('*').where({track_id})
	.then(comments=>{
		req.json(comments)
	})
	.catch(err=>{ req.status(400).json("could not get track comments")})
}

const getImageComments = (req,res,db)=>{
	const { image_id } = req.params 
	db('comments').returning('*').where({image_id})
	.then(comments=>{
		req.json(comments)
	})
	.catch(err=>{ req.status(400).json("could not get image comments")})
}

const getVideoComments = (req,res,db)=>{
	const { video_id } = req.params 
	db('comments').returning('*').where({video_id})
	.then(comments=>{
		req.json(comments)
	})
	.catch(err=>{ req.status(400).json("could not get video comments")})
}







module.exports = {
   createComment , removeComment , 
   getTrackComments , getBookComments , getPostComments , getVideoComments , getImageComments
}


