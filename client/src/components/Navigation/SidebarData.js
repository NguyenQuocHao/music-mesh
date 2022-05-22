import React from 'react';
import {AiFillHome} from 'react-icons/ai';
import {SiYoutube, SiSpotify} from 'react-icons/si';
import { MdQueueMusic } from "react-icons/md";

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiFillHome/>,
    cName: 'sidebar-text'
  },
  {
    title: 'Youtube',
    path: '/youtube',
    icon: <SiYoutube/>,
    cName: 'sidebar-text'
  },
  {
    title: 'Spotify',
    path: '/spotify',
    icon: <SiSpotify/>,
    cName: 'sidebar-text'
  },
  {
    title: 'My Queue',
    path: '/myQueue',
    icon: <MdQueueMusic/>,
    cName: 'sidebar-text'
  }
]

