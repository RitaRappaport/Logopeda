import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  pl: {
    translation: {
      app_title: 'DeutschFonetyka',
      studio: 'Studio',
      practice: 'Ćwiczenia',
      tests: 'Testy',
      materials: 'Materiały',
      progress: 'Postępy',
      settings: 'Ustawienia',
      record: 'Nagraj',
      stop: 'Stop',
      play_ref: 'Odtwórz wzorzec',
      score: 'Wynik',
      wave: 'Fala',
      pitch_hit: 'Trafienie w pasmo',
    },
  },
  de: {
    translation: {
      app_title: 'DeutschFonetyka',
      studio: 'Studio',
      practice: 'Übungen',
      tests: 'Tests',
      materials: 'Materialien',
      progress: 'Fortschritt',
      settings: 'Einstellungen',
      record: 'Aufnehmen',
      stop: 'Stopp',
      play_ref: 'Referenz abspielen',
      score: 'Punkte',
      wave: 'Wellenform',
      pitch_hit: 'Treffer im Zielband',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'pl',
  fallbackLng: 'pl',
  interpolation: { escapeValue: false },
});

export default i18n;
