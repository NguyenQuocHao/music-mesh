import vars from '../variables'

export default function GetRedirectLink(site, type) {
    var link = ""
    switch (site) {
      case vars.youtube:
        link += vars.youtube;
        break;
      case vars.spotify:
        link += vars.spotify;
        break;
    }

    switch (type) {
      case vars.playlist:
        link += "-" + vars.playlist;
        break;
      case vars.song:
        link += "-" + vars.song;
        break;
    }

    return link
  }