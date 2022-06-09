import { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { TrackAddedNoti } from '../../../variables';
import { useAlert } from "react-alert";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import '../../Music/DisplayPage/PlaylistPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { removeTrackByIndex, addTrack, setCurrentTrackIndex, currentTrackIndex } from '../../../redux/reducers/queue';
import OutsideAlerter from "./OutsideAlerter";

export function TrackDropDown({ track, trackIndex, add, remove }) {
    const [open, setOpen] = useState(false);
    const alertReact = useAlert();
    const dispatch = useDispatch();
    const playingTrackIndex = useSelector(currentTrackIndex);

    function removeTrackFromQueue() {
        dispatch(removeTrackByIndex(trackIndex));

        if (trackIndex < playingTrackIndex) {
            setCurrentTrackIndex(currentTrackIndex - 1)
        }
    }

    function addTrackToQueue() {
        if (track !== undefined || track !== null) {
            dispatch(addTrack(track));
        }

        alertReact.success(TrackAddedNoti);
    }

    function closeDropDown(){
        setOpen(false)
    }

    return (
        <div className={open ? 'queue-item-right' : 'queue-item-right unactive'}>
            <FaEllipsisH onClick={() => { setOpen(!open); }} />
            {open &&
                <OutsideAlerter handler={closeDropDown}>
                    <div className='track-dropdown'>
                        {add &&
                            <div className='track-dropdown-item' onClick={addTrackToQueue}><span style={{ marginRight: '5px' }}><FaPlus></FaPlus></span>Add to Queue</div>
                        }
                        {remove &&
                            <div className='track-dropdown-item' onClick={removeTrackFromQueue}><span style={{ marginRight: '5px' }}><FaTrashAlt></FaTrashAlt></span>Remove from Queue</div>
                        }
                    </div>
                </OutsideAlerter>
            }
        </div>
    )
}