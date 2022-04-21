import React from 'react'
import * as AiIcons from 'react-icons/ai'
import {SiYoutube, SiSpotify} from 'react-icons/si'

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome/>,
    cName: 'side-bar-text'
  },
  {
    title: 'Youtube',
    path: '/youtube',
    icon: <SiYoutube/>,
    cName: 'side-bar-text'
  },
  {
    title: 'Spotify',
    path: '/spotify',
    icon: <SiSpotify/>,
    cName: 'side-bar-text'
  }
]

