import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, LogOut, FileText, Home } from 'lucide-react';

export default function AdminLayout() {
  const { user, isAdmin, loading, signOut } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="font-serif font-bold text-xl text-gray-900">Painel Admin</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link to="/admin" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-50 hover:text-brand-600">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link to="/admin/posts" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-50 hover:text-brand-600">
            <FileText className="h-5 w-5" />
            Artigos
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200 space-y-2">
          <Link to="/" className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded-md hover:bg-gray-50">
            <Home className="h-5 w-5" />
            Ver Site
          </Link>
          <button 
            onClick={signOut}
            className="w-full flex items-center gap-3 px-3 py-2 text-red-600 rounded-md hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
