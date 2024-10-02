import './client.scss'

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

const albumArtUrl =
  'https://images.unsplash.com/photo-1467480613746-552533b68555?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

const playSong = () => {}
const pauseSong = () => {}
const shuffleSongs = () => {}
const repeatSong = () => {}
const prevSong = () => {}
const nextSong = () => {}

const Client = () => {
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
      <div id='thoughts-wrapper' className='section'>
        <h2>Thought Street</h2>
        <div id='thoughts'>
          <div id='thoughts-image'>
            <img
              src='https://images.unsplash.com/photo-1727459740748-a0004bd98ed6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt=''
            />
          </div>
          <div className='thoughts-text'>
            <h4>Recent Thoughts...</h4>
            <span>{thoughtText}</span>
          </div>
          <div id='thoughts-btn'>
            <i className='fa-solid fa-arrow-right' />
          </div>
        </div>
      </div>

      {/* radio */}
      <div id='radio-wrapper' className='section'>
        <h2>Taz Radio</h2>
        {/* Marquee */}
        <marquee behavior='scroll' direction='left' className='radio-marquee'>
          <span>4. &quot;Dandelion&quot; </span>
          <span>&ndash;&nbsp;Dandelion (Taz Marvin Music, 2022)</span>
        </marquee>

        <div id='radio'>
          {/* Player */}
          <div className='player-wrapper'>
            <div className='player'>
              <div className='album-art-wrapper'>
                <img id='myImage' src={albumArtUrl} alt='' />
              </div>

              <div className='album-info'>
                <div>Song Name</div>
                <div>Album Name</div>
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

                <audio src='' controls></audio>

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
                    <i
                      className='fas fa-play main-button'
                      id='play'
                      title='Play'
                      onClick={playSong}
                    ></i>
                    {/* <i
                      className='fas fa-pause main-button'
                      id='pause'
                      title='Pause'
                      onClick={pauseSong}
                    ></i> */}
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
          </div>

          <div className='menu-wrapper'>
            <div className='radio-menu'>
              <div className='entry'>
                <div className='song'>
                  <i className='fas fa-play' title='Play'></i>
                  <span className='song-name'>Song one</span>
                </div>
                <span className='details'>
                  <span className='length'>5:38</span>
                  <i className='fa-solid fa-ellipsis song-menu'></i>
                </span>
              </div>

              <div className='entry'>
                <div className='song'>
                  <i className='fas fa-play' title='Play'></i>
                  <span className='song-name'>Song one</span>
                </div>
                <span className='details'>
                  <span className='length'>5:38</span>
                  <i className='fa-solid fa-ellipsis song-menu'></i>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Album Carousel */}
        <div id='carousel-wrapper' className='section'>
          <div className='carousel'>Album Carousel</div>
        </div>
      </div>

      {/* merch */}
      <div id='merch-wrapper' className='section'>
        <h2>Merch House</h2>
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
            <p>Sign up to receive Taz's latest news and music!</p>
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

