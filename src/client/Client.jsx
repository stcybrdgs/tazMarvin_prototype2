import { useEffect, useState, useRef } from 'react'
import './client.scss'
import albums from '../data/albums.js'

//lightbulb, comment, music, headphones
const bannerNavIcons = ['fa-music', 'fa-blog', 'fa-shirt', 'fa-envelope']

const footerSocialIcons = [
  'fa-facebook',
  'fa-square-x-twitter',
  'fa-youtube',
  'fa-square-instagram',
  'fa-spotify',
]

const merchItems = [
  'mug',
  'candle',
  'rock',
  'tin-o-picks',
  'poster',
  'book',
  'pdf',
]

const thoughtText = `
Lorem ipsum odor amet, consectetuer adipiscing elit. Euismod suspendisse arcu pharetra fermentum fermentum molestie rhoncus metus. Amet ad tempor velit maecenas leo torquent. Nullam etiam aenean vivamus ad nisl. Sollicitudin ullamcorper egestas tincidunt adipiscing mollis egestas; donec habitasse ex. Vehicula sit interdum fusce sociosqu viverra. Litora varius feugiat ridiculus tortor neque malesuada dignissim.
Lorem ipsum odor amet, consectetuer adipiscing elit. Euismod suspendisse arcu pharetra fermentum fermentum molestie rhoncus metus. Amet ad tempor velit maecenas leo torquent. Nullam etiam aenean vivamus ad nisl. Sollicitudin ullamcorper egestas tincidunt adipiscing mollis egestas; donec habitasse ex. Vehicula sit interdum fusce sociosqu viverra. Litora varius feugiat ridiculus tortor neque malesuada dignissim.
`

