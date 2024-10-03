/* eslint-disable react-hooks/exhaustive-deps */
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
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedAlbum, setSelectedAlbum] = useState({})
  const [radioMenuSongs, setRadioMenuSongs] = useState([])
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isShuffled, setIsShuffled] = useState(false)
  const [isRepeated, setIsRepeated] = useState(false)
  const [progressBarWidth, setProgressBarWidth] = useState('0%')

  const playerStyles = {
    progressBar: { width: progressBarWidth },
    playBtn: { display: isPlaying ? 'none' : 'inline' },
    pauseBtn: { display: isPlaying ? 'inline' : 'none' },
    shuffleBtn: {
      opacity: isShuffled ? '1' : '0.6',
      textShadow: isShuffled ? '0px 0px 10px #fff' : 'none',
    },
    repeatBtn: {
      opacity: isRepeated ? '1' : '0.6',
      textShadow: isRepeated ? '0px 0px 10px #fff' : 'none',
    },
  }

  const audioRef = useRef(null)
  //const songProgressRef = useRef()
  // const audioPlayBtnRef = useRef(null)
  // const audioPauseBtnRef = useRef(null)

  // get timestamp for progressbar
  const getTimestamp = (time) => {
    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time % 60)
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    if (seconds < 10) {
      seconds = `0${seconds}`
    }
    return `${minutes}:${seconds}`
  }

  // Player Control Functions
  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      console.log('handle Audio Time Update')
      const currentTimeInMs = audioRef.current.currentTime
      const durationInMs = audioRef.current.duration
      const progressRatio =
        currentTimeInMs === 0 ? 0 : currentTimeInMs / durationInMs

      // set progress-bar width in the player ui
      setProgressBarWidth(`${Math.round(progressRatio * 100)}%`)

      // update current timestamp in player ui
      const currentTime = getTimestamp(currentTimeInMs)
      setCurrentTime(currentTime)
    }
  }

  const handleAudioLoadedMetadata = () => {
    if (audioRef.current) {
      const currentTime = getTimestamp(audioRef.current.duration)
      setDuration(currentTime)
    }
  }

  const handleAudioEnded = () => {
    nextSong()
  }

  const handleAudioLoadedData = () => {
    console.log('loaded data')
    if (isPlaying) {
      playSong()
    }
  }

  // const handleTimeUpdate = () => {
  //   console.log('time update')
  // }

  const playSong = () => {
    audioRef.current.play()
    setIsPlaying(true)
  }

  const pauseSong = () => {
    audioRef.current.pause()
    setIsPlaying(false)
  }

  const prevSong = () => {
    const currentIndex = selectedSong.track - 1
    const prevIndex =
      currentIndex === 0 ? radioMenuSongs.length - 1 : currentIndex - 1
    const prevSong = radioMenuSongs[prevIndex]

    setSelectedSong(prevSong)
    loadSong(selectedSong)
  }

  const nextSong = () => {
    const currentIndex = selectedSong.track - 1
    const nextIndex =
      currentIndex === radioMenuSongs.length - 1 ? 0 : currentIndex + 1
    const nextSong = radioMenuSongs[nextIndex]

    setSelectedSong(nextSong)
    loadSong(nextSong)
  }

  const toggleShuffleSongs = () => {
    console.log('shuffle')
    setIsShuffled(!isShuffled)
  }

  const repeatSong = () => {
    console.log('repeat')
    setIsRepeated(!isRepeated)
  }

  const loadSong = (song) => {
    audioRef.src = song
    handleAudioTimeUpdate()
    handleAudioLoadedMetadata()
  }

  // Set song progress when user clicks on progress bar
  const setSongProgress = (e) => {
    const selectedProgress = e.nativeEvent.offsetX
    const progressRatio = selectedProgress / e.target.parentNode.offsetWidth
    const selectedTimeInMs = audioRef.current.duration * progressRatio

    // set ms duration in the html audio controls
    audioRef.current.currentTime = selectedTimeInMs

    // set selected timestamp in the player ui
    setCurrentTime(getTimestamp(selectedTimeInMs))

    // set progress-bar width in the player ui
    setProgressBarWidth(`${Math.round(progressRatio * 100)}%`)
  }

  // API helpers
  const callApiForDefaultAlbumData = () => {
    return albums[0]
  }

  useEffect(() => {
    const selectedAlbum = callApiForDefaultAlbumData()
    const selectedSong = selectedAlbum.songs[0]
    const radioMenuSongs = selectedAlbum.songs

    setSelectedAlbum(selectedAlbum)
    setSelectedSong(selectedSong)
    setRadioMenuSongs(radioMenuSongs)

    if (audioRef.current) {
      loadSong(selectedSong.fileUrl)
    }
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
              <div className='progress-bar' onClick={setSongProgress}>
                {/* <div className='progress' ref={songProgressRef} /> */}
                <div
                  className='progress'
                  value={currentTime}
                  max={duration}
                  style={playerStyles.progressBar}
                />
                <div className='duration-wrapper'>
                  <span id='current-time'>{currentTime}</span>
                  <span id='duration'>{duration}</span>
                </div>
              </div>

              <audio
                type='audio/mpeg'
                ref={audioRef}
                src={selectedSong.fileUrl}
                onTimeUpdate={handleAudioTimeUpdate}
                onLoadedMetadata={handleAudioLoadedMetadata}
                onLoadedData={handleAudioLoadedData}
                onEnded={handleAudioEnded}
                controls
              />
              {/* onTimeUpdate={handleTimeUpdate} */}

              {/* Control Buttons */}
              <div className='control-buttons'>
                <i
                  className='fa-solid fa-shuffle'
                  title='Shuffle songs'
                  onClick={toggleShuffleSongs}
                  style={playerStyles.shuffleBtn}
                ></i>

                <div className='main-control-buttons'>
                  <i
                    className='fas fa-backward'
                    id='prev'
                    title='Previous'
                    onClick={prevSong}
                  ></i>
                  <div
                    className='play-button-wrapper'
                    onClick={isPlaying ? pauseSong : playSong}
                  >
                    <i
                      className='fas fa-play'
                      id='play'
                      title='Play'
                      onClick={playSong}
                      style={playerStyles.playBtn}
                    ></i>
                    <i
                      className='fas fa-pause'
                      id='pause'
                      title='Pause'
                      onClick={pauseSong}
                      style={playerStyles.pauseBtn}
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
                  id='repeat'
                  title='Repeat songs'
                  onClick={repeatSong}
                  style={playerStyles.repeatBtn}
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

