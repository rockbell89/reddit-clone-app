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
  return (
    <>
      <Subs></Subs>
    </>
  );
};

export default Home;
