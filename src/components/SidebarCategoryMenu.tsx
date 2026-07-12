/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Category } from '../types';
import { List, ChevronRight, Folder, FolderOpen } from 'lucide-react';

interface SidebarCategoryMenuProps {
  parentCategory: Category;
  activeCategoryId?: string;
  subCategories: Category[];
  onSelectCategory: (id: string) => void;
}

export const SidebarCategoryMenu: React.FC<SidebarCategoryMenuProps> = ({
  parentCategory,
  activeCategoryId,
  subCategories,
  onSelectCategory
}) => {
  const { getAdjustedTextClass } = useApp();

  return (
    <div id="sidebar-category-menu" className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden sticky top-16">
      
      {/* Sidebar Header */}
      <div className="bg-red-800 text-white p-4">
        <h3 className={`${getAdjustedTextClass('base')} font-black uppercase tracking-tight flex items-center gap-2`}>
          <List size={16} className="text-amber-300" />
          <span>Danh mục con</span>
        </h3>
        <p className="text-[10px] text-red-100 font-semibold mt-0.5 uppercase tracking-wider">
          {parentCategory.name}
        </p>
      </div>

      {/* Categories List */}
      <div className="py-2">
        {/* Parent Category Option */}
        <button
          onClick={() => onSelectCategory(parentCategory.id)}
          className={`w-full text-left px-4 py-3 text-xs font-bold transition-all flex items-center justify-between border-b border-neutral-100 ${
            activeCategoryId === parentCategory.id
              ? 'bg-red-50 text-red-800 border-l-4 border-red-700'
              : 'text-neutral-700 hover:bg-neutral-50 hover:text-red-800 border-l-4 border-transparent'
          }`}
        >
          <div className="flex items-center gap-2">
            {activeCategoryId === parentCategory.id ? <FolderOpen size={15} className="text-red-700" /> : <Folder size={15} className="text-neutral-400" />}
            <span className="uppercase">Tất cả mục chính</span>
          </div>
          <ChevronRight size={13} className={activeCategoryId === parentCategory.id ? 'text-red-700' : 'text-neutral-400'} />
        </button>

        {/* Sub-categories */}
        {subCategories.length === 0 ? (
          <p className="text-xs text-neutral-500 italic p-4 text-center">Không có danh mục con</p>
        ) : (
          <div className="flex flex-col">
            {subCategories.map((sub) => {
              const isActive = activeCategoryId === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => onSelectCategory(sub.id)}
                  className={`w-full text-left px-5 py-3 text-xs font-semibold transition-all flex items-center justify-between border-b border-neutral-100 last:border-b-0 ${
                    isActive
                      ? 'bg-red-50 text-red-800 border-l-4 border-red-700'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-red-800 border-l-4 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 leading-tight">
                    <span className={`inline-block w-1.5 h-1.5 rounded-full ${isActive ? 'bg-red-700' : 'bg-neutral-300'}`}></span>
                    <span>{sub.name}</span>
                  </div>
                  <ChevronRight size={12} className={isActive ? 'text-red-700' : 'text-neutral-400'} />
                </button>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
