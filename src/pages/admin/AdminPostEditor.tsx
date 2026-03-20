import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, collection } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { BlogPost } from '../../types';
import { Save, ArrowLeft, Upload, Loader2, Image as ImageIcon } from 'lucide-react';

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
    author: 'Equipe FL Móveis e Colchões',
    category: '',
    published: true,
    seoTitle: '',
    slug: '',
    metaDescription: '',
    keywords: '',
  });
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingContentImage, setUploadingContentImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (isEditing) {
      const fetchPost = async () => {
        try {
          const docRef = doc(db, 'posts', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data() as BlogPost;
            setFormData({
              title: data.title || '',
              excerpt: data.excerpt || '',
              content: data.content || '',
              imageUrl: data.imageUrl || '',
              date: data.date || '',
              author: data.author || '',
              category: data.category || '',
              published: data.published ?? true,
              seoTitle: data.seoTitle || '',
              slug: data.slug || '',
              metaDescription: data.metaDescription || '',
              keywords: data.keywords || '',
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadProgress(0);

    const storageRef = ref(storage, `blog-images/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading image:", error);
        alert("Erro ao fazer upload da imagem. Verifique as permissões do Storage.");
        setUploadingImage(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setFormData(prev => ({ ...prev, imageUrl: downloadURL }));
        setUploadingImage(false);
      }
    );
  };

  const handleContentImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingContentImage(true);

    const storageRef = ref(storage, `blog-images/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // We can use a simple alert or toast for progress, or just let it upload silently
    // For now, let's just append it when done
    uploadTask.on(
      'state_changed',
      () => {},
      (error) => {
        console.error("Error uploading image:", error);
        alert("Erro ao fazer upload da imagem para o conteúdo.");
        setUploadingContentImage(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const imageMarkdown = `\n![${file.name}](${downloadURL})\n`;
        setFormData(prev => ({
          ...prev,
          content: prev.content + imageMarkdown
        }));
        setUploadingContentImage(false);
      }
    );
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

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Imagem de Capa</label>
            <div className="flex flex-col gap-4">
              {/* Image Preview */}
              {formData.imageUrl && (
                <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden border border-gray-200">
                  <img src={formData.imageUrl} alt="Capa" className="w-full h-full object-cover" />
                </div>
              )}
              
              <div className="flex items-center gap-4">
                <label className="relative cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors">
                  {uploadingImage ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  {uploadingImage ? `Enviando... ${Math.round(uploadProgress)}%` : 'Fazer Upload de Imagem'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                </label>
                <span className="text-sm text-gray-500">ou cole a URL abaixo:</span>
              </div>

              <input
                type="url"
                name="imageUrl"
                placeholder="https://exemplo.com/imagem.jpg"
                required
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-brand-500 focus:border-brand-500"
              />
            </div>
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

          <div className="col-span-2 border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Informações Técnicas (SEO)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Título da Página (SEO Title)</label>
                <input
                  type="text"
                  name="seoTitle"
                  value={formData.seoTitle}
                  onChange={handleChange}
                  placeholder="Ex: Como escolher o colchão ideal? | FL Colchões"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-brand-500 focus:border-brand-500"
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="Ex: como-escolher-o-colchao-ideal"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-brand-500 focus:border-brand-500"
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Palavras-chave (Keywords)</label>
                <input
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleChange}
                  placeholder="Ex: Colchão ideal, FL Colchões, comprar colchão"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-brand-500 focus:border-brand-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Descrição</label>
                <textarea
                  name="metaDescription"
                  rows={2}
                  value={formData.metaDescription}
                  onChange={handleChange}
                  placeholder="Ex: Aprenda a escolher o colchão perfeito..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-brand-500 focus:border-brand-500"
                />
              </div>
            </div>
          </div>

          <div className="col-span-2 border-t border-gray-200 pt-6 mt-6">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">Conteúdo (Markdown)</label>
              <label className={`cursor-pointer text-sm font-medium flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors ${uploadingContentImage ? 'text-gray-400 bg-gray-50 cursor-not-allowed' : 'text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100'}`}>
                {uploadingContentImage ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ImageIcon className="h-4 w-4" />
                )}
                {uploadingContentImage ? 'Enviando...' : 'Inserir Imagem no Texto'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleContentImageUpload}
                  disabled={uploadingContentImage}
                  className="hidden"
                />
              </label>
            </div>
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
