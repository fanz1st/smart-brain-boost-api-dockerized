const moment = require('moment');

// Create Book, Chapter ,Pages

// Boook
const createBook = (req,res,db)=>{
   const { user_id , title , description , author} = req.body
   const dateTime = moment().format('YYYY-MM-DDTHH:mm:ss')

   db('books').returning('*').insert({
      user_id: user_id,
      title: title,
      author: author,
      description: description,
      active: true,
      published: false,
      created_at: dateTime

   })
   .then(book=>{
   	res.json(book[0])
   })
   .catch(err=>{res.status(400).json("could not create book")})

}

const updateBook = (req,res,db)=>{
   const { id } = req.params
   const { title , description , author} = req.body
   const dateTime = moment().format('YYYY-MM-DDTHH:mm:ss')

   db('books').returning('*').where({id}).update({
      title: title,
      author: author,
      description: description,
      updated_at: dateTime

   })
   .then(book=>{
   	res.json(book[0])
   })
   .catch(err=>{res.status(400).json("could not update book")})
}

const removeBook = (req,res,db)=>{
   const { id } = req.params
   const dateTime = moment().format('YYYY-MM-DDTHH:mm:ss')

   db('books').returning('*').where({id}).update({
      active: false,
      updated_at: dateTime

   })
   .then(book=>{
   	res.json(book[0])
   })
   .catch(err=>{res.status(400).json("could not remove book")})
}

const publishBook = (req,res,db)=>{
   const { id } = req.params
   const dateTime = moment().format('YYYY-MM-DDTHH:mm:ss')

   db('books').returning('*').where({id}).update({
      active: true,
      publish: true,
      updated_at: dateTime

   })
   .then(book=>{
   	res.json(book[0])
   })
   .catch(err=>{res.status(400).json("could not publish book")})
}

const concealBook = (req,res,db)=>{
   const { id } = req.params
   const dateTime = moment().format('YYYY-MM-DDTHH:mm:ss')

   db('books').returning('*').where({id}).update({
      active: true,
      publish: false,
      updated_at: dateTime

   })
   .then(book=>{
   	res.json(book[0])
   })
   .catch(err=>{res.status(400).json("could not conceal book")})
}


const getBook = (req,res,db)=>{
   const { id } = req.params

   db('books').returning('*').where({id})
   .then(book=>{
   	res.json(book[0])
   })
   .catch(err=>{res.status(400).json("could not publish book")})
}




const getUserBooks = (req,res,db)=>{
   const { user_id } = req.body

   db('books').returning('*').where({user_id})
   .then(books=>{
   	res.json(books)
   })
   .catch(err=>{res.status(400).json("could not publish book")})
}

const addToBookshelf = (req,res,db)=>{
   const { book_id , user_id } = req.body

   db('bookshelf').returning('*').insert({
   	book_id: book_id,
   	user_id: user_id
   })
   .then(book=>{
   	res.json(book)
   })
   .catch(err=>{res.status(400).json("could not add to bookshelf")})
}

const removeFromBookshelf = (req,res,db)=>{
   const { book_id , user_id } = req.body

   db('bookshelf').returning('*').where({
   	book_id: book_id,
   	user_id: user_id
   })
   .del()
   .then(book=>{
   	res.json(book)
   })
   .catch(err=>{res.status(400).json("could not remove from bookshelf")})
}

const userBookshelf = (req,res,db)=>{
   const { user_id } = req.body

   db('bookshelf').returning('*').where({user_id})
   .then(books=>{
   	  let book_ids = [];
   	  for (var i = 0; i < books.length; i++) {
   	  	book_ids.push(books[i].book_id)
   	  }
   	  db('books').returning('*').where( (builder)=> builder.whereIn('id', book_ids))
   	  .then(bookshelf=>{
   	  	res.json(bookshelf)
   	  })

   })
   .catch(err=>{res.status(400).json("could not add to bookshelf")})
}


// Book Chapter

const createChapter = (req,res,db)=>{
   const { book_id , subtitle , number } = req.body
   const dateTime = moment().format('YYYY-MM-DDTHH:mm:ss')

   db('book_chapters').returning('*').insert({
      book_id: book_id,
      subtitle: subtitle,
      number: number,
      published: false,
      created_at: dateTime

   })
   .then(book_chapter=>{
   	res.json(book_chapter[0])
   })
   .catch(err=>{res.status(400).json("could not create chapter")})
}