const Client = () => {
  const [selectedSong, setSelectedSong] = useState({})
  const [songIsPlaying, setSongIsPlaying] = useState(false)
  const [selectedAlbum, setSelectedAlbum] = useState({})
  const [radioMenuSongs, setRadioMenuSongs] = useState([])

  const audioRef = useRef(null)
  const audioPlayBtnRef = useRef(null)

  // API helpers
  const callApiForDefaultAlbumData = () => {
    return albums[0]
  }

  // Player Control Functions
  const togglePlaySong = () => {
    if (songIsPlaying) {
      console.log('pause')
      audioRef.current.pause()
    } else {
      console.log('play')
      audioRef.current.play()
    }
    setSongIsPlaying(!songIsPlaying)
    console.log('audio ref:', audioRef.current)
  }

  const prevSong = () => {
    console.log('prev')
    const currentIndex = selectedSong.track - 1
    const prevIndex =
      currentIndex === 0 ? radioMenuSongs.length - 1 : currentIndex - 1
    const prevSong = radioMenuSongs[prevIndex]

    setSelectedSong(prevSong)
    loadSong(selectedSong)

    if (songIsPlaying) {
      audioRef.current.play()
    }
  }

  const nextSong = () => {
    const currentIndex = selectedSong.track - 1
    const nextIndex =
      currentIndex === radioMenuSongs.length - 1 ? 0 : currentIndex + 1
    const nextSong = radioMenuSongs[nextIndex]

    // console.log('next', currentIndex, nextIndex, nextSong)
    setSelectedSong(nextSong)
    loadSong(selectedSong)

    if (songIsPlaying) {
      audioRef.current.play()
    }
  }

  const shuffleSongs = () => {
    console.log('shuffle')
  }
  const repeatSong = () => {
    console.log('repeat')
  }
  const loadSong = (song) => {
    console.log('load song: ', song)
    audioRef.src = song
  }

  useEffect(() => {
    const selectedAlbum = callApiForDefaultAlbumData()
    setSelectedAlbum(selectedAlbum)

    const selectedSong = selectedAlbum.songs[0]
    setSelectedSong(selectedSong)

    const radioMenuSongs = selectedAlbum.songs
    setRadioMenuSongs(radioMenuSongs)

    if (audioRef.current) {
      loadSong(selectedSong.fileUrl)
    }

    console.log('selectedSong:', selectedSong)
  }, [])

  // return <h2>Test</h2>

  return (
    <div id='main-wrapper'>
      {/* Banner */}
      <div id='banner' className='section'>
        {/* <div id='banner-logo'>Taz Marvin</div> */}
        <div id='banner-logo'>Taz Marvin</div>
        <div id='banner-nav-btns'>
          {bannerNavIcons.map((name, index) => {
            return (
              <button className='banner-nav-btn' key={`${name}-${index}`}>
                <i className={`fa-solid ${name}`} />
              </button>
            )
          })}
        </div>
      </div>

      {/* hero */}
      <div id='hero' className='section'>
        <img
          src='https://images.unsplash.com/photo-1621419203051-f4e463849784?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt=''
        />
      </div>

      {/* thoughts */}
      <div id='thought-cards-wrapper' className='section'>
        <h2>Thoughts</h2>
        <div className='thought-cards'>
          <div id='thought-card'>
            <div id='thought-image'>
              <img
                src='https://images.unsplash.com/photo-1601758124277-f0086d5ab050?q=80&w=1210&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt=''
              />
            </div>
            <div className='thought-text'>
              <h4>New Tunes, October 7</h4>
              <span>{thoughtText}</span>
            </div>
            <div id='thought-btn'>
              <i className='fa-solid fa-arrow-right' />
            </div>
          </div>
        </div>
      </div>

      {/* radio */}
      <div id='music-wrapper' className='section'>
        <h2>Taz Radio</h2>
        {/* Marquee */}
        <marquee behavior='scroll' direction='left' className='radio-marquee'>
          <span>
            {selectedSong.track}. &quot;{selectedSong.name}&quot;{' '}
          </span>
          <span>
            &ndash;&nbsp;{selectedSong.album} (Taz Marvin Music,{' '}
            {selectedSong.released})
          </span>
        </marquee>

        <div id='radio'>
          {/* Player */}
          <div className='player'>
            <div className='album-art-wrapper'>
              <img id='myImage' src={selectedAlbum.artUrl} alt='' />
            </div>

            <div className='album-info'>
              <div className='album-info-song'>{selectedSong.name}</div>
              <div className='album-info-album'>{selectedSong.album}</div>
            </div>

            <div className='controls'>
              {/* Progress Bar */}
              <div className='progress-bar'>
                <div className='progress' />
                <div className='duration-wrapper'>
                  <span id='current-time' />
                  <span id='duration' />
                </div>
              </div>

              <audio src={selectedSong.fileUrl} controls ref={audioRef}></audio>

              {/* Control Buttons */}
              <div className='control-buttons'>
                <i
                  className='fa-solid fa-shuffle'
                  title='Shuffle'
                  onClick={shuffleSongs}
                ></i>

                <div className='main-control-buttons'>
                  <i
                    className='fas fa-backward'
                    id='prev'
                    title='Previous'
                    onClick={prevSong}
                  ></i>
                  <div className='play-button-wrapper' onClick={togglePlaySong}>
                    <i
                      className={`fas ${
                        songIsPlaying ? 'fa-pause' : 'fa-play'
                      }`}
                      id={songIsPlaying ? 'pause' : 'play'}
                      title={songIsPlaying ? 'Pause' : 'Play'}
                      ref={audioPlayBtnRef}
                    ></i>
                  </div>
                  <i
                    className='fas fa-forward'
                    id='next'
                    title='Next'
                    onClick={nextSong}
                  ></i>
                </div>
                <i
                  className='fa-solid fa-repeat'
                  title='Repeat'
                  onClick={repeatSong}
                ></i>
              </div>

              <div className='volume-slider'>volume -----------</div>
            </div>
          </div>

          {/* Radio Menu */}
          <div className='radio-menu'>
            {radioMenuSongs.map((song) => {
              return (
                <div
                  key={song.id}
                  className={`entry ${
                    song.id === selectedSong.id && 'entry-is-selected'
                  }`}
                >
                  <div className='song'>
                    <i className='fas fa-play' title='Play'></i>
                    <span className='song-name'>{song.name}</span>
                  </div>
                  <span className='details'>
                    <span className='song-length'>{song.duration}</span>
                    <i className='fa-solid fa-ellipsis song-menu'></i>
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Album Carousel */}
        <div id='carousel-wrapper' className='section'>
          <div className='carousel'>Album Carousel</div>
        </div>
      </div>

      {/* merch */}
      <div id='merch-wrapper' className='section'>
        <h2>Merch</h2>
        <div id='merch'>
          {merchItems.map((item, index) => {
            return (
              <div className='merch-card' key={`merch-${item}-${index}`}>
                {item}
              </div>
            )
          })}
          {/* TO DO: Fix this with a function */}
          <div className='merch-card-shim' />
          <div className='merch-card-shim' />
          <div className='merch-card-shim' />
          <div className='merch-card-shim' />
          <div className='merch-card-shim' />
        </div>
      </div>

      {/* reachme */}
      <div id='reachme-wrapper' className='section'>
        <h2>Reach Out!</h2>
        <div id='reachme'>
          <div id='reachme-signup'>
            <h2>Sign Up</h2>
            <p>Sign up to receive Taz&apos;s latest news and music!</p>
            <input type='text' placeholder='Email' />
            <div className='signup-btn-wrapper'>
              <button>Sign Up</button>
            </div>
          </div>
          <div id='reachme-contact'>
            <h2>Contact Taz</h2>
            <input
              type='text'
              placeholder='Name'
              className='name-input contact-field'
            />
            <input type='text' placeholder='Email' className='contact-field' />
            {/* value={text}
            onChange={(e) => setText(e.target.value)} */}
            <textarea
              name='Comment'
              placeholder='Write me a note...'
              className='contact-field'
            />

            <div className='contact-me-btn-wrapper'>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <div id='footer' className='section'>
        <div className='footer-social'>
          {footerSocialIcons.map((name, index) => {
            return (
              <div className='fa-brands-wrapper' key={`${name}-${index}`}>
                <i className={`fa-brands ${name}`}></i>
              </div>
            )
          })}
        </div>
        <div className='footer-info'>
          <i className='fa-solid fa-copyright' />
          <span>2024 Taz Marvin</span>
        </div>
      </div>
    </div>
  )
}

export default Client

