# 📱 React Native App with Expo, EAS, and Supabase Integration

This is a cross-platform mobile application built with **React Native** using **Expo** and **EAS Build**, integrated with **Supabase** for authentication and backend services.

---

## ✨ Features

- 🔐 Supabase Auth: Sign Up, Login, Password Reset
- 📊 Dashboard UI with mock data (can be replaced with Supabase queries)
- 👥 Team screen with member list and search
- 📩 Invite screen placeholder
- 🔁 Deep linking compatible
- ⚙️ EAS Build support for native production builds
- 🎨 Minimal, clean design using native components and icons

---

## 📦 Prerequisites

Before getting started, install the following tools:

- **Node.js** (v18 or later)
- **npm** or **yarn**
- **Expo CLI**  
  ```bash
  npm install -g expo-cli
  ```

- **EAS CLI**  
  ```bash
  npm install -g eas-cli
  ```

- **Git**

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-app.git
cd your-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

---

## ▶️ Running in Development

```bash
npx expo start
```

- Open the QR code in **Expo Go** on your mobile device.
- Or run it on an Android/iOS simulator.

---

## 🛠 EAS Build Setup (for .apk/.ipa builds)

### 1. Configure EAS

```bash
eas build:configure
```

This creates an `eas.json` file.

### 2. Authenticate with Expo

```bash
npx expo login
```

### 3. Build the App

```bash
eas build --platform android
# or
eas build --platform ios
```

---

## 📁 Project Structure

```
.
├── App.js
├── lib/
│   └── supabase.js
├── components/
│   └── Loader.js
├── screens/
│   ├── Home.js
│   ├── Login.js
│   ├── Signup.js
│   ├── ResetPassword.js
│   ├── Invite.js
│   └── Team.js
├── navigation/
│   └── HeaderAndTabs.js
├── assets/
└── ...
```

---

## 🧠 Common Commands

- Start development server:  
  ```bash
  npx expo start
  ```

- Clear cache and start fresh:  
  ```bash
  npx expo start --clear
  ```

- Build APK for Android:  
  ```bash
  eas build --platform android
  ```

- Install a library:  
  ```bash
  npm install <package-name>
  ```