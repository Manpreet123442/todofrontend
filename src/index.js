import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import App from './App';
import TaskList from './components/pages/TaskList';
import Dashboard from './components/pages/Dashboard';
import AddTodo from './components/pages/AddTodo';
import { AuthContextProvider } from './components/AuthContext/authContext';
import EditTask from './components/pages/Edit';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element = {<Login/>}/>
    <Route path='/register' element = {<Register/>}/>
    <Route path='/' element = {<App/>}>
      <Route path='tasklist' element = {<TaskList/>}/>
      <Route path='dashboard' element = {<Dashboard/>}/>
    </Route>
    <Route path='/addtodo' element = {<AddTodo/>}/>
    <Route path="/tasks/edit/:id" element={<EditTask />} />

    </>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
);