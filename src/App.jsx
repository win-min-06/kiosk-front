import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/eatheregkrh" element={<MenuPage />} />
        <Route path="/eatout" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

const ProgressBar = ({ step }) => {
  const steps = [
    { id: 1, name: '메뉴 선택' },
    { id: 2, name: '주문 확인' },
    { id: 3, name: '결제' }
  ];

  return (
    <div className="w-full bg-white py-2 px-4 border-b">
      <div className="flex justify-between items-center">
        {steps.map((s) => (
          <div key={s.id} className="flex items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= s.id ? 'bg-[#FFC915]' : 'bg-gray-200'}`}>
              <span className="text-sm">{s.id}</span>
            </div>
            <span className={`ml-2 text-sm ${step >= s.id ? 'font-bold' : 'text-gray-500'}`}>{s.name}</span>
            {s.id !== 3 && <div className={`w-12 h-0.5 mx-2 ${step > s.id ? 'bg-[#FFC915]' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>
    </div>
  );
};

const PaymentPage = () => {
  const navigate = useNavigate();
  const totalAmount = parseInt(localStorage.getItem('totalAmount') || '0');
  
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-200">
      <div className="w-[360px] h-[640px] flex">
        {/* 왼쪽 사이드바 - 시작 화면 스타일 */}
        <div className="w-1/5 h-full bg-[#FFC915] flex flex-col">
          <div className="flex-1 flex flex-col justify-center">
            <div className="h-5/29 text-[9px] bg-[#484848] flex flex-col justify-end items-center p-1 space-y-2 rounded-r-xl">
              <button className="bg-white text-black font-bold">직원 호출</button>
              <button className="bg-white text-black">기본 화면</button>
              <p className="text-white text-[5px] text-xl mb-4 text-left w-full">
                *지금은 AI 개인 맞춤형 화면입니다.
              </p>
            </div>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="w-4/5 h-full bg-white flex flex-col">
          <ProgressBar step={3} />
          {/* 결제 금액 */}
          <div className="p-6">
            <div className="bg-[#FFC915] rounded-2xl p-6 mb-8">
              <div className="text-center">
                <div className="text-lg font-bold mb-1">총 결제금액</div>
                <div className="text-2xl font-bold">₩{totalAmount.toLocaleString()}</div>
              </div>
            </div>

            <div className="text-lg font-bold mb-4">결제 방법을 선택해 주세요</div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center h-24">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">💳</span>
                  <span className="font-bold text-lg">카드결제</span>
                </div>
              </div>
              <div className="bg-white border-2 border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center h-24">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">📱</span>
                  <div>
                    <span className="font-bold text-lg">간편 결제</span>
                    <div className="text-sm text-gray-500">PAYCO</div>
                  </div>
                </div>
              </div>
              <div className="bg-white border-2 border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center h-24">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">📱</span>
                  <span className="font-bold text-lg">모바일 상품권</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem('cartItems') || '[]');
  });
  const totalAmount = parseInt(localStorage.getItem('totalAmount') || '0');

  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem('cartItems', '[]');
    localStorage.setItem('totalAmount', '0');
    navigate(-1);
  };
  
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-200">
      <div className="w-[360px] h-[640px] flex">
        <div className="w-1/5 h-full bg-[#FFC915] flex flex-col">
          <div className="flex-1 flex flex-col justify-center">
            <div className="h-5/29 text-[9px] bg-[#484848] flex flex-col justify-end items-center p-1 space-y-2 rounded-r-xl">
              <button className="bg-white text-black font-bold">직원 호출</button>
              <button className="bg-white text-black">기본 화면</button>
              <p className="text-white text-[5px] text-xl mb-4 text-left w-full">
                *지금은 AI 개인 맞춤형 화면입니다.
              </p>
            </div>
          </div>
        </div>

        <div className="w-4/5 h-full bg-[#F5F5F5] flex flex-col">
          <ProgressBar step={2} />
          <div className="flex-1 p-4">
            <h2 className="text-xl font-bold mb-4">주문 내역</h2>
            <div className="bg-white rounded-lg p-4 flex-1">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{item.name}</span>
                      <span className="text-sm text-gray-500">x{item.quantity}</span>
                    </div>
                    <span>{(item.price * item.quantity).toLocaleString()}원</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-bold">주문 금액</span>
                  <span className="font-bold">{totalAmount.toLocaleString()}원</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                className="h-12 bg-white text-black font-bold rounded border border-gray-200"
                onClick={() => navigate(-1)}
              >
                이전으로
              </button>
              <button
                className="h-12 bg-white text-black font-bold rounded border border-gray-200"
                onClick={clearCart}
              >
                비우기
              </button>
            </div>
            <button
              className="h-12 bg-white text-black font-bold rounded border border-gray-200"
              onClick={() => navigate("/payment")}
            >
              결제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
  const navigate = useNavigate();

  useEffect(() => {
    // 페이지 로드 시 기본적으로 버거 카테고리(2) 불러오기
    handleCategoryClick(2);
  }, []);

  useEffect(() => {
    // cartItems가 변경될 때마다 localStorage 업데이트
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalAmount', getTotalAmount().toString());
  }, [cartItems]);

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

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const getTotalAmount = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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
                onClick={() => handleCategoryClick(2)}
              >
                🍔 버 거
              </button>
              <button 
                className="!bg-gray-500 text-white font-bold"
                onClick={() => handleCategoryClick(3)}
              >
                🍟 사이드
              </button>
              <button 
                className="!bg-gray-500 text-white font-bold"
                onClick={() => handleCategoryClick(1)}
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

        <div className="w-4/5 h-full bg-[#F5F5F5] flex flex-col">
          <ProgressBar step={1} />
          <div className="flex-1 p-4 overflow-y-auto">
            {selectedCategory && (
              <div className="grid grid-cols-2 gap-4">
                {selectedCategory.products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => addToCart(product)}
                  >
                    <div className="text-center h-full flex flex-col justify-between">
                      <div>
                        <div className="text-lg font-bold mb-2 text-[#2D2D2D]">{product.name}</div>
                        <div className="text-[#FF9F1C] font-bold mb-1">{product.price.toLocaleString()}원</div>
                        <div className="text-[#6B7280]">{product.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-gray-200 bg-white">
              <button
                className="w-full h-12 text-lg font-bold flex items-center justify-center gap-3 bg-[#FFC915] text-black rounded-lg"
                onClick={() => {
                  localStorage.setItem('cartItems', JSON.stringify(cartItems));
                  localStorage.setItem('totalAmount', getTotalAmount());
                  navigate("/cart");
                }}
              >
                <img src="/shoppingcart.png" alt="장바구니" className="w-6 h-6" />
                주문 확인 ({cartItems.reduce((sum, item) => sum + item.quantity, 0)}개)
              </button>
            </div>
          )}
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
            <div className="h-5/29 text-[9px] bg-[#484848] flex flex-col justify-end items-center p-1 space-y-2 rounded-r-xl">
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
