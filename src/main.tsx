import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ScenarioList from './pages/ScenarioList/ScenarioList.tsx';
import Error from './pages/Error/Error.tsx';
import Cards from './pages/Cards/Cards.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const router = createBrowserRouter([
    {
        path: '/',
        element: <ScenarioList />
    },
    {
        path: 'scenario/:id',
        element: <Cards />
    },
    {
        path: '*',
        element: <Error />
    }
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
