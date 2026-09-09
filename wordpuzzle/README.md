# 🧩 WORD PUZZLE
### Accessible, Dementia-Friendly Cognitive Puzzle Game for Seniors & Northeast India Heritage

**WORD PUZZLE** is a modern, accessible, dignified web application thoughtfully designed for elderly individuals and people living with dementia. Inspired by the cultural heritage and tranquil natural landscapes of Northeast India, the app provides gentle, engaging cognitive stimulation with **zero stressful countdown timers**, **no childish styling**, and **no confusing menus**.

Built with **Next.js (App Router)**, **React**, **TypeScript**, **Tailwind CSS**, and **Lucide Icons**.

---

## 🌟 Core Gameplay Experiences

### 1. 🏠 Home Hub & Daily Progress (`HomeHub`)
- **Welcoming Header**: Calming sky-blue gradient, morning sun, and soft clouds inspired by peaceful mountain dawns.
- **Your Word Progress**:
  - Daily exploration goal with visual percentage progress bar.
  - Tactile stat metrics: 🏆 Total Score, 🔤 Words Discovered, 🧩 Puzzles Solved.
  - **Recently Discovered Words**: Interactive sound pills to replay native audio pronunciation.
- **Easy One-Tap Launchers**:
  - 🟩 **Play Word Puzzle (5×5)**: Quick-launch into one-word-at-a-time regional puzzles.
  - 🟦 **Word Search Grid**: Quick-launch into multi-word discovery puzzles.

---

### 2. ⭐ Play (5×5) Word Puzzle (`FiveByFiveGameView` & `TopicDashboard`)
- **5×5 Letter Grid**: Exactly 5 rows by 5 columns—sized for elderly visual comfort.
- **One Word At A Time**:
  - Target word display with large icon, cultural clue, and memory prompt.
  - Speaker button for spoken pronunciation in the chosen regional language.
  - **In-Box Undo**: Undo button placed directly inside the puzzle toolbar.
  - **Live Selection Preview**: Displays selected letters in real time as the user drags.
  - **Straight Directions Only**: Words read forward horizontally (L $\rightarrow$ R), vertically (Top $\rightarrow$ Bottom), or diagonally (Down-Right). **No reverse or backward words**.
  - **Memory Echo Card**: After finding a word, a warm prompt invites nostalgic reflection without failure states or tests.
- **3 Difficulty Decks**:
  - 🍃 **Easy**: Short, familiar 2–4 letter words with prominent clues.
  - ☀️ **Medium**: Moderate 3–5 letter words for enjoyable discovery.
  - ⛰️ **Hard**: 4–5 letter words with subtler grid placements.
- **10 Rich Northeast Topics**:
  1. 🍃 **Assam Brahmaputra** (Tea, River, Rice, Silk)
  2. 🌧️ **Meghalaya Clouds & Pines** (Rain, Cloud, Pine, Root)
  3. 🌊 **Manipur Loktak Waters** (Lake, Fish, Dance)
  4. ⛰️ **Mizoram Blue Hills** (Hills, Cane)
  5. 🦅 **Nagaland Wildflower Valleys** (Bird, Shawl)
  6. 🏔️ **Arunachal Dawn Slopes** (Dawn, Peak)
  7. 🏰 **Tripura Palaces & Craft** (Lake, Clay, Reed, Bell)
  8. ❄️ **Sikkim Sacred Peaks** (Snow, Pray, Herb, Yak)
  9. 🎉 **Northeast Festivals & Bihu** (Bihu, Drum, Song, Feast)
  10. 🍲 **Traditional Food & Spices** (Rice, Fish, Herb, Tea)

---

### 3. 🧭 Word Search Grid Mode (`WordSearchDashboard` & `WordSearchGrid`)
- **Multi-Word Search (10×10 Grid)**:
  - Find all hidden theme words in a spacious letter grid.
- **100% Fully Visible Target Words**:
  - All target words (`RIVER`, `MOUNTAIN`, `FOREST`, `OCEAN`, etc.) are rendered in spacious cards with **no truncation or ellipses**.
  - Per-word pronunciation button and live checkmark indicators.
- **Zero Timers & Zero Pressure**:
  - No countdown clocks, no penalty for pauses, and no hurry.
- **In-Box Toolbar**:
  - Real-time drag selection preview.
  - **Undo** button placed directly inside the grid box.
  - Hint button highlights the starting letter of an unfound word.
- **Celebration Modal**:
  - Congratulates completion with points and one-click replay or next puzzle.

---

### 4. 🌐 Full Regional Language Localization & Dynamic Script Engine

Changing the language via the top-right **🌐 Language** modal immediately transforms:
1. **Entire UI Interface**: Navigation tabs, dashboard cards, headers, buttons, in-box undo, and dialogs.
2. **Target Words & Grid Letters**: Words and empty cell fillers dynamically match the selected language's native script.
3. **Indic Grapheme Segmentation**: Uses `Intl.Segmenter` to keep compound characters and matras (e.g. `চা`, `হ`, `ন`, `দী`, `चि`, `या`, `सा`, `हा`) intact as single readable tiles.
4. **Guaranteed Non-Repeating Words**: 0 duplicate words across all 6 levels for every language (48 unique words per language, 54 levels total).
5. **Regional Voice Synthesis**: Spoken word audio in the selected language.

