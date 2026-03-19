import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SITE_CONFIG } from '../config';
import Markdown from 'react-markdown';
import { ArrowLeft, Calendar, User, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { BlogPost } from '../types';

export default function Article() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists() && docSnap.data().published) {
          setPost({ id: docSnap.id, ...docSnap.data() } as BlogPost);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="max-w-3xl mx-auto px-4 py-20 text-center">Carregando artigo...</div>;
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Artigo não encontrado</h1>
        <Link to="/blog" className="text-brand-600 hover:underline">Voltar para o blog</Link>
      </div>
    );
  }

  return (
    <motion.article 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white"
    >
      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Voltar para Artigos
        </Link>
        <div className="mb-6">
          <span className="text-sm font-bold uppercase tracking-widest text-brand-600">
            {post.category}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight mb-8">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {post.author}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {post.date}
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="aspect-[21/9] rounded-2xl overflow-hidden shadow-lg">
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="markdown-body text-lg">
          <Markdown>{post.content}</Markdown>
        </div>
        
        {/* Call to Action Box */}
        <div className="mt-16 bg-brand-50 border border-brand-100 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            Gostou do conteúdo?
          </h3>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Encontre os melhores produtos e equipamentos para {SITE_CONFIG.niche.toLowerCase()} na nossa loja oficial.
          </p>
          <a
            href={SITE_CONFIG.salesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center items-center gap-2 bg-accent-400 hover:bg-accent-500 text-brand-900 px-8 py-3.5 rounded-full text-base font-bold transition-colors shadow-sm"
          >
            <ShoppingBag className="h-5 w-5" />
            {SITE_CONFIG.ctaText}
          </a>
        </div>
      </div>
    </motion.article>
  );
}
