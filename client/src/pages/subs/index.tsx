import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Sub } from "../../types/user.type";
import useSWR from "swr";
import PostCard from "../../components/PostCard";
import Link from "next/link";

const Subs = () => {
  let router = useRouter();
  const [errors, setErrors] = useState<any>({});
  const address = `/subs`;
  const fetcher = async (url: string) => {
    return await axios.get(url).then((res) => res.data);
  };
  const { data: subList } = useSWR<Sub[]>(address, fetcher);

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
        <div className="bg-white rounded-xl border w-9/12 overflow-hidden">
          POST CARD
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
                  className="d-flex align-middle justify-between flex p-4 border border-b-gray-300"
                >
                  <span className="font-bold text-black">{index + 1}</span>
                  <Link href={`/subs/${sub.name}`}>
                    <a className="hover:text-blue-500 hover:underline">
                      {sub.name}
                    </a>
                  </Link>
                  <button className="bg-blue-500 text-white rounded-xl px-4">
                    JOIN
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Subs;
