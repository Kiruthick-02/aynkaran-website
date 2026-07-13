import React from 'react';

export default function MarqueeTicker() {
  const alerts = [
    { text: '🔥 ADVISOR recruitment alert: Applications are now open! Click "Become an Advisor" to apply.', type: 'recruitment' },
    { text: '📊 Industry Leading Claim Settlement Ratio: HDFC Life (99.5%) • Tata AIA (99.1%) • LIC (98.6%) for FY 25-26.', type: 'stats' },
    { text: '⚠️ IRDAI Regulatory Alert: Free 30-day look-up period is now guaranteed on all digital life insurance policies.', type: 'regulation' },
    { text: '🩺 Zero medical tests required for Family Health Guard plans up to Age 50. Safeguard your family today!', type: 'product' },
    { text: '💬 Instant claim updates are now available on WhatsApp. Connect with our dedicated claim desk for 24/7 support.', type: 'support' }
  ];

  return (
    <div className="bg-[#F4B400] border-y border-[#0F4C81]/20 py-2.5 overflow-hidden relative select-none">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="flex items-center">
        {/* Fixed Title Label */}
        <div className="absolute left-0 top-0 bottom-0 bg-[#0F4C81] border-r border-[#0F4C81]/25 px-4 flex items-center z-10 text-[10px] font-bold tracking-widest text-white uppercase shadow-md">
          <span className="flex h-1.5 w-1.5 mr-2 bg-white rounded-full animate-pulse"></span>
          Live Announcements
        </div>
        
        {/* Infinite scrolling marquee content */}
        <div className="pl-44 animate-marquee whitespace-nowrap flex items-center gap-16 text-xs font-bold uppercase tracking-wider">
          {/* Render twice for seamless looping */}
          {[...alerts, ...alerts].map((alert, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="inline-block px-1.5 py-0.5 bg-[#0F4C81]/10 text-[#0F4C81] border border-[#0F4C81]/25 rounded text-[9px] font-extrabold">
                {alert.type}
              </span>
              <span className="text-[#0F4C81] font-extrabold">{alert.text}</span>
              <span className="text-[#0F4C81]/40 font-bold">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
