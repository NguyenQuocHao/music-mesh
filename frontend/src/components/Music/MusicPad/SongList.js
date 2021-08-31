import { useState, useEffect } from 'react';
import MusicPad from "./MusicPad";
import './SongList.css';

export default function SongList({ data, title, site, page }) {
  const [list, setList] = useState([])

  useEffect(() => {
    var res = data.map((item) => {
      var itemId;
      if(page == "dashboard"){
        itemId = item.id;
      }
      else{
        itemId = item.id.videoId;
      }

      return (
        <MusicPad key={itemId} className="list" id={itemId}
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
      <h3>{title}</h3>
      {list}
      
    </div>
  )
}