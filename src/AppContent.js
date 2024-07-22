import { Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './Pages/Login/Login';
import GenrePage from './Pages/Genre/GenrePage';
import MyFavorites from './Pages/MyFavorites/MyFavorites';
import MovieDetails from './Pages/MovieDetails/MovieDetails';
import Home from './Pages/Home/Home';
import ProtectedRoute from './Routing';
import Header from './Components/Header/Header';
import PropTypes from "prop-types";
const AppContent = () => {
  const location = useLocation();
  const shouldShowHeader = location.pathname !== '/';
  
  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/favourites" element={<ProtectedRoute><MyFavorites /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/movie/:id" element={<ProtectedRoute><MovieDetails /></ProtectedRoute>} />
        <Route path="/genre/:id" element={<ProtectedRoute><GenrePage /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

AppContent.propTypes = {
id:PropTypes.number,

};
export default AppContent;