/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Article from './pages/Article';
import Assistant from './pages/Assistant';

// Admin Pages
import AdminLayout from './components/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPostEditor from './pages/admin/AdminPostEditor';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<Article />} />
            <Route path="assistente" element={<Assistant />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="posts" element={<AdminDashboard />} />
            <Route path="posts/new" element={<AdminPostEditor />} />
            <Route path="posts/edit/:id" element={<AdminPostEditor />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
