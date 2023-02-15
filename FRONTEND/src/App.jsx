import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ProjectPage from './ProjectPage';
import TaskPage from './TaskPage';
import RequestPage from './RequestPage';


import './App.css'

function App() {
  const [user, setUser] = useState({username: ' ', password: ' '})
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage user={user} setUser={setUser}/>,
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
    },
    {
      path: "/request",
      element: <RequestPage />
    }
  ])
 

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
