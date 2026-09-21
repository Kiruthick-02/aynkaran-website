// components/MarqueeTicker.jsx
import React from 'react';

/**
 * props.announcements = {
 *   customers: [{ id, text, label, order }],
 *   advisors:  [{ id, text, label, order }]
 * }
 */
export default function MarqueeTicker({ announcements }) {
  const customers = Array.isArray(announcements?.customers)
    ? announcements.customers
    : [];
  const advisors = Array.isArray(announcements?.advisors)
    ? announcements.advisors
    : [];

  // Build combined list with colour tags
  const items = [
    ...customers.map((a) => ({
      ...a,
      side: 'customers',
      color: 'blue',
    })),
    ...advisors.map((a) => ({
      ...a,
      side: 'advisors',
      color: 'yellow',
    })),
  ];

  // Fallback if nothing configured yet
  const alerts =
    items.length > 0
      ? items
      : [
          {
            text: 'Advisor applications are open — join our team and grow with us.',
            label: 'Careers',
            color: 'yellow',
          },
          {
            text: 'Strong claim support: our partner insurers settle most claims quickly and fairly.',
            label: 'Claims',
            color: 'blue',
          },
          {
            text: 'Enjoy a free 30-day review period on new digital life policies.',
            label: 'Good to know',
            color: 'blue',
          },
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
          animation: marquee 45s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="flex items-center">
        <div className="absolute left-0 top-0 bottom-0 bg-[#0F4C81] border-r border-[#0F4C81]/25 px-4 flex items-center z-10 text-[10px] font-bold tracking-widest text-white uppercase shadow-md">
          <span className="flex h-1.5 w-1.5 mr-2 bg-white rounded-full animate-pulse" />
          Updates
        </div>

        <div className="pl-36 animate-marquee whitespace-nowrap flex items-center gap-16 text-xs font-bold tracking-wide">
          {[...alerts, ...alerts].map((alert, index) => {
            const isAdvisor = alert.color === 'yellow' || alert.side === 'advisors';
            return (
              <div key={index} className="flex items-center gap-3">
                <span
                  className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase border ${
                    isAdvisor
                      ? 'bg-amber-100 text-amber-800 border-amber-300'
                      : 'bg-blue-100 text-blue-800 border-blue-300'
                  }`}
                >
                  {alert.label || (isAdvisor ? 'Advisors' : 'Customers')}
                </span>
                <span className="text-[#0F4C81] font-extrabold normal-case">
                  {alert.text}
                </span>
                <span className="text-[#0F4C81]/40 font-bold">•</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}