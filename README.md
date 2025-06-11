# 📚 Projet 5 - Mon Vieux Grimoire : Développement du back-end d’un site de notation de livres

🎓 Réalisé dans le cadre de la formation **Développeur Web Fullstack MERN**  
📅 Projet : **Développez le back-end d’un site de notation de livres**


---

## 🎯 Objectifs pédagogiques

- ✅ Implémenter un modèle logique de données conformément à la réglementation  
- ✅ Mettre en œuvre des opérations CRUD de manière sécurisée  
- ✅ Stocker des données de manière sécurisée  

---

## 🖼️ Contexte du projet

Premier projet de back-end pur : vous êtes **développeur back-end freelance** dans la région de **Lille**, habitué à collaborer avec **Kévin**, développeur front-end expérimenté.

Kévin vous propose une mission : créer l’**API back-end** d’un site de notation de livres pour une petite chaîne de librairies, qui souhaite ouvrir un site nommé **"Mon Vieux Grimoire"**. Ce site permettra aux membres d’ajouter des livres et d’y attribuer une note visible publiquement.

Vous recevez tous les éléments nécessaires pour réaliser l’API :  
- Spécifications fonctionnelles  
- Maquettes  
- Cahier des charges technique  
- Code front-end prêt à consommer l’API  

Enfin, une exigence spécifique liée à l'éco-conception vous est imposée : **optimiser les images uploadées** pour respecter les principes du **Green Code**.

---

## 🛠️ Stack technique

<p align="left">
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Multer-3f3f3f?style=for-the-badge&logo=multer&logoColor=white" />
</p>

---

## ⚙️ Fonctionnalités développées

### 🔐 Authentification sécurisée
- Inscription avec hachage du mot de passe (**bcrypt**)
- Connexion avec génération de **JWT**
- Middleware d’authentification

### 📚 Gestion des livres
- 📥 Création d’un livre avec image (upload via **Multer**)
- 📖 Lecture d’un ou plusieurs livres (GET)
- ✏️ Modification d’un livre existant (PUT)
- 🗑️ Suppression sécurisée (DELETE avec vérification d’auteur)

### ⭐ Notation
- Attribution d’une note unique par utilisateur
- Calcul de la note moyenne automatiquement

### ♻️ Optimisation Green Code
- Compression automatique des images à l’upload

---

## 🧪 Tests & Sécurité

- Validation et nettoyage des entrées utilisateurs
- Contrôle d’accès sur les routes protégées
- Suppression sécurisée des fichiers images inutiles
