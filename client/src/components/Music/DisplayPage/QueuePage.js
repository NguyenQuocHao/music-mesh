import { useState, useEffect } from 'react';
import './PlaylistPage.scss';
import { myQueue } from '../../../redux/reducers/queue';
import { useSelector, useDispatch } from 'react-redux';
import { removeTrackByIndex, addTrack } from '../../../redux/reducers/queue';
import { FaTrashAlt, FaMusic } from "react-icons/fa";
import TrackItem from './TrackItem';
import Player from './Player';
import DropDown from './DropDown';
import { useAlert } from "react-alert";
import { FaPlus } from 'react-icons/fa';
import { TrackAddedNoti } from '../../../variables';

export default function QueuePage() {
    const queue = useSelector(myQueue);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const dispatch = useDispatch();
    const alertReact = useAlert();

    function removeTrack(index) {
        dispatch(removeTrackByIndex(index))

        if (index < currentTrackIndex) {
            setCurrentTrackIndex(currentTrackIndex - 1)
        }
    }

    function addTrackToQueue(index) {
        if (index) {
            alert()
            dispatch(addTrack(queue[index]));
        }

        alertReact.success(TrackAddedNoti);
    }

    const dropDownItems = [
        {
            icon: <FaPlus></FaPlus>,
            actionName: "Add to Queue",
            handler: addTrackToQueue
        },
        {
            icon: <FaTrashAlt></FaTrashAlt>,
            actionName: "Remove",
            handler: removeTrack
        }
    ]

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
                    <Player source={queue[currentTrackIndex]?.source} videoId={queue[currentTrackIndex]?.id} onEndedHandler={() => { let setIndex = currentTrackIndex < queue.length - 1 ? currentTrackIndex + 1 : currentTrackIndex; setCurrentTrackIndex(setIndex) }}></Player>
                    <div>
                        {queue.map((track, index) =>
                            <TrackItem key={track.id} track={track} chooseTrackHandler={() => { setCurrentTrackIndex(index) }} active={index != currentTrackIndex} dropDown={<DropDown items={dropDownItems} trackIndex={index}></DropDown>}></TrackItem>
                        )}
                    </div>
                </div>}
        </>
    )
}
