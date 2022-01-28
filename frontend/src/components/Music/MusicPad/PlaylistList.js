import { useState, useEffect } from 'react';
import MusicPad from "./MusicPad";
import vars from '../../../variables'

export default function PlaylistList({ data, title, description, type, site }) {
  const [list, setList] = useState([])

  useEffect(() => {
    var res = data.map((item) =>
      <div key={item.id}>
        <MusicPad className="list" page="dashboard" type={type} id={item.id} image={item.images[0]?.url} title={item.name} subTitle={item.description}></MusicPad>
      </div>)
    // setList(res)
  })

  useEffect(() => {
    updateList();
  }, [data])

  const updateList = () => {
    var res = data.map((item) => {
      return (
        <div key={item.id}>
          <MusicPad className="list" page="dashboard" site={site} type={vars.playlist} id={item.id} image={item.images[0]?.url} title={item.name} subTitle={item.description}></MusicPad>
        </div>
      )
    });
    setList(res)
  }

  return (
    <div>
      <h3 className="music-title">{title}</h3>
      <h5>{description}</h5>
      <div className="song-list-dashboard">
        <span className="icon icon-circle">{'<'}</span>
        {list}
        <span className="icon icon-circle">{'>'}</span>
      </div>
    </div>
  )
}