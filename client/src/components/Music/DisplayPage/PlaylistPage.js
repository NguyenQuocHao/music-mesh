import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './PlaylistPage.scss';
import axios from 'axios';
import { TrackDropDown } from "../../Navigation/DropDown/DropDown";
import { HOST } from '../../../variables';
import Player from './Player';
import TrackItem from './TrackItem';

export default function PlaylistPage() {
  const { id } = useParams()
  const [info, setInfo] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const splits = window.location.pathname.split('/')
  const source = splits[1]
  const type = splits[2]

  useEffect(() => {
    if (type === "song") {
      async function getTrack() {
        await axios.get(`${HOST}/${source}/getTrack/${id}`)
          .then(data => {
            setInfo({
              id: data.data?.id,
              title: data.data?.title,
              image: data.data?.image,
              artist: data.data?.artist,
              source: source,
            })
          })
      }

      getTrack()
    }
    else {
      async function getPlaylistTracks() {
        await axios.get(`${HOST}/${source}/getPlaylistTracks/${id}`)
          .then(data => {
            setTracks(data.data)
          })
      }

      getPlaylistTracks()
    }
  }, [id])

  useEffect(() => {
    setCurrentTrack();
  }, [currentTrackIndex])

  useEffect(() => {
    // This will prevent setting null/undefined for 1st track
    setCurrentTrack();
  }, [tracks])

  const setCurrentTrack = async () => {
    setInfo({
      id: tracks[currentTrackIndex]?.id,
      title: tracks[currentTrackIndex]?.title,
      image: tracks[currentTrackIndex]?.image,
      artist: tracks[currentTrackIndex]?.artist,
      source: source,
    })
  }

  return (
    <>
      <Player source={source}
        videoId={type === "playlist" ? tracks[currentTrackIndex]?.id : id}
        onEndedHandler={() => { setCurrentTrackIndex(currentTrackIndex < tracks.length - 1 ? currentTrackIndex + 1 : currentTrackIndex) }}>
      </Player>
      {type === "song" && <TrackDropDown track={info} add></TrackDropDown>}
      <div>
        {tracks.map((track, index) =>
          <TrackItem key={`${track.id}:${index}`}
            track={track}
            selectTrackHandler={() => { setCurrentTrackIndex(index) }}
            active={index != currentTrackIndex}
            dropDown={<TrackDropDown track={track} trackIndex={index} add></TrackDropDown>}>
          </TrackItem>
        )}
      </div>
    </>
  )
}