#### Supported Languages & Scripts:
| Code | Language | Script Type | Sample Words |
| :--- | :--- | :--- | :--- |
| **en** | English | Latin | `RIVER`, `MOUNTAIN`, `FOREST`, `TEA` |
| **as** | অসমীয়া (Assamese) | Eastern Indic / Assamese | `নদী`, `পাহাৰ`, `অৰণ্য`, `চাহ`, `বৰষুণ` |
| **bn** | বাংলা (Bengali) | Eastern Indic / Bengali | `নদী`, `পাহাড়`, `অরণ্য`, `চা`, `বৃষ্টি` |
| **mni** | মৈতৈলোন্ (Meitei) | Meitei / Bengali Script | `তুৰেল`, `চিংজাউ`, `উমং`, `চা`, `নোং` |
| **kha** | Ka Ktien Khasi | Latin | `WAH`, `LUM`, `KHLAW`, `SHA`, `SLAP` |
| **lus** | Mizo ṭawng | Latin | `LUI`, `TLANG`, `RAMHMUL`, `THING`, `RUAH` |
| **brx** | बर' राव (Bodo) | Devanagari | `दैमा`, `हाजो`, `हाग्रा`, `साहा`, `अखा` |
| **ne** | नेपाली (Nepali) | Devanagari | `नदी`, `पहाड`, `जंगल`, `चिया`, `वर्षा` |
| **grt** | A·chik (Garo) | Latin | `CHIBI`, `ABRI`, `BURUNG`, `CHA`, `MIKKA` |

---

### 5. 📱 Mobile & Tablet Optimized Interface
- **Touch-Friendly Pointer Events**: Fluid pointer drag selection with `touch-action: none` prevents accidental page scrolling while selecting letters.
- **Large Touch Targets**: Tile sizes scale from 48px to 72px with minimum 16px font sizes.
- **High Contrast & Accessible Colors**: Nature-inspired forest greens (`#2C5E3B`), warm creams (`#FAFDFB`), sky blues (`#DDF0FC`), and deep charcoal text (`#18281E`) meet WCAG AAA contrast ratios.
- **Mobile Web App Ready**: Meta viewport with `viewport-fit=cover` and mobile web app headers for seamless full-screen tablet and smartphone use.

---

## 🏗️ Project Architecture

```
scratch/smriti-wellness/
├── app/
│   ├── layout.tsx                     # Root shell, LanguageProvider, meta tags
│   └── page.tsx                       # Unified single-page app (Home, 5x5, Word Search)
├── components/
│   ├── home/
│   │   └── HomeHub.tsx                # Welcome header, daily progress, launch cards
│   ├── navigation/
│   │   ├── TopHeader.tsx              # Title, language selector modal, audio toggle
│   │   └── ScreenBottomNav.tsx        # 3-Tab navigation (Home, Play 5x5, Word Search)
│   ├── northeast-puzzle/
│   │   ├── TopicDashboard.tsx         # 10 Topics & 3 difficulty level decks
│   │   ├── FiveByFiveGameView.tsx     # 5x5 game view with one-word progress
│   │   └── FiveByFiveGrid.tsx         # 5x5 letter grid with in-box Undo & preview
│   └── word-puzzle/
│       ├── WordSearchDashboard.tsx    # Multi-word dashboard & fully visible words
│       ├── WordSearchGrid.tsx         # 10x10 drag selection grid with in-box Undo
│       └── PuzzleCompletedModal.tsx   # Completion celebration modal
├── lib/
│   ├── data/
│   │   └── northeastTopics.ts         # 10 Topics, 28 cultural items, localized mappings
│   ├── game/
│   │   ├── wordSearchEngine.ts        # Straight word placement & grapheme segmentation
│   │   ├── multilingualPuzzles.ts     # 6 unique levels for all 9 regional languages
│   │   └── wordPuzzlesData.ts         # Level types and base data structures
│   ├── i18n/
│   │   ├── LanguageContext.tsx        # React context for active language & translations
│   │   ├── types.ts                   # SupportedLanguage union type
│   │   └── wordPuzzleTranslations.ts  # Full UI translations for 9 regional languages
│   └── voice/
│       ├── soundEffects.ts            # Gentle audio tones (chimes, tap, celebration)
│       └── speechService.ts           # Regional text-to-speech pronunciation
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18.17+ or v20+)
- npm or yarn

### Installation & Run
```bash
# 1. Navigate to the project directory
cd scratch/smriti-wellness

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in your browser
# http://localhost:3000
```

### Production Build
```bash
npm run build
npm run start
```
The production build compiles with 0 TypeScript and ESLint errors.

---

## ☁️ Deploying to Vercel

The application is 100% compatible with Vercel:
1. Push this repository to GitHub or GitLab.
2. In the [Vercel Dashboard](https://vercel.com/new), select **Import Project**.
3. Set the root directory to `scratch/smriti-wellness` (if in a subdirectory) or repository root.
4. Framework Preset: **Next.js**.
5. Click **Deploy**.

---

## 📄 License
MIT License. Created with care for senior cognitive wellness and Northeast Indian cultural heritage.
