export default function TrackItem({ track, selectTrackHandler, active, dropDown }) {
    return (
        <div className="queue-item">
            <div onClick={() => selectTrackHandler()} className={active ? "queue-item-left unactive" : "queue-item"}>
                <img className={'queue-item-image'} src={track.image} />
                <span>
                    <div>{track.title}</div>
                    <div className='artist-name'>{track.artist}</div>
                </span>
            </div>
            {dropDown}
        </div>
    )
}