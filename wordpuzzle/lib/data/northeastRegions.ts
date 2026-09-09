export interface NortheastStateInfo {
  id: string;
  name: string;
  nativeName: string;
  capital: string;
  primaryLanguages: string[];
  bannerEmoji: string;
  shortDescription: string;
  landscapeDescription: string;
  traditionalWeaves: string;
  culturalHighlights: string[];
  comfortMemoryPrompt: string;
  scenicElements: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export const NORTHEAST_STATES: NortheastStateInfo[] = [
  {
    id: 'assam',
    name: 'Assam',
    nativeName: 'অসম',
    capital: 'Dispur / Guwahati',
    primaryLanguages: ['Assamese', 'Bodo', 'Bengali', 'Mising', 'Karbi'],
    bannerEmoji: '🌿',
    shortDescription: 'The land of the mighty Brahmaputra, emerald tea gardens, and golden Muga silk.',
    landscapeDescription: 'Expansive riverbanks, lush undulating tea slopes, and the misty floodplains of Kaziranga.',
    traditionalWeaves: 'Muga & Eri Silk, Gamosa, Dokhona, and Mirizim.',
    culturalHighlights: [
      'Bihu celebrations marking seasonal cycles and agriculture',
      'Majuli, the world’s largest inhabited river island and seat of Sattriya culture',
      'Warm hospitality symbolized by offering Tamol-Paan on a Bell-metal Xorai',
    ],
    comfortMemoryPrompt: 'Do you remember sitting by the tea garden borders watching mist lift as the morning sun rose?',
    scenicElements: [
      { title: 'Tea Garden Mist', description: 'Endless rolling rows of vibrant green tea leaves drenched in morning dew.', icon: '🍃' },
      { title: 'Majuli River Life', description: 'Quiet wooden boats crossing the sacred expanse of the Brahmaputra.', icon: '⛵' },
      { title: 'Golden Loom', description: 'The gentle click-clack of the home loom weaving shimmering golden silk.', icon: '🧵' },
    ],
  },
  {
    id: 'meghalaya',
    name: 'Meghalaya',
    nativeName: 'Abode of Clouds',
    capital: 'Shillong',
    primaryLanguages: ['Khasi', 'Garo (A·chik)', 'Pnar', 'English'],
    bannerEmoji: '🌧️',
    shortDescription: 'Misty pine hills, crystal-clear rivers, and living root architecture.',
    landscapeDescription: 'Cascading waterfalls, deep limestone gorges, and ancient sacred groves preserved for generations.',
    traditionalWeaves: 'Ryndia (organic Eri silk), Dakmanda, and intricate cane-bamboo handicrafts.',
    culturalHighlights: [
      'Living Root Bridges patiently nurtured by Khasi and Jaintia ancestors over centuries',
      'Nokrek Biosphere Reserve preserving ancient citrus and virgin rainforests',
      'Wangala 100-drum festival celebrating harvest abundance in the Garo Hills',
    ],
    comfortMemoryPrompt: 'Do you remember the peaceful scent of rain in pine woods and warm tea by the hearth?',
    scenicElements: [
      { title: 'Living Root Bridge', description: 'Strong, living ficus roots entwined across roaring mountain rivers.', icon: '🌉' },
      { title: 'Dawki Clear River', description: 'Boats appearing to float on glass above the pebbles of the Umngot.', icon: '🌊' },
      { title: 'Pine Scented Breeze', description: 'Gentle mountain mists dancing between tall Shillong pine trees.', icon: '🌲' },
    ],
  },
  {
    id: 'manipur',
    name: 'Manipur',
    nativeName: 'মণিপুর / ꯃꯅꯤꯄꯨꯔ',
    capital: 'Imphal',
    primaryLanguages: ['Meitei (Manipuri)', 'Tangkhul', 'Thadou', 'Rongmei'],
    bannerEmoji: '🌸',
    shortDescription: 'The jewel of the East, home to the floating Loktak Lake and exquisite classical dance.',
    landscapeDescription: 'A serene fertile valley enclosed by nine mountain ranges, crowned by the floating islands of Loktak.',
    traditionalWeaves: 'Phanek, Innaphi, Wangkhei Phee, and intricate Tangkhul wool shawls.',
    culturalHighlights: [
      'Loktak Lake with its iconic floating islands (Phumdis) and Sangai deer sanctuary',
      'Graceful Raas Leela dance expressing sublime devotion and aesthetic elegance',
      'Ima Keithel, the historic five-century-old all-women marketplace in Imphal',
    ],
    comfortMemoryPrompt: 'Do you recall the tranquil lotus flowers blooming on the waters of Loktak Lake at dawn?',
    scenicElements: [
      { title: 'Floating Phumdis', description: 'Circular emerald islands naturally floating over the calm freshwater lake.', icon: '🪷' },
      { title: 'Ima Keithel', description: 'Dignified mothers in traditional phanek exchanging textiles and herbs.', icon: '🧺' },
      { title: 'Graceful Dance', description: 'Flowing rhythms of the Pung drum echoing through ancient courtyards.', icon: '🪘' },
    ],
  },
  {
    id: 'mizoram',
    name: 'Mizoram',
    nativeName: 'Land of the Hill People',
    capital: 'Aizawl',
    primaryLanguages: ['Mizo', 'Lai', 'Mara', 'English'],
    bannerEmoji: '⛰️',
    shortDescription: 'Serene Blue Mountains, lush bamboo slopes, and the timeless ethos of Tlawmngaihna.',
    landscapeDescription: 'Layer upon layer of emerald mountain ridges kissing low clouds, dotted with clean ridge-top villages.',
    traditionalWeaves: 'Puanchei, Ngotekherh, and Hmaram shawls with bold graphic motifs.',
    culturalHighlights: [
      'The spirit of Tlawmngaihna: selfless service, mutual kindness, and community solidarity',
      'Chapchar Kut spring festival celebrated with joyous Cheraw bamboo dance',
      'Vantawng Falls plunging majestically amidst untamed bamboo forests',
    ],
    comfortMemoryPrompt: 'Do you remember the warm community singing around the village fire in the cool hill evening?',
    scenicElements: [
      { title: 'Blue Mountains', description: 'Phawngpui peak looking out over valleys of rhododendron and bamboo.', icon: '🌄' },
      { title: 'Cheraw Bamboo Dance', description: 'Rhythmic clapping of bamboo poles in joyous unison.', icon: '🎋' },
      { title: 'Tlawmngaihna Hearth', description: 'Welcoming neighbors sharing smoked tea with warmth and open doors.', icon: '🏡' },
    ],
  },
  {
    id: 'nagaland',
    name: 'Nagaland',
    nativeName: 'Land of Festivals',
    capital: 'Kohima',
    primaryLanguages: ['Nagamese', 'Ao', 'Angami', 'Sumi', 'Lotha', 'English'],
    bannerEmoji: '🦅',
    shortDescription: 'Vibrant warrior heritage, storied village gates, and the emerald sanctuary of Dzukou.',
    landscapeDescription: 'Rugged highland ranges, meticulously terraced hillsides, and pristine wildflower valleys.',
    traditionalWeaves: 'Tsungkotepsu, Rongsu, and intricate beads and brass ornaments representing each distinct tribe.',
    culturalHighlights: [
      'Sixteen major tribes, each with distinct languages, textile geometries, and oral histories',
      'Dzukou Valley: carpeted in unique seasonal lilies and meandering crystal rivulets',
      'Village Morungs (traditional institutions of learning and community heritage)',
    ],
    comfortMemoryPrompt: 'Do you remember the crisp mountain morning air looking across terraced hillside fields?',
    scenicElements: [
      { title: 'Dzukou Wildflowers', description: 'Soft rolling green dunes blossoming with rare pink and white lilies.', icon: '🌺' },
      { title: 'Tribal Shawls', description: 'Bold red, black, and white handwoven textiles telling centuries of history.', icon: '🧣' },
      { title: 'Great Hornbill', description: 'The majestic bird soaring gracefully over misty forest canopies.', icon: '🪶' },
    ],
  },
  {
    id: 'arunachal',
    name: 'Arunachal Pradesh',
    nativeName: 'Land of the Dawn-Lit Mountains',
    capital: 'Itanagar',
    primaryLanguages: ['Nyishi', 'Adi', 'Apatani', 'Monpa', 'Mishmi', 'Hindi'],
    bannerEmoji: '☀️',
    shortDescription: 'Snow-capped peaks, ancient monasteries, orchid valleys, and the first ray of sun on Indian soil.',
    landscapeDescription: 'Glaciated Himalayan crests descending into sub-tropical rainforests and rushing river gorges.',
    traditionalWeaves: 'Apatani geometric weaves, Monpa thangkas, and hand-carved wooden prayer tables.',
    culturalHighlights: [
      'Tawang Monastery, dating back to 1680, standing as a tranquil fortress of peace and contemplation',
      'Over 500 species of wild orchids blossoming across mist-draped ridges',
      'Apatani sustainable bamboo farming and fish-paddy integrated agriculture in Ziro Valley',
    ],
    comfortMemoryPrompt: 'Do you recall the sound of temple bells and fluttering prayer flags against the quiet snowy hills?',
    scenicElements: [
      { title: 'Dawn over the Peaks', description: 'First golden light breaking over Eastern Himalayan summits.', icon: '🏔️' },
      { title: 'Orchid Trail', description: 'Delicate purple and white orchids blooming wild on mossy tree barks.', icon: '🌸' },
      { title: 'Prayer Wheels', description: 'Gentle brass wheels spun with quiet blessings in the mountain breeze.', icon: '☸️' },
    ],
  },
  {
    id: 'tripura',
    name: 'Tripura',
    nativeName: 'ত্রিপুরা',
    capital: 'Agartala',
    primaryLanguages: ['Kokborok', 'Bengali', 'Mog', 'English'],
    bannerEmoji: '🏰',
    shortDescription: 'Water palaces, royal heritage, sacred rock carvings, and exquisite bamboo craftsmanship.',
    landscapeDescription: 'Gentle green hillocks (Tillas) and fertile river valleys (Lungas) filled with rubber and bamboo.',
    traditionalWeaves: 'Risa, Rignai, and Rikutu with intricate diamond motifs woven on waist-looms.',
    culturalHighlights: [
      'Neermahal: the romantic water palace floating gracefully in the middle of Rudrasagar Lake',
      'Unakoti: monumental rock-cut sculptures of deities carved directly into hillside cliffs',
      'Harmonious coexistence of Kokborok indigenous culture and royal heritage',
    ],
    comfortMemoryPrompt: 'Do you remember the reflection of palace lights upon the tranquil waters of the lake in the evening?',
    scenicElements: [
      { title: 'Neermahal Palace', description: 'Majestic red-and-white palace surrounded on all sides by shimmering water.', icon: '🏯' },
      { title: 'Bamboo Craft', description: 'Fine woven bamboo lamps and screens carrying natural earthy fragrances.', icon: '🎋' },
      { title: 'Sacred Cliffs', description: 'Ancient spiritual figures sculpted into forested mountain stone.', icon: '🗿' },
    ],
  },
  {
    id: 'sikkim',
    name: 'Sikkim',
    nativeName: 'सिक्किम',
    capital: 'Gangtok',
    primaryLanguages: ['Nepali', 'Bhutia', 'Lepcha', 'Limbu', 'English'],
    bannerEmoji: '🏔️',
    shortDescription: 'The sacred realm of Mt. Kanchenjunga, serene monasteries, and organic mountain valleys.',
    landscapeDescription: 'Dramatic altitude changes from lush cardamom gardens to alpine meadows and snow sanctuaries.',
    traditionalWeaves: 'Lepcha Dumdem, Bhutia Bakhu, and hand-knotted woollen Tibetan carpets.',
    culturalHighlights: [
      'Mt. Kanchenjunga revered as the guardian deity and protector of the land',
      '100% organic agriculture preserving the soil, mountain waters, and ancient balance',
      'Rumtek and Pemayangtse monasteries resounding with resonant horns and prayer chants',
    ],
    comfortMemoryPrompt: 'Do you remember waking up to see the snow peaks of Kanchenjunga turning golden in the early morning?',
    scenicElements: [
      { title: 'Golden Kanchenjunga', description: 'The grand five treasures of snow glowing warm amber at sunrise.', icon: '🌄' },
      { title: 'Cardamom Valleys', description: 'Fragrant large cardamom plants flourishing beneath mountain shade trees.', icon: '🌿' },
      { title: 'Tranquil Monasteries', description: 'Red-robed monks chanting peaceful mantras for universal wellbeing.', icon: '🔔' },
    ],
  },
];
