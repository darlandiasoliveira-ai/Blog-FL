import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { BlogPost } from '../../types';
import { Save, ArrowLeft } from 'lucide-react';

export default function AdminPostEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
    author: 'Equipe FL Colchões',
    category: '',
    published: true,
  });
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const fetchPost = async () => {
        try {
          const docRef = doc(db, 'posts', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data() as BlogPost;
            setFormData({
              title: data.title,
              excerpt: data.excerpt,
              content: data.content,
              imageUrl: data.imageUrl,
              date: data.date,
              author: data.author,
              category: data.category,
              published: data.published,
            });
          }
        } catch (error) {
          console.error("Error fetching post:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (isEditing) {
        const docRef = doc(db, 'posts', id);
        await updateDoc(docRef, {
          ...formData,
          updatedAt: serverTimestamp(),
        });
      } else {
        const newDocRef = doc(collection(db, 'posts'));
        await setDoc(newDocRef, {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      navigate('/admin');
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Erro ao salvar o artigo. Verifique as permissões.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/admin')} className="text-gray-500 hover:text-gray-900">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? 'Editar Artigo' : 'Novo Artigo'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-brand-500 focus:border-brand-500"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Resumo (Excerpt)</label>
            <textarea
              name="excerpt"
              required
              rows={2}
              value={formData.excerpt}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-brand-500 focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <input
              type="text"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-brand-500 focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem de Capa</label>
            <input
              type="url"
              name="imageUrl"
              required
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-brand-500 focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Autor</label>
            <input
              type="text"
              name="author"
              required
              value={formData.author}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-brand-500 focus:border-brand-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de Exibição</label>
            <input
              type="text"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-brand-500 focus:border-brand-500"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo (Markdown)</label>
            <textarea
              name="content"
              required
              rows={15}
              value={formData.content}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-brand-500 focus:border-brand-500 font-mono text-sm"
            />
          </div>

          <div className="col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
            />
            <label htmlFor="published" className="text-sm font-medium text-gray-700">
              Publicar imediatamente
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-brand-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-brand-700 disabled:opacity-50 transition-colors"
          >
            <Save className="h-5 w-5" />
            {saving ? 'Salvando...' : 'Salvar Artigo'}
          </button>
        </div>
      </form>
    </div>
  );
}
