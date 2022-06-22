import React from 'react';
import LoginPage from "./page/user/LoginPage";
import RegisterPage from "./page/user/RegisterPage";
import { Routes, Route, Router } from "react-router";
import MainPage from "./page/user/MainPage";
import FindMyPwPage from "./page/user/FindMyPwPage";
import CategoryList from "./page/cloth/CategoryList";
import ClothList from "./page/cloth/ClothList";
import EditCloth from "./page/cloth/EditCloth";
import EditUserPage from "./page/user/EditUser";
import TrashBin from './page/cloth/TrashBin'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./redux/login";
import AddCloth from './page/cloth/AddCloth';
import EditClothPage from './page/cloth/EditClothPage';
import ClothSearchPage from './page/cloth/ClothSearchPage';
import CustomCategoryDetail from './page/cloth/CustomCategoryDetail';



function App() {
  const mode = true;
  const dispatch = useDispatch();

  return (
    <>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/register" element = {<RegisterPage/>}/>
      <Route path="/findmypw" element = {<FindMyPwPage/>}/>
      <Route path="/:season" element = {<CategoryList />}/>
      <Route path="/addcloth" element= {<AddCloth />} />
      <Route path='/searchcloth/:name' element={<ClothSearchPage />} />
      <Route path="/editcloth/:id" element ={<EditCloth />}/>
      <Route path="/clothlist" element = {<ClothList name = "안녕" />}/>
      <Route path="/editUser" element = {<EditUserPage />}/>
      <Route path="/trashbin" element = {<TrashBin /> } />
      <Route path="/customcategory/:id" element = {<CustomCategoryDetail />} />
    </Routes>
    </>
  );
}

export default App;
