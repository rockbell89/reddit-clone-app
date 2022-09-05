import Link from "next/link";
import React, { FormEvent, useState } from "react";
import InputGroup from "../components/InputGroup";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuthState } from "../context/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();
  const { authenticated } = useAuthState();
  if (authenticated) router.push("/");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/auth/register`, {
        email,
        username,
        password,
      });
      router.push("/login");
    } catch (error: any) {
      setErrors(error.response.data || {});
    }
  };

  return (
    <div className="bg-white">
      <div className="flex flex-col itmes-center justify-center h-screen p-6">
        <div className="w-10/12 mx-auto md:w-96">
          <h1 className="mb2 font-bold text-lg">회원가입</h1>
          <form onSubmit={handleSubmit}>
            <InputGroup
              type="text"
              placeholder="Email"
              value={email}
              setValue={setEmail}
              error={errors.email}
            ></InputGroup>
            <InputGroup
              type="text"
              placeholder="Username"
              value={username}
              setValue={setUsername}
              error={errors.username}
            ></InputGroup>
            <InputGroup
              type="password"
              placeholder="Password"
              value={password}
              setValue={setPassword}
              error={errors.password}
            ></InputGroup>
            <button className="w-full py-4 mb-2 text-md font-bold text-white uppercase bg-gray-400 border-gray-400 border">
              회원가입
            </button>
          </form>
          <small>
            이미 가입하셨나요?
            <Link href="/login">
              <a className="ml-1 text-blue-500">로그인</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
