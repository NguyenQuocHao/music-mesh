import React from 'react'
import { useLocation, Link } from "react-router-dom"

export default function PlaylistPage() {
  const { state } = useLocation();

  var embededLink = 'https://open.spotify.com/embed/playlist/'+state.id;

  return (
    <div>
      <iframe src={embededLink} width="100%" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    </div>
  )
}
