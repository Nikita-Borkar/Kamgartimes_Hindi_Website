export interface PollOption {
  id: string;
  label: string;
  votes: number;
  percent: number;
}

export interface Poll {
  id: string;
  question: string;
  description?: string;
  category: string;
  date: string;
  endDate?: string;
  totalVotes: number;
  status: "active" | "closed";
  options: PollOption[];
  winningOptionId?: string;
}

export const activePoll: Poll = {
  id: "poll-active-metro",
  question: "मेट्रो और नए बुनियादी ढांचे के विस्तार से किस क्षेत्र को सबसे ज्यादा लाभ होगा?",
  description: "मुंबई और उपनगरों में चल रहे तीव्र बुनियादी ढांचा परियोजनाओं पर जनमत।",
  category: "विकास और बुनियादी ढांचा",
  date: "24 अक्टूबर 2026",
  endDate: "26 अक्टूबर 2026",
  totalVotes: 12450,
  status: "active",
  options: [
    { id: "opt-1", label: "कांजुरमार्ग से हवाईअड्डा रूट", votes: 5602, percent: 45 },
    { id: "opt-2", label: "मुंबई से नवी मुंबई लिंक", votes: 4233, percent: 34 },
    { id: "opt-3", label: "दहिसर से ठाणे कॉरिडोर", votes: 2615, percent: 21 },
  ],
};

