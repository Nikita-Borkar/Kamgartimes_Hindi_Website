'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { Mail } from 'lucide-react';

export default function AboutPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <Header
        onSearchOpen={() => setIsSearchOpen(true)}
        selectedCity="नागपुर"
        onCitySelect={() => {}}
        currentLang="hi"
        onLangToggle={() => {}}
      />

      <main className="w-full">
        {/* Hero Section */}
        <div className="bg-zinc-100 dark:bg-zinc-900 py-16 md:py-24 px-6 text-center border-b border-zinc-200 dark:border-zinc-800">
          <h1 className="text-5xl md:text-6xl font-black font-serif text-zinc-900 dark:text-white mb-6">
            About Us
          </h1>
          <div className="w-24 h-1 bg-red-600 mx-auto"></div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16">
          
          {/* Banner Image */}
          <div className="w-full shadow-2xl rounded-xl overflow-hidden">
            <img 
              src="/kamgar_times_info_banner.jpeg" 
              alt="Kamgar Times Info Banner" 
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="max-w-4xl mx-auto space-y-8 text-base md:text-lg text-zinc-700 dark:text-zinc-300 leading-loose text-justify">
            <p>
              <strong className="text-red-600 dark:text-red-500 font-bold text-xl">'कामगार टाइम्स'</strong> नागपूर (महाराष्ट्र) से प्रकाशित होने वाला एक आधिकारिक और गुणवत्तापूर्ण मराठी साप्ताहिक समाचार पत्र है, जो केंद्रीय सरकार के समाचार पत्र विभाग में <strong>MAHMAR/2006/19485</strong> के तहत पंजीकृत है। <a href="http://www.kamgartimes.com" className="text-blue-600 dark:text-blue-400 hover:underline">www.kamgartimes.com</a> 'कामगार टाइम्स' का समाचार पोर्टल (वेबसाइट) है। मराठी भाषा में प्रकाशित इस समाचार पत्र के संपादक और प्रकाशक श्री महेंद्र शेंडे हैं। कानून के अनुसार समाचारों के चयन के लिए 'पीआरबी' जिम्मेदार है।
            </p>
            <p>
              यह समाचार पत्र राष्ट्रीय संतों के प्रति सामाजिक प्रतिबद्धता के साथ-साथ राजनीतिक, शैक्षिक, रोजगारोन्मुखी, औद्योगिक, सांस्कृतिक, आध्यात्मिक और सर्व-समावेशी वास्तविक महान विचारों की विरासत को आगे बढ़ाने के लिए प्रतिबद्ध है।
            </p>
            <p>
              यह एकमात्र निडर समाचार पत्र है जो समानता, प्रेम और बंधुत्व के लिए समर्पित है और सर्वांगीण समृद्ध मानव जीवन के लक्ष्य को सर्वोपरि रखते हुए, प्रत्येक कमजोर प्राणी के मौलिक अधिकारों में बाधा डालने वाली समस्याओं का समाधान करने का प्रयास करता है।
            </p>
            
            <div className="bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-2xl border-l-4 border-red-600 mt-12">
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400">
                संपादक इसमें प्रकाशित समाचारों और/या लेखों से सहमत होना आवश्यक नहीं है। इसमें प्रकाशित समाचार या लेख से उत्पन्न या संबंधित कोई भी विवाद कलमेश्वर (नागपुर) की अदालतों के अधिकार क्षेत्र के अधीन होगा।
              </p>
              <div className="flex items-center gap-3 font-semibold mt-6 text-zinc-900 dark:text-zinc-100">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-500">
                  <Mail className="w-5 h-5" />
                </div>
                <a href="mailto:contact@kamgartimes.com" className="hover:text-red-600 transition-colors">
                  contact@kamgartimes.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
