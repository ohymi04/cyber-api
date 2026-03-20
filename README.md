# Cyber API — Enchanted Node Portal

![Cyber API Banner](https://img.shields.io/badge/Cyber-API-%2380cbc4)

Bienvenue sur **Cyber API**, un portail Node.js sécurisé avec HTTPS, Docker et endpoints RESTful pour développer et tester des microservices. Ce projet inclut un front-end interactif et un système de suivi des utilisateurs en live.

---

## Table des matières

1. [Fonctionnalités](#fonctionnalités)
2. [Prérequis](#prérequis)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Lancer le projet](#lancer-le-projet)
6. [Structure du projet](#structure-du-projet)
7. [Endpoints API](#endpoints-api)
8. [Sécurité et bonnes pratiques](#sécurité-et-bonnes-pratiques)
9. [Contribuer](#contribuer)

---

## Fonctionnalités

* Serveur **Node.js 20** avec **Express** et HTTPS.
* Front-end interactif en HTML/CSS/JS.
* Endpoints RESTful `/api`, `/secure` (avec clé API), `/matrix`.
* Docker & Docker Compose pour déploiement simplifié.
* Gestion des **certificats SSL auto-signés** pour HTTPS local.
* Compatible **Mac, Linux et Windows** avec Docker.

---

## Prérequis

Avant d’installer, assurez-vous d’avoir :

* **Node.js v20** et **npm 10**

  ```bash
  node -v
  npm -v
  ```
* **Docker 29.x** et **Docker Compose 5.x**

  ```bash
  docker -v
  docker-compose -v
  ```
* Git pour versioning et clone du projet.
* Terminal / Shell pour exécuter les commandes.

---

## Installation

### 1️⃣ Cloner le projet

```bash
git clone https://github.com/ohymi04/cyber-api.git
cd cyber-api
```

### 2️⃣ Installer les dépendances

```bash
npm install
```

⚠️ Pour un environnement production :

```bash
npm install --only=production
```

### 3️⃣ Créer les certificats HTTPS (auto-signés)

```bash
mkdir certs
openssl req -x509 -nodes -days 365 \
  -newkey rsa:2048 \
  -keyout certs/key.pem \
  -out certs/cert.pem \
  -subj "/CN=cyber-api.local"
```

---

## Configuration

* **HTTPS** : `certs/key.pem` et `certs/cert.pem`
* **Clé API pour endpoint sécurisé** : `cyber-secret` (modifiable dans `app.js`)
* **Ports** : `3000` (HTTPS)

Optionnel : créer un fichier `.env` pour variables sensibles.

---

## Lancer le projet

### 1️⃣ En local (Node.js)

```bash
docker build -t cyber-api .
```

```bash
docker run -d -p 3000:3000 cyber-api
```

Le serveur sera accessible à : [https://localhost:3000](https://localhost:3000)

### 2️⃣ Avec Docker

#### Dockerfile

Si tu n’as pas encore un Dockerfile :

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
```

#### Lancer avec Docker Compose

`docker-compose.yml` minimal :

```yaml
version: "3.9"
services:
  cyber-api:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./certs:/app/certs
    environment:
      - NODE_ENV=production
```

```bash
docker-compose up -d --build
```

```bash
docker-compose stop
```

```bash
docker-compose start
```

---

## Structure du projet

```
Project-Cyber-API/
├── cyber-api
│   ├── Dockerfile
│   ├── README.md
│   ├── app.js
│   ├── LICENSE
│   ├── certs
│   │   ├── cert.pem
│   │   └── key.pem
│   ├── package-lock.json
│   ├── package.json
│   └── public
│       └── index.html
├── docker-compose.yml
└── nginx
    └── nginx.conf
```

---

## Endpoints API

| Endpoint  | Méthode | Description                            |
| --------- | ------- | -------------------------------------- |
| `/api`    | GET     | Status général du serveur              |
| `/secure` | GET     | Accès sécurisé via clé API `x-api-key` |
| `/matrix` | GET     | Informations système simulées          |

### Exemple d’appel :

```bash
curl https://localhost:3000/api
curl -H "x-api-key: cyber-secret" https://localhost:3000/secure
```

---

## Sécurité et bonnes pratiques

* **HTTPS** obligatoire pour tout déploiement public.
* Ne jamais commiter `certs/` ni `.env`.
* Vérifier les vulnérabilités :

  ```bash
  npx npm audit
  docker scan cyber-api
  ```

---

## Contribuer

1. Fork le repo
2. Crée une branche : `git checkout -b feature/ma-feature`
3. Commit tes changements : `git commit -m "Ajoute ma feature"`
4. Push : `git push origin feature/ma-feature`
5. Ouvre un **Pull Request** sur GitHub
