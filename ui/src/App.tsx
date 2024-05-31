import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ClassificationHome from './components/home/ClassificationHome'
import Home from './pages/Home'
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
