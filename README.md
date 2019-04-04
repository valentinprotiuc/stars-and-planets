# Sterne&Planeten

Einfaches Demo, implementiert als Single-Page-Webanwendung, das einen Sternkatalog darstellt. 
Der Nutzer kann sich die Datenbank mit Sternen und Planeten als Gast ansehen, oder kann sich
registrieren und vollen Zugriff bekommen. Eingeloggte Nutzer dürfen 
neue Sterne in der Datenbank registrieren, Daten bearbeiten und Einträge löschen.


## Verwendete Software

Mongoose `5.4.20`

Express.js `4.16.4`

Angular `7.2.0`

NodeJS `10.15.3`

Bootstrap `4`

## Wo die Anwendung lebt

Die Anwendung lebt auf der [Heroku](https://stars-and-planets.herokuapp.com/) 
Plattform und verwendet als Host für die MongoDB-Datenbank die mLab.

## Implementierte Features

- Angular: Routing, Observables, Reactive und Template Forms, eigene Form Validator für Zahlen-Input, Http Requests

- Express.js: Authentifizierung mit JSON Web Token

- Bootstrap: Navbar, Cards, Dropdowns, Tables, Tooltips

- MongoDB: Daten von Sternen und Planeten,als auch Daten von Nutzer in DB gespeichert. 
Passwort nicht gespeichert, statt dessen salt und hash.

- Sonstige: Listenfilter, Listensortierung, Google Analytics


## Erweiterungsmöglichkeiten

- Drucken, Teilen

- Autor des Eintrags speichern

- Einloggen mit Google, Facebook

- Daten von Planeten editieren

- Beim clicken eines Planeten die entsprechende Zeile in der Tabelle hervorheben

- Auswahlt von verschiedene Maßeinheiten(Lichtjahr, Parsec, Kilometer)



