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
    const lists = [
        {
            title: "Spotify Tracks",
            data: spotifyTracks,
            source: "spotify",
            type: vars.playlist,
        },
        {
            title: "Spotify Playlists",
            data: spotifyPlaylists,
            source: "youtube",
            type: vars.playlist
        },
        {
            title: "Youtube Tracks",
            data: youtubeTracks,
            source: "youtube",
            type: vars.song
        },
    ]

    useEffect(() => {
        axios.get('http://localhost:5000/spotify/search/' + query)
            .then(function (data) {
                setSpotifyTracks(data.data.tracks)
                setSpotifyPlaylists(data.data.playlists)
            })
            .catch(err => { setSpotifyTracks(null); setSpotifyPlaylists(null) })

        axios.get('http://localhost:5000/youtube/search/' + query)
            .then(function (data) {
                setYoutubeTracks(data.data)
            })
            .catch(err => { setYoutubeTracks(null) })
    }, [])

    return (
        <div className="dashboard">
            {lists.map(item => item.data != null ?
                <PadList data={item.data} title={item.title} source={item.source} location="dashboard" type={item.type}></PadList>
                : null
            )}
        </div>
    )
}