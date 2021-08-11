import React from 'react';
import PropTypes from "prop-types";
import MusicPad from "./MusicPad";
import './MusicPadList.css';

export default class MusicPadList extends React.Component{
  static propTypes = {
    data: PropTypes.array,
    title: PropTypes.string,
    description: PropTypes.string,
  };

  render(){
    var res = this.props.data.map((item) =>
      <a href={item.external_urls.spotify}><MusicPad className="list" id={item.id} image={item.images[0]?.url} title={item.name} subTitle={item.description}></MusicPad></a>);
    return(
      <div>
        <h3>{this.props.title}</h3>
        <h5>{this.props.description}</h5>
        {res}
      </div>
    )
  }
}