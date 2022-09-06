import React, { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import InputGroup from "../../../components/InputGroup";
import { User } from "../../../types/user.type";
import { GetServerSideProps } from "next";
import Link from "next/link";

const Subs = () => {
  let router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [user, setUser] = useState<User>();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const res = await axios.post("/subs/create", {
        description,
        title,
        name,
      });
      router.push(`/subs/${res.data.name}`);
    } catch (error: any) {
      setErrors(error.response?.data || {});
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <div className="w-10/12 mx-auto md:w-96">
          {/* {user && <p>작성자 : {user.username}</p>} */}
          <InputGroup
            placeholder="Name"
            value={name}
            setValue={setName}
            error={errors.name}
          />
          <form onSubmit={handleSubmit}>
            <InputGroup
              placeholder="Title"
              value={title}
              setValue={setTitle}
              error={errors.title}
            />
            <InputGroup
              placeholder="Discription"
              type="description"
              value={description}
              setValue={setDiscription}
              error={errors.description}
            />
            <button className="w-full py-4 mb-2 text-md font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded">
              Create Community
            </button>
          </form>
        </div>
      </div>
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
    // res.writeHead(307, { Location: "/login" }).end();
    return { props: {} };
  }
};
