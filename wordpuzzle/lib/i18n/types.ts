export type SupportedLanguage = 
  | 'en'   // English
  | 'as'   // Assamese (অসমীয়া)
  | 'bn'   // Bengali (বাংলা)
  | 'mni'  // Meitei / Manipuri (মৈতৈলোন্ / ꯃꯩꯇꯩꯂꯣꯟ)
  | 'kha'  // Khasi (Ka Ktien Khasi)
  | 'lus'  // Mizo (Mizo ṭawng)
  | 'brx'  // Bodo (बर')
  | 'ne'   // Nepali (नेपाली)
  | 'grt'; // Garo (A·chik)

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  region: string;
  script: string;
  speechCode: string; // BCP-47 fallback
  culturalBadge: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    region: 'Northeast India & General',
    script: 'Latin',
    speechCode: 'en-IN',
    culturalBadge: '🌏 Regional Common',
  },
  {
    code: 'as',
    name: 'Assamese',
    nativeName: 'অসমীয়া',
    region: 'Assam / অসম',
    script: 'Eastern Nagari (Assamese)',
    speechCode: 'as-IN',
    culturalBadge: '🌿 Brahmaputra Valley',
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    region: 'Barak Valley & Tripura',
    script: 'Eastern Nagari (Bengali)',
    speechCode: 'bn-IN',
    culturalBadge: '🌸 Barak & Plains',
  },
  {
    code: 'mni',
    name: 'Meitei / Manipuri',
    nativeName: 'মৈতৈলোন্ / ꯃꯩꯇꯩ',
    region: 'Manipur / ꯃꯅꯤꯄꯨꯔ',
    script: 'Bengali-Assamese & Meetei Mayek',
    speechCode: 'mni-IN',
    culturalBadge: '🌊 Loktak & Imphal',
  },
  {
    code: 'kha',
    name: 'Khasi',
    nativeName: 'Ka Ktien Khasi',
    region: 'Meghalaya / Khasi Hills',
    script: 'Latin (Khasi)',
    speechCode: 'en-IN',
    culturalBadge: '🌲 Living Root Bridges',
  },
  {
    code: 'lus',
    name: 'Mizo',
    nativeName: 'Mizo ṭawng',
    region: 'Mizoram / Hills of Peace',
    script: 'Latin (Mizo)',
    speechCode: 'en-IN',
    culturalBadge: '⛰️ Blue Mountains',
  },
  {
    code: 'brx',
    name: 'Bodo',
    nativeName: 'बर\' राव',
    region: 'Bodoland / Assam',
    script: 'Devanagari',
    speechCode: 'hi-IN',
    culturalBadge: '🌾 Bagurumba Heritage',
  },
  {
    code: 'ne',
    name: 'Nepali',
    nativeName: 'नेपाली',
    region: 'Sikkim & Northeast Hills',
    script: 'Devanagari',
    speechCode: 'ne-NP',
    culturalBadge: '🏔️ Kanchenjunga Slopes',
  },
  {
    code: 'grt',
    name: 'Garo',
    nativeName: 'A·chik Ku·sik',
    region: 'Meghalaya / Garo Hills',
    script: 'Latin (A·chik)',
    speechCode: 'en-IN',
    culturalBadge: '🍃 Nokrek Rainforest',
  },
];
