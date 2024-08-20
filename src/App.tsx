import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import Home from './pages/Home.tsx';
import Question from './pages/Question.tsx';
import Result from './pages/Result.tsx';
import Error from './pages/Error.tsx';
import HomeV2 from './pages/HomeV2.tsx';
import QuestionV2 from './pages/QuestionV2.tsx';

const router = createBrowserRouter([
  {
    path: '/v1',
    element: <Layout />,
    children: [
      {
        path: '/v1',
        element: <Home />,
      },
      {
        path: '/v1/question',
        element: <Question />,
      },
      {
        path: '/v1/result',
        element: <Result />,
      },
      {
        path: '*',
        element: <Error />,
      },
    ],
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomeV2 />,
      },
      {
        path: '/question',
        element: <QuestionV2 />,
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
