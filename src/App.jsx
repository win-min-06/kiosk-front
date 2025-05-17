import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/eatheregkrh" element={<MenuPage />} />
        <Route path="/eatout" element={<MenuPage />} />
      </Routes>
    </Router>
  );
}

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = async (categoryId) => {
    try {
      const response = await fetch(`/categories/${categoryId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSelectedCategory(data);
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-200">
      <div className="w-[360px] h-[640px] flex">
        <div className="w-1/5 h-full bg-[#FFC915] flex flex-col justify-center">
          <div className="h-1/2 text-[9px] bg-[#484848] flex flex-col items-center p-1 space-y-2 rounded-r-xl">
            <div className="flex flex-col gap-2 mb-2">
              <button className="!bg-[#FFC915] text-black font-bold">
                추천메뉴
              </button>
              <button 
                className="!bg-gray-500 text-white font-bold"
                onClick={() => handleCategoryClick(1)}
              >
                🍔 버 거
              </button>
              <button 
                className="!bg-gray-500 text-white font-bold"
                onClick={() => handleCategoryClick(2)}
              >
                🍟 사이드
              </button>
              <button 
                className="!bg-gray-500 text-white font-bold"
                onClick={() => handleCategoryClick(3)}
              >
                🥤 음 료
              </button>
            </div>
            <div className="mt-auto flex flex-col gap-2">
              <button className="bg-white text-black font-bold">직원 호출</button>
              <button className="bg-white text-black">기본 화면</button>
              <p className="text-white text-[5px] text-xl mb-2 text-left w-full">
                *지금은 AI 개인 맞춤형 화면입니다.
              </p>
            </div>
          </div>
        </div>

        <div className="w-4/5 h-full bg-[#F5F5F5] p-4 overflow-y-auto relative">
          {selectedCategory && (
            <div>
              {JSON.stringify(selectedCategory)}
            </div>
          )}
          <button
            className="absolute bottom-4 right-0 w-2/5 h-14 text-lg font-bold flex items-center justify-center gap-3 border border-black rounded-l-xl"
            style={{ backgroundColor: "#FFC915", color: "#000000" }}
          >
            <img src="/shoppingcart.png" alt="장바구니" className="w-8 h-8" />
            주문 확인
          </button>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-200">
      <div className="w-[360px] h-[640px] flex">
        <div className="w-1/5 h-full bg-[#FFC915] flex flex-col">
          <div className="flex-1 flex flex-col justify-center">
            <div className="h-5/29 text-[9px] rounded-xl bg-[#484848] flex flex-col justify-end items-center p-1 space-y-2">
              <button className="bg-white text-black font-bold">직원 호출</button>
              <button className="bg-white text-black">기본 화면</button>
              <p className="text-white text-[5px] text-xl mb-4 text-left w-full">
                *지금은 AI 개인 맞춤형 화면입니다.
              </p>
            </div>
          </div>
        </div>

        {/*메인 콘텐츠 */}
        <div className="w-4/5 h-full flex flex-col justify-center items-center px-4 py-8 bg-[#F5F5F5]">
          <p className="text-3xl mb-4 text-left w-full font-bold">어서오세요</p>
          <p className="text-xl mb-8 text-left w-full">
            주문하시려면 아래 버튼을 눌러주세요.
          </p>
          <div className="flex gap-4">
            {/* 먹고 가기 버튼 */}
            <button
              className="w-32 h-20 text-xl font-semibold rounded-xl"
              style={{ backgroundColor: "#666666", color: "white" }}
              onClick={() => navigate("/eatheregkrh")}
            >
              먹고 가기
            </button>

            {/* 가져 가기 버튼 */}
            <button
              className="w-32 h-20 text-xl font-semibold rounded-xl"
              style={{ backgroundColor: "#FFC915", color: "#000000" }}
              onClick={() => navigate("/eatout")}
            >
              가져 가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
