export interface Message {
    id?: number; // L'identifiant du message, optionnel s'il est généré par le backend
    content: string; // Le contenu du message
    sentAt: string; // La date et l'heure d'envoi du message, au format ISO
    sender: {
      id: number; // Identifiant de l'utilisateur (expéditeur)
      name: string; // Nom de l'utilisateur (expéditeur)
    };
  }
  