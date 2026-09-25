/**
 * Message catalogues.
 *
 * `en` is the contract: its keys are the type, so a missing key in another
 * catalogue is a compile error rather than a blank label at runtime, and a
 * catalogue that only translates half the surface is legal — `t()` falls back
 * to English per key, not per catalogue.
 *
 * Only the video library and the header are translated so far. That is the
 * honest state of it: translating the long-form prose in `@yen/content` is a
 * content job, not a code one, and stubbing it with machine output would make
 * the page look finished when it is not.
 */

import type { Locale } from "./locales";

const en = {
  "nav.allApps": "All applications",

  "videos.segments": "Branches",
  "videos.tags.all": "All subjects",
  "videos.tags.label": "Subjects",
  "videos.tags.derived": "Derived from the description — not typed in by hand",
  "videos.empty": "No recordings on this branch yet.",
  "videos.pending": "File not yet added",
  "videos.filedAs": "filed as",
  "videos.count": "{n} recordings",

  "mode.label": "Presentation",
  "mode.site": "Site",
  "mode.app": "App",
  "mode.hint": "Switch between the published site treatment and the in-app HUD chrome",

  "player.play": "Play",
  "player.pause": "Pause",
  "player.replay": "Replay",
  "player.mute": "Mute",
  "player.unmute": "Unmute",
  "player.fullscreen": "Full screen",
  "player.chapters": "Chapters",
  "player.languages": "Language",
  "player.versions": "Versions",
  "player.commentary": "Commentary",
  "player.commentaryOn": "Commentary on",
  "player.commentaryHint": "Opens a second window of Matthew talking over this recording, kept in step with it",
  "player.music": "Music layer",
  "player.musicTitle": "Music layer overlay",
  "player.musicBlurb": "Focus pad or binaural bed under the talk track. Teach the layer here — move it later.",
  "player.musicHint": "Add a focus or meditation bed under this recording",
  "player.musicOn": "{layer} under the talk track",
  "player.musicVolume": "Mix",
  "player.noFile": "No file for this edition yet — the controls are live, the source is not.",
  "player.currentCut": "current cut",
  "player.branchedFrom": "branched from {parent}",
  "player.original": "original",
  "player.dubbed": "dubbed",
  "player.subtitled": "subtitled",

  "commentary.title": "Commentary",
  "commentary.popOut": "Pop out",
  "commentary.close": "Close",
  "commentary.pending": "Commentary recording not yet added.",
} as const;

export type MessageKey = keyof typeof en;
export type Catalogue = Partial<Record<MessageKey, string>>;

/*
  Partial by design. Each of these covers the chrome a visitor meets first —
  navigation, the mode toggle, the player controls — and leaves the editorial
  copy in English, which is where it actually is.
*/
const es: Catalogue = {
  "nav.allApps": "Todas las aplicaciones",
  "videos.segments": "Ramas",
  "videos.tags.all": "Todos los temas",
  "videos.tags.label": "Temas",
  "videos.empty": "Aún no hay grabaciones en esta rama.",
  "videos.pending": "Archivo aún no añadido",
  "videos.count": "{n} grabaciones",
  "mode.label": "Presentación",
  "mode.site": "Sitio",
  "mode.app": "App",
  "player.play": "Reproducir",
  "player.pause": "Pausar",
  "player.replay": "Repetir",
  "player.mute": "Silenciar",
  "player.unmute": "Activar sonido",
  "player.fullscreen": "Pantalla completa",
  "player.chapters": "Capítulos",
  "player.languages": "Idioma",
  "player.versions": "Versiones",
  "player.commentary": "Comentario",
  "commentary.title": "Comentario",
  "commentary.popOut": "Abrir aparte",
  "commentary.close": "Cerrar",
};

