import Layout1 from "./Layouts/Layout1.js"
import Layout2 from "./Layouts/Layout2.js";
import Board from "./pages/Board/Board.js";
import Post from "./pages/Board/Post.js";
import Curation from "./pages/Curation/Curation.js";
import Company from "./pages/Etc/Company.js";
import Main from "./pages/Main";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from "./pages/Products/Products.js";
import Mypage from "./pages/Mypage/Mypage.js";
import Mydog from "./pages/Mypage/Mydog.js"
import Login from "./pages/Auth/Login.js";
import SignUp from "./pages/Auth/SignUp.js";
import Terms from "./pages/Etc/Terms.js";
import PrivacyPolicy from "./pages/Etc/PrivacyPolicy.js";
import Dict from "./pages/dict/Dict.js";

import Adminlayout from "./Layouts/AdminLayout.js";
import AdminDashBoard from "./pages/Admin/AdminDashBoard.js";
import AdminSelectAllProducts from "./pages/Admin/Products/AdminSelectAllProducts.js";
import AdminInsertProduct from "./pages/Admin/Products/AdminInserProduct.js";
import AdminSelectProductByCode from "./pages/Admin/Products/AdminSelectProductByCode.js";
import AdminUpdateProduct from "./pages/Admin/Products/AdminUpdateProduct.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 로그인 O */}
          {/* <Route path="/" element={<Layout2/>}>
            <Route index element={<Main/>}/>
            <Route path="/curation" element={<Curation/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/dogs" element={<Dogs/>}/>
            <Route path="/board" element={<Board/>}/>
            <Route path="/mypage" element={<Mypage/>}/>
            <Route path="/company" element={<Company/>} />
          </Route> */}

          {/* 로그인 X */}
          <Route path="/" element={<Layout1/>}>
            <Route index element={<Main/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/curation" element={<Curation/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/dict" element={<Dict/>}/>
            <Route path="/board" element={<Board/>}/>
            <Route path="/post" element={<Post/>}/>
            <Route path="/company" element={<Company/>} />
            <Route path="/terms" element={<Terms/>}/>
            <Route path="/mypage" element={<Mypage/>}/>
            <Route path="/mydog" element={<Mydog/>}/>
            <Route path="/privacypolicy" element={<PrivacyPolicy/>}/>
          </Route>
        </Routes>

        {/* 관리자 */}
        <Routes>
          <Route path="/admin" element={<Adminlayout />}>
            <Route index element={<AdminDashBoard />} />
            <Route path="/admin/dashboard" element={<AdminDashBoard />} />
            <Route path="/admin/products" element={<AdminSelectAllProducts />} />
            <Route path="/admin/insertproduct" element={<AdminInsertProduct />} />
            <Route path="/admin/productdetail" element={<AdminSelectProductByCode />} />
            <Route path="/admin/updateproduct" element={<AdminUpdateProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
