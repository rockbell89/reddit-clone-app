import React, { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { Sub } from "../../types/user.type";
import useSWR from "swr";

const Subs = () => {
  let router = useRouter();
  const [errors, setErrors] = useState<any>({});
  const address = `/subs/subs`;
  const fetcher = async (url: string) => {
    return await axios.get(url).then((res) => res.data);
  };
  const { data: subList } = useSWR<Sub[]>(address, fetcher);

  return (
    <div className="bg-white">
      {subList &&
        subList.map((sub, index) => {
          return <div key={index}>{sub.name}</div>;
        })}
    </div>
  );
};

export default Subs;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const cookie = req.headers.cookie;
    // 쿠키가 없다면 에러를 보내기
    if (!cookie) throw new Error("Missing auth token cookie");

    console.log(cookie);

    // // 쿠키가 있다면 그 쿠키를 이용해서 백엔드에서 인증 처리하기
    // await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`, {
    //   headers: { cookie },
    // });
    return { props: {} };
  } catch (error) {
    // 백엔드에서 요청에서 던져준 쿠키를 이용해 인증 처리할 때 에러가 나면 /login 페이지로 이동
    res.writeHead(307, { Location: "/login" }).end();
    return { props: {} };
  }
};
