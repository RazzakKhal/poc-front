
// Ajoute `global` uniquement si l'application s'exécute dans le navigateur
if (typeof window !== 'undefined') {
    (window as any).global = window;
  }
  