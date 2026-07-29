import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flower2, Sun, Music, Calendar, Clock, MapPin, Shirt, CalendarPlus, ExternalLink, Download, ChevronDown } from 'lucide-react';
import { MountainsDivider } from './MountainsDivider.jsx';
import DATA from '../../data.json';
export const EventsSection = () => {
  const events = DATA.events || [];
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const getEventIcon = (iconName) => {
    switch (iconName) {
      case 'Flower2':
        return <Flower2 className="w-5 h-5 text-[#344832]" />;
      case 'Sun':
        return <Sun className="w-5 h-5 text-[#7A5B1E]" />;
      case 'Music':
        return <Music className="w-5 h-5 text-[#283B33]" />;
      default:
        return <Calendar className="w-5 h-5 text-[#354B33]" />;
    }
  };
  const getEventTimeDetails = (id) => {
    switch (id) {
      case 'mehendi':
        return { startIso: '20261211T100000', endIso: '20261211T140000' };
      case 'haldi':
        return { startIso: '20261211T153000', endIso: '20261211T180000' };
      case 'sangeet':
        return { startIso: '20261211T193000', endIso: '20261211T233000' };
      case 'wedding':
      default:
        return { startIso: '20261212T100000', endIso: '20261212T160000' };
    }
  };
  const getGoogleCalendarUrl = (event) => {
    const { startIso, endIso } = getEventTimeDetails(event.id);
    const title = encodeURIComponent(`${event.name} - Rohan & Meera's Wedding`);
    const details = encodeURIComponent(`${event.description}\n\nDress Code: ${event.dressCode}`);
    const location = encodeURIComponent(`${event.venue}, Udaipur, Rajasthan`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
  };
  const downloadIcsFile = (event) => {
    const { startIso, endIso } = getEventTimeDetails(event.id);
    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Rohan and Meera Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:${event.name} - Rohan & Meera's Wedding`,
      `DESCRIPTION:${event.description.replace(/\n/g, ' ')}\\nDress Code: ${event.dressCode}`,
      `LOCATION:${event.venue}, Udaipur, Rajasthan`,
      `DTSTART:${startIso}`,
      `DTEND:${endIso}`,
      `STATUS:CONFIRMED`,
      'END:VEVENT',
      'END:VCALENDAR',
    ];
    const blob = new Blob([icsLines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.id}-rohan-meera-wedding.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const toggleDropdown = (id) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };
  return (<section id="events" className="relative overflow-hidden">
    <div className="py-16 sm:py-24 px-4 bg-[#F3E7D8] relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-cinzel tracking-widest text-[#2E3A2D] uppercase font-bold">Celebrate With Us</span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1F2B21] mt-1">Wedding Festivities</h2>
          <p className="text-xs sm:text-sm text-[#526950] mt-2 max-w-md mx-auto">Each ceremony is infused with ancient traditions, music, colors, and sacred rituals.</p>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
          {events.map((event, index) => {
            const isDropdownOpen = openDropdownId === event.id;
            const isEven = index % 2 === 0;
            return (<motion.div key={event.id} initial={{ x: isEven ? -120 : 120, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.7, ease: "easeOut" }} className="relative p-6 sm:p-7 rounded-2xl bg-[#E6EFE3] border border-[#C2D3BE] shadow-xs hover:shadow-md transition-all overflow-visible group">
              <div className="absolute top-0 left-0 bottom-0 w-2 rounded-l-2xl transition-all group-hover:w-3" style={{ backgroundColor: event.accentColor }} />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pl-2">
                <div className="space-y-3 flex-1">
                  <div className="flex items-start gap-2">
                    {getEventIcon(event.icon)}
                    <h3 className="font-serif-display text-2xl font-bold text-[#2E3A2D]">{event.name}</h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#344832] bg-white/70 p-2 rounded-lg border border-[#C2D3BE] w-fit font-medium">
                    <Shirt className="w-3.5 h-3.5 text-[#4A6048]" />
                    <span><strong className="font-bold text-[#2E3A2D]">Dress Code:</strong> {event.dressCode}</span>
                  </div>
                </div>

                <div className="flex flex-col justify-center space-y-3 md:border-l md:border-[#C2D3BE] md:pl-6 min-w-[220px] relative">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#344832]">
                    <Calendar className="w-4 h-4 shrink-0 text-[#4A6048]" />
                    <span>{event.date}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-medium text-[#2E3A2D]">
                    <Clock className="w-4 h-4 shrink-0 text-[#C5A059]" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-start gap-2 text-xs text-[#526950]">
                    <MapPin className="w-4 h-4 shrink-0 text-[#526950] mt-0.5" />
                    <span>{event.venue}</span>
                  </div>

                  <div className="pt-1 relative">
                    <button onClick={() => toggleDropdown(event.id)} className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-[#4A6048] text-white text-xs font-semibold hover:bg-[#344832] transition-colors shadow-xs cursor-pointer">
                      <CalendarPlus className="w-4 h-4" />
                      <span>Add to Calendar</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isDropdownOpen && (<motion.div initial={{ opacity: 0, y: -6, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.95 }} transition={{ duration: 0.15 }} className="absolute right-0 top-full mt-2 w-full min-w-[190px] bg-white rounded-xl shadow-xl border border-[#C2D3BE] p-1.5 z-30">
                        <a href={getGoogleCalendarUrl(event)} target="_blank" rel="noopener noreferrer" onClick={() => setOpenDropdownId(null)} className="flex items-center gap-2 px-3 py-2 text-xs text-[#2E3A2D] font-medium hover:bg-[#E6EFE3] rounded-lg transition-colors cursor-pointer">
                          <ExternalLink className="w-3.5 h-3.5 text-[#4A6048]" />
                          <span>Google Calendar</span>
                        </a>

                        <button onClick={() => { downloadIcsFile(event); setOpenDropdownId(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#2E3A2D] font-medium hover:bg-[#E6EFE3] rounded-lg transition-colors cursor-pointer text-left">
                          <Download className="w-3.5 h-3.5 text-[#C5A059]" />
                          <span>iCal / Outlook (.ics)</span>
                        </button>
                      </motion.div>)}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>);
          })}
        </div>
      </div>
    </div>
  </section>);
};
