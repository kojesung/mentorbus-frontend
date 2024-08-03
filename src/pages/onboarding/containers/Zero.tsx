// src/containers/Zero.tsx
import { OnboardingTitle } from "@/pages/onboarding/containers/OnboardingTitle";
import { OnbordingBus } from "@/components/Icons/OnboardingBus";
import React from "react";
import { Road } from "@/components/Icons/Road";
import { KakaoBtn } from "@/components/Icons/KakaoBtn";

interface ZeroProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const Zero: React.FC<ZeroProps> = () => {
  const Rest_api_key = import.meta.env.VITE_KAKAO_REST_API_KEY; // REST API KEY
  const redirect_uri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  return (
    <>
      <OnboardingTitle />

      <div onClick={handleLogin} className="grid place-items-center mt-[5%]">
        <KakaoBtn />
      </div>

      <div className="relative z-20">
        <div className="grid place-items-center mt-[2%] -ml-[30%]">
          <OnbordingBus />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="grid place-items-center w-full">
          <Road />
        </div>
      </div>
    </>
  );
};

export default Zero;
