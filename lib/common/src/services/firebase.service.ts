import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as firebase from 'firebase-admin';
import { MulticastMessage } from 'firebase-admin/lib/messaging/messaging-api';

@Injectable()
export default class FirebaseService {
  private admin: firebase.app.App;

  constructor(private readonly configService: ConfigService) {
    this.admin = firebase.initializeApp({
      credential: firebase.credential.cert({
        projectId: configService.getOrThrow('FIREBASE_PROJECT_ID'),
        privateKey: configService.getOrThrow('FIREBASE_PRIVATE_KEY'),
        clientEmail: configService.getOrThrow('FIREBASE_CLIENT_EMAIL'),
      }),
    });
  }

  verifyIdToken(token: string) {
    return this.admin.auth().verifyIdToken(token);
  }

  sendMessage(message: MulticastMessage) {
    return this.admin.messaging().sendMulticast(message);
  }
}
