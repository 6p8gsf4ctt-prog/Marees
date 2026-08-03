# Réinstallation complète — Marées

Ce dépôt est prêt pour un nouveau Worker Cloudflare nommé `marees`.

## Configuration attendue

- Dépôt GitHub : `marees`
- Worker Cloudflare : `marees`
- Branche : `main`
- Répertoire racine : `/`
- Commande de build : vide
- Commande de déploiement : `npx wrangler deploy`
- Secret Cloudflare : `API_MAREE_KEY`

## Structure attendue à la racine

```text
public/
src/
package.json
wrangler.jsonc
README.md
```

Ne placez pas les fichiers dans un sous-dossier supplémentaire.

## Vérifications

- `wrangler.jsonc` contient `"name": "marees"`.
- `package.json` contient `"name": "marees"`.
- aucune clé API n’est présente dans GitHub.
