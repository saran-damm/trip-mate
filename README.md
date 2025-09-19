# Trip Planner App

A modern trip planning application built with React, TypeScript, and Firebase.

## Features

- User authentication (sign up, login, password reset)
- Browse trending destinations
- Plan and manage trips
- Responsive design with Tailwind CSS

## Tech Stack

- React 19 with TypeScript
- Vite for fast development and building
- Firebase (Authentication, Firestore, Storage)
- Tailwind CSS for styling

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account

### Firebase Setup

1. Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)

2. Enable the following Firebase services:
   - Authentication (with Email/Password provider)
   - Firestore Database
   - Storage

3. Get your Firebase configuration:
   - Go to Project Settings > General
   - Scroll down to "Your apps" section
   - Select the web app or create a new one
   - Copy the Firebase configuration object

4. Create a `.env.local` file in the root directory with your Firebase configuration:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/trip-planner.git
cd trip-planner
```

2. Install dependencies

```bash
npm install
# or
yarn
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

4. Seed initial data (first time setup)

```bash
# This will be handled automatically on first run
# You can manually trigger it by importing and calling seedInitialData() from src/firebase/seed.ts
```

### Building for Production

```bash
npm run build
# or
yarn build
```

### Firebase Rules Deployment

If you encounter permissions errors, you need to deploy the Firebase security rules:

```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Storage rules
firebase deploy --only storage

# Or use the provided script
./deploy-rules.sh
```

### Local Development with Firebase Emulators

You can use Firebase emulators for local development:

```bash
# Start Firebase emulators
./start-emulators.sh
```

### Deployment

The app can be deployed to Firebase Hosting:

1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

2. Login to Firebase

```bash
firebase login
```

3. Initialize Firebase Hosting

```bash
firebase init hosting
```

4. Deploy to Firebase

```bash
firebase deploy
```
