import { useState, useEffect } from 'react';
import MusicPad from "./MusicPad";
import './SongList.css';

export default function SongList({ data, title, site, page }) {
  const [list, setList] = useState([])

  useEffect(() => {
    var res = data.map((item) => {
      var itemId;
      if (page == "dashboard") {
        itemId = item.id;
      }
      else {
        itemId = item.id.videoId;
      }

      return (
        <MusicPad key={itemId} id={itemId}
          image={item.snippet.thumbnails.high.url}
          title={item.snippet.title}
          subTitle={item.snippet.channelTitle}
          site={site}
          page={page}
        ></MusicPad>
      )
    });
    setList(res)
  }, [data])

  return (
    <div>
      <h3 className="song-list-title">{title}</h3>
      <div className={"song-list-" + page}>
        {list}
      </div>
    </div>
  )
}