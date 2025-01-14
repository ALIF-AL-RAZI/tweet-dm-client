import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from 'hooks/useAuth';
import { DASHBOARD_PATH } from 'config';

// ==============================|| GUEST GUARD ||============================== //

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard = ({ children }) => {
    const { isLoggedIn, isTwitterAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn && isTwitterAuth) {
            navigate(DASHBOARD_PATH, { replace: true });
        } else if (isLoggedIn && isTwitterAuth === false) {
            navigate('/unauthenticated', { replace: true });
        }
    }, [isLoggedIn, isTwitterAuth, navigate]);

    return children;
};

GuestGuard.propTypes = {
    children: PropTypes.node
};

export default GuestGuard;
