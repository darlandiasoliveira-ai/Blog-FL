import { MapPin, Phone, MessageCircle, ShoppingBag, Tag, Globe, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../config';
import { motion } from 'motion/react';
import SEO from '../components/SEO';

export default function BioLinks() {
  // ==========================================
  // DADOS PARA EDITAR - INSIRA SEUS LINKS AQUI
  // ==========================================
  const whatsappNumber = "5579991991198"; // WhatsApp de Venda
  const whatsappMessage = "Olá! Vim do Instagram e gostaria de saber mais sobre as ofertas.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const mainLinks = [
    { title: 'Ver Nosso Catálogo', icon: ShoppingBag, url: SITE_CONFIG.salesUrl, highlight: true },
    { title: 'Promoções da Semana', icon: Tag, url: `https://flcolchoes.com/vitrine/fl_moveis_e_colchoes_4a9c63f1`, highlight: true },
    { title: 'Falar com Vendedor (WhatsApp)', icon: MessageCircle, url: whatsappLink, highlight: false },
    { title: 'Acessar nosso Site Oficial', icon: Globe, url: "/", highlight: false },
  ];

  const storeLocations = [
    { 
      name: 'Loja Centro', 
      address: 'Rua Itabaianinha, 199 - Centro - Aracaju/SE', 
      phone: '(79) 9 9146-0027', 
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Rua+Itabaianinha+199+Centro+Aracaju+SE' 
    },
    { 
      name: 'Loja São Conrado', 
      address: 'Av José Carlos Silva, 416 - São Conrado - Aracaju/SE', 
      phone: '(79) 9 9170-6262', 
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Av+José+Carlos+Silva+416+São+Conrado+Aracaju+SE' 
    },
    { 
      name: 'Loja João Alves', 
      address: 'Av. Nossa Sra. do Socorro, 665 - João Alves - SE', 
      phone: '(79) 9 9146-0093', 
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Av+Nossa+Sra+do+Socorro+665+João+Alves+Nossa+Sra+do+Socorro+SE' 
    }
  ];

  return (
    <div className="flex justify-center w-full py-12 px-4">
      <SEO 
        title="Links Oficiais" 
        description="Acesse nosso catálogo, promoções do dia e fale direto com nossos vendedores no WhatsApp. Tudo o que você precisa da FL Móveis Aracaju em um só lugar."
      />
      {/* Container "Mobile-first" */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl relative px-6 py-10 flex flex-col items-center border border-gray-100">
        
        {/* Foto de Perfil / Logo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-28 h-28 rounded-full shadow-lg border-4 border-brand-800 overflow-hidden mb-4 bg-brand-900 flex items-center justify-center p-2"
        >
          {SITE_CONFIG.logoUrl ? (
            <img src={SITE_CONFIG.logoUrl} alt={SITE_CONFIG.salesSiteName} className="w-full h-full object-contain object-center" />
          ) : (
            <span className="text-3xl font-bold text-brand-600">FL</span>
          )}
        </motion.div>

        {/* Nome e Descrição */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-bold text-brand-900 mb-2">{SITE_CONFIG.salesSiteName}</h1>
          <p className="text-gray-600 text-sm">O melhor para sua casa. Colchões, Estofados e Móveis. Entregamos conforto e qualidade!</p>
        </motion.div>

        {/* Links Principais */}
        <div className="w-full flex flex-col gap-4 mb-10">
          {mainLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={index}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
                className={`w-full flex items-center justify-between p-4 rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.03)] border transition-all duration-300 hover:scale-[1.02] active:scale-95 ${
                  link.highlight 
                    ? 'bg-brand-800 text-white border-brand-700 hover:bg-brand-700 hover:shadow-md' 
                    : 'bg-white text-gray-800 border-gray-200 hover:border-accent-400 hover:bg-brand-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${link.highlight ? 'text-accent-400' : 'text-brand-800'}`} />
                  <span className="font-semibold text-sm">{link.title}</span>
                </div>
                <ArrowRight className={`w-4 h-4 ${link.highlight ? 'text-accent-400' : 'text-gray-400'}`} />
              </motion.a>
            )
          })}
        </div>

        {/* Nossas Lojas / Endereços */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="w-full"
        >
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 px-2">Nossas Lojas Físicas</h2>
          <div className="flex flex-col gap-4">
            {storeLocations.map((store, index) => (
              <div key={index} className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col gap-3">
                <h3 className="font-bold text-gray-800 text-sm">{store.name}</h3>
                
                <a href={store.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-gray-600 hover:text-brand-600 transition-colors group">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 group-hover:text-brand-600" />
                  <span className="text-xs leading-relaxed">{store.address}</span>
                </a>
                
                <a href={`tel:+55${store.phone.replace(/\D/g, '')}`} className="flex items-center gap-2 text-gray-600 hover:text-brand-600 transition-colors group">
                  <Phone className="w-4 h-4 shrink-0 group-hover:text-brand-600" />
                  <span className="text-xs font-medium">{store.phone}</span>
                </a>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footerzinho na Bio */}
        <div className="mt-12 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.salesSiteName}</p>
        </div>

      </div>
    </div>
  );
}
