import ReactPlayer from "react-player";

export default function Player({ source, videoId, onEndedHandler }) {
    if (source === "youtube") {
        return <ReactPlayer className="player" width="100%" height="380" controls playing={true}
            url={'https://www.youtube.com/watch?v=' + videoId} onEnded={() => { onEndedHandler() }} />
    }

    return <iframe src={"https://open.spotify.com/embed/track/" + videoId} width="100%" height="380" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
}