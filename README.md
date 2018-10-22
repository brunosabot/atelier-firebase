# TP1 : Installation

## Créer son projet dans la console Firebase et l'explorer

Pas de consignes, vous allez facilement découvrir par vous-même comment elle fonctionne.

## Installer les dependences NodeJS

`npm install` ou `yarn install`

## Installer firebase puis initialiser l'application

L'application va utiliser plusieurs services firebase :
 - L'authentification,
 - Le stockage de fichiers,
 - Realtime database,
 - L'hébergement de fichiers statiques.

`npm install -g firebase-tools` ou `yarn global add firebase-tools` puis `firebase init`

Prenez le temps de regarder les fichiers générés :
 - .firebaserc
 - database.rules.js
 - firebase.json
 - storage.rules

## Configurer l'application React

Le code pour initialiser l'app se place dans `src/App/App.jsx`.
Vous trouverez le code à y insérer dans les paramètres de votre application Firebase depuis le site Firebase.

# TP2 : Récupération des données de Realtime Database

## Import de données

Dans un premier temps, nous allons importer des données dans Realtime Database afin de visualiser que nous récupérons bien les données depuis le serveur.

```
{
  "memes" : {
    "ad3984b2-51e1-4091-80c7-a6d87bb833b1" : {
      "description" : "Tu comprends, après il faut s'intégrer tout ça dans les environnements et c'est un très, très gros travail et je ne cherche pas ici à mettre un point ! Donc on n'est jamais seul spirituellement !",
      "isFavorite" : true,
      "title" : "Mike drop",
      "url" : "https://i.giphy.com/media/l0K4n2kd6Erue9XLq/giphy.webp"
    }
  }
}
```

## Pour aller plus loin

Pour creuser les fonctionnalités de Realtime Database, essayez de récupérer des données filtrées.

Par exemple, je ne voudrais afficher que les memes favoris.

## Utilisation de Realtime Database

Pour utiliser Realtime database, nous avons besoin d'instancier le module :

`firebase.database()`

A partir de là, il faut utiliser la méthode `ref` qui permet de cibler un chemin de la base de données
Dans notre cas de figures, nous voulons tous les enfants de l'arbre *memes*, donc notre ref sera `/memes`.

Cette référence sert à de nombreuses choses, mais dans notre cas, nous allons devoir écouter ses changements avec `.on('value', callback)`.

Cette évènement attend une fonction de callback et lui passera un snapshot, dont nous pouvons récupérer la valeur avec `.val()`.

# TP3 : S'autentifier

## Executer l'autentification

Pour s'authentifier, il faut utiliser le service `auth` de Firebase.

Dans cet exercice, nous allons simplement utiliser le mode email/mot de passe.

Pour celà, commencez par créer votre compte depuis la console Firebase.

Ensuite, vous pouvez utiliser la méthode `signInWithEmailAndPassword` du service `auth` pour effectuer la connexion.

## Récupérer l'état de connexion de l'utilisateur

La méthode `onAuthStateChanged` du service `auth` prend une fonction de callback en paramètre et lui transmet null si l'utilisateur n'est pas identifié, et un objet contenant les détails de l'utilisateur si celui-ci est bien connecté.

Utilisez cette méthode pour cacher le bouton de login lorsque l'utilisateur est connecté et afficher l'interface d'ajouts de memes.

## Pour aller plus loin

Si vous avez du temps, essayez donc d'utiliser les API tiers de connexion tels que Google, Twitter ou Github.

# TP4 : Ajouter un meme

## Stocker le fichier

La gestion des fichiers fonctionne de la même manière que la base de données, à l'exception que le service utilisé est `storage`

Pour uploader le fichier, nous avons besoin d'utiliser la méthode `put` qui permet d'enregistrer le fichier sur le serveur.

Une fois le fichier stocké, vous pourrez le voir depuis la console dans le menu Stockage de la console Firebase.

## Stocker les données en base

Maintenant que vous savez stocker le fichier, nous allons enregistrer ses informations dans la base de données.

Première étape pour le faire, vous devez récupérer l'URL publique de l'image que vous sauvegardez.

La méthode `getDownloadURL` sur la référence de stockage vous permet de récupérer l'URL publique de votre image nouvellement stockée.

Une fois l'URL récupérée, vous allez ajouter au sein de chemin `memes` une nouvelle référence vide à l'aide de la méthode `push`, qui vous donnera une nouvelle référence enfant que vous n'aurez plus qu'à remplir avec un objet et la méthode `set`.

## Pour aller plus loin

Si vous avez du temps, vous pouvez utiliser la tâche d'upload créer par le `put` du fichier sur le serveur pour afficher un compteur de progression. Pour ça, vous devez écouter l'évènement `state_changed` de la tâche d'upload.

# TP5 : Mise en favori

## Implémentation du favori

Pour mettre en favori, vous avez juste à appliquez ce que vous savez déjà.

Attention tout de même : `set` écrase les données, vous devrez utiliser la méthode `put`.

## Pour aller plus loin

Vous pouvez faire en sorte que le favori soit lié à un utilisateur et afficher un compteur. Pour cela, vous devrez créer un nouveau chemin dans votre base de données (par exemple `/favorites`) et y enregistrer, pour chaque même, la liste des utilisateurs l'aillant aimé.

# TP6 : Les push-notifications

## Préparation

Dans les paramètres du projet de la console Firebase, nous allons générer un certificat web push.

Attention, pour cette partie, vous allez devoir déployer l'application afin de tester les notifications qui nécessitent un certificat HTTPS.

Pour déployer l'application, vous avez juste à entrer la commande `firebase deploy`.

## Implémentation

Dans l'application, nous allons utiliser le service `messaging` pour gérer les push notifications

Pour commencer, on va configurer le service avec le certificat généré précédement. Pour cela, nous allons utiliser la méthode `usePublicVapidKey`

Ensuite, il faudra implémenter les méthodes suivantes :
 - `requestPermission` : Pour lancer la modale d'autorisation des notifications
 - `getToken` : pour récupérer le token de l'utilisateur
 - `onTokenRefresh` : pour suivre un éventuel changement de token demandé par le serveur
 - `onMessage` : pour gérer les messages lorsque la fenêtre est active

Dans notre cas de figure, pour les tests, nous n'aurons pas la situation de `onmessage`.
Vous pouvez tester le service avec postman en envoyant les informations suivantes :

 - **méthode** : POST
 - **URL** : https://fcm.googleapis.com/fcm/send
 - Header **Content-Type** : application/json
 - Header **Authorization** : key=[Clef de serveur des paramètres de l'app]
 - **Contenu** :
```
{
  "notification": {
    "title": "FCM Message",
    "body": "This is an FCM Message",
  },
  "to": "[Votre token utilisateur]"
}
```
