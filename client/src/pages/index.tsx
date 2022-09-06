import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthDispatch, useAuthState } from "../context/auth";
import styles from "../styles/Home.module.css";
import Subs from "./subs";

const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useAuthDispatch();
  const { authenticated } = useAuthState();

  if (authenticated) {
    return (
      <div className="max-w-7xl mx-auto text-center" style={{ marginTop: 200 }}>
        <Link href="/subs/create">
          <a className="w-full py-4 mb-2 px-4 text-md font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded">
            Create Community
          </a>
        </Link>
      </div>
    );
  } else {
    return <Subs></Subs>;
  }
};

export default Home;