export const pastPolls: Poll[] = [
  {
    id: "poll-past-1",
    question: "क्या राज्य में स्थानीय स्तर पर नए रोजगार और औद्योगिक कौशल विकास केंद्र स्थापित करने का निर्णय सही है?",
    description: "महाराष्ट्र के औद्योगिक क्षेत्रों में युवाओं के कौशल संवर्धन और रोजगार सृजन पर जनता की राय।",
    category: "रोजगार व श्रम",
    date: "20 अक्टूबर 2026",
    totalVotes: 18920,
    status: "closed",
    winningOptionId: "p1-1",
    options: [
      { id: "p1-1", label: "हाँ, युवाओं को तुरंत स्थानीय रोजगार मिलेगा", votes: 12676, percent: 67 },
      { id: "p1-2", label: "नहीं, योजना का ज़मीनी क्रियान्वयन कठिन है", votes: 4162, percent: 22 },
      { id: "p1-3", label: "कह नहीं सकते / समीक्षा जरूरी है", votes: 2082, percent: 11 },
    ],
  },
  {
    id: "poll-past-2",
    question: "प्रदूषण नियंत्रण और वायु गुणवत्ता सुधार के लिए सार्वजनिक इलेक्ट्रिक बसों और लोकल ट्रेनों का विस्तार कितना प्रभावी होगा?",
    description: "मुंबई, पुणे और नागपुर में वायु प्रदूषण नियंत्रण के उपायों पर जनता का दृष्टिकोण।",
    category: "पर्यावरण व स्वास्थ्य",
    date: "16 अक्टूबर 2026",
    totalVotes: 15430,
    status: "closed",
    winningOptionId: "p2-1",
    options: [
      { id: "p2-1", label: "अत्यधिक प्रभावी साबित होगा", votes: 9566, percent: 62 },
      { id: "p2-2", label: "मध्यम प्रभाव पड़ेगा, निर्माण कार्यों पर भी रोक जरूरी", votes: 4012, percent: 26 },
      { id: "p2-3", label: "कोई ख़ास असर नहीं पड़ेगा", votes: 1852, percent: 12 },
    ],
  },
  {
    id: "poll-past-3",
    question: "क्या आगामी विधानसभा सत्र में किसान कल्याण, कर्जमुक्ति और न्यूनतम समर्थन मूल्य (MSP) मुख्य एजेंडा होना चाहिए?",
    description: "राज्य के ग्रामीण इलाकों में कृषि संकट और नीतियों पर पाठकों का मत।",
    category: "राजनीति व कृषि",
    date: "12 अक्टूबर 2026",
    totalVotes: 22150,
    status: "closed",
    winningOptionId: "p3-1",
    options: [
      { id: "p3-1", label: "हाँ, किसानों की समस्याओं को सर्वोच्च प्राथमिकता मिलनी चाहिए", votes: 16834, percent: 76 },
      { id: "p3-2", label: "नहीं, शहरी व औद्योगिक विकास अधिक जरूरी है", votes: 3544, percent: 16 },
      { id: "p3-3", label: "दोनों क्षेत्रों पर समान ध्यान दिया जाए", votes: 1772, percent: 8 },
    ],
  },
  {
    id: "poll-past-4",
    question: "त्योहारी सीजन में खाद्य तेल, दालों और सब्जियों की कीमतों पर प्रशासनिक नियंत्रण कितना संतोषजनक है?",
    description: "घरेलू बजट और आवश्यक वस्तुओं की महंगाई पर आम जनता की प्रतिक्रिया।",
    category: "अर्थव्यवस्था",
    date: "08 अक्टूबर 2026",
    totalVotes: 14200,
    status: "closed",
    winningOptionId: "p4-2",
    options: [
      { id: "p4-1", label: "संतोषजनक, आपूर्ति और कीमतें नियंत्रण में हैं", votes: 4544, percent: 32 },
      { id: "p4-2", label: "असंतोषजनक, बाजार में महंगाई अभी भी बहुत अधिक है", votes: 7952, percent: 56 },
      { id: "p4-3", label: "कुछ ही वस्तुओं पर राहत महसूस हुई है", votes: 1704, percent: 12 },
    ],
  },
  {
    id: "poll-past-5",
    question: "सड़क सुरक्षा नियमों में सख्त चालान और एआई-कैमरों की निगरानी से क्या दुर्घटनाओं में स्थायी कमी आएगी?",
    description: "एक्सप्रेसवे और राजमार्गों पर आधुनिक निगरानी प्रणाली पर नागरिक राय।",
    category: "यातायात व सुरक्षा",
    date: "02 अक्टूबर 2026",
    totalVotes: 19800,
    status: "closed",
    winningOptionId: "p5-1",
    options: [
      { id: "p5-1", label: "हाँ, चालकों में अनुशासन और गति नियंत्रण बढ़ा है", votes: 11484, percent: 58 },
      { id: "p5-2", label: "नहीं, केवल चालान नहीं बल्कि सड़कों की मरम्मत ज्यादा जरूरी है", votes: 6138, percent: 31 },
      { id: "p5-3", label: "कोई विशेष बदलाव नहीं दिख रहा", votes: 2178, percent: 11 },
    ],
  },
  {
    id: "poll-past-6",
    question: "कामगारों और निर्माण श्रमिकों के लिए अनिवार्य स्वास्थ्य बीमा और सामाजिक सुरक्षा योजनाओं का दायरा क्या सभी असंगठित क्षेत्रों तक बढ़ना चाहिए?",
    description: "असंगठित क्षेत्र के लाखों श्रमिकों की सामाजिक सुरक्षा पर जनमत।",
    category: "रोजगार व श्रम",
    date: "26 सितंबर 2026",
    totalVotes: 31200,
    status: "closed",
    winningOptionId: "p6-1",
    options: [
      { id: "p6-1", label: "पूर्णतः सहमत, तुरंत लागू होना चाहिए", votes: 27144, percent: 87 },
      { id: "p6-2", label: "केवल चुनिंदा बड़े उद्योगों में लागू हो", votes: 2496, percent: 8 },
      { id: "p6-3", label: "असहमत / वर्तमान व्यवस्था पर्याप्त है", votes: 1560, percent: 5 },
    ],
  },
  {
    id: "poll-past-7",
    question: "सरकारी प्राथमिक और माध्यमिक स्कूलों में डिजिटल क्लासरूम और मातृभाषा में आधुनिक शिक्षा कितनी कारगर है?",
    description: "शिक्षा नीति 2026 और बुनियादी शिक्षा सुधारों पर अभिभावकों की राय।",
    category: "शिक्षा",
    date: "20 सितंबर 2026",
    totalVotes: 16750,
    status: "closed",
    winningOptionId: "p7-1",
    options: [
      { id: "p7-1", label: "बहुत कारगर, बच्चों की बुनियादी समझ और रुचि बढ़ी है", votes: 11558, percent: 69 },
      { id: "p7-2", label: "शिक्षकों के प्रशिक्षण के बिना लाभ सीमित रहेगा", votes: 3685, percent: 22 },
      { id: "p7-3", label: "असरदार नहीं है", votes: 1507, percent: 9 },
    ],
  },
  {
    id: "poll-past-8",
    question: "क्या राज्य के प्रमुख पर्यटन व धार्मिक स्थलों पर पर्यावरण संरक्षण हेतु निजी वाहनों के प्रवेश को सीमित करना उचित है?",
    description: "हिल स्टेशनों और तीर्थ स्थलों पर ट्रैफिक व प्रदूषण नियंत्रण हेतु प्रस्तावित नीति पर जनमत।",
    category: "पर्यावरण व स्वास्थ्य",
    date: "14 सितंबर 2026",
    totalVotes: 13890,
    status: "closed",
    winningOptionId: "p8-1",
    options: [
      { id: "p8-1", label: "हाँ, पर्यावरण और प्राकृतिक सुंदरता की रक्षा आवश्यक है", votes: 8890, percent: 64 },
      { id: "p8-2", label: "नहीं, पर्यटकों और स्थानीय व्यापारियों को असुविधा होगी", votes: 3889, percent: 28 },
      { id: "p8-3", label: "केवल छुट्टियों और पीक सीजन के दौरान लागू हो", votes: 1111, percent: 8 },
    ],
  },
];

export const pollCategories = [
  "सभी",
  "विकास और बुनियादी ढांचा",
  "रोजगार व श्रम",
  "राजनीति व कृषि",
  "अर्थव्यवस्था",
  "पर्यावरण व स्वास्थ्य",
  "यातायात व सुरक्षा",
  "शिक्षा",
];
