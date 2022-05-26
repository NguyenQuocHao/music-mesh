const youtube = "youtube"
const spotify = "spotify"
const playlist = "playlist"
const song = "song"
export const HOST = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://mus1c-mesh.herokuapp.com/"
export const CLIENT = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://mus1c-mesh.herokuapp.com/"

export default {
    youtube, spotify, playlist, song, HOST
};