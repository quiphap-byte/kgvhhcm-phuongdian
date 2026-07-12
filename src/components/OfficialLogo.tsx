/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../contexts/AppContext';

interface OfficialLogoProps {
  className?: string;
  size?: number;
}

export const OfficialLogo: React.FC<OfficialLogoProps> = ({ className = '', size = 64 }) => {
  const { settings } = useApp();

  if (settings && settings.logo) {
    return (
      <div 
        className={`relative select-none flex items-center justify-center overflow-hidden rounded-full ${className}`}
        style={{ width: size, height: size }}
      >
        <img 
          src={settings.logo} 
          alt={settings.siteName || "Logo"}
          className="w-full h-full object-cover rounded-full border border-amber-500/30"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div 
      className={`relative select-none flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg 
        viewBox="0 0 200 200" 
        className="w-full h-full drop-shadow-md"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Semicircle paths for wrapping text curved along the circular emblem */}
          {/* Top text path - runs clockwise from 15% to 85% of the circle to center text perfectly */}
          <path 
            id="top-text-path" 
            d="M 28,100 A 72,72 0 0,1 172,100" 
            fill="none" 
          />
          {/* Bottom text path - runs counter-clockwise to keep text right-side up */}
          <path 
            id="bottom-text-path" 
            d="M 172,100 A 72,72 0 0,1 28,100" 
            fill="none" 
          />
          
          {/* Gold radial gradient for a premium look */}
          <radialGradient id="gold-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="70%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#AA7C11" />
          </radialGradient>
        </defs>

        {/* Outer deep red ring */}
        <circle cx="100" cy="100" r="94" fill="#991B1B" stroke="url(#gold-grad)" strokeWidth="4" />
        
        {/* Inner gold dividing ring */}
        <circle cx="100" cy="100" r="77" fill="none" stroke="url(#gold-grad)" strokeWidth="1.5" strokeDasharray="none" />
        <circle cx="100" cy="100" r="73" fill="#B91C1C" stroke="url(#gold-grad)" strokeWidth="1" />

        {/* Text along circular paths */}
        <text 
          fontFamily="'Inter', 'Space Grotesk', system-ui, sans-serif" 
          fontWeight="800" 
          fontSize="9.5" 
          fill="url(#gold-grad)"
          letterSpacing="0.8"
        >
          <textPath href="#top-text-path" startOffset="50%" textAnchor="middle">
            KHÔNG GIAN VĂN HÓA HỒ CHÍ MINH SỐ
          </textPath>
        </text>

        <text 
          fontFamily="'Inter', 'Space Grotesk', system-ui, sans-serif" 
          fontWeight="800" 
          fontSize="9.5" 
          fill="url(#gold-grad)"
          letterSpacing="0.8"
        >
          <textPath href="#bottom-text-path" startOffset="50%" textAnchor="middle">
            PHƯỜNG DĨ AN, TP.HCM
          </textPath>
        </text>

        {/* Small golden lotus separators on left and right */}
        {/* Left lotus */}
        <g transform="translate(16, 100) scale(0.4)" fill="url(#gold-grad)">
          <path d="M0,-8 C-5,-5 -8,0 0,10 C8,0 5,-5 0,-8 Z" />
          <path d="M-2,-5 C-8,-3 -10,3 -3,8 C1,5 1,1 -2,-5 Z" />
          <path d="M2,-5 C8,-3 10,3 3,8 C-1,5 -1,1 2,-5 Z" />
        </g>
        
        {/* Right lotus */}
        <g transform="translate(184, 100) scale(0.4)" fill="url(#gold-grad)">
          <path d="M0,-8 C-5,-5 -8,0 0,10 C8,0 5,-5 0,-8 Z" />
          <path d="M-2,-5 C-8,-3 -10,3 -3,8 C1,5 1,1 -2,-5 Z" />
          <path d="M2,-5 C8,-3 10,3 3,8 C-1,5 -1,1 2,-5 Z" />
        </g>

        {/* Central emblem area */}
        <g id="center-artwork">
          {/* Red background for central artwork */}
          <circle cx="100" cy="100" r="70" fill="#990000" />
          
          {/* Semi-circular stylized gold frame/lotus throne at the bottom */}
          <path 
            d="M 40,135 Q 100,175 160,135" 
            fill="none" 
            stroke="url(#gold-grad)" 
            strokeWidth="3" 
          />

          {/* Golden Star on the left */}
          <g transform="translate(58, 70)">
            <polygon 
              points="0,-14 4,-4 14,-4 6,2 9,12 0,6 -9,12 -6,2 -14,-4 -4,-4" 
              fill="url(#gold-grad)" 
            />
          </g>

          {/* Traditional temple and Landmark 81 silhouette on the right */}
          <g transform="translate(130, 70)" fill="url(#gold-grad)" opacity="0.9">
            {/* Landmark 81 silhouette */}
            <rect x="22" y="-15" width="4" height="40" />
            <rect x="18" y="-5" width="12" height="30" />
            <rect x="15" y="10" width="18" height="15" />
            {/* Spire */}
            <line x1="24" y1="-15" x2="24" y2="-25" stroke="url(#gold-grad)" strokeWidth="1.5" />

            {/* Traditional temple silhouette */}
            <path d="M -15,10 C -12,8 -6,8 -3,12 L -3,25 L -27,25 L -27,12 C -24,8 -18,8 -15,10 Z" />
            <path d="M -9,16 C -7,14 -4,14 -2,17 L -2,25 L -16,25 L -16,17 C -14,14 -11,14 -9,16 Z" />
            <rect x="-24" y="2" width="18" height="3" rx="1" />
            <path d="M -22,2 Q -15,-5 -8,2" fill="none" stroke="url(#gold-grad)" strokeWidth="1.5" />
          </g>

          {/* Stylized vector representation of President Ho Chi Minh */}
          <g transform="translate(100, 92)" fill="#FFFFFF" stroke="none">
            {/* Outline & Shadow of head/shoulders */}
            <path d="M -30,45 C -25,30 -20,15 -12,5 C -8,-2 -6,-10 -5,-18 C -4,-22 -6,-28 -2,-32 C 2,-36 8,-38 12,-35 C 16,-32 18,-24 16,-16 C 14,-8 10,0 8,10 C 12,18 20,28 25,45 Z" fill="#990000" opacity="0.1" />
            
            {/* Face shape & Beard */}
            <path d="M -12,25 C -15,15 -14,5 -10,-5 C -8,-10 -11,-15 -9,-20 C -7,-25 -2,-28 3,-28 C 8,-28 12,-24 12,-18 C 12,-12 10,-5 8,5 C 6,15 3,25 0,35 C -3,35 -8,30 -12,25 Z" fill="#FFFFFF" />
            
            {/* Precise artistic paths of Uncle Ho's portrait (combining hair, eyes, nose, lips, beard) in gold vector */}
            <g fill="url(#gold-grad)">
              {/* Hair outline & details */}
              <path d="M -10,-24 C -8,-29 -2,-30 4,-29 C 10,-28 12,-23 12,-19 C 10,-20 8,-21 5,-21 C 2,-21 -3,-20 -7,-18 L -10,-24 Z" />
              <path d="M -8,-24 C -6,-26 -3,-27 1,-27 C 5,-27 7,-25 8,-23 C 6,-24 4,-25 2,-25 C -1,-25 -4,-24 -6,-23 L -8,-24 Z" opacity="0.8" />
              
              {/* Forehead & Eyebrow */}
              <path d="M -9,-15 C -6,-16 -3,-16 -1,-15 C 2,-15 5,-17 7,-18 C 5,-17 3,-16 0,-16 C -3,-16 -6,-15 -9,-15 Z" />
              <path d="M -5,-13 C -3,-14 -1,-14 1,-13 C 3,-13 4,-14 5,-15" fill="none" stroke="url(#gold-grad)" strokeWidth="1" strokeLinecap="round" />
              <path d="M 5,-13 C 7,-14 9,-14 11,-13" fill="none" stroke="url(#gold-grad)" strokeWidth="1" strokeLinecap="round" />
              
              {/* Eyes */}
              <circle cx="-1" cy="-10" r="1.5" />
              <circle cx="8" cy="-10" r="1.5" />
              <path d="M -4,-11 Q -1,-12 2,-11" fill="none" stroke="url(#gold-grad)" strokeWidth="1" />
              <path d="M 5,-11 Q 8,-12 11,-11" fill="none" stroke="url(#gold-grad)" strokeWidth="1" />
              
              {/* Nose */}
              <path d="M 3,-10 L 4,-3 Q 4,0 2,0 C 1,0 1,-2 1,-3" fill="none" stroke="url(#gold-grad)" strokeWidth="1.2" strokeLinecap="round" />
              
              {/* Mustache */}
              <path d="M -2,4 C -4,3 -6,4 -8,5 C -6,2 -1,0 3,0 C 7,0 12,2 14,5 C 12,4 10,3 8,4 C 6,3 4,3 3,4 C 1,5 0,5 -2,4 Z" />
              
              {/* Mouth/Lips */}
              <path d="M 0,6 Q 3,4 6,6 Q 3,8 0,6" fill="#990000" />
              <path d="M 0,6 Q 3,5 6,6" fill="none" stroke="url(#gold-grad)" strokeWidth="1" />
              
              {/* Beard flowing down gracefully */}
              <path d="M -2,9 C -4,15 -5,22 -3,28 C -2,33 1,36 3,36 C 5,36 8,33 9,28 C 11,22 10,15 8,9 C 6,12 5,14 3,14 C 1,14 0,12 -2,9 Z" />
              <path d="M -1,12 C -2,18 -3,24 -1,29 C 0,32 2,34 3,34 C 4,34 6,32 7,29 C 9,24 8,18 7,12 L 3,15 L -1,12 Z" fill="#FFFFFF" opacity="0.9" />
              <path d="M 1,14 C 0,18 -1,22 0,26 C 1,28 2,29 3,29 C 4,29 5,28 6,26 C 7,22 6,18 5,14 Z" />
              
              {/* Cheek and Ear lines */}
              <path d="M -11,-10 C -12,-8 -12,-5 -10,-3 C -9,-4 -9,-7 -10,-10" />
              <path d="M -6,-5 Q -9,-1 -8,4" fill="none" stroke="url(#gold-grad)" strokeWidth="1" />
              <path d="M 12,-10 C 13,-8 13,-5 11,-3" fill="none" stroke="url(#gold-grad)" strokeWidth="1" />
            </g>
            
            {/* Collar & Suit Outline */}
            <path d="M -24,40 L -12,31 L -3,35 L -1,42 L -12,42 Z" fill="url(#gold-grad)" />
            <path d="M 24,40 L 12,31 L 3,35 L 1,42 L 12,42 Z" fill="url(#gold-grad)" />
            {/* Button */}
            <circle cx="0" cy="38" r="1.5" fill="#FFFFFF" />
          </g>

          {/* Lotus pedals at the bottom of the emblem */}
          <g transform="translate(100, 155) scale(0.95)" fill="url(#gold-grad)">
            {/* Center petal */}
            <path d="M0,-20 C-10,-14 -14,0 0,15 C14,0 10,-14 0,-20 Z" />
            {/* Inner left petal */}
            <path d="M-5,-16 C-16,-10 -18,2 -3,11 C11,2 10,-11 -5,-16 Z" />
            {/* Inner right petal */}
            <path d="M5,-16 C16,-10 18,2 3,11 C-11,2 -10,-11 5,-16 Z" />
            {/* Outer left petal */}
            <path d="M-10,-10 C-22,-4 -22,8 -8,12 C6,8 1,-6 -10,-10 Z" />
            {/* Outer right petal */}
            <path d="M10,-10 C22,-4 22,8 8,12 C-6,8 -1,-6 10,-10 Z" />
          </g>
        </g>
      </svg>
    </div>
  );
};
