import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Post, Sub } from "../../types/user.type";
import useSWR from "swr";
import PostCard from "../../components/PostCard";
import Link from "next/link";
import { useAuthState } from "../../context/auth";
import Image from "next/image";

const Subs = () => {
  let router = useRouter();
  const [errors, setErrors] = useState<any>({});
  const address = `/subs`;
  const fetcher = async (url: string) => {
    return await axios.get(url).then((res) => res.data);
  };
  const { data: subList } = useSWR<Sub[]>(address, fetcher);
  const { data: postList } = useSWR<Post[]>(`/posts`, fetcher);
  const { loading, authenticated } = useAuthState();

  return (
    <>
      <div className="h-20 bg-white">
        <div className="relative h-20 flex flex-col justify-center max-w-7xl px-5 mx-auto">
          <div>
            <h3 className="font-bold text-xl">
              Today's Top Growing Communities
            </h3>
            <p className="text-gray-400">
              Browse Reddit's top growing communities. Find the top communities
              in your favorite category.
            </p>
          </div>
        </div>
      </div>
      <div className="flex space-x-7 max-w-7xl pt-5 px-5 mx-auto">
        <div className="bg-white rounded-xl border w-9/12 overflow-hidden flex items-center">
          <div className="max-w-7xl mx-auto text-center mt-5">
            <Link href={authenticated ? "/subs/create" : "/login"}>
              <a className=" inline-block  py-4 mb-2 px-4 text-md font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded">
                Create Community
              </a>
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-xl border w-3/12 overflow-hidden">
          <div className="bg-blue-500 text-white h-20 p-4">
            <h5 className="font-bold">Todays' Top Growing Communities</h5>
          </div>
          {subList &&
            subList.map((sub, index) => {
              return (
                <div
                  key={index}
                  className="items-center justify-between flex p-4 border border-b-gray-300 text-ellipsis overflow-hidden"
                >
                  <div className="flex items-center w-full">
                    <span className="font-bold text-black mr-2">
                      {index + 1}
                    </span>
                    {sub.imageUrl && (
                      <Image
                        src={sub.imageUrl}
                        alt={sub.name}
                        className="w-10 rounded-full mr-2"
                      />
                    )}
                    <span className="block text-ellipsis overflow-hidden">
                      {sub.name}
                    </span>
                  </div>
                  {authenticated && (
                    <button className="bg-blue-500 text-sm text-white rounded-full px-4 h-8">
                      <Link href={`/subs/${sub.name}`}> JOIN</Link>
                    </button>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Subs;
