# SnakePuzzle

## Définition du puzzle

Ce programme permet à la fois de :  

- résoudre sois-même le problème du serpent vietnamien  
- générer des solutions et les afficher dans le navigateur  
  
## Code Source Target  

Le code frontend est sans src/main/frontend.  
Le code backend est dans src/main/java

### Construction du projet via maven avec .mvnw package

La commande permet de builder l'application en deux temps :  

- le build frontend : qui executera 3 steps qui sont l'installation des dépendances npm, le lancement des tests, le build
- le build backend : qui execute aussi ces tâches

Au final le livrable au format jar (snakePuzzle-0.0.1-SNAPSHOT.jar) est inclus dans le répertoire /target du projet

### Lancer l'application

Exécuter le jar via la commande : `java - jar /path_vers_mon_jar/snakePuzzle-0.0.1-SNAPSHOT.jar`
