import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function ProtectingRoute(props) {
    const navigate = useNavigate();
    const admin = useSelector((state) => state.admin.admins);

    useEffect(() => {
        if (admin?.role !== "admin") {
            navigate("/login");
        }
    }, [admin.role])
    return props.children;
}

export default ProtectingRoute