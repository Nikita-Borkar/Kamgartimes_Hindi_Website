'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { ShieldCheck, UserCheck, Database, Cookie, Lock, Mail, Bell, Globe, Share2, Scale, Clock, RefreshCw } from 'lucide-react';

export default function PrivacyPolicy() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('नागपुर');
  const [currentLang, setCurrentLang] = useState<'hi' | 'mr' | 'en'>('hi');
  const [activeCategory, setActiveCategory] = useState('all');

  const handleLangToggle = () => {
    setCurrentLang(prev => (prev === 'hi' ? 'mr' : prev === 'mr' ? 'en' : 'hi'));
  };

  const policySections = [
    {
      id: "who-we-are",
      icon: <Globe className="w-6 h-6 text-red-500" />,
      title: "1. हम कौन हैं (Who We Are)",
      content: (
        <div className="space-y-3 text-zinc-700">
          <p>हमारी वेबसाइट का पता है: <strong>https://kamgartimes.com</strong></p>
          <p>'कामगार टाइम्स' भारत का एक प्रमुख हिंदी न्यूज़ पोर्टल है, जो सटीक, निष्पक्ष और विश्वसनीय समाचार प्रदान करने के लिए प्रतिबद्ध है।</p>
        </div>
      )
    },
    {
      id: "what-we-collect",
      icon: <Database className="w-6 h-6 text-amber-500" />,
      title: "2. हम कौन सी जानकारी एकत्र करते हैं",
      content: (
        <div className="space-y-3 text-zinc-700">
          <p>हम निम्नलिखित प्रकार की जानकारी एकत्र कर सकते हैं:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>नाम</li>
            <li>ईमेल पता</li>
            <li>आईपी एड्रेस (IP Address)</li>
            <li>ब्राउज़र की जानकारी</li>
            <li>कुकीज़ (Cookies) का डेटा</li>
            <li>टिप्पणियों (Comments) के माध्यम से दी गई जानकारी</li>
          </ul>
        </div>
      )
    },
    {
      id: "comments",
      icon: <UserCheck className="w-6 h-6 text-emerald-500" />,
      title: "3. टिप्पणियाँ (Comments)",
      content: (
        <div className="space-y-3 text-zinc-700">
          <p>जब विज़िटर साइट पर टिप्पणियाँ छोड़ते हैं, तो हम टिप्पणी फ़ॉर्म में दिखाया गया डेटा एकत्र करते हैं, साथ ही स्पैम का पता लगाने में मदद करने के लिए विज़िटर का IP एड्रेस और ब्राउज़र यूज़र एजेंट स्ट्रिंग भी एकत्र करते हैं।</p>
          <p>आपकी टिप्पणी स्वीकृत होने के बाद, आपकी प्रोफ़ाइल तस्वीर (यदि कोई हो) आपकी टिप्पणी के संदर्भ में जनता के लिए दृश्यमान हो जाती है।</p>
        </div>
      )
    },
    {
      id: "cookies",
      icon: <Cookie className="w-6 h-6 text-orange-500" />,
      title: "4. कुकीज़ (Cookies)",
      content: (
        <div className="space-y-3 text-zinc-700">
          <p>हमारी साइट आपके अनुभव को बेहतर बनाने के लिए "कुकीज़" का उपयोग करती है।</p>
          <p>कुकीज़ का उपयोग मुख्य रूप से निम्नलिखित कार्यों के लिए किया जाता है:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>साइट की कार्यक्षमता बनाए रखना</li>
            <li>उपयोगकर्ता की प्राथमिकताओं को सहेजना</li>
            <li>वेबसाइट ट्रैफ़िक का विश्लेषण करना (Google Analytics)</li>
            <li>प्रासंगिक विज्ञापन दिखाना</li>
          </ul>
        </div>
      )
    },
    {
      id: "analytics",
      icon: <Share2 className="w-6 h-6 text-blue-500" />,
      title: "5. Google Analytics और AdSense",
      content: (
        <div className="space-y-4 text-zinc-700">
          <div>
            <h4 className="font-bold text-zinc-900 mb-1">Google Analytics:</h4>
            <p>हम वेबसाइट ट्रैफ़िक और विज़िटर के व्यवहार को समझने के लिए Google Analytics का उपयोग करते हैं। यह डेटा पूरी तरह से गुमनाम होता है और केवल साइट को बेहतर बनाने के लिए उपयोग किया जाता है।</p>
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 mb-1">Google AdSense:</h4>
            <p>हम विज्ञापन दिखाने के लिए Google AdSense का उपयोग कर सकते हैं। Google, एक तृतीय-पक्ष वेंडर के रूप में, हमारी साइट पर विज्ञापन दिखाने के लिए कुकीज़ का उपयोग करता है।</p>
          </div>
        </div>
      )
    },
    {
      id: "embedded-content",
      icon: <Globe className="w-6 h-6 text-indigo-500" />,
      title: "6. एंबेडेड सामग्री (Embedded Content)",
      content: (
        <div className="space-y-3 text-zinc-700">
          <p>इस साइट के लेखों में एंबेडेड सामग्री (जैसे वीडियो, चित्र, लेख आदि) शामिल हो सकती है। अन्य वेबसाइटों की एंबेडेड सामग्री ठीक उसी तरह व्यवहार करती है जैसे कि विज़िटर ने दूसरी वेबसाइट पर विज़िट किया हो।</p>
          <p>ये वेबसाइटें आपके बारे में डेटा एकत्र कर सकती हैं, कुकीज़ का उपयोग कर सकती हैं, अतिरिक्त तृतीय-पक्ष ट्रैकिंग एम्बेड कर सकती हैं, और उस एंबेडेड सामग्री के साथ आपकी बातचीत की निगरानी कर सकती हैं।</p>
        </div>
      )
    },
    {
      id: "data-sharing",
      icon: <ShieldCheck className="w-6 h-6 text-teal-500" />,
      title: "7. हम आपका डेटा किसके साथ साझा करते हैं",
      content: (
        <div className="space-y-3 text-zinc-700">
          <p>हम कभी भी आपका व्यक्तिगत डेटा तीसरे पक्ष को नहीं बेचते हैं। आपका डेटा केवल निम्नलिखित स्थितियों में साझा किया जा सकता है:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Google Analytics (ट्रैकिंग के लिए)</li>
            <li>Google AdSense (विज्ञापनों के लिए)</li>
            <li>स्पैम डिटेक्शन सेवाएँ</li>
            <li>कानूनी अनिवार्यता होने पर</li>
          </ul>
        </div>
      )
    },
    {
      id: "data-retention",
      icon: <Clock className="w-6 h-6 text-slate-500" />,
      title: "8. हम आपका डेटा कितने समय तक रखते हैं",
      content: (
        <div className="space-y-3 text-zinc-700">
          <p>यदि आप कोई टिप्पणी छोड़ते हैं, तो टिप्पणी और उसका मेटाडेटा अनिश्चित काल तक बनाए रखा जाता है। ऐसा इसलिए किया जाता है ताकि हम किसी भी अनुवर्ती टिप्पणी को मॉडरेशन कतार में रखने के बजाय स्वचालित रूप से पहचान सकें और स्वीकृत कर सकें।</p>
          <p>पंजीकृत उपयोगकर्ताओं (यदि कोई हो) के लिए, हम उनकी उपयोगकर्ता प्रोफ़ाइल में दी गई व्यक्तिगत जानकारी भी संग्रहीत करते हैं।</p>
        </div>
      )
    },
    {
      id: "your-rights",
      icon: <Scale className="w-6 h-6 text-purple-500" />,
      title: "9. आपके अधिकार (Your Rights)",
      content: (
        <div className="space-y-3 text-zinc-700">
          <p>यदि आपका इस साइट पर खाता है, या आपने टिप्पणियाँ छोड़ी हैं, तो आप हमारे पास मौजूद आपके व्यक्तिगत डेटा की एक निर्यातित फ़ाइल प्राप्त करने का अनुरोध कर सकते हैं।</p>
          <p>आप यह भी अनुरोध कर सकते हैं कि हम आपके बारे में जो भी व्यक्तिगत डेटा रखते हैं उसे मिटा दें। इसमें ऐसा कोई भी डेटा शामिल नहीं है जिसे प्रशासनिक, कानूनी या सुरक्षा उद्देश्यों के लिए रखना हमारी बाध्यता है।</p>
        </div>
      )
    },
    {
      id: "data-security",
      icon: <Lock className="w-6 h-6 text-red-600" />,
      title: "10. डेटा सुरक्षा (Data Security)",
      content: (
        <div className="space-y-3 text-zinc-700">
          <p>हम आपके डेटा को सुरक्षित रखने के लिए सभी आवश्यक तकनीकी और प्रशासनिक कदम उठाते हैं। वेबसाइट को सुरक्षित सर्वर पर होस्ट किया जाता है और डेटा एन्क्रिप्शन (SSL) का उपयोग किया जाता है।</p>
        </div>
      )
    },
    {
      id: "policy-changes",
      icon: <RefreshCw className="w-6 h-6 text-emerald-600" />,
      title: "11. गोपनीयता नीति में बदलाव",
      content: (
        <div className="space-y-3 text-zinc-700">
          <p>हम समय-समय पर अपनी गोपनीयता नीति में बदलाव कर सकते हैं। कोई भी महत्वपूर्ण बदलाव होने पर, हम इस पृष्ठ पर अद्यतित नीति प्रकाशित करेंगे। आपसे अनुरोध है कि नवीनतम जानकारी के लिए समय-समय पर इस पृष्ठ की समीक्षा करते रहें।</p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col font-sans">
      <Head>
        <title>गोपनीयता नीति (Privacy Policy) | कामगार टाइम्स</title>
        <meta name="description" content="कामगार टाइम्स की गोपनीयता नीति। जानें कि हम आपका डेटा कैसे एकत्र, उपयोग और सुरक्षित करते हैं।" />
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
            गोपनीयता नीति (Privacy Policy)
          </h1>
          <div className="h-1 w-24 bg-[#e60000] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl shadow-xl border border-zinc-200 overflow-hidden">
            
            <div className="p-6 md:p-10 space-y-10">
              
              {/* Introduction Text */}
              <div className="bg-blue-50/50 border-l-4 border-blue-500 p-5 rounded-r-xl text-zinc-700 text-sm md:text-base leading-relaxed">
                यह गोपनीयता नीति (Privacy Policy) स्पष्ट करती है कि जब आप <strong>कामगार टाइम्स</strong> (kamgartimes.com) वेबसाइट का उपयोग करते हैं, तो हम आपकी व्यक्तिगत जानकारी को कैसे एकत्रित, उपयोग और सुरक्षित करते हैं। हमारे लिए आपकी गोपनीयता अत्यंत महत्वपूर्ण है।
              </div>

              {/* Policy Sections */}
              <div className="space-y-8">
                {policySections.map((section, idx) => (
                  <div key={section.id} className="group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-zinc-100 rounded-lg group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                        {section.icon}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-black font-serif">
                        {section.title}
                      </h3>
                    </div>
                    <div className="pl-14 text-sm md:text-base leading-relaxed">
                      {section.content}
                    </div>
                    {idx < policySections.length - 1 && (
                      <hr className="mt-8 border-zinc-100" />
                    )}
                  </div>
                ))}
              </div>

              {/* Contact Section */}
              <div className="mt-12 bg-zinc-900 text-white rounded-2xl p-8 relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                  <div className="p-4 bg-white/10 rounded-full shrink-0">
                    <Mail className="w-8 h-8 text-red-400" />
                  </div>
                  <div className="text-center md:text-left space-y-2">
                    <h3 className="text-2xl font-bold font-serif">संपर्क करें (Contact Us)</h3>
                    <p className="text-zinc-300 text-sm">
                      यदि इस गोपनीयता नीति के बारे में आपके कोई प्रश्न हैं, तो कृपया हमसे संपर्क करें:
                    </p>
                    <div className="pt-2 space-y-1 text-sm font-medium">
                      <p>Website: <a href="https://kamgartimes.com" className="text-red-400 hover:underline">https://kamgartimes.com</a></p>
                      <p>Email: <a href="mailto:contact@kamgartimes.com" className="text-red-400 hover:underline">contact@kamgartimes.com</a></p>
                    </div>
                  </div>
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
