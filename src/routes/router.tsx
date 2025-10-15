import AppCrash from '@/pages/crash';
import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { Routes } from './routes';

const Layout = lazy(async () => await import('@/components/layout'));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<AppCrash />}>
      {Routes}
    </Route>
  )
);
