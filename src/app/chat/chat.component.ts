import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Message } from '../models/message.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  standalone: true,  // Déclaration du composant autonome
  imports: [CommonModule, FormsModule],  // Importation de CommonModule et FormsModule
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  newMessageContent: string = '';
  user! : string;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    // this.user = this.determineUser();

    // Récupérer et afficher les messages existants
    this.chatService.getMessages().subscribe((msgs) => {
      this.messages = msgs;
    });

    // Abonnement aux nouveaux messages en temps réel
    this.chatService.onMessageReceived().subscribe((msg) => {
      this.messages.push(msg); // Ajouter à la suite des messages
    });
  }

  // Méthode pour envoyer un message
  sendMessage(): void {
    if (this.newMessageContent.trim()) {
      const newMessage: Message = {
        content: this.newMessageContent,
        sentAt: new Date().toISOString(),
        sender: localStorage.getItem('token') ? { id: 1, name:"razzak" } : {id : 2, name: "support"}// Remplacez par les informations de l'utilisateur actuel
      };
      console.log(JSON.stringify(newMessage))
      this.chatService.sendMessage(newMessage);
      this.newMessageContent = ''; // Réinitialiser le champ d'entrée
    }

  }

  // determineUser(){
  //   return localStorage.getItem('user') ? 'utilisateur' : 'support';
  // }
}
