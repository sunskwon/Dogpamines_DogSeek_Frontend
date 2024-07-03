import Layout1 from "./layouts/Layout1.js"
import Board from "./pages/board/Board.js";
import BoardKakao from "./pages/board/BoardKakao.js";
import BoardPost from "./pages/board/BoardPost.js";
import BoardWiting from "./pages/board/BoardWiting.js"
import Curation from "./pages/curation/Curation.js";
import Company from "./pages/etc/Company.js";
import Main from "./pages/Main";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from "./pages/products/Products.js";
import ProductDetail from "./pages/products/ProductDetail.js";
import Mypage from "./pages/mypage/Mypage.js";
import Mydog from "./pages/mypage/Mydog.js"
import Login from "./pages/auth/Login.js";
import SignUp from "./pages/auth/SignUp.js";
import SignUpIdentity from "./pages/auth/SignUpIdentity.js";
import SignUpInfo from "./pages/auth/SignUpInfo.js";
import SignUpComplete from "./pages/auth/SignUpComplete.js";
import FindEmail from "./pages/auth/FindEmail.js";
import Terms from "./pages/etc/Terms.js";
import PrivacyPolicy from "./pages/etc/PrivacyPolicy.js";
import Dict from "./pages/dict/Dict.js";
import DictDetail from "./pages/dict/DictDetail.js";
import CurationSizeSelect from "./pages/curation/CurationSizeSelect.js";
import CurationSelectAge from "./pages/curation/CurationSelectAge.js";
import CurationSelectNeut from "./pages/curation/CurationSelectNeut.js";
import CurationSelectAllergy from "./pages/curation/CurationSelectAllergy.js";
import CurationSelectDisease from "./pages/curation/CurationSelectDisease.js";
import CurationSelectIngra from "./pages/curation/CurationSelectIngra.js";
import CurationSelectCook from "./pages/curation/CurationSelectCook.js";
import CurationResult from "./pages/curation/CurationResult.js";

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
import AnimalRegist from "./pages/animalRegist/AnimalRegist.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout1 />}>
            <Route index element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signupidentity" element={<SignUpIdentity />} />
            <Route path="/signupinfo" element={<SignUpInfo />} />
            <Route path="/signupcomplete" element={<SignUpComplete />} />
            <Route path="/findemail" element={<FindEmail/>}/>
            <Route path="/curation" element={<Curation />} />
            <Route path="/curationsizeselect" element={<CurationSizeSelect />} />
            <Route path="/curationselectage" element={<CurationSelectAge />} />
            <Route path="/curationselectneut" element={<CurationSelectNeut />} />
            <Route path="/curationselectallergy" element={<CurationSelectAllergy />} />
            <Route path="/curationselectdisease" element={<CurationSelectDisease />} />
            <Route path="/curationselectingra" element={<CurationSelectIngra />} />
            <Route path="/curationselectcook" element={<CurationSelectCook />} />
            <Route path="/curationresult" element={<CurationResult />} />
            <Route path="/products" element={<Products />} />
            <Route path="/productdetail" element={<ProductDetail/>} />
            <Route path="/dict" element={<Dict />} />
            <Route path="/dict/:dogName" element={<DictDetail />} />
            <Route path="/animalregist" element={<AnimalRegist />} />
            <Route path="/board" element={<Board />} />
            <Route path="/board/boardkakao" element={<BoardKakao />} />
            <Route path="/board/boardpost" element={<BoardPost />} />
            <Route path="/board/boardwiting" element={<BoardWiting />} />
            <Route path="/company" element={<Company />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/mydog" element={<Mydog />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          </Route>
          {/* </Routes> */}

          {/* 관리자 */}
          {/* <Routes> */}
          <Route path="/admin" element={<Adminlayout />}>
            <Route index element={<AdminDashBoard />} />
            <Route path="/admin/dashboard" element={<AdminDashBoard />} />
            <Route path="/admin/products" element={<AdminSelectAllProducts />} />
            <Route path="/admin/insertproduct" element={<AdminInsertProduct />} />
            <Route path="/admin/productdetail" element={<AdminSelectProductByCode />} />
            <Route path="/admin/updateproduct" element={<AdminUpdateProduct />} />
            <Route path="/admin/dicts" element={<AdminSelectAllDicts />} />
            <Route path="/admin/insertdict" element={<AdminInsertDict />} />
            <Route path="/admin/dictdetail" element={<AdminSelectDictByCode />} />
            <Route path="/admin/updatedict" element={<AdminUpdateDict />} />
            <Route path="/admin/boards" element={<AdminSelectAllBoards />} />
            <Route path="/admin/insertboard" element={<AdminInsertBoard />} />
            <Route path="/admin/boarddetail" element={<AdminSelectBoardByCode />} />
            <Route path="/admin/updateboard" element={<AdminUpdateBoard />} />
            <Route path="/admin/users" element={<AdminSelectAllUsers />} />
            <Route path="/admin/userdetail" element={<AdminSelectUserByCode />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
