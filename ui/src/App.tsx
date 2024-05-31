import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { SideBarHome } from './components/home/SideBarHome'
import ClassificationHome from './components/home/ClassificationHome'
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
      element: <SideBarHome />,
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
