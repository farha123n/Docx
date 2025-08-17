import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Root from './Route/Root.jsx';
import Home from './Pages/Home.jsx';
import AuthProvider from './Route/AuthProvider.jsx';
import Login from './Authentication/Login.jsx';
import Register from './Authentication/Register.jsx';
import DashBoard from './Components/DashBoard.jsx';
import AddPost from './Pages/AddPost.jsx';
import PostDetails from './Pages/PostDetails.jsx';
import Comment from './Pages/Comment.jsx';
import BecomeMember from './Pages/BecomeMember.jsx';
import Success from './Pages/Success.jsx';
import Admin from './Pages/Admin.jsx';
import AdminList from './Pages/AdminList.jsx';
import Member from './Pages/Member.jsx';
import Announcement from './Pages/Announcement.jsx';
import Notification from './Pages/Notification.jsx';
import MyProfile from './Pages/MyProfile.jsx';
import MyPost from './Pages/MyPost.jsx';
import PrivateRoute from './Route/PrivateRoute.jsx';
import AdminRoute from './Route/AdminRoute.jsx';
import PostComments from './Pages/PostComments.jsx';
import Error from './Pages/Error.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement:<Error></Error>,
    children: [
      { index: true, Component: Home },
      {
        path: '/login', Component: Login
      },
      {
        path: 'register', Component: Register
      },
      {
          path:'success',Component:Success
      },
      {
            path:'/membership',Component:Member
      },
      {
         path:'/notification',Component:Notification
      },
      {
        path:'/postComment',Component:PostComments
      },
       {
            path: "post/:id",
            element: <PostDetails />
          },
      {
        path: '/dashBoard', element:<PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
        children: [
          {index:true,Component:MyProfile},
          { path: 'addPost', Component: AddPost },
         
          {
            path:'comment/:id',
            element:<Comment></Comment>
          },
          {
            path:'member',element:<BecomeMember></BecomeMember>
          },
          {

            path:'admin',element:<AdminRoute><Admin></Admin></AdminRoute>
          },
          {
            path:'adminList',element:<AdminList></AdminList>
          },
          {
            path:'announcement',element:<Announcement></Announcement>

      
          },
          {
            path:'adminList',element:<AdminRoute><AdminList></AdminList></AdminRoute>
          },
          {
            path:'announcement',element:<AdminRoute><Announcement></Announcement></AdminRoute>

          },
          {
            path:'myPost',element:<MyPost></MyPost>
          }
        ]
      }
    ]
  },
]);
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
