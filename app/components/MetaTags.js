import Head from 'next/head';

/**
 * MetaTags component for setting the dynamic meta information of the page.
 * 
 * @param {Object} props - Component props.
 * @param {string} props.title - The title to be displayed in the browser tab.
 * @param {string} props.description - The description of the page for SEO purposes.
 * @returns {JSX.Element} The rendered MetaTags component.
 */
export default function MetaTags({ title, description }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Head>
  );
}
