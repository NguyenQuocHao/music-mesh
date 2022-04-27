import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import './PlaylistPage.scss'

export default function PlaylistPage() {
  const [url, setUrl] = useState("")
  const {id} = useParams()

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

  return (
    <div className="background">
      <div className="main-media">
        <iframe src={url} width="100%" height="380" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
      </div>
      {/* <div className="song-list">
        <SongList data={relatedVideos} tiFtle="Related music" site="youtube" page="display"></SongList>
      </div> */}
    </div>
  )
}
