import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import './App.css';
import NewsListPage from './components/pages/NewsListPage';
import LoginPage from "./components/pages/LoginPage";
import SignInPage from "./components/pages/SignInPage";
import KeywordPage from "./components/pages/KeywordPage";
import QuizPage from "./components/pages/QuizPage";
import WeahterPage from "./components/pages/WeatherPage";


function App(props) {
  return (
      <BrowserRouter>
          <Routes>
              <Route index element={<NewsListPage/>} />        
              <Route path="Login" element={<LoginPage/>} />  
              <Route path="Signin" element={<SignInPage/>} />  
              <Route path="keyword" element={<KeywordPage/>} /> 
              <Route path="quiz" element={<QuizPage/>} /> 
              <Route path="weather" element={<WeahterPage/>}/>
          </Routes>
      </BrowserRouter>
  );
}
export default App;
//    <Route path="post-write" element={<PostWritePage />} />
//<Route path="post/:postId" element={<PostViewPage />} />