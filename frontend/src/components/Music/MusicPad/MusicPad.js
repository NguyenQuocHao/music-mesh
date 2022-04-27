import "./MusicPad.css";
import { Link } from 'react-router-dom';
import GetRedirectLink from '../../../utils/redirect'

export default function MusicPad({ image, title, subTitle, id, site, page, type }) {
  return (
    <div className={"musicpad musicpad-" + page}>
      <Link style={{textDecoration: 'none'}}
        to={{
          pathname: `/${site}/${type}/${id}`
        }}
      >
        <img src={image} alt="Empty" className={"musicpad-" + page + "-image"} />
        <div className={"music-title"}>{title}</div>
        <div className={"musicpad-sub-title"}>{subTitle}</div>
      </Link>
    </div>
  )
}