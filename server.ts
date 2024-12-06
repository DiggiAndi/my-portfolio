// Import notwendiger Module
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Lädt Umgebungsvariablen aus `.env`

// Express App
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Middleware
  server.use(cors()); // CORS aktivieren
  server.use(bodyParser.json()); // JSON-Parsing aktivieren

  // API-Endpunkt für Kontaktformular
  server.post('/api/contact', async (req, res) => {
    // Extrahiere die Daten aus der Anfrage
    const { name, email, message } = req.body;

    // Überprüfen, ob alle Felder ausgefüllt sind
    if (!name || !email || !message) {
      return res.status(400).send({ error: 'Bitte alle Felder ausfüllen!' });
    }

    try {
      // Erstelle den Transporter für den E-Mail-Versand
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env['EMAIL_USER'], // E-Mail-Adresse aus Umgebungsvariablen
          pass: process.env['EMAIL_PASS'], // Passwort aus Umgebungsvariablen
        },
      });

      // Konfiguriere die E-Mail
      const mailOptions = {
        from: email,
        to: process.env['EMAIL_USER'], // Ziel-E-Mail-Adresse
        subject: `Kontaktanfrage von ${name}`,
        text: `Name: ${name}\nE-Mail: ${email}\nNachricht:\n${message}`,
      };

      // Sende die E-Mail
      await transporter.sendMail(mailOptions);

      // Erfolgsantwort
      return res.send({ success: 'Nachricht erfolgreich gesendet!' }); // Explizites `return` hinzugefügt
    } catch (err) {
      console.error(err);
      // Fehlerantwort
      return res.status(500).send({ error: 'Fehler beim Senden der Nachricht.' }); // Explizites `return` hinzugefügt
    }
  });

  // Statische Dateien ausliefern
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y',
  }));

  // Angular-Routing
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    return commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => {
        res.send(html);
        return; // Explizites `return` hinzugefügt
      })
      .catch((err) => {
        next(err);
        return; // Explizites `return` hinzugefügt
      });
  });

  return server; // Gibt die konfigurierte Express-App zurück
}

// Startet den Server
function run(): void {
  const port = process.env['PORT'] || 4000;

  // Starte die Express-App
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Starte den Server
run();
