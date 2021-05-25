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
  res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate=30");
  const serverTime = time();

  return new Promise((resolve, reject) =>
    setTimeout(
      () =>
        resolve({
          props: { serverTime },
        }),
      5000
    )
  );
}
