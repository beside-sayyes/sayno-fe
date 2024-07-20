import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import Home from './pages/Home.tsx';
import RequestQuestion from './pages/RequestQuestion.tsx';
import RejectQuestion from './pages/RejectQuestion.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/request-question',
        element: <RequestQuestion />,
      },
      {
        path: '/reject-question',
        element: <RejectQuestion />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
