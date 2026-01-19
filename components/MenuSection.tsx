
import React from 'react';
import { MenuSection as MenuSectionType, MenuItem } from '../types';

interface Props {
  section: MenuSectionType;
  isFirst?: boolean;
  isAdmin?: boolean;
  onItemSelect: (item: MenuItem, section: MenuSectionType) => void;
  onUpdatePrice?: (sectionId: string, itemIdx: number, priceIdx: number, newVal: string) => void;
  onReorder?: (sectionId: string, itemIdx: number, direction: 'up' | 'down') => void;
  onToggleTag?: (sectionId: string, itemIdx: number, tag: 'isPopular' | 'isSpicy') => void;
  onDeleteItem?: (sectionId: string, itemIdx: number) => void;
}

const MenuSection: React.FC<Props> = ({ 
  section, 
  isFirst, 
  isAdmin, 
  onItemSelect, 
  onUpdatePrice, 
  onReorder,
  onToggleTag,
  onDeleteItem
}) => {
  const isNumeric = (val: string) => /^\d+$/.test(val.trim());

  return (
    <section id={section.id} className="mb-10 scroll-mt-[170px]" aria-labelledby={`${section.id}-heading`}>
      <div className="relative aspect-[16/10] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden mb-6 shadow-2xl border border-zinc-200 dark:border-white/5 bg-zinc-200 dark:bg-zinc-900 reveal-item group">
        <img
          src={section.image}
          alt=""
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading={isFirst ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"></div>
        <div className="absolute bottom-8 right-8 left-8 text-right">
          <div className="flex flex-col gap-1">
            <span className="text-yellow-500 font-black text-[11px] tracking-[0.2em] uppercase">فئة القائمة</span>
            <div className="flex items-center gap-3 justify-end">
              <span className="text-3xl leading-none animate-emoji">{section.emoji}</span>
              <h2 id={`${section.id}-heading`} className="text-3xl font-black text-white leading-none">{section.title}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900/60 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-10 border border-zinc-200 dark:border-white/10 shadow-xl reveal-item">
        <div className="divide-y divide-zinc-100 dark:divide-white/5">
          {section.items.map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => !isAdmin && onItemSelect(item, section)}
              className={`py-4 flex items-center justify-between gap-4 group transition-all -mx-4 px-4 rounded-3xl border border-transparent 
                ${isAdmin ? '' : 'cursor-pointer hover:bg-yellow-50/30 dark:hover:bg-yellow-900/5 hover:border-yellow-100 dark:hover:border-yellow-900/10 active:scale-[0.98]'}`}
            >
              {/* Controls (Admin Only) */}
              {isAdmin && (
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex flex-col gap-1">
                    <button onClick={(e) => { e.stopPropagation(); onReorder?.(section.id, idx, 'up'); }} className="p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-yellow-600 hover:text-white transition-all text-[10px]">▲</button>
                    <button onClick={(e) => { e.stopPropagation(); onReorder?.(section.id, idx, 'down'); }} className="p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-yellow-600 hover:text-white transition-all text-[10px]">▼</button>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); if(confirm('هل تريد حذف هذا العنصر؟')) onDeleteItem?.(section.id, idx); }}
                    className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              )}

              <div className="flex flex-col gap-0.5 flex-1 min-w-0 text-right pr-2">
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <div className="flex items-center gap-1.5 order-1">
                    {isAdmin ? (
                      <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
                        <button 
                          onClick={(e) => { e.stopPropagation(); onToggleTag?.(section.id, idx, 'isPopular'); }}
                          className={`p-1 rounded-md transition-all ${item.isPopular ? 'bg-yellow-500 text-black shadow-sm' : 'text-zinc-400'}`}
                        >
                          <span className="text-xs">⭐</span>
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); onToggleTag?.(section.id, idx, 'isSpicy'); }}
                          className={`p-1 rounded-md transition-all ${item.isSpicy ? 'bg-red-500 text-white shadow-sm' : 'text-zinc-400'}`}
                        >
                          <span className="text-xs">🌶️</span>
                        </button>
                      </div>
                    ) : (
                      <>
                        {item.isPopular && <span className="bg-yellow-500 text-black text-[9px] font-black px-2 py-0.5 rounded-lg animate-popular">مميز</span>}
                        {item.isSpicy && <span className="animate-spicy text-sm leading-none">🌶️</span>}
                      </>
                    )}
                  </div>
                  <span className="text-zinc-900 dark:text-zinc-100 font-black text-base leading-snug group-hover:text-yellow-600 transition-colors order-2 text-right w-full">
                    {item.name}
                  </span>
                </div>
                {!isAdmin && (
                  <span className="text-[10px] font-bold text-yellow-600/80 dark:text-yellow-500/60 transition-colors group-hover:text-yellow-700 dark:group-hover:text-yellow-400">
                    اضغط هنا للاختيار والإضافة
                  </span>
                )}
              </div>
              
              <div className="flex gap-3 md:gap-6 items-end shrink-0">
                {item.prices.map((price, pIdx) => (
                  <div key={pIdx} className="flex flex-col items-center gap-1">
                    {item.labels && item.labels[pIdx] && (
                      <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-tighter">
                        {item.labels[pIdx]}
                      </span>
                    )}
                    <div className={`px-3 py-2 min-w-[55px] rounded-2xl border transition-all flex items-center justify-center gap-1 shadow-sm
                      ${isAdmin 
                        ? 'bg-yellow-600/10 border-yellow-600/30' 
                        : 'bg-zinc-100 dark:bg-zinc-800/80 group-hover:bg-white dark:group-hover:bg-zinc-800 border-zinc-200 dark:border-white/5 group-hover:border-yellow-500/40 group-hover:-translate-y-1'
                      }`}
                    >
                        {isAdmin && onUpdatePrice ? (
                          <input 
                            type="text" 
                            value={price} 
                            onClick={e => e.stopPropagation()}
                            onChange={e => onUpdatePrice(section.id, idx, pIdx, e.target.value)}
                            className="w-12 bg-transparent text-center font-black text-yellow-600 outline-none"
                          />
                        ) : (
                          <>
                            {isNumeric(price) ? (
                              <>
                                <span className="text-yellow-600 font-black text-lg leading-none">{price}</span>
                                <span className="text-[9px] text-zinc-500 mr-0.5 font-black">ج</span>
                              </>
                            ) : (
                              <span className="text-yellow-600 font-black text-[10px] text-center leading-tight">{price}</span>
                            )}
                          </>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
