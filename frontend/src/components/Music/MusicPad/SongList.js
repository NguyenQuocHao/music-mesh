import { useState, useEffect } from 'react';
import MusicPad from "./MusicPad";
import './SongList.css';

export default function SongList({ data, title }) {
  const [list, setList] = useState([])

  useEffect(() => {
    var res = data.map((item) => {
      var itemId = !item.id ? item.id : item.id.videoId;
      return (
            <MusicPad key={itemId} site="youtube" className="list" id={itemId}
              image={item.snippet.thumbnails.high.url}
              title={item.snippet.title}
              subTitle={item.snippet.channelTitle}></MusicPad>
      )
    });
    setList(res)
  }, [data])

  return (
    <div>
      <h3>{title}</h3>
      {list}
    </div>
  )
}