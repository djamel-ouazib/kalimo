# DECISIONS.md : Les Jardins de Vauban (mini-site KALIMO Promotion)

## 1. Choix techniques

-   **Next.js 16 avec TypeScript et Tailwind** : un seul projet pour l'affichage et le code serveur, déployé sur Vercel.
-   **Pourquoi Next.js** : le brief demande un site public qui doit être référencé et rapide, avec un formulaire qui écrit dans une base. Next.js génère le HTML côté serveur, donc la liste des lots est lisible dès le premier chargement, ce qui est important pour le référencement. Les Server Actions permettent d'écrire le formulaire sans créer une API séparée, et le token Airtable reste dans le serveur. Vercel déploie le projet directement depuis GitHub. Une application React qui tourne seulement dans le navigateur aurait affiché une page vide aux moteurs de recherche et demandé une API séparée. Next.js n'était pas obligatoire : d'autres outils auraient pu convenir.
-   **Référencement (SEO)** : chaque page a un titre et une description (`metadata`), pour que le nom du programme et la ville apparaissent dans les résultats de recherche.
-   **Airtable comme source de données**, comme imposé par le brief. Accès depuis le serveur avec le package officiel `airtable`.
-   **Pas de Prisma** : Prisma est un ORM pour bases SQL, il ne fonctionne pas avec Airtable.
-   **Token Airtable côté serveur uniquement** : stocké dans les variables d'environnement (`.env.local` en local, Vercel en production). Il n'apparaît ni dans le code versionné ni dans le navigateur.
-   **Token limité** : un seul accès, la base « Jardins de Vauban », avec les droits lecture et écriture uniquement.
-   **Séparation du code** : `lib/airtable.ts` (connexion), `lib/lots.ts` (lecture et typage des lots), `components/` (affichage), `app/` (pages et Server Actions).
-   **Composants serveur par défaut** : la page et la liste des lots sont des composants serveur. Seul `FormulaireDemande` est un composant client, car il gère l'état de l'envoi avec `useActionState`. Le token reste dans le serveur dans tous les cas.
-   **Next.js 16 et `cacheComponents`** : `export const dynamic` n'est plus accepté. Les accès aux données sont entourés de `<Suspense>`, et `connection()` demande un rendu à chaque visite, pour qu'un changement de statut dans Airtable apparaisse au rechargement.

## 2. Structure de la base Airtable

-   **Table « Lots »** : une ligne par lot. Le type et le statut sont des menus déroulants, pour qu'une faute de frappe ne casse pas l'affichage. Le champ « Ordre d'affichage » permet de trier la liste.
-   **Table « Demandes »** : une ligne par demande. La date de réception est un champ calculé, rempli par Airtable : le code ne l'envoie jamais.
-   La base a été créée avec l'assistant Airtable à partir du prompt présenté en annexe. J'ai vérifié que les deux tables et les menus déroulants ont été créés comme prévu, et que le token a les droits lecture et écriture sur cette base.
-   Une ligne de test a été créée pendant la mise en place. Je l'ai conservée pour avoir une preuve que le formulaire fonctionne, et pour tester le parcours complet. Je ne considère jamais une réponse de l'IA comme acquise sans vérification.

## 3. Formulaire et données personnelles

-   **Consentement obligatoire** : case à cocher, sans elle la demande n'est pas envoyée.
-   **Données minimales** : nom, email, téléphone facultatif, lot concerné, message.
-   **Limite de 1000 caractères** sur le message.
-   **Champ piège anti-spam** : caché aux visiteurs, une demande qui le remplit est ignorée sans message d'erreur.
-   **Validation côté serveur** : les champs sont vérifiés dans la Server Action, pas seulement dans le navigateur.
-   **Mention d'information** : le site affiche la case de consentement et la phrase « Vos données servent uniquement à répondre à votre demande ». Je n'ai pas rédigé de politique de confidentialité complète ni de procédure de suppression des données : c'est à traiter avant une mise en production réelle, avec le client et son avocat.

## 4. Hypothèses sur le brief

-   Le filtre par type n'accepte que T2, T3 et T4. Une valeur inconnue dans l'URL est ignorée et affiche tous les lots.
-   Le site accepte une demande pour un lot marqué « Vendu ». Le brief ne le précise pas, je l'ai laissé tel quel.
-   Un lot « Optionné » est affiché avec son statut, sans restriction.

## 5. Bonus

