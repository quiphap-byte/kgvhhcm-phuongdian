/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Back to Top floating button */}
      {showScrollTop && (
        <button
          id="btn-scroll-top"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-[#8B0000] hover:bg-red-800 text-white rounded-full shadow-lg border border-[#D4AF37]/40 transition-all transform hover:-translate-y-1 hover:scale-105 z-40 flex items-center justify-center"
          title="Về đầu trang"
          aria-label="Cuộn về đầu trang"
        >
          <ChevronUp size={22} strokeWidth={2.5} />
        </button>
      )}
    </>
  );
};
