import Login from '../components/Login/Login';
import YoutubeDashboard from '../components/Dashboard/YoutubeDashboard';
import { user } from '../redux/reducers/userSlice';
import { useSelector } from 'react-redux';

export default function Youtube() {
  const userInfo = useSelector(user);

  if (userInfo) {
    if (userInfo.provider === 'google' || userInfo.linkedAccount) {
      return <YoutubeDashboard />
    }

    return <Login site={userInfo.provider} />
  }

  return <Login />
}