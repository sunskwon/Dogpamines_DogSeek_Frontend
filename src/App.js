import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UserLayout from "./layouts/UserLayout.js"

import Main from "./pages/Main";

import SignUp from "./pages/SignUp.js";

import Login from "./pages/Login.js";
import FindEmail from "./pages/auth/FindEmail.js";
import FindPwd from "./pages/auth/FindPwd.js";
import ReleaseSleep from "./pages/auth/ReleaseSleep.js";

import Curation from "./pages/curation/Curation.js";
import CurationSizeSelect from "./pages/curation/CurationSizeSelect.js";
import CurationSelectAge from "./pages/curation/CurationSelectAge.js";
import CurationSelectNeut from "./pages/curation/CurationSelectNeut.js";
import CurationSelectAllergy from "./pages/curation/CurationSelectAllergy.js";
import CurationSelectDisease from "./pages/curation/CurationSelectDisease.js";
import CurationSelectIngra from "./pages/curation/CurationSelectIngra.js";
import CurationSelectCook from "./pages/curation/CurationSelectCook.js";
import CurationResult from "./pages/curation/CurationResult.js";

import Products from "./pages/Products.js";

import Dogs from "./pages/Dogs.js";

import AnimalRegist from "./pages/animalRegist/AnimalRegist.js";

import Boards from "./pages/Boards.js";
import PostDetail from "./pages/board/BoardPost.js";
import BoardWriting from "./pages/board/BoardWriting.js"
import BoardUpdate from "./pages/board/BoardUpdate.js"

import Company from "./pages/etc/Company.js";
import Terms from "./pages/etc/Terms.js";
import PrivacyPolicy from "./pages/etc/PrivacyPolicy.js";

import Mypage from "./pages/mypage/Mypage.js";
import Mydog from "./pages/mypage/Mydog.js"

import UserPublicChat from "./pages/chat/UserPublicChat.js";
import UserPrivateChat from "./pages/chat/UserPrivateChat.js";

import Adminlayout from "./layouts/AdminLayout.js";
import AdminDashBoard from "./pages/admin/AdminDashBoard.js";
import AdminSelectAllProducts from "./pages/admin/products/AdminSelectAllProducts.js";
import AdminInsertProduct from "./pages/admin/products/AdminInsertProduct.js";
import AdminSelectProductByCode from "./pages/admin/products/AdminSelectProductByCode.js";
import AdminUpdateProduct from "./pages/admin/products/AdminUpdateProduct.js";
import AdminSelectAllDicts from "./pages/admin/dict/AdminSelectAllDicts.js";
import AdminInsertDict from "./pages/admin/dict/AdminInsertDict.js";
import AdminSelectDictByCode from "./pages/admin/dict/AdminSelectDictByCode.js"
import AdminUpdateDict from "./pages/admin/dict/AdminUpdateDict.js";
import AdminSelectAllBoards from "./pages/admin/board/AdminSelectAllBoards.js";
import AdminInsertBoard from "./pages/admin/board/AdminInsertBoard.js";
import AdminSelectBoardByCode from "./pages/admin/board/AdminSelectBoardByCode.js";
import AdminUpdateBoard from "./pages/admin/board/AdminUpdateBoard.js";
import AdminSelectAllUsers from "./pages/admin/user/AdminSelectAllUsers.js";
import AdminSelectUserByCode from "./pages/admin/user/AdminSelectUserByCode.js"
import AdminChatList from "./pages/admin/chat/AdminChatList.js";
import AdminChat from "./pages/admin/chat/AdminChat.js";

import NotFound from "./pages/common/NotFound.js";
import ErrorBoundary from "./pages/common/Errorboundary.js";

function App() {
  return (
      <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Main />} />
            
            <Route path="/signup" element={<SignUp />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/find-email" element={<FindEmail />} />
            <Route path="/find-pwd" element={<FindPwd />} />
            <Route path="/release/sleep" element={<ReleaseSleep/>}/>

            <Route path="/curation" element={<Curation />} />
            <Route path="/curation-size" element={<CurationSizeSelect />} />
            <Route path="/curation-age" element={<CurationSelectAge />} />
            <Route path="/curation-neut" element={<CurationSelectNeut />} />
            <Route path="/curation-allergy" element={<CurationSelectAllergy />} />
            <Route path="/curation-disease" element={<CurationSelectDisease />} />
            <Route path="/curation-ingra" element={<CurationSelectIngra />} />
            <Route path="/curation-cook" element={<CurationSelectCook />} />
            <Route path="/curation-result" element={<CurationResult />} />
            
            <Route path="/products" element={<Products />} />
            
            <Route path="/dogs" element={<Dogs />} />

            <Route path="/animal-info" element={<AnimalRegist />} />
            
            <Route path="/boards" element={<Boards />} />
            <Route path="/post/:code" element={<PostDetail />} />
            <Route path="/board/add" element={<BoardWriting />} />
            <Route path="/board/edit" element={<BoardUpdate />} />
            
            <Route path="/company" element={<Company />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            
            <Route path="/my-page" element={<Mypage />} />
            <Route path="/my-dog" element={<Mydog />} />

            <Route path="/public-chat" element={<UserPublicChat />} />
            <Route path="/private-chat" element={<UserPrivateChat />} />

            {/* NotFound는 모든 Route보다 아래에 있을 것 */}
          </Route>
            <Route path="/*" element={<NotFound />} />
          {/* </Routes> */}

          {/* 관리자 */}
          {/* <Routes> */}
          <Route path="/admin" element={<Adminlayout />}>
            <Route index element={<AdminDashBoard />} />
            <Route path="/admin/dashboard" element={<AdminDashBoard />} />
            <Route path="/admin/products" element={<AdminSelectAllProducts />} />
            <Route path="/admin/newproduct" element={<AdminInsertProduct />} />
            <Route path="/admin/productdetail" element={<AdminSelectProductByCode />} />
            <Route path="/admin/modifyproduct" element={<AdminUpdateProduct />} />
            <Route path="/admin/dicts" element={<AdminSelectAllDicts />} />
            <Route path="/admin/newdict" element={<AdminInsertDict />} />
            <Route path="/admin/dictdetail" element={<AdminSelectDictByCode />} />
            <Route path="/admin/modifydict" element={<AdminUpdateDict />} />
            <Route path="/admin/boards" element={<AdminSelectAllBoards />} />
            <Route path="/admin/newboard" element={<AdminInsertBoard />} />
            <Route path="/admin/boarddetail" element={<AdminSelectBoardByCode />} />
            <Route path="/admin/modifyboard" element={<AdminUpdateBoard />} />
            <Route path="/admin/users" element={<AdminSelectAllUsers />} />
            <Route path="/admin/userdetail" element={<AdminSelectUserByCode />} />
            <Route path="/admin/chatlist" element={<AdminChatList />} />
            <Route path="/admin/chat" element={<AdminChat />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </ErrorBoundary>
  );
}

export default App;
