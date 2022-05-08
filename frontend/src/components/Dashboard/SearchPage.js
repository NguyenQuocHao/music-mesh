import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import vars from '../../variables.js';
import PadList from '../Music/MusicPad/PadList';

export default function SearchPage() {
    const { query } = useParams()
    const [spotifyTracks, setSpotifyTracks] = useState([])
    const [spotifyPlaylists, setSpotifyPlaylists] = useState([])
    const [youtubeTracks, setYoutubeTracks] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/spotify/search/' + query)
            .then(function (data) {
                setSpotifyTracks(data.data.tracks)
                setSpotifyPlaylists(data.data.playlists)
            })

        axios.get('http://localhost:5000/youtube/search/' + query)
            .then(function (data) {
                console.log(data)
                setYoutubeTracks(data.data)
            })

    }, [])

    return (
        <div className="dashboard">
            <PadList data={spotifyTracks} title="Spotify tracks" source="spotify" location="dashboard" type={vars.song}></PadList>
            <PadList data={spotifyPlaylists} title="Spotify playlists" source="spotify" location="dashboard" type={vars.playlist}></PadList>
            <PadList data={youtubeTracks} title="Youtube tracks" source="youtube" location="dashboard" type={vars.song}></PadList>
        </div>
    )
}