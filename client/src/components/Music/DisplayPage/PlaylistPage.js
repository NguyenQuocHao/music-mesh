import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './PlaylistPage.scss';
import { useDispatch } from 'react-redux';
import { addTrack, } from '../../../redux/reducers/queue';
import axios from 'axios';
import { FaEllipsisH } from "react-icons/fa";
import { HOST } from '../../../variables';
import { useAlert } from "react-alert";
import ReactPlayer from 'react-player/youtube';

export default function PlaylistPage() {
  const { id } = useParams()
  const dispatch = useDispatch();
  const [info, setInfo] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const notificationsMessage = "Track added";
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

  const addTrackToQueue = () => {
    dispatch(addTrack(info));
    alertReact.success(notificationsMessage);
  }

  function getPlayer() {
    const videoId = type === "playlist" ? tracks[currentTrackIndex]?.id : id;
    if (source === "youtube") {
      return <ReactPlayer className="player" width="100%" height="380" controls playing={true}
        url={'https://www.youtube.com/watch?v=' + videoId} onEnded={() => { setCurrentTrackIndex(currentTrackIndex + 1) }} />
    }

    return <iframe src={"https://open.spotify.com/embed/track/" + videoId} width="100%" height="380" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
  }

  return (
    <div className="background">
      {getPlayer()}
      <div className='ellipsis'>
        <FaEllipsisH onClick={() => { setShowDropDown(!showDropDown); }} />
        {showDropDown &&
          <div className='track-dropdown'>
            <div className='track-dropdown-item' onClick={() => { addTrackToQueue(); }}>Add to Queue</div>
          </div>}
      </div>
      <div>
        {tracks.map((track, index) =>
          <div key={index + ":" + track.id}>
            <div className={index != currentTrackIndex ? 'queue-item unactive-track' : 'queue-item'}>
              <div onClick={() => setCurrentTrackIndex(index)} className="queue-item-left">
                <img className={'queue-item-image'} src={track.image} />
                <span>
                  <div>{track.title}</div>
                  <div className='artist-name'>{track.artist}</div>
                </span>
              </div>
            </div>
          </div>)}
      </div>
    </div>
  )
}
