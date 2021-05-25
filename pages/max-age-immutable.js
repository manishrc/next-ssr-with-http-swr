import { useEffect, useState } from "react";

function time() {
  return new Date().toISOString();
}

export default function Home({ serverTime }) {
  const [clientTime, setClientTime] = useState("");
  useEffect(() => {
    setClientTime(time());
  }, []);

  return (
    <div>
      <code>
        <pre style={{ padding: "18px", background: "#ccc" }}>
          Cache-Control: public,max-age=60,immutable,stale-while-revalidate
        </pre>
      </code>
      <div>
        Server Time: <pre>{serverTime}</pre>
      </div>
      <div>
        Client Time: <pre>{clientTime}</pre>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public,max-age=60,immutable,stale-while-revalidate"
  );
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
