'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { Send, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted successfully!');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors font-sans">
      <Header
        onSearchOpen={() => setIsSearchOpen(true)}
        selectedCity="नागपुर"
        onCitySelect={() => {}}
        currentLang="hi"
        onLangToggle={() => {}}
      />

      <main className="w-full">
        {/* Consistent Heading matching other pages */}
        <div className="bg-white dark:bg-zinc-900 py-16 md:py-20 px-6 text-center border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h1 className="text-4xl md:text-5xl font-black font-serif text-zinc-900 dark:text-white mb-6">
            Contact Us
          </h1>
          <div className="w-24 h-1.5 bg-red-600 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Information (7/12 width on desktop) */}
            <div className="lg:col-span-7 space-y-12">
              
              {/* Quick Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md border border-zinc-200 dark:border-zinc-800 flex items-start gap-5 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-zinc-900 dark:text-white mb-1">ईमेल करें</h4>
                    <a href="mailto:contact@kamgartimes.com" className="text-zinc-600 dark:text-zinc-400 hover:text-red-600 transition-colors">contact@kamgartimes.com</a>
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md border border-zinc-200 dark:border-zinc-800 flex items-start gap-5 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-zinc-900 dark:text-white mb-1">फ़ोन नंबर</h4>
                    <a href="tel:07118272000" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 transition-colors">07118-272000</a>
                  </div>
                </div>
              </div>

              {/* Editorial Text Block */}
              <div className="bg-white dark:bg-zinc-900 p-8 md:p-10 rounded-3xl shadow-md border border-zinc-200 dark:border-zinc-800">
                <h3 className="text-2xl font-bold font-serif text-zinc-900 dark:text-white mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                  हमारा उद्देश्य और दृष्टिकोण
                </h3>
                <div className="prose prose-zinc dark:prose-invert max-w-none text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400 space-y-6 text-justify">
                  <p>
                    समाचार पत्र, समाचार चैनल, समाचार पोर्टल, यूट्यूब चैनल और पिक्चर चैनल सामाजिक जीवन में महत्वपूर्ण भूमिका निभाते हैं। समाचार पत्रों सहित सभी मीडिया न केवल समाचार और सूचना प्रदान करते हैं, बल्कि समाज की मूलभूत आवश्यकताओं जैसे भोजन, पानी, बिजली, वस्त्र, स्वास्थ्य, शिक्षा, आवास, संस्कृति और समाज एवं राजनीति की स्थिति को भी दर्शाते हैं। ये सभी मीडिया समाज में घटित विभिन्न घटनाओं की त्वरित जानकारी प्रदान करते हैं।
                  </p>
                  <p>
                    'कामगार टाइम्स' नागरिकों की सर्वांगीण जागरूकता के लिए समर्पित एक साप्ताहिक पत्रिका है और www.kamgartimes.com इसका वेब समाचार पोर्टल है। इसके माध्यम से, समाज में जागरूकता पैदा करने के साथ-साथ, यह समाज में विभिन्न समस्याओं, शोषण और अन्याय को उजागर करने और जनता का ध्यान उन पर केंद्रित करने का प्रयास करता है। इससे लोगों में सामाजिक मुद्दों के प्रति जागरूकता बढ़ती है, जो सभी मीडिया का मूल कर्तव्य है। 
                  </p>
                  <p>
                    संस्कृति संरक्षण: समाज की विविध संस्कृतियों, परंपराओं और भाषाओं के संरक्षण के साथ-साथ, यह माध्यम लोगों को संस्कृति, धर्म और जीवनशैली के बारे में जानकारी प्राप्त करने में निश्चित रूप से सहायक होगा। लोकतंत्र में महत्वपूर्ण भूमिका निभाने के अलावा, 'कामगार टाइम्स' व्यक्तिगत स्वतंत्रता, लोकतंत्र के मौलिक अधिकारों और न्यायपालिका के बारे में जानकारी प्रदान करने के साथ-साथ लोकतंत्र की रक्षा और राष्ट्र निर्माण के लिए भी प्रतिबद्ध है।
                  </p>
                </div>
                
                {/* Publisher Details */}
                <div className="mt-10 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-5">
                  <div className="w-14 h-14 bg-red-600 text-white rounded-xl flex items-center justify-center font-bold text-3xl font-serif shadow-inner">
                    म
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-zinc-900 dark:text-white font-serif">महेंद्र शेंडे</h3>
                    <p className="text-sm font-medium text-red-600 dark:text-red-500 uppercase tracking-wide">संपादक एवं प्रकाशक</p>
                    <p className="text-xs text-zinc-500 mt-0.5">कामगार टाइम्स</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form (5/12 width on desktop) */}
            <div className="lg:col-span-5 relative">
              {/* Sticky container for the form */}
              <div className="sticky top-8 bg-white dark:bg-zinc-900 p-8 md:p-10 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold font-serif text-zinc-900 dark:text-white mb-2">
                    Send a Message
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                    Fill out the form below for your advertisement or suggestions. Our team will contact you shortly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-shadow text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@mail.com"
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-shadow text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91"
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-shadow text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                      Advertisement / Message Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write here..."
                      required
                      rows={5}
                      className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-shadow text-zinc-900 dark:text-white resize-y"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-base px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
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
