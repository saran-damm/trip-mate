import { useState } from 'react';
import { db, storage } from '../firebase/config';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  QueryConstraint
} from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface FirebaseState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

interface FirebaseResponse<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  getCollection: (collectionName: string, constraints?: QueryConstraint[]) => Promise<T[]>;
  getDocument: (collectionName: string, documentId: string) => Promise<T | null>;
  addDocument: (collectionName: string, data: any) => Promise<string>;
  updateDocument: (collectionName: string, documentId: string, data: any) => Promise<void>;
  deleteDocument: (collectionName: string, documentId: string) => Promise<void>;
  uploadFile: (path: string, file: File) => Promise<string>;
}

export function useFirebase<T = DocumentData>(): FirebaseResponse<T> {
  const [state, setState] = useState<FirebaseState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  // Get all documents from a collection with optional query constraints
  const getCollection = async (collectionName: string, constraints: QueryConstraint[] = []): Promise<T[]> => {
    setState({ ...state, loading: true, error: null });
    
    try {
      const collectionRef = collection(db, collectionName);
      const q = constraints.length > 0 ? query(collectionRef, ...constraints) : query(collectionRef);
      
      const querySnapshot = await getDocs(q);
      const documents: T[] = [];
      
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() } as T);
      });
      
      setState({ data: documents as unknown as T, loading: false, error: null });
      return documents;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('An unknown error occurred');
      setState({ data: null, loading: false, error: errorObj });
      throw errorObj;
    }
  };

  // Get a single document by ID
  const getDocument = async (collectionName: string, documentId: string): Promise<T | null> => {
    setState({ ...state, loading: true, error: null });
    
    try {
      const docRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const document = { id: docSnap.id, ...docSnap.data() } as T;
        setState({ data: document, loading: false, error: null });
        return document;
      } else {
        setState({ data: null, loading: false, error: null });
        return null;
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('An unknown error occurred');
      setState({ data: null, loading: false, error: errorObj });
      throw errorObj;
    }
  };

  // Add a new document to a collection
  const addDocument = async (collectionName: string, data: any): Promise<string> => {
    setState({ ...state, loading: true, error: null });
    
    try {
      const collectionRef = collection(db, collectionName);
      const docRef = await addDoc(collectionRef, data);
      
      setState({ data: { id: docRef.id, ...data } as unknown as T, loading: false, error: null });
      return docRef.id;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('An unknown error occurred');
      setState({ data: null, loading: false, error: errorObj });
      throw errorObj;
    }
  };

  // Update an existing document
  const updateDocument = async (collectionName: string, documentId: string, data: any): Promise<void> => {
    setState({ ...state, loading: true, error: null });
    
    try {
      const docRef = doc(db, collectionName, documentId);
      await updateDoc(docRef, data);
      
      // Get the updated document
      const updatedDoc = await getDoc(docRef);
      setState({ 
        data: { id: updatedDoc.id, ...updatedDoc.data() } as unknown as T, 
        loading: false, 
        error: null 
      });
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('An unknown error occurred');
      setState({ data: null, loading: false, error: errorObj });
      throw errorObj;
    }
  };

  // Delete a document
  const deleteDocument = async (collectionName: string, documentId: string): Promise<void> => {
    setState({ ...state, loading: true, error: null });
    
    try {
      const docRef = doc(db, collectionName, documentId);
      await deleteDoc(docRef);
      
      setState({ data: null, loading: false, error: null });
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('An unknown error occurred');
      setState({ data: null, loading: false, error: errorObj });
      throw errorObj;
    }
  };

  // Upload a file to Firebase Storage
  const uploadFile = async (path: string, file: File): Promise<string> => {
    setState({ ...state, loading: true, error: null });
    
    try {
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      
      setState({ ...state, loading: false, error: null });
      return downloadURL;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('An unknown error occurred');
      setState({ data: null, loading: false, error: errorObj });
      throw errorObj;
    }
  };

  return {
    ...state,
    getCollection,
    getDocument,
    addDocument,
    updateDocument,
    deleteDocument,
    uploadFile,
  };
}
