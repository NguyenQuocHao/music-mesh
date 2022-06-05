import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './PlaylistPage.scss';
import { useDispatch } from 'react-redux';
import { addTrack, } from '../../../redux/reducers/queue';
import axios from 'axios';
import DropDown from "./DropDown";
import { HOST } from '../../../variables';
import { useAlert } from "react-alert";
import Player from './Player';
import TrackItem from './TrackItem';
import { FaPlus } from 'react-icons/fa';
import { TrackAddedNoti } from '../../../variables';

export default function PlaylistPage() {
  const { id } = useParams()
  const dispatch = useDispatch();
  const [info, setInfo] = useState(null);
  const [tracks, setTracks] = useState([]);
  const alertReact = useAlert();
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

  function addTrackToQueue(index) {
    if (index) {
      dispatch(addTrack(tracks[index]));
    }
    else {
      dispatch(addTrack(info));
    }

    alertReact.success(TrackAddedNoti);
  }

  const dropDownItems = [
    {
      icon: <FaPlus></FaPlus>,
      actionName: "Add to Queue",
      handler: addTrackToQueue
    }
  ]

  return (
    <>
      <Player source={source} videoId={type === "playlist" ? tracks[currentTrackIndex]?.id : id} onEndedHandler={() => { let setIndex = currentTrackIndex < tracks.length - 1 ? currentTrackIndex + 1 : currentTrackIndex; setCurrentTrackIndex(setIndex) }}></Player>
      {type === "song" && <DropDown items={dropDownItems}></DropDown>}
      <div>
        {tracks.map((track, index) =>
          <TrackItem key={track.id} track={track} dropDown={<DropDown items={dropDownItems} trackIndex={index}></DropDown>} chooseTrackHandler={() => { setCurrentTrackIndex(index) }} active={index != currentTrackIndex}></TrackItem>
        )}
      </div>
    </>
  )
}