'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { AlertTriangle, Info, Link as LinkIcon, ShieldAlert, FileWarning, Scale } from 'lucide-react';

export default function Disclaimer() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('नागपुर');
  const [currentLang, setCurrentLang] = useState<'hi' | 'mr' | 'en'>('hi');
  const [activeCategory, setActiveCategory] = useState('all');

  const handleLangToggle = () => {
    setCurrentLang(prev => (prev === 'hi' ? 'mr' : prev === 'mr' ? 'en' : 'hi'));
  };

  const disclaimerSections = [
    {
      id: "general-info",
      icon: <Info className="w-6 h-6 text-blue-500" />,
      title: "1. सामान्य जानकारी (General Information)",
      content: (
        <div className="space-y-3 text-zinc-700">
          <p><strong>कामगार टाइम्स (kamgartimes.com)</strong> पर प्रकाशित सभी जानकारी केवल सामान्य सूचना और समाचार उद्देश्यों के लिए है। हम पाठकों को सटीक और अद्यतन (updated) जानकारी प्रदान करने का पूरा प्रयास करते हैं, लेकिन हम वेबसाइट पर उपलब्ध सामग्री की पूर्णता, विश्वसनीयता या सटीकता की कोई गारंटी नहीं देते हैं।</p>
          <p>वेबसाइट पर दी गई किसी भी जानकारी पर आपके द्वारा की गई कार्रवाई आपके अपने जोखिम (sole risk) पर है, और कामगार टाइम्स किसी भी नुकसान या क्षति के लिए उत्तरदायी नहीं होगा।</p>
        </div>
      )
    },
    {
      id: "external-links",
      icon: <LinkIcon className="w-6 h-6 text-amber-500" />,
      title: "2. बाहरी लिंक (External Links)",
      content: (
        <div className="space-y-3 text-zinc-700">
          <p>हमारी वेबसाइट पर अन्य वेबसाइटों के हाइपरलिंक शामिल हो सकते हैं। हम इन बाहरी साइटों की सामग्री और प्रकृति (nature) पर कोई नियंत्रण नहीं रखते हैं। इन वेबसाइटों के लिंक का अर्थ यह नहीं है कि हम उनकी सभी सामग्री का समर्थन करते हैं।</p>
          <p>साइट के मालिक और सामग्री बिना किसी पूर्व सूचना के बदल सकते हैं, और यह तब भी हो सकता है जब हमें किसी 'खराब' लिंक को हटाने का अवसर न मिला हो। कृपया ध्यान रखें कि जब आप हमारी वेबसाइट छोड़ते हैं, तो अन्य साइटों की अलग-अलग गोपनीयता नीतियां (Privacy Policies) और शर्तें हो सकती हैं जो हमारे नियंत्रण से बाहर हैं।</p>
        </div>
      )
    },
    {
      id: "editorial",
      icon: <FileWarning className="w-6 h-6 text-purple-500" />,
      title: "3. संपादकीय और व्यक्तिगत विचार",
      content: (
        <div className="space-y-3 text-zinc-700">
          <p>कामगार टाइम्स पर प्रकाशित लेखों, स्तंभों (columns) और संपादकीय (editorials) में व्यक्त किए गए विचार और राय विशेष रूप से संबंधित लेखकों के हैं। वे आवश्यक रूप से कामगार टाइम्स प्रबंधन या संपादकीय बोर्ड के आधिकारिक रुख को नहीं दर्शाते हैं।</p>
          <p>हम स्वतंत्र पत्रकारिता को बढ़ावा देते हैं, लेकिन किसी भी विवादित बयान या लेख के लिए लेखक स्वयं जिम्मेदार होता है।</p>
        </div>
      )
    },
    {
      id: "fair-use",
      icon: <ShieldAlert className="w-6 h-6 text-red-500" />,
      title: "4. कॉपीराइट और उचित उपयोग (Copyright & Fair Use)",
      content: (
        <div className="space-y-3 text-zinc-700">
          <p>कामगार टाइम्स पर प्रकाशित सामग्री, लोगो, ग्राफिक्स और अन्य बौद्धिक संपदा (intellectual property) हमारे स्वामित्व में हैं या हमें उपयोग करने के लिए अधिकृत किया गया है। पूर्व लिखित अनुमति के बिना इस वेबसाइट की सामग्री का पुनरुत्पादन (reproduction), वितरण या संशोधन निषिद्ध है।</p>
          <p>हम न्यूज़ रिपोर्टिंग के दौरान उचित उपयोग (Fair Use) के तहत तृतीय-पक्ष छवियों या वीडियो का उपयोग कर सकते हैं। यदि आपको लगता है कि हमारी साइट पर आपके कॉपीराइट का उल्लंघन हुआ है, तो कृपया हमें तुरंत सूचित करें, हम उचित कार्रवाई करेंगे।</p>
        </div>
      )
    },
    {
      id: "legal",
      icon: <Scale className="w-6 h-6 text-emerald-600" />,
      title: "5. कानूनी क्षेत्राधिकार (Legal Jurisdiction)",
      content: (
        <div className="space-y-3 text-zinc-700">
          <p>इस वेबसाइट के उपयोग से उत्पन्न होने वाला कोई भी विवाद भारत के कानूनों के अधीन होगा और विशेष रूप से नागपुर (महाराष्ट्र) के न्यायालयों के अधिकार क्षेत्र में आएगा।</p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col font-sans">
      <Head>
        <title>अस्वीकरण (Disclaimer) | कामगार टाइम्स</title>
        <meta name="description" content="कामगार टाइम्स का अस्वीकरण (Disclaimer)। हमारी वेबसाइट पर उपलब्ध सामग्री की सटीकता और उपयोग की शर्तों के बारे में जानकारी।" />
      </Head>

      <Header
        onSearchOpen={() => setIsSearchOpen(true)}
        selectedCity={selectedCity}
        onCitySelect={setSelectedCity}
        currentLang={currentLang}
        onLangToggle={handleLangToggle}
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
      />

      <div className="flex-grow pt-8 md:pt-12 pb-16">
        
        {/* Page Header */}
        <div className="text-center mb-10 px-4">
          <h1 className="text-3xl md:text-4xl font-black text-black font-serif tracking-wide">
            अस्वीकरण (Disclaimer)
          </h1>
          <div className="h-1 w-24 bg-[#e60000] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl shadow-xl border border-zinc-200 overflow-hidden">
            
            <div className="p-6 md:p-10 space-y-10">
              
              {/* Introduction Text */}
              <div className="bg-amber-50/50 border-l-4 border-amber-500 p-5 rounded-r-xl text-zinc-700 text-sm md:text-base leading-relaxed">
                इस वेबसाइट का उपयोग करके, आप हमारे <strong>अस्वीकरण (Disclaimer)</strong> को स्वीकार करते हैं और इसकी शर्तों से सहमत होते हैं। यदि आप इस अस्वीकरण से सहमत नहीं हैं, तो कृपया वेबसाइट का उपयोग न करें।
              </div>

              {/* Disclaimer Sections */}
              <div className="space-y-8">
                {disclaimerSections.map((section, idx) => (
                  <div key={section.id} className="group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-zinc-100 rounded-lg group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                        {section.icon}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-black font-serif">
                        {section.title}
                      </h3>
                    </div>
                    <div className="pl-14 text-sm md:text-base leading-relaxed">
                      {section.content}
                    </div>
                    {idx < disclaimerSections.length - 1 && (
                      <hr className="mt-8 border-zinc-100" />
                    )}
                  </div>
                ))}
              </div>

              {/* Consent and Update */}
              <div className="mt-12 bg-zinc-900 text-white rounded-2xl p-8 relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="relative z-10 space-y-4">
                  <h3 className="text-2xl font-bold font-serif text-amber-400">सहमति (Consent)</h3>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    हमारी वेबसाइट का उपयोग करके, आप एतद्द्वारा (hereby) हमारे अस्वीकरण (Disclaimer) के लिए सहमति देते हैं और इसकी शर्तों से सहमत होते हैं।
                  </p>
                  
                  <h3 className="text-2xl font-bold font-serif text-amber-400 pt-4">अपडेट (Update)</h3>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    यदि हम इस दस्तावेज़ में कोई अपडेट, संशोधन या बदलाव करते हैं, तो वे परिवर्तन यहाँ प्रमुखता से पोस्ट किए जाएंगे।
                  </p>
                  <p className="text-zinc-400 text-xs mt-2">
                    यदि आपको किसी और जानकारी की आवश्यकता है या हमारे अस्वीकरण के बारे में कोई प्रश्न हैं, तो कृपया बेझिझक हमसे <strong>contact@kamgartimes.com</strong> पर संपर्क करें।
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      <Footer />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
