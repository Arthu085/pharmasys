import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<MainLayout />} />
          {/*<Route index element={}/> ROTA PRINCIPAL */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