-   **Page de présentation** (`/programme`) : faite. Le visuel principal est une carte postale aquarelle générée par IA, à titre illustratif et non contractuel. Il est à remplacer par les vraies images du promoteur. La mention est affichée sur la page.
-   **Compteur de demandes** : non codé. Le nombre de demandes se lit directement dans Airtable. Je n'ai pas mis de compteur sur le site, car il serait public.

## 6. Ce qui est laissé de côté

-   Pas de politique de confidentialité complète ni de procédure de suppression des données. Ce point engage le client, il doit être validé avant une mise en production.
-   **Captcha non mis en place.** J'ai d'abord voulu ajouter un captcha, puis j'ai demandé à mon assistant de code une solution simple. Il m'a proposé un champ piège caché, qui ne gêne pas le visiteur. J'ai gardé cette solution pour ce premier déploiement, en sachant qu'elle est moins robuste qu'un captcha : si le formulaire reçoit du spam en production, un captcha sera la prochaine étape.
-   Pas de notification email à l'équipe commerciale : elle consulte la table Demandes dans Airtable.
-   Pas de vérification du statut d'un lot avant l'envoi d'une demande.
-   Le design a été privilégié sur les fonctionnalités annexes : je me suis concentré sur l'essentiel du brief, puis sur une présentation soignée, plutôt que sur des protections supplémentaires.
-   Le recruteur a accès à toute la base, pas seulement à la table Lots.

## 7. Accès pour le recruteur

-   Accès à la base Airtable par invitation par email, avec droits de lecture et d'écriture. Le token n'est pas partagé.
-   Raison : pour vérifier le fonctionnement, le recruteur doit modifier le statut d'un lot dans Airtable, puis recharger le site pour voir le changement. Un accès en lecture seule ne permettrait pas ce test.

## 8. Usage de l'IA

-   **Outils utilisés** : un assistant de code pour l'aide à l'écriture et au débogage de Next.js ; l'assistant intégré à Airtable pour la structure de la base et les lots fictifs ; un générateur d'images pour le visuel de la page programme.
-   **Ce que j'ai relu et compris** : j'ai relu l'ensemble du code, y compris les erreurs de Next.js 16 (cache et `Suspense`), que j'ai corrigées après les avoir comprises.
-   **Ce que j'ai écrit moi-même** : la partie Airtable et `lib/lots.ts`, car c'était la première fois que j'utilisais Airtable. J'ai aussi organisé le code en `lib/` pour les données et en `components/` pour l'affichage.
-   **Ce que j'ai refusé ou corrigé** : je n'ai pas accepté de mettre `"use client"` dans la page ni dans les composants qui ne l'exigent pas. Le token Airtable n'a jamais été partagé avec l'assistant. Je n'ai pas gardé de suggestion qui exposait une donnée côté navigateur.

## 9. Temps passé

-   Total réel : 2 h 30 (de 14 h 30 à 17 h 00), tests compris.

## Annexe : prompt donné à l'assistant Airtable

Prompt utilisé pour créer la structure de la base et les lots fictifs. Les corrections et vérifications faites ensuite sont décrites dans la section 2.

```
Renomme la base en « Jardins de Vauban ».

Crée dans cette base deux tables, en français, avec les champs suivants.

TABLE 1 : « Lots » (renomme la table existante si elle existe)
- Référence : texte à une ligne (champ principal)
- Type : choix unique, options : T2, T3, T4
- Surface (m²) : nombre, 1 décimale
- Étage : nombre, 0 décimale
- Prix (€) : nombre, 0 décimale, format euro
- Statut : choix unique, options : Disponible, Optionné, Vendu
- Ordre d'affichage : nombre, 0 décimale

Ajoute ensuite 10 lots fictifs pour le programme « Les Jardins de Vauban » (Bordeaux, 48 logements). Varie les types (T2, T3, T4) et les statuts. Les références suivent le modèle VAU-A-101, VAU-A-102, etc. Surfaces réalistes : T2 entre 40 et 50 m², T3 entre 60 et 70 m², T4 entre 85 et 95 m². Prix cohérents avec la surface, entre 3 000 et 4 000 € le m².

TABLE 2 : « Demandes »
- Nom : texte à une ligne (champ principal)
- Email : email
- Téléphone : téléphone (facultatif)
- Lot concerné : texte à une ligne
- Message : texte long
- Consentement : case à cocher
- Date de réception : date et heure, remplie automatiquement à la création
- Statut de traitement : choix unique, options : Nouvelle, En cours, Traitée

Ne crée aucune ligne dans la table Demandes.
Confirme-moi la structure finale une fois terminé.
```
