/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase config values from the auto-generated config file
const firebaseConfig = {
  apiKey: "AIzaSyAq_4XzqOt48VClbBwqJ9Cf_jRC93gT0-M",
  authDomain: "gen-lang-client-0263768404.firebaseapp.com",
  projectId: "gen-lang-client-0263768404",
  storageBucket: "gen-lang-client-0263768404.firebasestorage.app",
  messagingSenderId: "280452929606",
  appId: "1:280452929606:web:9eadd6fdcf0178e6a79247"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app, "ai-studio-khnggianvnhahchm-3a4e3a31-6361-49f7-9ab9-9d1abdd282d5");
export const auth = getAuth(app);
