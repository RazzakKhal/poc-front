import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Message as ChatMessage } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient: Client;
  private messageSubject = new Subject<ChatMessage>();
  private uri = 'http://localhost:3001';

  constructor(private http: HttpClient) {
    // Configurer le client STOMP avec SockJS
    this.stompClient = new Client({
      brokerURL: undefined, // undefined car on utilise SockJS
      webSocketFactory: () => new SockJS(`${this.uri}/chat-websocket`), // URL du WebSocket
      reconnectDelay: 5000, // Délai de reconnexion automatique
      heartbeatIncoming: 0, // Aucun heartbeat entrant
      heartbeatOutgoing: 20000, // Heartbeat sortant toutes les 20 secondes
      debug: (str) => console.log(str) // Afficher les logs de connexion
    });

    // Gestion de la connexion et de l'abonnement aux messages
    this.stompClient.onConnect = () => {
      this.stompClient.subscribe('/topic/public', (message: Message) => {
        const parsedMessage = JSON.parse(message.body) as ChatMessage;
        this.messageSubject.next(parsedMessage); // Diffuser le message
      });
    };

    // Activer la connexion
    this.stompClient.activate();
  }

  // Récupérer tous les messages triés par date
  getMessages(): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.uri}/api/messages`).pipe(
      map(messages => messages.sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()))
    );
  }

  // Envoyer un message via WebSocket
  sendMessage(message: ChatMessage): void {
    if (this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify(message)
      });
    }
  }

  // Observer les messages en temps réel
  onMessageReceived(): Observable<ChatMessage> {
    return this.messageSubject.asObservable();
  }
}
