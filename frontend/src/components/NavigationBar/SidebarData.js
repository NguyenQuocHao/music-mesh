import React, {useState} from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome/>,
    cName: 'side-bar-menu-text side-bar-text-hover'
  },
  {
    title: 'Youtube',
    path: '/youtube',
    icon: <IoIcons.IoMdPeople/>,
    cName: 'side-bar-menu-text side-bar-text-hover'
  },
  {
    title: 'Spotify',
    path: '/spotify',
    icon: <FaIcons.FaEnvelopeOpenText/>,
    cName: 'side-bar-menu-text side-bar-text-hover'
  }
]

