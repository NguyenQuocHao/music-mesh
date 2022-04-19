import { useState, useEffect } from 'react';
import MusicPad from "./MusicPad";

export default function TrackList({ data, title, site, page, type }) {
  const [list, setList] = useState([])
  const [firstIndex, setFirstIndex] = useState(0)
  const DEFAULT_RANGE = 5;

  const moveRight = () => {
    var index = firstIndex
    index += DEFAULT_RANGE

    if (index >= data.length) {
      setFirstIndex(0)
    }
    else {
      setFirstIndex(index)
    }
  }

  const moveLeft =
    () => {
      var index = firstIndex
      index -= DEFAULT_RANGE

      if (index < 0) {
        setFirstIndex(data.length - DEFAULT_RANGE)
      }
      else {
        setFirstIndex(index)
      }
    }

  useEffect(() => {
    updateList();
  }, [firstIndex, data])

  const updateList = () => {
    var res = data.map((item, index) => {
      var itemId;
      if (page == "dashboard") {
        itemId = item.id;
      }
      else {
        itemId = item.id.videoId;
      }

      return (
        <div key={itemId}>
          {firstIndex <= index && index < firstIndex + DEFAULT_RANGE ?
            <MusicPad type={type} id={itemId}
              image={item.snippet.thumbnails.high.url}
              title={item.snippet.title}
              subTitle={item.snippet.channelTitle}
              site={site}
              page={page}
            ></MusicPad> : null}
        </div>
      )
    });
    setList(res)
  }

  return (
    <div>
      <h3 className="music-title">{title}</h3>
      <div className={"song-list-" + page}>
        <span className="icon icon-circle" onClick={moveLeft}>{'<'}</span>
        {list}
        <span className="icon icon-circle" onClick={moveRight}>{'>'}</span>
      </div>
    </div>
  )
}