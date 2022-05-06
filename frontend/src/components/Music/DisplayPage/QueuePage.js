import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import './PlaylistPage.scss'
import SpotifyPlayer from 'react-spotify-web-playback';
import ReactPlayer from 'react-player/youtube';
import NavButton from '../../Navigation/NavButton';


export default function QueuePage() {
  const [url, setUrl] = useState("")
  const { id } = useParams()
  const [queue, setQueue] = useState([{ id: "F6m_jKpck30", artist: "Mass Effect", title: "Elevator song" },
  { id: "BhQtc48SVls", artist: "Lofi", title: "Upbeating Lofi" },
  { id: "BhQtc48SVls", artist: "Lofi", title: "Upbeating Lofi" },
  { id: "kijR9e418t8", artist: "Lofi", title: "Autumn Lofi" },
  { id: "kijR9e418t8", artist: "Lofi", title: "Autumn Lofi" },

  ])
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  //
  useEffect(() => {
    var embededLink = ""
    const currentLink = window.location.href
    if (currentLink.includes("youtube")) {
      if (currentLink.includes("song")) {
        embededLink = "https://www.youtube.com/embed/" + id
      }
      else if (currentLink.includes("playlist")) {
        embededLink = "https://www.youtube.com/embed/videoseries?list=" + id
      }
    }
    else {
      if (currentLink.includes("song")) {
        embededLink = "https://open.spotify.com/embed/track/" + id
      }
      else if (currentLink.includes("playlist")) {
        embededLink = "https://open.spotify.com/embed/playlist/" + id
      }
    }

    setUrl(embededLink)
  }, [id])

  function removeTrackFromQueue(index) {
    queue.splice(index, 1);
    console.log(queue)
  }

  return (
    <div className="background">
      {/* <div className="main-media">
        <iframe src={url} width="100%" height="380" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
      </div> */}

      <ReactPlayer className="inline" controls playing={true}
        url={'https://www.youtube.com/watch?v=' + queue[currentTrackIndex].id} onEnded={() => { setCurrentTrackIndex(currentTrackIndex + 1) }} />
      <div>
        {queue.map((track, index) => <div key={track.id}>
          <div className='queue-item'>
            <a href='#' onClick={() => setCurrentTrackIndex(index)}  className="queue-item-left">
              <img className={index != currentTrackIndex ? 'queue unactive-track' : 'queue'} src={`https://i.ytimg.com/vi/${track.id}/hqdefault.jpg`} />
              <span>
                <div>{track.title}</div>
                <div className='artist-name'>{track.artist}</div>
              </span>
            </a>
            {/* <a href='#' onClick={() => { setQueue(queue.filter((a, i) => i !== index));}} className='more-options'>Remove</a> */}
          </div>
        </div>)}
      </div>
    </div>
  )
}
