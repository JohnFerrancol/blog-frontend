import App from '../App';
import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import PostPage from '../pages/PostPage';
import CreatePostPage from '../pages/CreatePostPage';
import AdminRoute from './AdminRoute';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'posts/:id', element: <PostPage /> },
      {
        path: 'posts/new',
        element: (
          <AdminRoute>
            <CreatePostPage />{' '}
          </AdminRoute>
        ),
      },
    ],
  },
];

export default routes;
