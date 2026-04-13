import App from '../App';
import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import PostPage from '../pages/PostPage';
import AdminRoute from './AdminRoute';
import CreatePostPage from '../pages/CreatePostPage';
import EditPostPage from '../pages/EditPostPage';

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
      {
        path: 'posts/:id/edit',
        element: (
          <AdminRoute>
            <EditPostPage />{' '}
          </AdminRoute>
        ),
      },
    ],
  },
];

export default routes;
