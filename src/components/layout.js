import Head from 'next/head';

export default function Layout({ title, description, children }) {
  return (
    <>
      <Head>
        <title>{title ? `${title}` : 'Task Manager'}</title>
        <meta name="description" content={description || 'A simple task management system'} />
        <link rel="icon" href="/vercel.svg" />
      </Head>
      <main>{children}</main>
        
    </>
  );
}
