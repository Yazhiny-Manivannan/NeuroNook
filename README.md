# NeuroNook

An offline interactive neuroscience learning and brain exploration app.
Built with React Native (Expo), JavaScript and Expo Router (file-based navigation).
Persistent data will use SQLite (`expo-sqlite`) only, added in a later milestone.

## Run

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go, or press `a` for an Android emulator.

## Folder structure

| Folder | Purpose |
| --- | --- |
| `app/` | Routes: every file is a screen. `_layout.jsx` files define the Stack and the bottom Tabs |
| `app/(tabs)/` | The five bottom-tab screens |
| `components/` | Reusable UI pieces |
| `constants/` | Theme colours |
| `database/` | SQLite code (Milestone 02+) |
| `data/` | Local JSON datasets (later) |
| `assets/` | Images and icons |
| `utils/` | Helper functions (later) |

## Status

Milestone 01: project setup, navigation and placeholder screens.
