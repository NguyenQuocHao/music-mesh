export default function TrackItem({ track, chooseTrackHandler, active, dropDown }) {
    return (
        <div className="queue-item">
            <div onClick={() => chooseTrackHandler()} className={active ? "queue-item-left unactive" : "queue-item"}>
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