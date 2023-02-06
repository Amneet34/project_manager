import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ProjectPage from './ProjectPage';
import TaskPage from './TaskPage';


import './App.css'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/project",
      element: <ProjectPage />,
    },
    {
      path: "/task",
      element: <TaskPage />,
    }
  ])
 

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
