import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider} from  'react-router-dom'
import Notfound from './Notfound.jsx'
// import ViewStory from './ViewStory.jsx'
import Profile from './Profile.jsx'
import { ThemeContext, ThemeProvider } from './ThemeContext.jsx'
import CreatePost from './CreatePost.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    errorElement:<Notfound/>
  },
  // {
  //   path:'/Story/:id/:tot',
  //   element:<ViewStory/>,
  //   errorElement:<Notfound/>
  // },
  {
    path:'/Profile',
    element:<Profile/>,
    errorElement:<Notfound/>
  },
  // {
  //   path: '/Create',
  //   element: <CreatePost/>,
  //   errorElement: <Notfound/>

  // }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
    <RouterProvider router={router}/>
   
    </ThemeProvider>
  </StrictMode>
);