const fr: Catalogue = {
  "nav.allApps": "Toutes les applications",
  "videos.segments": "Branches",
  "videos.tags.all": "Tous les sujets",
  "videos.tags.label": "Sujets",
  "videos.empty": "Aucun enregistrement sur cette branche.",
  "videos.pending": "Fichier pas encore ajouté",
  "videos.count": "{n} enregistrements",
  "mode.label": "Présentation",
  "mode.site": "Site",
  "mode.app": "App",
  "player.play": "Lecture",
  "player.pause": "Pause",
  "player.replay": "Revoir",
  "player.mute": "Couper le son",
  "player.unmute": "Activer le son",
  "player.fullscreen": "Plein écran",
  "player.chapters": "Chapitres",
  "player.languages": "Langue",
  "player.versions": "Versions",
  "player.commentary": "Commentaire",
  "commentary.title": "Commentaire",
  "commentary.popOut": "Détacher",
  "commentary.close": "Fermer",
};

const de: Catalogue = {
  "nav.allApps": "Alle Anwendungen",
  "videos.segments": "Branches",
  "videos.tags.all": "Alle Themen",
  "videos.tags.label": "Themen",
  "videos.empty": "Noch keine Aufnahmen in diesem Branch.",
  "videos.pending": "Datei noch nicht hinzugefügt",
  "videos.count": "{n} Aufnahmen",
  "mode.label": "Darstellung",
  "mode.site": "Website",
  "mode.app": "App",
  "player.play": "Abspielen",
  "player.pause": "Pause",
  "player.replay": "Erneut ansehen",
  "player.mute": "Stumm",
  "player.unmute": "Ton an",
  "player.fullscreen": "Vollbild",
  "player.chapters": "Kapitel",
  "player.languages": "Sprache",
  "player.versions": "Versionen",
  "player.commentary": "Kommentar",
  "commentary.title": "Kommentar",
  "commentary.popOut": "Ablösen",
  "commentary.close": "Schließen",
};

const ja: Catalogue = {
  "nav.allApps": "すべてのアプリケーション",
  "videos.segments": "ブランチ",
  "videos.tags.all": "すべてのトピック",
  "videos.tags.label": "トピック",
  "videos.empty": "このブランチにはまだ録画がありません。",
  "videos.pending": "ファイルは未追加です",
  "videos.count": "録画 {n} 本",
  "mode.label": "表示",
  "mode.site": "サイト",
  "mode.app": "アプリ",
  "player.play": "再生",
  "player.pause": "一時停止",
  "player.replay": "もう一度",
  "player.mute": "ミュート",
  "player.unmute": "ミュート解除",
  "player.fullscreen": "全画面",
  "player.chapters": "チャプター",
  "player.languages": "言語",
  "player.versions": "バージョン",
  "player.commentary": "解説",
  "commentary.title": "解説",
  "commentary.popOut": "別ウィンドウ",
  "commentary.close": "閉じる",
};

const ar: Catalogue = {
  "nav.allApps": "كل التطبيقات",
  "videos.segments": "الفروع",
  "videos.tags.all": "كل المواضيع",
  "videos.tags.label": "المواضيع",
  "videos.empty": "لا توجد تسجيلات في هذا الفرع بعد.",
  "videos.pending": "لم يُضَف الملف بعد",
  "videos.count": "{n} تسجيلات",
  "mode.label": "العرض",
  "mode.site": "الموقع",
  "mode.app": "التطبيق",
  "player.play": "تشغيل",
  "player.pause": "إيقاف مؤقت",
  "player.replay": "إعادة",
  "player.mute": "كتم",
  "player.unmute": "إلغاء الكتم",
  "player.fullscreen": "ملء الشاشة",
  "player.chapters": "الفصول",
  "player.languages": "اللغة",
  "player.versions": "الإصدارات",
  "player.commentary": "التعليق",
  "commentary.title": "التعليق",
  "commentary.popOut": "نافذة منفصلة",
  "commentary.close": "إغلاق",
};

export const CATALOGUES: Record<Locale, Catalogue> = { en, es, fr, de, ja, ar };
export const BASE_CATALOGUE = en;
