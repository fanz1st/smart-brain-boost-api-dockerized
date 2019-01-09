const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
 apiKey: 'YOUR_API_KEY_HERE'
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

const createImage = (req,res,db) =>{
  const { user_id , image_full } = req.body

  db('images').returning('*').insert({
    user_id: user_id,
    image_full: image_full
  })
  .then(image=>{
    res.json(image[0])
  })
  .catch(err=>{ res.status(400).json('cound not save image')})
}


const updateImage = (req,res,db)=>{
  const { id } = req.params

  db('images').returning('*').where({id}).update({
    image_full: image_full
  })
  .then(image=>{
    res.json(image[0])
  })
  .catch(err=>{ res.status(400).json('could not update image')})
}

const getImage = (req,res,db)=>{
  const { id } = req.params

  db('images').returning('*').where({id})
  .then(image=>{
    res.json(image[0])
  })
  .catch(err=>{ res.status(400).json('could not get image')})
}

const removeImage = (req,res,db)=>{
  const { id } = req.params

  db('images').returning('*').where({id}).del()
  .then(image=>{
    res.json(image[0])
  })
  .catch(err=>{ res.status(400).json('could not remove image')})
}

const getUserImages = (req,res,db)=>{
  const { user_id } = req.params

  db('images').returning('*').where({user_id})
  .then(images=>{
    res.json(images)
  })
  .catch(err=>{ res.status(400).json('could not user images')})
}


module.exports = {
  handleImage,
  handleApiCall,
  createImage,updateImage ,getImage , removeImage ,getUserImages
}






