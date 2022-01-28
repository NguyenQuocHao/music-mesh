import { useState, useEffect, useCallback } from 'react';
import MusicPad from "./MusicPad";

export default function TrackList({ data, title, site, page, type }) {
  const [list, setList] = useState([])
  const [maxIndex, setMaxIndex] = useState(5)
  const DEFAULT_LIST_LENGTH = 15;
  const moveRight = useCallback(
    () => {
      if (maxIndex == DEFAULT_LIST_LENGTH) {
        setMaxIndex(5)
      }
      else {
        setMaxIndex(maxIndex + 5)
      }
    }, [maxIndex],
  );

  const moveLeft = useCallback(
    () => {
      if (maxIndex - 5 == 0) {
        setMaxIndex(DEFAULT_LIST_LENGTH)
      }
      else {
        setMaxIndex(maxIndex - 5)
      }
    }, [maxIndex],
  );

  useEffect(() => {
    updateList();
  }, [maxIndex, data])

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
          {maxIndex - 6 < index && index < maxIndex ?
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
      <h3 className="song-list-title">{title}</h3>
      <div className={"song-list-" + page}>
        <span className="icon icon-circle" onClick={moveLeft}>{'<'}</span>
        {list}
        <span className="icon icon-circle" onClick={moveRight}>{'>'}</span>
      </div>
    </div>
  )
}