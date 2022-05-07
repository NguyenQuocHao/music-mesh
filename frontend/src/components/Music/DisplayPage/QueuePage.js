import { useState, useEffect } from 'react'
import './PlaylistPage.scss'
import ReactPlayer from 'react-player/youtube';
import { myQueue } from '../../../redux/reducers/queue';
import { useSelector, useDispatch } from 'react-redux';
import { removeTrackByIndex } from '../../../redux/reducers/queue';

export default function QueuePage() {
    const queue = useSelector(myQueue);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const dispatch = useDispatch();

    function removeTrack(index) {
        dispatch(removeTrackByIndex(index))

        if (index < currentTrackIndex) {
            setCurrentTrackIndex(currentTrackIndex - 1)
        }
    }

    function getPlayer(track) {
        if (track.source === "youtube") {
            return <ReactPlayer className="player" width="100%" height="380" controls playing={true}
                url={'https://www.youtube.com/watch?v=' + queue[currentTrackIndex]?.id} onEnded={() => { setCurrentTrackIndex(currentTrackIndex + 1) }} />
        }

        return <iframe src={"https://open.spotify.com/embed/track/" + queue[currentTrackIndex].id} width="100%" height="380" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
    }

    return (
        <div className="background">
            {console.log(queue)}
            Queue
            {queue.length == 0 ? <div>Empty</div> :
                <div>
                    {getPlayer(queue[currentTrackIndex])}
                    <div>
                        {queue.map((track, index) => <div key={track.id}>
                            <div className={index != currentTrackIndex ? 'queue-item unactive-track' : 'queue-item'}>
                                <a href='#' onClick={() => setCurrentTrackIndex(index)} className="queue-item-left">
                                    <img className={'queue-item-image'} src={track.image} />
                                    <span>
                                        <div>{track.title}</div>
                                        <div className='artist-name'>{track.artist}</div>
                                    </span>
                                </a>
                                <a href='#' onClick={() => { removeTrack(index) }} className='more-options'>Remove</a>
                            </div>
                        </div>)}
                    </div>
                </div>}

        </div>
    )
}
