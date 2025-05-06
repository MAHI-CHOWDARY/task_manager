// hoc/withAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  return function ProtectedRoute(props) {
    const router = useRouter();

    useEffect(() => {
      const user = localStorage.getItem('token');
      if (!user) {
        router.replace('/'); 
      }
    });

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
