import { Banner } from "@/components/Icons/Banner";
import { Header } from "./containers/Header";
import { TitleSection } from "./containers/TitleSection";
import { College } from "@/components/ui/college";
import SU from "@/assets/SU.svg";
import SSU from "@/assets/SSU.svg";
import Seoul from "@/assets/Seoul.svg";
import SOF from "@/assets/SOU.svg";
import YU from "@/assets/YU.svg";
import HU from "@/assets/HU.svg";
import CAU from "@/assets/CAU.svg";
import { MentorBox } from "@/components/ui/mentorbox";
import { MentorScheduleSection } from "@/pages/main/containers/MentorScheduleSection"; // Import the new component
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Define the College type
interface CollegeType {
  img: string;
  name: string;
}

const colleges: CollegeType[] = [
  { img: SSU, name: "숭실대학교" },
  { img: CAU, name: "중앙대학교" },
  { img: Seoul, name: "서울대학교" },
  { img: HU, name: "한양대학교" },
  { img: SU, name: "세종대학교" },
  { img: YU, name: "연세대학교" },
  { img: SOF, name: "서울시립대학교" },
];

const getRandomColleges = (
  colleges: CollegeType[],
  count: number
): CollegeType[] => {
  const shuffled = [...colleges].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export function MainPage() {
  const [userName, setUserName] = useState<string>("");
  const [userMajor, setUserMajor] = useState<string>("");
  const [randomColleges, setRandomColleges] = useState<CollegeType[]>([]);
  const [position, setPosition] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedPosition = localStorage.getItem("position");
    const userName = localStorage.getItem("userName");
    const userBelong = localStorage.getItem("userBelong");
    const major = localStorage.getItem("major");

    if (!(storedPosition && userName && userBelong && major)) {
      navigate(`/mentorbus-frontend/onboarding?specialQuery=true`);
    } else {
      setPosition(storedPosition);
    }
  }, [navigate]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const storedUserName = searchParams.get("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    } else {
      const localUserName = localStorage.getItem("userName");
      if (localUserName) {
        setUserName(localUserName);
      }
    }
  }, [location.search]);

  useEffect(() => {
    const storedUserMajor = localStorage.getItem("major");
    if (storedUserMajor) {
      setUserMajor(storedUserMajor);
    }
  }, []);

  useEffect(() => {
    setRandomColleges(getRandomColleges(colleges, 7));
  }, []);

  const renderMentorBoxes = () => (
    <>
      <TitleSection title2="대학별" title={""} major={""} title3={""} />
      <div className="overflow-x-auto ml-[28px] mt-[10px]">
        <div className="flex" style={{ width: "max-content" }}>
          {randomColleges.map((college, index) => (
            <React.Fragment key={index}>
              <College img={college.img} name={college.name} title={""} />
              {index < randomColleges.length - 1 && (
                <div className="ml-[13px]"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <TitleSection
        title={userName}
        title2="님에게 맞는"
        major={userMajor}
        title3="멘토"
      />
      <div className="flex mt-[20px] overflow-auto">
        <MentorBox
          name="편유나"
          major="숭실대학교 글로벌미디어학부"
          gen="woman"
          info="• 학생부종합전형 SW 우수인재
                • IT대학 및 글로벌미디어학부 관심 학생
                • SW특기자 입시 관심 학생"
        />
        <div className="ml-[13px]"></div>
        <MentorBox
          name="윤재영"
          major="숭실대학교 컴퓨터학부"
          gen="man"
          info="• 학생부종합전형 SSU 미래인재
                • IT대학 및 컴퓨학부 관심 학생
                • 창업 및 서비스 기획 직무 관심 학생"
        />
        <div className="ml-[13px]"></div>
        <MentorBox
          name="윤수진"
          major="숭실대학교 경영학부"
          gen="woman"
          info="• 학생부종합전형 SSU 미래인재
                • IT대학 및 경영학부 관심 학생
                • 창업 및 서비스 기획 직무 관심 학생"
        />
        <div className="ml-[13px]"></div>
        <MentorBox
          name="강우현"
          major="숭실대학교 법학부"
          gen="man"
          info="• 학생부종합전형 SSU 미래인재
                • 법학부 관심 학생
          "
        />
      </div>
    </>
  );

  return (
    <>
      <div className="main">
        <div className="main_content overflow-hidden bg-white">
          <div style={{ background: "#fff" }}>
            <Header major={userMajor} className="mt-[50px]" title={""} />
            <div className="w-auto mt-[30px]">
              <Banner />
            </div>
            {position === "멘티" ? (
              renderMentorBoxes()
            ) : (
              <MentorScheduleSection />
            )}
            <div className="mt-[120px]"></div>{" "}
          </div>
        </div>
      </div>
    </>
  );
}
