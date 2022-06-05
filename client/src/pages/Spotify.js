import Login from '../components/Login/Login';
import SpotifyDashboard from '../components/Dashboard/SpotifyDashboard';
import { user } from '../redux/reducers/userSlice';
import { useSelector } from 'react-redux';

export default function Spotify() {
  const userInfo = useSelector(user);

  if (userInfo) {
    if (userInfo.provider === 'spotify' || userInfo.linkedAccount) {
      return <SpotifyDashboard />
    }

    return <Login site={userInfo.provider} />
  }

  return <Login />
}