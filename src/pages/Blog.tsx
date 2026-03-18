import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../config';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { BlogPost } from '../types';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(
          collection(db, 'posts'),
          where('published', '==', true),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const postsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[];
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
          Artigos e Guias
        </h1>
        <p className="text-lg text-gray-600">
          Explore nosso conteúdo especializado sobre {SITE_CONFIG.niche.toLowerCase()}. 
          Aprenda, descubra e aprimore seus conhecimentos.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Carregando artigos...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 text-gray-500">Nenhum artigo publicado ainda.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full"
            >
              <Link to={`/blog/${post.id}`} className="block aspect-[16/10] overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </Link>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>
                <Link to={`/blog/${post.id}`} className="block group">
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 group-hover:text-brand-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{post.author}</span>
                  <Link to={`/blog/${post.id}`} className="text-brand-600 hover:text-brand-800">
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
}
