
# Your Car, Your Way

**Your Car, Your Way** est une application facilitant la location de voitures, ce projet est un poc du chat que pourrait implémenter l'application.

## Prérequis

- Node.js (version recommandée: 18+)
- npm (généralement inclus avec Node.js)
- Angular CLI (`npm install -g @angular/cli`)

## Installation

1. Clonez le dépôt :
   ```bash
   git clone <repository-url>
   cd your-car-your-way
   ```

2. Installez les dépendances du projet :
   ```bash
   npm install
   ```

## Démarrage du Serveur de Développement

Lancez l'application en mode développement :

```bash
ng serve
```

Ouvrez votre navigateur à [http://localhost:4200](http://localhost:4200) pour accéder à l'application.

## Fonctionnalités

L'application offre une fonctionnalité de chat permettant :
- Envoi et réception de messages en temps réel entre un utilisateur connecté et un agent de support.

## Configuration du Chat pour les Tests

Pour tester le chat, vous pouvez simuler deux rôles : l'utilisateur connecté et l'agent de support.

### 1. Simulation d'un Utilisateur Connecté

Pour simuler un utilisateur connecté, ouvrez un navigateur et ajoutez un jeton factice dans le `localStorage` :

1. Ouvrez la console de votre navigateur (F12 ou `Ctrl+Shift+J`).
2. Dans l'onglet "Console", entrez la commande suivante pour ajouter un jeton :
   ```javascript
   localStorage.setItem('token', 'xxxx');
   ```
   Remplacez `'xxxx'` par une valeur fictive.

### 2. Simulation d'un Agent de Support

Pour simuler un agent de support, ouvrez un autre navigateur ou une fenêtre en mode incognito sans ajouter de jeton dans le `localStorage`. Cela permettra d'accéder à l'application en tant qu'agent sans être connecté.

## Principales Bibliothèques Utilisées

Voici un aperçu des principales bibliothèques utilisées dans ce projet :

- **@angular** : pour le développement de l'application Angular (animations, routeur, serveur SSR).
- **@stomp/ng2-stompjs** et **@stomp/stompjs** : pour la gestion du protocole STOMP permettant la communication en temps réel via WebSockets.
- **sockjs-client** : pour la connexion WebSocket côté client.
  
## Scripts Utiles

- `ng serve` : lance le serveur de développement.
- `ng build` : compile l'application pour la production.
- `ng test` : exécute les tests unitaires.

