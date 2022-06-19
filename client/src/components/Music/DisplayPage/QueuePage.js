import './PlaylistPage.scss';
import { myQueue } from '../../../redux/reducers/queue';
import { useDispatch, useSelector } from 'react-redux';
import { FaMusic } from "react-icons/fa";
import TrackItem from './TrackItem';
import Player from './Player';
import { TrackDropDown } from '../../Navigation/DropDown/DropDown';
import { currentTrackIndex, setCurrentTrackIndex } from '../../../redux/reducers/queue';

export default function QueuePage() {
    const dispatch = useDispatch();
    const queue = useSelector(myQueue);
    const currentIndex = useSelector(currentTrackIndex);

    return (
        <>
            {queue.length == 0 ?
                <div className="error-message">
                    <div className="error-message">
                        <FaMusic style={{ fontSize: "25px" }} />
                        <span style={{ margin: "10px" }}>Queue is empty.</span>
                        <FaMusic style={{ fontSize: "25px" }} />
                    </div>
                </div>
                :
                <div>
                    <Player source={queue[currentIndex]?.source}
                        videoId={queue[currentIndex]?.id}
                        onEndedHandler={() => { dispatch(setCurrentTrackIndex(currentIndex < queue.length - 1 ? currentIndex + 1 : currentIndex)) }}>
                    </Player>
                    <div>
                        {queue.map((track, index) =>
                            <TrackItem key={`${track.id}:${index}:${Date.now()}`}
                                track={track}
                                selectTrackHandler={() => { dispatch(setCurrentTrackIndex(index)) }}
                                active={index != currentIndex}
                                dropDown={<TrackDropDown track={track} trackIndex={index} add remove></TrackDropDown>}>
                            </TrackItem>
                        )}
                    </div>
                </div>
            }
        </>
    )
}