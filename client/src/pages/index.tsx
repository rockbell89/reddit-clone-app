import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthDispatch, useAuthState } from "../context/auth";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useAuthDispatch();
  const { authenticated } = useAuthState();

  return (
    <div className={styles.container} style={{ marginTop: 200 }}>
      {authenticated && (
        <h1 className="text-3xl font-bold underline">
          <Link href="/subs/create">커뮤니티 만들기</Link>
        </h1>
      )}
    </div>
  );
};

export default Home;
