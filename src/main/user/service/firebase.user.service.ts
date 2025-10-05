import { ConflictException, Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/main/firebase/firebase.service';

@Injectable()
export class FirebaseUserService {
  private userCollection;

  constructor(private readonly firebaseService: FirebaseService) {
    this.userCollection = this.firebaseService
      .getFirestore()
      .collection('users');
  }

  async createUser(user: any) {
    try {
      // Firestore query to check if email already exists
      const existingUser = await this.userCollection
        .where('email', '==', user.email)
        .get();

      if (!existingUser.empty) {
        throw new ConflictException('User with this email already exists');
      }

      // If no user exists → create new one
      const docRef = await this.userCollection.add(user);
      return { id: docRef.id, ...user };
    } catch (err) {
      console.error('Error creating user:', err.message);
      throw err; // Properly re-throw error for controller
    }
  }

  async getUserById(id: string) {
    const doc = await this.userCollection.doc(id).get();
    if (!doc.exists) {
      throw new Error('User not found');
    }
    return { id: doc.id, ...doc.data() };
  }

  async getAllUsers() {
    const snapshot = await this.userCollection.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async getUsersByGender(gender: string) {
    const snapshot = await this.userCollection
      .where('gender', '==', gender)
      .get();

    if (snapshot.empty) {
      return []; // No users found for this gender
    }

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
}
