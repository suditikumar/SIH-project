import { SupportedLanguage, SUPPORTED_LANGUAGES } from '../i18n/types';

class SpeechService {
  private isAvailable: boolean = false;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.isAvailable = true;
      this.loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.voices = window.speechSynthesis.getVoices();
    }
  }

  /**
   * Pronounce a target word in the chosen language.
   * Checks for pre-recorded audio first; falls back to Web Speech Synthesis.
   */
  public async speakWord(
    word: string,
    language: SupportedLanguage,
    phoneticHint?: string,
    onEnd?: () => void
  ): Promise<void> {
    // 1. Check if custom recorded regional audio exists
    const recordedAudioUrl = `/audio/words/${language}_${word.toLowerCase().replace(/[^a-z0-9]/g, '')}.mp3`;
    try {
      const audio = new Audio(recordedAudioUrl);
      const canPlay = await new Promise<boolean>((resolve) => {
        audio.oncanplaythrough = () => resolve(true);
        audio.onerror = () => resolve(false);
        // Short timeout in case of silent failure
        setTimeout(() => resolve(false), 200);
      });

      if (canPlay) {
        audio.onended = () => onEnd?.();
        await audio.play();
        return;
      }
    } catch {
      // Fall through to TTS
    }

    // 2. Web Speech Synthesis fallback
    this.speakWithTTS(word, language, phoneticHint, onEnd);
  }

  /**
   * Speak friendly instructions: e.g. "Find TEA", "Wonderful! You found TEA."
   */
  public speakInstruction(
    text: string,
    language: SupportedLanguage = 'en',
    onEnd?: () => void
  ): void {
    this.speakWithTTS(text, language, undefined, onEnd);
  }

  public stop(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  private speakWithTTS(
    text: string,
    language: SupportedLanguage,
    phoneticHint?: string,
    onEnd?: () => void
  ): void {
    if (!this.isAvailable || typeof window === 'undefined') {
      onEnd?.();
      return;
    }

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    const langInfo = SUPPORTED_LANGUAGES.find((l) => l.code === language);
    const speechCode = langInfo ? langInfo.speechCode : 'en-IN';

    // Find best voice match
    const voice = this.findBestVoice(speechCode);

    // If target script is not English and language is Khasi/Mizo/Garo or English, use standard text
    const spokenText = text;

    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = speechCode;
    utterance.rate = 0.85; // Slower, comfortable pace for elderly listeners
    utterance.pitch = 1.0;

    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => {
      onEnd?.();
    };

    utterance.onerror = (e) => {
      // If native language TTS failed (e.g. Assamese not installed on user's device), 
      // fallback smoothly to phonetic hint in English voice
      if (phoneticHint && language !== 'en') {
        const fallbackUtterance = new SpeechSynthesisUtterance(phoneticHint);
        fallbackUtterance.lang = 'en-IN';
        fallbackUtterance.rate = 0.85;
        fallbackUtterance.onend = () => onEnd?.();
        window.speechSynthesis.speak(fallbackUtterance);
      } else {
        onEnd?.();
      }
    };

    window.speechSynthesis.speak(utterance);
  }

  private findBestVoice(speechCode: string): SpeechSynthesisVoice | undefined {
    if (this.voices.length === 0) {
      this.loadVoices();
    }
    // Exact match
    const exact = this.voices.find((v) => v.lang === speechCode);
    if (exact) return exact;

    // Language prefix match (e.g. "bn" or "hi")
    const prefix = speechCode.split('-')[0];
    const prefixMatch = this.voices.find((v) => v.lang.startsWith(prefix));
    if (prefixMatch) return prefixMatch;

    // Indian English fallback
    const indianEnglish = this.voices.find((v) => v.lang.includes('en-IN') || v.lang.includes('en_IN'));
    if (indianEnglish) return indianEnglish;

    return this.voices.find((v) => v.default) || this.voices[0];
  }
}

export const speechService = new SpeechService();
