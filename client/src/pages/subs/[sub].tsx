import axios from "axios";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import useSWR from "swr";
import PostCard from "../../components/PostCard";
import SideBar from "../../components/SideBar";
import { useAuthState } from "../../context/auth";
import { Post, Sub } from "../../types/user.type";

const SubPage = () => {
  const [ownSub, setOwnSub] = useState(false);
  const { authenticated, user } = useAuthState();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const subName = router.query.sub;
  const fetcher = async (url: string) => {
    return await axios.get(url).then((res) => res.data);
  };
  const { data: sub } = useSWR<Sub>(`/subs/${subName}`, fetcher);

  useEffect(() => {
    if (!sub) return;
    setOwnSub(authenticated && user?.username === sub.username);
  }, [authenticated, user]);

  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", fileInputRef.current!.name);

    try {
      await axios.post(`/subs/${sub?.name}/upload`, formData, {
        headers: { "Context-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const openFileInput = (type: string) => {
    const fileInput = fileInputRef.current;
    if (fileInput) {
      fileInput.name = type;
      fileInput.click();
    }
  };

  let renderPosts;
  if (!sub) {
    renderPosts = <p className="text-lg text-center">로딩중...</p>;
  } else if (sub.posts?.length === 0) {
    renderPosts = (
      <p className="text-lg text-center">아직 작성된 포스트가 없습니다</p>
    );
  } else {
    renderPosts = sub.posts.map((post) => (
      <PostCard post={post} key={post.identifier}></PostCard>
    ));
  }

  return (
    <>
      {sub && (
        <>
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleUploadImage}
              hidden={true}
            />
            {/* 배너 이미지 */}
            <div className="bg-cyan-500">
              {sub.bannerUrl ? (
                <div
                  className="h-56"
                  style={{
                    backgroundImage: `url(${sub.bannerUrl})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => openFileInput("banner")}
                ></div>
              ) : (
                <div
                  className="h-20 bg-cyan-500"
                  onClick={() => openFileInput("banner")}
                ></div>
              )}
            </div>
            {/* 커뮤니티 메타 데이터 */}
            <div className="h-20 bg-white">
              <div className="relative flex max-w-5xl px-5 mx-auto">
                <div className="absolute" style={{ top: -15 }}>
                  {sub.imageUrl && (
                    <Image
                      src={sub.imageUrl}
                      alt="커뮤니티 이미지"
                      width={70}
                      height={70}
                      className="rounded-full"
                      onClick={() => openFileInput("image")}
                    />
                  )}
                </div>
                <div className="pt-1 pl-24">
                  <div className="flex items-center">
                    <h1 className="text-3xl font-bold ">{sub.title}</h1>
                  </div>
                  <p className="font-bold text-gray-400 text-small">
                    /subs/{sub.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* 포스트와 사이드바 */}
          <div className="flex max-w-5xl px-4 pt-5 mx-auto">
            <div className="w-full md:mr-3 md:w-8/12">{renderPosts} </div>
            <SideBar sub={sub} />
          </div>
        </>
      )}
    </>
  );
};

export default SubPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const cookie = req.headers.cookie;
    // 쿠키가 없다면 에러를 보내기
    if (!cookie) throw new Error("Missing auth token cookie");

    console.log(cookie);

    // // 쿠키가 있다면 그 쿠키를 이용해서 백엔드에서 인증 처리하기
    await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`, {
      headers: { cookie },
    });
    return { props: {} };
  } catch (error) {
    // 백엔드에서 요청에서 던져준 쿠키를 이용해 인증 처리할 때 에러가 나면 /login 페이지로 이동
    res.writeHead(307, { Location: "/" }).end();
    return { props: {} };
  }
};
