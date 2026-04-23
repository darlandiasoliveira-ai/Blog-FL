import { motion } from 'motion/react';
import { SITE_CONFIG } from '../config';
import { MapPin, Phone, Mail, Award, Clock, MessageCircle } from 'lucide-react';

export default function Sobre() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-brand-50 py-20 border-b border-brand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-serif font-bold text-brand-900 mb-6"
            >
              Sobre a {SITE_CONFIG.salesSiteName}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-brand-700/80 leading-relaxed"
            >
              Transformando casas em lares com móveis e colchões de alta qualidade, design exclusivo e o conforto que a sua família merece.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa História</h2>
              <div className="prose prose-brand text-gray-600">
                <p className="mb-4">
                  A <strong>{SITE_CONFIG.salesSiteName}</strong> nasceu com um propósito claro: entregar não apenas móveis, mas qualidade de vida. Sabemos que o estofado da sala é onde a família se reúne, que as cadeiras da cozinha colecionam sorrisos e que um bom colchão renova as energias para o dia seguinte.
                </p>
                <p className="mb-4">
                  Trabalhamos incansavelmente para selecionar as melhores peças, os melhores fornecedores e garantir que tudo chegue à sua casa com o máximo de cuidado e atenção aos detalhes.
                </p>
                <p>
                  Nossa equipe de especialistas está sempre pronta para ajudar você a encontrar o produto perfeito, equilibrando estética, funcionalidade e durabilidade.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
                <div className="bg-brand-100 p-3 rounded-full text-brand-600 mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Qualidade</h3>
                <p className="text-sm text-gray-500">Produtos testados e com garantia de fábrica.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
                <div className="bg-brand-100 p-3 rounded-full text-brand-600 mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Atendimento</h3>
                <p className="text-sm text-gray-500">Suporte rápido para guiar sua melhor escolha.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact & Location Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Onde Estamos</h2>
            <p className="text-gray-400">Venha nos visitar e conhecer nossos produtos de perto.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <MapPin className="w-8 h-8 text-accent-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Loja Centro</h3>
              <a href="https://www.google.com/maps/search/?api=1&query=Rua+Itabaianinha+199+Centro+Aracaju+SE" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-brand-300 transition-colors mb-4 leading-relaxed">
                Rua Itabaianinha - 199<br/>Centro - Aracaju/SE
              </a>
              <a href="tel:+5579991460027" className="mt-auto flex items-center gap-2 text-accent-400 hover:text-accent-300 transition-colors font-bold">
                <Phone className="w-4 h-4" /> (79) 9 9146-0027
              </a>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <MapPin className="w-8 h-8 text-accent-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Loja São Conrado</h3>
              <a href="https://www.google.com/maps/search/?api=1&query=Av+José+Carlos+Silva+416+São+Conrado+Aracaju+SE" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-brand-300 transition-colors mb-4 leading-relaxed">
                Av José Carlos Silva, 416<br/>São Conrado - Aracaju/SE
              </a>
              <a href="tel:+5579991706262" className="mt-auto flex items-center gap-2 text-accent-400 hover:text-accent-300 transition-colors font-bold">
                <Phone className="w-4 h-4" /> (79) 9 9170-6262
              </a>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <MapPin className="w-8 h-8 text-accent-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Loja João Alves</h3>
              <a href="https://www.google.com/maps/search/?api=1&query=Av+Nossa+Sra+do+Socorro+665+João+Alves+Nossa+Sra+do+Socorro+SE" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-brand-300 transition-colors mb-4 leading-relaxed">
                Av. Nossa Sra. do Socorro, 665<br/>João Alves - NS do Socorro/SE
              </a>
              <a href="tel:+5579991460093" className="mt-auto flex items-center gap-2 text-accent-400 hover:text-accent-300 transition-colors font-bold">
                <Phone className="w-4 h-4" /> (79) 9 9146-0093
              </a>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
             <a href="https://wa.me/5579991460156?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20m%C3%B3veis%20e%20colch%C3%B5es." target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 rounded-full font-bold transition-transform hover:scale-105 shadow-lg">
               <MessageCircle className="w-6 h-6" />
               WhatsApp Vendas: (79) 9 9146-0156
             </a>
          </div>
        </div>
      </section>
    </div>
  );
}
