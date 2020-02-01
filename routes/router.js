const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const redis = require('redis');
const lodash = require('lodash');
const config = require('../lib/config');


//Database Setup
const db = knex({
  client: 'pg',
  version: '10.4',
  connection: process.env.DATABASE_URL,
  pool: { min: 0, max: 7 },
  
});

// Redis Setup



// Controllers
const auth = require('../controllers/authorization');
const book = require('../controllers/book');
const comment = require('../controllers/comment');
const channel = require('../controllers/channel');
const genre = require('../controllers/genre');
const image = require('../controllers/image');
const library = require('../controllers/library');
const like = require('../controllers/like');
const playlist = require('../controllers/playlist');
const post = require('../controllers/post');
const track = require('../controllers/track');
const video = require('../controllers/video');







module.exports = function(io) {
    'use strict';
     var route = require('express').Router();
     
     route.get('/alive', (req,res)=>{
         res.json({alive: true})
     })
     
     route.all('*',auth.requireAuth)
     // Books  
     route.post('/books' ,(req,res)=>{ book.createBook(req,res,db)})
     route.put('/book/:id' , (req,res)=>{ book.updateBook(req,res,db)})
     route.post('/remove_book/:id' , (req,res)=>{ book.removeBook(req,res,db)})
     route.post('/publish_book/:id' , (req,res)=>{ book.publishBook(req,res,db)})
     route.post('/conceal_book/:id' , (req,res)=>{ book.concealBook(req,res,db)})
     route.get('/book/:id' , (req,res)=>{ book.concealBook(req,res,db)})
     route.post('/add_to_bookshelf', (req,res)=>{ book.addToBookshelf(req,res,db)})
     route.post('/remove_from_bookshelf', (req,res)=>{ book.removeFromBookshelf(req,res,db)})
     route.post('/bookshelfs', (req,res)=>{ book.userBookshelf(req,res,db)})
     route.post('/chapters', (req,res)=>{ book.createChapter(req,res,db)})
     route.put('/chapter/:id', (req,res)=>{ book.updateChapter(req,res,db)})
     route.delete('/chapter/:id', (req,res)=>{ book.removeChapter(req,res,db)})
     route.get('/chapter/:id', (req,res)=>{ book.getChapter(req,res,db)})
     route.post('/chapters/:book_id', (req,res)=>{ book.getBookChapters(req,res,db)})
     route.post('/publish_chapters', (req,res)=>{ book.publishChapter(req,res,db)})
     route.post('/conceal_chapters', (req,res)=>{ book.concealChapter(req,res,db)})
     route.post('/pages', (req,res)=>{ book.createPage(req,res,db)})
     route.post('/page/:id', (req,res)=>{ book.updatePage(req,res,db)})
     route.delete('/page/:id', (req,res)=>{ book.removePage(req,res,db)})
     route.get('/page/:id', (req,res)=>{ book.getPage(req,res,db)})

     // Channels

     route.post('/channels', (req,res)=>{ channel.createChannel(req,res,db)})
     route.put('/channel/:id', (req,res)=>{ channel.updatehannel(req,res,db)})
     route.delete('/channel/:id', (req,res)=>{ channel.removeChannel(req,res,db)})
     route.get('/channel/:id', (req,res)=>{ channel.getChannel(req,res,db)})
     route.post('/user_channels', (req,res)=>{ channel.getUserChannel(req,res,db)})
     route.post('/subscribe_channel', (req,res)=>{ channel.subscribeToChannel(req,res,db)})
     route.post('/unsubscribe_channel', (req,res)=>{ channel.unsubscribeFromChannel(req,res,db)})
     route.post('/find_channel', (req,res)=>{ channel.findChannel(req,res,db)})
     route.post('/add_track_to_channel', (req,res)=>{ channel.addTrackToChannel(req,res,db)})
     route.post('/remove_track_from_channel', (req,res)=>{ channel.removeTrackFromChannel(req,res,db)})
     route.post('/add_video_to_channel', (req,res)=>{ channel.addVideoToChannel(req,res,db)})
     route.post('/remove_video_from_channel', (req,res)=>{ channel.removeVideoFromChannel(req,res,db)})


     // Comments

     route.post('/comments', (req,res)=>{ comment.createComment(req,res,db)})
     route.delete('/comment/:id', (req,res)=>{ comment.removeComment(req,res,db)})
     route.get('/post/comments/:post_id', (req,res)=>{ comment.getPostComments(req,res,db)})
     route.get('/book/comments/:book_id', (req,res)=>{ comment.getBookComments(req,res,db)})
     route.get('/track/comments/:track_id', (req,res)=>{ comment.getTrackComments(req,res,db)})
     route.get('/image/comments/:image_id', (req,res)=>{ comment.getImageComments(req,res,db)})
     route.get('/video/comments/:video_id', (req,res)=>{ comment.getVideoComments(req,res,db)})

     // Genres
     route.post('/setup_genres', (req,res)=>{ genre.setupTrackGenres(req,res,db)})
     route.post('/setup_podcastgenres', (req,res)=>{ genre.setupPodcastGenres(req,res,db)})
     route.get('/genre/tracks/:genre_id', (req,res)=>{ genre.getGenreTracks(req,res,db)})
     route.get('/genres', (req,res)=>{ genre.getGenres(req,res,db)})
     route.get('/podcast/genres', (req,res)=>{ genre.getPodcastGenres(req,res,db)})

     // Images
     route.post('/images', (req,res)=>{ image.createImage(req,res,db)})
     route.put('/image/:id', (req,res)=>{ image.updateImage(req,res,db)})
     route.delete('/image/:id', (req,res)=>{ image.removeImage(req,res,db)})
     route.get('/image/:id', (req,res)=>{ image.getImage(req,res,db)})
     route.get('/images/:user_id', (req,res)=>{ image.getUserImages(req,res,db)})

     // Library
     
     route.post('/libraries', (req,res)=>{ library.createLibrary(req,res,db)})
     route.get('/library/:user_id', (req,res)=>{ library.getUserLibrary(req,res,db)})
     route.get('/library/tracks/:id', (req,res)=>{ library.getLibraryTracks(req,res,db)})
     route.post('/add_to_library', (req,res)=>{ library.addToLibrary(req,res,db)})
     route.post('/remove_From_library', (req,res)=>{ library.removeFromLibrary(req,res,db)})

     // Like and DisLike

     route.post('/likes', (req,res)=>{ like.createLike(req,res,db)})
     route.post('/dislikes', (req,res)=>{ like.createDislike(req,res,db)})
     route.delete('/like/:id', (req,res)=>{ like.removeLike(req,res,db)})
     route.delete('/dislike:/id', (req,res)=>{ like.removeDislike(req,res,db)})

     // Playlists

     route.post('/playlists', (req,res)=>{ playlist.createPlaylist(req,res,db)})
     route.put('/playlist/:id', (req,res)=>{ playlist.updatePlaylist(req,res,db)})
     route.delete('/playlist/:id', (req,res)=>{ playlist.removePlaylist(req,res,db)})
     route.post('/add_track_to_playlist', (req,res)=>{ playlist.addTrackToPlaylist(req,res,db)})
     route.post('/remove_track_from_playlist', (req,res)=>{ playlist.removeTrackFromPlaylist(req,res,db)})
     route.post('/playlists/:user_id', (req,res)=>{ playlist.getUserPlaylists(req,res,db)})
     route.get('/playlist/:id', (req,res)=>{ playlist.getPlaylist(req,res,db)})


     // Posts 

     route.post('/posts', (req,res)=>{ post.createPost(req,res,db)})
     route.get('/user_posts/:user_id', (req,res)=>{ post.getUserPosts(req,res,db)})
     route.delete('/post/:id', (req,res)=>{ post.removePost(req,res,db)})
     route.post('/reposts', (req,res)=>{ post.createRepost(req,res,db)})
     route.get('/post/:id', (req,res)=>{ post.getPost(req,res,db)})

     // Tracks
     
     route.post('/tracks', (req,res)=>{ track.createTrack(req,res,db)})
     route.put('/track/:id', (req,res)=>{ track.updateTrack(req,res,db)})
     route.post('/publish/track/:id', (req,res)=>{ track.publishTrack(req,res,db)})
     route.post('/conceal/track/:id', (req,res)=>{ track.concealTrack(req,res,db)})
     route.post('/track', (req,res)=>{ track.getTrack(req,res,db)})
     route.get('/user/tracks/:user_id', (req,res)=>{ track.getUserTracks(req,res,db)})
     route.post('/play/track', (req,res)=>{ track.createTrackPlay(req,res,db)})
     route.get('/new_track', (req,res)=>{ track.newTracks(req,res,db)})
     route.get('/most_played_tracks', (req,res)=>{ track.mostPlayedTracks(req,res,db)})
     route.get('/week_top_tracks', (req,res)=>{ track.weekTopTracks(req,res,db)})

     // Videos

     route.post('/videos', (req,res)=>{ video.createVideo(req,res,db)})
     route.put('/video/:id', (req,res)=>{ video.updateVideo(req,res,db)})
     route.post('/publish/video/:id', (req,res)=>{ video.publishVideo(req,res,db)})
     route.post('/conceal/video/:id', (req,res)=>{ video.concealVideo(req,res,db)})
     route.get('/video/:id', (req,res)=>{ video.getVideo(req,res,db)})
     route.get('/user/videos/:user_id', (req,res)=>{ video.getUserVideos(req,res,db)})
     route.post('/play/video', (req,res)=>{ video.createVideoPlay(req,res,db)})
     route.get('/new_video', (req,res)=>{ video.newVideos(req,res,db)})
     route.get('/most_played_videos', (req,res)=>{ video.mostPlayedVideos(req,res,db)})
     route.get('/week_top_videos', (req,res)=>{ video.weekTopVideos(req,res,db)})
     route.post('/activate/video/:id', (req,res)=>{ video.activateVideo(req,res,db)})
     route.post('/deactivate/video/:id', (req,res)=>{ video.deactivateVideo(req,res,db)})
     route.delete('/video/:id', (req,res)=>{ video.removeVideo(req,res,db)})







    return route;
};

