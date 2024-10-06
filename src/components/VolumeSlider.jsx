/* eslint-disable react/prop-types */
import { useState } from 'react'

const VolumeSlider = (props) => {
  const [volume, setVolume] = useState(0)
  const [muted, setMuted] = useState(true)
  const [prevVolume, setPrevVolume] = useState(0.5)

  const updateVolumeProps = (volume) => {
    props.onVolumeChange(volume)
  }

  const handleVolumeChange = (event) => {
    const volume = event.target.value

    // if slider was moved above 0, then unmute
    if (volume > 0) {
      setMuted(false)
    }

    setVolume(volume)
    setPrevVolume(volume)
    updateVolumeProps(volume)
  }

  const handleMutedChange = () => {
    // if slider was muted, save prev vol then set vol to 0
    if (muted) {
      setMuted(false)
      setVolume(prevVolume)
      updateVolumeProps(prevVolume)
    }

    // if slider was unmuted, restore prev vol (init val is .5)
    if (!muted) {
      setMuted(true)
      setPrevVolume(volume)
      setVolume(0)
      updateVolumeProps(0)
    }
  }

  const sliderStyles = {
    slider: { display: 'flex', justifyContent: 'center' },
    unmuted: { display: muted ? 'none' : 'inline' },
    muted: { display: muted ? 'inline' : 'none' },
  }

  return (
    <div className='volume-slider' style={sliderStyles.slider}>
      <div className='mute-btn'>
        <div onClick={handleMutedChange}>
          <i className='fa-solid fa-volume-high' style={sliderStyles.unmuted} />
          <i className='fa-solid fa-volume-xmark' style={sliderStyles.muted} />
        </div>
      </div>
      <input
        type='range'
        min={0}
        max={1}
        step={0.02}
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  )
}

export default VolumeSlider

