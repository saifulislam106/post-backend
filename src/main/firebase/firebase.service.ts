import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FirebaseService {
  private db: FirebaseFirestore.Firestore;

  constructor() {
    if (!admin.apps.length) {
      const serviceAccountPath = path.resolve(
        process.cwd(),
        'firebase-admin.json',
      );
      const serviceAccount = JSON.parse(
        fs.readFileSync(serviceAccountPath, 'utf8'),
      );

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
    this.db = admin.firestore();
  }

  getFirestore() {
    return this.db;
  }
}
