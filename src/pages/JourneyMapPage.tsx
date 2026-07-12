/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../contexts/AppContext';
import { JourneyMap } from '../components/JourneyMap';
import { Compass } from 'lucide-react';

export const JourneyMapPage: React.FC = () => {
  const { getAdjustedTextClass } = useApp();

  return (
    <div id="journey-map-page-view" className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-6">
      <div>
        <h2 className={`${getAdjustedTextClass('2xl')} font-black text-red-800 uppercase flex items-center gap-2`}>
          <Compass size={24} className="text-amber-500 shrink-0" />
          <span>Bản đồ hành trình 30 năm bôn ba cứu nước (1911 - 1941)</span>
        </h2>
        <p className="text-xs text-neutral-500 font-semibold mt-1">
          Hệ thống hóa hành trình địa lý lịch sử của Người qua các lục địa Châu Á, Châu Âu, Châu Phi, Châu Mỹ nhằm tìm kiếm con đường giải phóng dân tộc.
        </p>
      </div>

      <JourneyMap />
    </div>
  );
};
