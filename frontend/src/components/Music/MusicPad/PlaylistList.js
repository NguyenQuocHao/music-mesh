import { useState, useEffect } from 'react';
import MusicPad from "./MusicPad";
import vars from '../../../variables';
import NavButton from '../../NavigationBar/NavButton';

export default function PlaylistList({ data, title, description, type, site }) {
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
    var res = data.map((item) => {
      return (
        <div key={item.id}>
          <MusicPad className="list" page="dashboard" site={site} type={vars.playlist} id={item.id} image={item.images[0]?.url} title={item.name} subTitle={item.description}></MusicPad>
        </div>
      )
    });

    setList(res)
  }, [data])

  return (
    <div>
      <h3 className="music-title">{title}</h3>
      <h5>{description}</h5>
      <div className="song-list-dashboard">
        <NavButton isLeft handler={moveLeft}></NavButton>
        {list}
        <NavButton handler={moveRight}></NavButton>
      </div>
    </div>
  )
}