function time() {
  return new Date().toISOString();
}

export default function Home({ serverTime }) {
  const clientTime = time();
  return (
    <div>
      <div>Server Time: {serverTime}</div>
      <div>Client Time: {clientTime}</div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, max-age=60, stale-while-revalidate=300"
  );
  const serverTime = time();
  return {
    props: { serverTime },
  };
}
