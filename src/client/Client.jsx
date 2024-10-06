/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react'
// import React, { Component } from 'react'
// import { CSSTransition } from 'react-transition-group'
import './client.scss'
import albums from '../data/albums.js'
import VolumeSlider from '../components/VolumeSlider.jsx'

// import { useRenderCount } from "@uidotdev/usehooks";
// const renderCount = useRenderCount();
// const [count, setCount] = React.useState(0);

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

// State variables
const Client = () => {
  const [selectedSong, setSelectedSong] = useState({})
  const [selectedSongMenuEntry, setSelectedSongMenuEntry] = useState({})
  const [isPlaying, setIsPlaying] = useState(false)
  //const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAlbum, setSelectedAlbum] = useState({})
  const [selectedAlbumSongs, setSelectedAlbumSongs] = useState([])
  const [songQueue, setSongQueue] = useState([])
  const [isShuffled, setIsShuffled] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isRepeated, setIsRepeated] = useState(false)
  const [progressBarWidth, setProgressBarWidth] = useState('0%')
  // const [entryIsHovered, setEntryIsHovered] = useState('')
  const [audioVolume, setAudioVolume] = useState(0)
  // const [audioMuted, setAudioMuted] = useState(false)

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

  // Audio tag handlers
  const handleAudioTimeUpdate = () => {
    // if there's no audio el, do nothing
    if (!audioRef.current) {
      return
    }

    // calc how much of song duration has elapsed
    const currentTimeInMs = audioRef.current.currentTime
    const durationInMs = audioRef.current.duration
    const progressRatio =
      currentTimeInMs === 0 ? 0 : currentTimeInMs / durationInMs

    // update player timestamp and progress bar to reflect current time
    const updatedTime = getTimestamp(currentTimeInMs)

    // if timestamp has not changed, return
    // (greatly reduces re-renders)
    if (updatedTime === currentTime && updatedTime != duration) {
      return
    }

    // else, update timestamp on player ui
    setCurrentTime(updatedTime)

    // update progress bar based on coin toss to make it less clunky looking
    // if (updatedTime === duration || Math.random() < 0.5) {
    //   setProgressBarWidth(`${Math.round(progressRatio * 100)}%`)
    // }

    // update progress bar
    setProgressBarWidth(`${Math.round(progressRatio * 100)}%`)
  }

  const handleAudioLoadedMetadata = () => {
    if (audioRef.current) {
      const duration = getTimestamp(audioRef.current.duration)
      setDuration(duration)
    }
  }

  const handleAudioEnded = () => {
    console.log('audio ended')
    nextSong()
  }

  const handleAudioLoadedData = () => {
    console.log('loaded data')
    // const currentIndex = songQueue.findIndex(
    //   (song) => song.id === selectedSong.id
    // )

    if (isPlaying) {
      playSong()
    }
  }

  // const handleTimeUpdate = () => {
  //   console.log('time update')
  // }

  // Player Control Functions
  const playSong = () => {
    audioRef.current.play()
    setIsPlaying(true)
  }

  const pauseSong = () => {
    audioRef.current.pause()
    setIsPlaying(false)
  }

  const prevSong = () => {
    const currentIndex = currentSongIndex()
    const prevIndex =
      currentIndex === 0 ? songQueue.length - 1 : currentIndex - 1
    const prevSong = songQueue[prevIndex]

    setSelectedSong(prevSong)
    setSelectedSongMenuEntry(prevSong)
    loadSong(prevSong)
  }

  const nextSong = () => {
    console.log(`next, currentIndex: ${currentSongIndex()}`)
    // at the end of the song queue, stop playing
    // unless user enabled repeat option
    if (currentSongIndex() === songQueue.length - 1 && !isRepeated) {
      console.log('do not repeat')
      resetCurrentSong()
      return
    }

    const currentIndex = currentSongIndex()
    const nextIndex =
      currentIndex === songQueue.length - 1 ? 0 : currentIndex + 1
    const nextSong = songQueue[nextIndex]

    setSelectedSong(nextSong)
    setSelectedSongMenuEntry(nextSong)
    loadSong(nextSong)

    if (isPlaying) {
      console.log('next -> playSong')
      playSong()
    }
  }

  const shuffleArray = (array) => {
    // shuffle with Fisher-Yates algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const toggleShuffleSongs = () => {
    const shuffleIsSelected = !isShuffled
    if (shuffleIsSelected) {
      const shuffledSongs = shuffleArray([...songQueue])
      setSongQueue(shuffledSongs)
    } else {
      setSongQueue(selectedAlbumSongs)
    }

    setIsShuffled(shuffleIsSelected)
  }

  const repeatSong = () => {
    console.log('repeat')
    setIsRepeated(!isRepeated)
  }

  const loadSong = (song) => {
    console.log('load')
    audioRef.src = song
    handleAudioTimeUpdate()
    handleAudioLoadedMetadata()
  }

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

  const handleAudioVolumeChange = (audioVolume) => {
    console.log('parent volume: ', audioVolume)
    setAudioVolume(audioVolume)
    audioRef.current.volume = audioVolume
  }

  // const handleAudioMutedChange = (audioMuted) => {
  //   if (audioMuted) {
  //     //audioRef.current.volume = 0
  //     setAudioVolume(0)

  //   }
  //   setAudioMuted(audioMuted)
  // }

  // Song Menu Events
  const selectSongMenuEntry = (event) => {
    const songId = event.currentTarget.getAttribute('data-songid')
    const song = getSongById(songId)[0]
    setSelectedSongMenuEntry(song)
  }

  const playSelectedSongMenuEntry = (event) => {
    const songId = event.target.getAttribute('data-songid')
    const song = getSongById(songId)[0]
    setSelectedSong(song)
    loadSong(song)
    playSong(song)
  }

  //
  // Helpers
  //
  const getSongById = (songId) => {
    return songQueue.filter((song) => song.id === songId)
  }

  const resetCurrentSong = () => {
    setProgressBarWidth('0%')
    setCurrentTime(getTimestamp(0))
    pauseSong()
  }

  const currentSongIndex = () => {
    return songQueue.findIndex((song) => song.id === selectedSong.id)
  }

  // API
  const callApiForDefaultAlbumData = () => {
    return albums[0]
  }

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

  useEffect(() => {
    const selectedAlbum = callApiForDefaultAlbumData()
    const selectedSong = selectedAlbum.songs[0]
    const selectedSongMenuEntry = selectedAlbum.songs[0]
    const selectedAlbumSongs = selectedAlbum.songs

    setSelectedAlbum(selectedAlbum)
    setSelectedSong(selectedSong)
    setSelectedSongMenuEntry(selectedSongMenuEntry)
    setSelectedAlbumSongs(selectedAlbumSongs)
    setSongQueue(selectedAlbumSongs)

    if (audioRef.current) {
      loadSong(selectedSong.fileUrl)
      audioRef.current.volume = audioVolume
    }
  }, [])

  useEffect(() => {
    //console.log('use effect render')
  })
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
        <h2 style={{ opacity: '.5' }}>Taz Radio</h2>
        {/* Marquee */}
        <marquee behavior='scroll' direction='left' className='radio-marquee'>
          <span>
            {selectedSong.track}. &quot;{selectedSong.name}&quot;{' '}
          </span>
          <span>
            &ndash;&nbsp;{selectedSong.album}
            {/* (Taz Marvin Music,{' '}
            {selectedSong.released}) */}
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
                />

                <div className='main-control-buttons'>
                  <i
                    className='fas fa-backward'
                    id='prev'
                    title='Previous'
                    onClick={prevSong}
                  />
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
                    />
                    <i
                      className='fas fa-pause'
                      id='pause'
                      title='Pause'
                      onClick={pauseSong}
                      style={playerStyles.pauseBtn}
                    />
                  </div>
                  <i
                    className='fas fa-forward'
                    id='next'
                    title='Next'
                    onClick={nextSong}
                  />
                </div>
                <i
                  className='fa-solid fa-repeat'
                  id='repeat'
                  title='Repeat songs'
                  onClick={repeatSong}
                  style={playerStyles.repeatBtn}
                />
              </div>

              {/* Volume Slider */}
              <VolumeSlider onVolumeChange={handleAudioVolumeChange} />
            </div>
          </div>

          {/* Radio Menu */}
          <div className='radio-menu'>
            {songQueue.map((song) => {
              return (
                <div
                  key={song.id}
                  className={`entry ${
                    song.id === selectedSongMenuEntry.id && 'entry-is-selected'
                  }`}
                  data-songid={song.id}
                  onClick={selectSongMenuEntry}
                >
                  <div className='song'>
                    <span className='track-wrapper'>
                      <span className='song-track'>{song.track}</span>
                      <i
                        className='fas fa-play'
                        title='Play'
                        data-songid={song.id}
                        onClick={playSelectedSongMenuEntry}
                      />
                    </span>
                    <span className='song-name'>{song.name}</span>
                  </div>
                  <span className='details'>
                    <span className='song-length'>{song.duration}</span>
                    <i className='fa-solid fa-ellipsis song-menu' />
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
                <i className={`fa-brands ${name}`} />
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

