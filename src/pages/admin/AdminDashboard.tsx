import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { BlogPost } from '../../types';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogPost[];
      
      setPosts(postsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching posts:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este artigo?')) {
      try {
        await deleteDoc(doc(db, 'posts', id));
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Erro ao excluir o artigo.");
      }
    }
  };

  if (loading) {
    return <div>Carregando artigos...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gerenciar Artigos</h1>
        <Link 
          to="/admin/posts/new" 
          className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Novo Artigo
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Título</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Categoria</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  Nenhum artigo publicado ainda.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{post.title}</div>
                    <div className="text-sm text-gray-500">{post.date}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{post.category}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.published ? 'Publicado' : 'Rascunho'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link 
                      to={`/admin/posts/edit/${post.id}`}
                      className="text-blue-600 hover:text-blue-800 inline-flex"
                    >
                      <Edit className="h-5 w-5" />
                    </Link>
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:text-red-800 inline-flex"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
