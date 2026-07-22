import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Supabase's password recovery email links back to the configured Site URL
// with the recovery token in the hash fragment. If that Site URL isn't
// /reset-password (e.g. it's the landing page), we still need to pick up
// the token and route the user to the reset-password form.
const RecoveryRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/reset-password') return;

    const hashParams = new URLSearchParams(location.hash.replace(/^#/, ''));
    if (hashParams.get('type') === 'recovery' && hashParams.get('access_token')) {
      navigate(`/reset-password${location.hash}`, { replace: true });
    }
  }, [location, navigate]);

  return null;
};

export default RecoveryRedirect;
