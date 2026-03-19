import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../config';
import { ArrowRight, Sparkles, BookOpen, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { BlogPost } from '../types';

export default function Home() {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(
          collection(db, 'posts'),
          where('published', '==', true),
          orderBy('createdAt', 'desc'),
          limit(3)
        );
        const snapshot = await getDocs(q);
        const postsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[];
        setFeaturedPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-sm font-bold mb-6 border border-brand-100">
                <Sparkles className="h-4 w-4 text-accent-500" />
                <span>Especialistas em {SITE_CONFIG.niche}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight mb-6">
                {SITE_CONFIG.heroTitle}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                {SITE_CONFIG.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/assistente"
                  className="inline-flex justify-center items-center gap-2 bg-accent-400 hover:bg-accent-500 text-brand-900 px-8 py-3.5 rounded-full text-base font-bold transition-colors shadow-lg shadow-accent-200"
                >
                  <Sparkles className="h-5 w-5" />
                  Perguntar à IA
                </Link>
                <a
                  href={SITE_CONFIG.salesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center gap-2 bg-white border-2 border-brand-600 text-brand-600 hover:bg-brand-50 px-8 py-3.5 rounded-full text-base font-bold transition-colors"
                >
                  {SITE_CONFIG.ctaText}
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/bedroom-furniture/1200/900" 
                  alt={SITE_CONFIG.niche}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-brand-100 max-w-xs">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-50 p-3 rounded-full text-brand-600">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-900">Dúvidas sobre produtos?</p>
                    <p className="text-xs text-gray-500 mt-1">Nossa IA recomenda o melhor para você.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Artigos Recentes</h2>
              <p className="text-gray-600 max-w-2xl">
                Dicas, guias e novidades sobre {SITE_CONFIG.niche.toLowerCase()}.
              </p>
            </div>
            <Link 
              to="/blog" 
              className="hidden sm:flex items-center gap-2 text-brand-600 hover:text-brand-800 font-medium transition-colors"
            >
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-10 text-gray-500">Carregando artigos...</div>
          ) : featuredPosts.length === 0 ? (
            <div className="text-center py-10 text-gray-500">Nenhum artigo publicado ainda.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
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
          
          <div className="mt-10 text-center sm:hidden">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-brand-600 font-medium"
            >
              Ver todos os artigos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
