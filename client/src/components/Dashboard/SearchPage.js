import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import vars from '../../variables.js';
import PadList from '../Music/MusicPad/PadList';
import { HOST } from '../../variables';

export default function SearchPage() {
    const { query } = useParams();
    const [spotifyTracks, setSpotifyTracks] = useState(null);
    const [spotifyPlaylists, setSpotifyPlaylists] = useState(null);
    const [youtubeTracks, setYoutubeTracks] = useState(null);
    const lists = [
        {
            title: "Spotify Tracks",
            data: spotifyTracks,
            source: "spotify",
            type: vars.song,
        },
        {
            title: "Spotify Playlists",
            data: spotifyPlaylists,
            source: "spotify",
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
        axios.get(`${HOST}/spotify/search/${query}`)
            .then(function (data) {
                setSpotifyTracks(data.data.tracks)
                setSpotifyPlaylists(data.data.playlists)
            })
            .catch(err => { setSpotifyTracks(null); setSpotifyPlaylists(null) })

        axios.get(`${HOST}/youtube/search/${query}`)
            .then(function (data) {
                setYoutubeTracks(data.data)
            })
            .catch(err => { setYoutubeTracks(null) })
    }, [query])

    return (
        <>
            {lists.map(item => item.data != null ?
                <PadList data={item.data} title={item.title} source={item.source} location="dashboard" type={item.type}></PadList>
                : null
            )}
        </>
    )
}