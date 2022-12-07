import Head from 'next/head';

interface Props {
  title?: string;
  description?: string;
  image?: string;
}

const imageDefault = '';
const titleDefault = '';
const descriptionDefault = '';

export default function Meta({ title, description, image }: Props) {
  const ogTitle = title || titleDefault;
  const ogDescription = description || descriptionDefault;
  const ogImage = image || imageDefault;

  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <title></title>
      <meta name="description" content={descriptionDefault} />

      {/* google */}
      <meta itemProp="name" content={ogTitle} />
      <meta itemProp="description" content={ogDescription} />
      <meta itemProp="image" content={ogImage} />

      {/* facebook */}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="600" />
      <meta property="og:image:height" content="600" />
      <meta property="og:type" content="website" />

      {/* twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogTitle} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}
