import { useState, useEffect } from 'react';
import MusicPad from "./MusicPad";
import NavButton from '../../Navigation/NavButton';

export default function PadList({ data, title, source, location, type }) {
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

  const moveLeft = () => {
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
    var res = data.map((item, index) => {
      var itemId;
      if (location === "dashboard") {
        itemId = item.id;
      }
      else {
        itemId = item.id.videoId;
      }

      return (
        <div key={itemId}>
          {firstIndex <= index && index < firstIndex + DEFAULT_RANGE ?
            <MusicPad type={type} id={itemId}
              image={item.image}
              title={item.title}
              subTitle={item.artist}
              site={source}
              page={location}
            ></MusicPad> : null}
        </div>
      )
    });

    setList(res)
  }, [firstIndex, data])

  return (
    <div>
      <h3 className="music-title">{title}</h3>
      <div className={"song-list-" + location}>
        {firstIndex >= DEFAULT_RANGE ? <NavButton isLeft handler={moveLeft}></NavButton> : null}
        {list}
        {firstIndex + 5 < data.length ? <NavButton handler={moveRight}></NavButton> : null}
      </div>
    </div>
  )
}