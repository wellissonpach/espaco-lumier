import React from 'react';
import { INSTAGRAM_POSTS, LUMIER_CONTACT } from '../data/lumierData';
import { Instagram, Heart, ArrowUpRight, Sparkles } from 'lucide-react';

export const InstagramSection: React.FC = () => {
  return (
    <section id="instagram" className="py-20 sm:py-32 bg-[#FAF8F5] text-[#2C2825] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-[#785E34] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
              <Instagram className="w-3.5 h-3.5 text-[#B89758]" />
              <span>Conexão & Inspiração</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#1E1B19] tracking-tight">
              Mais momentos no nosso Instagram
            </h2>

            <p className="text-sm sm:text-base text-[#6B6158] font-light mt-2 max-w-xl">
              Acompanhe de perto as histórias que já aconteceram no Espaço Lumier.
            </p>
          </div>

          <div>
            <a
              id="instagram-profile-btn"
              href={LUMIER_CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1E1B19] text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.2em] rounded-sm hover:bg-[#38332F] transition-all duration-300 shadow-sm"
            >
              <Instagram className="w-4 h-4" />
              <span>{LUMIER_CONTACT.instagram}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
            </a>
          </div>
        </div>

        {/* Instagram Grid of 6 High-res Posts */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={LUMIER_CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-sm overflow-hidden bg-[#E8DFD3] border border-[#E8DFD3] shadow-sm hover:shadow-lg transition-all duration-300 block"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Instagram Hover Card */}
              <div className="absolute inset-0 bg-[#1E1B19]/75 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 text-white">
                <div className="flex justify-end">
                  <Instagram className="w-4 h-4 text-[#C5A880]" />
                </div>
                
                <p className="text-[11px] text-[#E8DFD3] line-clamp-3 leading-snug">
                  {post.caption}
                </p>

                <div className="flex items-center justify-between text-[11px] text-[#D9CFC4] pt-2 border-t border-white/20">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-red-400 fill-current" />
                    {post.likes}
                  </span>
                  <span>{post.date}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
