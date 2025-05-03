
# Karnataka Universal Transport Card Guardian

A modern, responsive web application for managing Karnataka's Universal Transport Card. This application allows users to view their card status, lock or unlock their card with biometric authentication, view transaction history, and check live transport status.

## Features

- **Universal Transport Card Management**:
  - View card details and status (Active/Locked)
  - Lock and unlock card with biometric authentication
  - View transaction history

- **Live Status**:
  - Check real-time status of KSRTC, BMTC, Metro and Taxi services
  - View service disruptions and delays

- **Emergency Assistance**:
  - Quick access to emergency contact numbers
  - One-tap emergency assistance

- **Modern UI**:
  - Glassmorphism design elements
  - Particle background animations
  - Responsive design for all devices
  - Language toggle (English/Kannada)

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- Shadcn UI components

## Setup and Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## API Integration

The application is designed to work with the following API endpoints:

- `/api/card/lock` - Locks the transport card
- `/api/card/unlock` - Unlocks the transport card

These endpoints are currently simulated but can be connected to actual backends.

## License

Copyright © 2025 Karnataka State Road Transport Corporation
