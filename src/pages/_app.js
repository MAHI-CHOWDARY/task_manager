import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/global.css'; // Your own global styles
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Load Bootstrap JS only in the browser
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return <Component {...pageProps} />;
}
