import "./MusicPad.css";
import { Link } from 'react-router-dom';

export default function MusicPad({ image, title, subTitle, id, site, page, type }) {
  return (
    <div className={"musicpad musicpad-" + page}>
      <Link style={{ textDecoration: 'none' }}
        to={{
          pathname: `/${site}/${type}/${id}`
        }}
        title={title}
      >
        <div className={`musicpad-${page}-image`}>
          <img src={image} className={`musicpad-${page}-image`} />
        </div>
        <div className={"music-title"}>{title}</div>
        <div className={"musicpad-sub-title"}>{subTitle}</div>
      </Link>
    </div>
  )
}