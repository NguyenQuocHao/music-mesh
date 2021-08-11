import { useState, useEffect } from 'react';
import MusicPad from "./MusicPad";
import './SongList.css';

export default function SongList({data, title}) {
  const [list, setList] = useState([])

  useEffect(() => {
    var res = data.map((item) =>
      <MusicPad className="list" id={item.id} image={item.snippet.thumbnails.standard.url} title={item.snippet.title} subTitle={item.snippet.channelTitle}></MusicPad>);
    setList(res)
  })

  return (
    <div>
      <h3>{title}</h3>
      {list}
    </div>
  )
}