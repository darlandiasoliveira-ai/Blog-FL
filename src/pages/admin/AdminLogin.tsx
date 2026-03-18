import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

export default function AdminLogin() {
  const { user, isAdmin, loading, signInWithGoogle } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (user && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Acesso Restrito</h1>
        <p className="text-gray-600 mb-8">Faça login para acessar o painel administrativo.</p>
        
        {user && !isAdmin && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm">
            Sua conta ({user.email}) não tem permissão de administrador.
          </div>
        )}

        <button
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm"
        >
          <LogIn className="h-5 w-5" />
          Entrar com Google
        </button>
      </div>
    </div>
  );
}
