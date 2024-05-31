import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ClassificationHome from './components/home/ClassificationHome'
import Home from './pages/Home'
import Profile from './pages/Profile'
import RegressionHome from './components/home/RegressionHome'
function App() {
  const router = createBrowserRouter([
    {
      element: <Login />,
      path: '/login'
    },
    {
      element: <SignUp />,
      path: '/register'
    },
    {
      element: <Home />,
      path: '/',
      children: [
        {
          element: <ClassificationHome />,
          path: 'classification'
        },
        {
          element: <RegressionHome />,
          path: 'regression'
        },
        {
          element: <Profile />,
          path: 'profile'
        }
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
