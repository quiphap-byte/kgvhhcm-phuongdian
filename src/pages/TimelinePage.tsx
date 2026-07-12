/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Timeline } from '../components/Timeline';
import { History } from 'lucide-react';

export const TimelinePage: React.FC = () => {
  const { getAdjustedTextClass } = useApp();

  return (
    <div id="timeline-page-view" className="max-w-5xl mx-auto px-6 py-6 flex flex-col gap-6">
      <div>
        <h2 className={`${getAdjustedTextClass('2xl')} font-black text-red-800 uppercase flex items-center gap-2`}>
          <History size={24} className="text-amber-500 shrink-0" />
          <span>Biên niên sử cuộc đời & sự nghiệp Bác Hồ</span>
        </h2>
        <p className="text-xs text-neutral-500 font-semibold mt-1">
          Bản ghi biên niên chi tiết các cột mốc lịch sử, hoạt động cách mạng từ thuở thiếu thời tại quê hương Nghệ An cho đến khi Chủ tịch qua đời năm 1969.
        </p>
      </div>

      <Timeline />
    </div>
  );
};