const updateChapter = (req,res,db)=>{
	const { id } = req.params
	const { subtitle , number} = req.body
    const dateTime = moment().format('YYYY-MM-DDTHH:mm:ss')

   db('book_chapters').returning('*').where({id}).update({
      subtitle: subtitle,
      number: number,
      updated_at: dateTime

   })
   .then(book_chapter=>{
   	res.json(book_chapter[0])
   })
   .catch(err=>{res.status(400).json("could not update chapter")})
}

const removeChapter = (req,res,db)=>{
	const { chapter_id } = req.body
    const dateTime = moment().format('YYYY-MM-DDTHH:mm:ss')

   db('book_chapters').returning('*').where({id: chapter_id}).del()
   .then(book_chapter=>{
   	res.json(book_chapter[0])
   })
   .catch(err=>{res.status(400).json("could not remove chapter")})
}

const getChapter = (req,res,db)=>{
    const { id } = req.params

   db('book_chapters').returning('*').where({id})
   .then(book_chapter=>{
   	res.json(book_chapter[0])
   })
   .catch(err=>{res.status(400).json("could not get chapter")})
}

const getBookChapters = (req,res,db)=>{
    const { book_id } = req.params

   db('book_chapters').returning('*').where({ book_id })
   .then(book_chapters=>{
   	    res.json(book_chapters)
   })
   .catch(err=>{res.status(400).json("could not get chapter")})
}



const publishChapter = (req,res,db)=>{
   const { chapter_id, book_id } = req.body

   db('book_chapters').returning('*').where({chapter_id , book_id}).update({
   	publish: true,
   })
   .then(book_chapter=>{
   	res.json(book_chapter[0])
   })
   .catch(err=>{res.status(400).json("could not get chapter")})
}

const concealChapter = (req,res,db)=>{
   const { chapter_id, book_id } = req.body

   db('book_chapters').returning('*').where({chapter_id , book_id}).update({
   	publish: false,
   })
   .then(book_chapter=>{
   	res.json(book_chapter[0])
   })
   .catch(err=>{res.status(400).json("could not get chapter")})
}





// Book Pages

const createPage = (req,res,db)=>{
   const { book_id , chapter_id , numbers , body} = req.body
   const dateTime = moment().format('YYYY-MM-DDTHH:mm:ss')

   db('pages').returning('*').insert({
      book_id: book_id,
      chapter_id: chapter_id,
      numbers: numbers,
      body: body,
      created_at: dateTime

   })
   .then(book_chapter=>{
   	res.json(book_chapter[0])
   })
   .catch(err=>{res.status(400).json("could not create page")})
}

const updatePage = (req,res,db)=>{
	const { id } = req.params
	const { book_id , chapter_id , numbers , body} = req.body
    const dateTime = moment().format('YYYY-MM-DDTHH:mm:ss')

   db('pages').returning('*').where({id}).update({
      book_id: book_id,
      chapter_id: chapter_id,
      numbers: numbers,
      body: body,
      updated_at: dateTime

   })
   .then(book_chapter=>{
   	res.json(book_chapter[0])
   })
   .catch(err=>{res.status(400).json("could not update page")})
}

const removePage = (req,res,db)=>{
	const { id } = req.params

	db('pages').returning('*').where({id}).del()
	.then(pages=>{
		res.json(pages)
	})
	.catch(err=>{ res.status(400).json("could not remove page")})
}

const getPage = (req,res,db)=>{
   const { id } = req.params

   db('pages').returning('*').where({id})
   .then(pages=>{
      res.json(pages)
   })
   .catch(err=>{ res.status(400).json("could not get page")})
}




module.exports = {
    createBook , createChapter , createPage,
    updateBook, updatePage , updateChapter ,
    removeBook , removeChapter , removePage,
    concealChapter , publishChapter , 
    concealBook , publishBook , 
    getChapter , getBook , getBookChapters , getUserBooks ,
    addToBookshelf , removeFromBookshelf , userBookshelf,
    getBook

}





