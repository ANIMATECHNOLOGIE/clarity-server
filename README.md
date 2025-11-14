## Backend Clarity

### Configuration

Copiez ce fichier en `.env` pour définir les variables de connexion MySQL :

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=clarity_user
DB_PASSWORD=clarity_password
DB_NAME=clarity_db
SERVER_PORT=4000
```

### Scripts

```bash
npm install       # installer les dépendances backend
npm run dev       # lancer le serveur en mode développement (nodemon)
npm start         # lancer le serveur en production
```


