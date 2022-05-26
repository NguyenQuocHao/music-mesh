import "../components/Dashboard/Dashboard.scss"
import { FaSadTear } from 'react-icons/fa';

const NotFoundPage = () => {
    return (
        <div className="dashboard error-message">
            <div>
                <span style={{ margin: "5px" }}>Page Not Found.</span>
                <FaSadTear style={{ fontSize: "25px" }} />
            </div>
        </div>)
}

export default NotFoundPage;