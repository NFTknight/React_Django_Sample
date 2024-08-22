import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './style.css'
import AboutUs from './views/about-us'
import Resources from './views/resources'
import Premium from './views/premium'
import UserProfile1 from './userService/user-profile'
import Home from './views/home'
import ProblemSet from './questionService/problemSet'
import CodeSubmissionForm from './codeSubmitService/CodeSubmit';
// import QuestionList from './views/questionList'
import Login from './userService/Login'
import Signup from './userService/signup'
import UserProfile from './userService/userProfile'
import { AuthProvider } from './views/authContext';
import QuestionForm from './questionService/questionForm'



const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route component={AboutUs} exact path="/about-us"  element={<AboutUs />}/>
        <Route component={Resources} exact path="/resources" element={<Resources />} />
        <Route component={Premium} exact path="/premium" element={<Premium />} />
        <Route component={UserProfile} exact path="/user-profile" element={<UserProfile1 />} />
        <Route component={Home} exact path="/" element={<Home />} />
        <Route component={ProblemSet} exact path="/problem-set" element={<ProblemSet />} />
        <Route component={QuestionForm} exact path="/question/create" element={<QuestionForm />} />
        <Route component={QuestionForm} exact path="/question/edit/:id" element={<QuestionForm />} />
        <Route path="/questions/:questionId" element={<CodeSubmissionForm/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/userProfile" element={<UserProfile/>} />
      </Routes>
    </Router>
    </AuthProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
