import { Injectable } from '@nestjs/common';
import FirebaseService from 'lib/common/src/services/firebase.service';

@Injectable()
export class FirebaseAuthProvider {
  constructor(private readonly firebaseService: FirebaseService) {}

  authenticate(firebaseIDToken: string) {
    return this.firebaseService.verifyIdToken(firebaseIDToken);
  }
}
