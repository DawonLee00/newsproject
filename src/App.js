import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import './App.css';
import NewsListPage from './components/pages/NewsListPage';
import WineDetailPage from "./components/pages/WineDetailPage";
import LoginPage from "./components/pages/LoginPage";

function App(props) {
  return (
      <BrowserRouter>
          <Routes>
              <Route index element={<NewsListPage/>} />    
              <Route path="winedetail/:slug" element={<WineDetailPage/>} />    
              <Route path="Login" element={<LoginPage/>} />    
          </Routes>
      </BrowserRouter>
  );
}
export default App;
//    <Route path="post-write" element={<PostWritePage />} />
//<Route path="post/:postId" element={<PostViewPage />} />