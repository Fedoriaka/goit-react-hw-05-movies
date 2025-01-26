import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from './SharedLayout';
const Home = React.lazy(() => import('../page/Home'));
const Movies = React.lazy(() => import('../page/Movies'));
const MovieDetails = React.lazy(() => import('../page/MovieDetails'));
const NotFound = React.lazy(() => import('../page/NotFound'));

export const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieId/*" element={<MovieDetails />} />
          </Route>
          <Route path="/NotFound" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
