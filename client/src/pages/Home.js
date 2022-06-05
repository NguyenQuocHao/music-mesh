import React from 'react';
import '../components/Dashboard/Dashboard.scss';
import Login from '../components/Login/Login';
import HomeDashboard from '../components/Dashboard/HomeDashboard';
import { user } from '../redux/reducers/userSlice';
import { useSelector } from 'react-redux';

export default function Home() {
  const userInfo = useSelector(user);

  if (userInfo) {
    return <HomeDashboard user={userInfo} />
  }
  else {
    return <Login />
  }
}