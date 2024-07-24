import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import Home from './pages/Home.tsx';
import Question from './pages/Question.tsx';
import Loading from './pages/Loading.tsx';
import Result from './pages/Result.tsx';
import Error from './pages/Error.tsx';

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
        path: '/question',
        element: <Question />,
      },
      {
        path: '/loading',
        element: <Loading />,
      },
      {
        path: '/result',
        element: <Result />,
      },
      {
        path: '*',
        element: <Error />,
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
