import React from 'react';
import PropTypes from "prop-types";
import MusicPad from "./MusicPad";
import './MusicPadList.css';

export default class MusicPadList extends React.Component{
  static propTypes = {
    data: PropTypes.array,
  };

  prepareMusicPads = event => {

  }

  render(){
    var res = this.props.data.map((item) =>
      <MusicPad className="list" image={item.images[0]?.url} title={item.name} subTitle={item.description}></MusicPad>);
    return(
      <div>
        {res}
      </div>
    )
  }
}