# 8S2 World Soccer — progetto Android separato

Questo progetto usa Capacitor 8 e **non modifica** il gioco web nella radice del repository. È stato predisposto, ma **non ancora compilato né verificato su un dispositivo**.

## Requisiti
Node.js 22+, Android Studio e Android SDK compatibili con Capacitor 8.

## Prima compilazione
Dalla radice del repository:

```bash
cd android-app
npm install
npm run android:init
npm run android:open
```

In Android Studio selezionare un dispositivo e generare un APK debug. Per aggiornare i file web dopo modifiche al gioco: `npm run android:sync`.

## Verifiche prima della pubblicazione
- Funzionamento offline: controllare eventuali URL remoti, audio e dipendenze CDN.
- Salvataggi, vibrazione, orientamento, full screen, tasti touch e prestazioni su telefoni/tablet.
- Link esterni e pulsante PayPal: verificare policy Google Play prima di distribuirlo.
- Icone, package ID definitivo, target SDK, firma, privacy e Android App Bundle (AAB).

La cartella `www` viene rigenerata dallo script: non modificarla manualmente. La versione web su GitHub Pages resta invariata.
