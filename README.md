# 🔮 PredictCast

Event prediction platform with Web3 integration, Farcaster Frame, and WalletConnect.

## 📦 Project Structure

```
predictcast/
├── backend/           # Node.js API (Hono + SQLite)
│   ├── src/
│   │   ├── config/    # Configuration
│   │   ├── database/  # Database and migrations
│   │   ├── routes/    # API routes
│   │   ├── services/  # Business logic
│   │   └── middleware/# Middleware
│   └── package.json
│
└── frontend/          # React 19 + TypeScript + Vite
    ├── src/
    │   ├── components/ # UI components
    │   ├── pages/      # Pages
    │   ├── features/   # Feature modules
    │   ├── hooks/      # React hooks
    │   ├── services/   # API services
    │   ├── utils/      # Utilities
    │   ├── config/     # Configuration
    │   └── styles/     # Styles
    └── package.json
```

## 🚀 Quick Start

### Backend

```bash
cd backend
npm install
npm run db:migrate    # Create database
npm run db:seed       # Add test data (optional)
npm run dev           # http://localhost:3001
```

### Frontend

```bash
cd frontend
npm install
npm run dev           # http://localhost:5173
```

## 🔧 Technologies

### Backend
- **Hono** - Fast web framework
- **SQLite** + better-sqlite3 - Database
- **Modular architecture** - Routes, Services, Middleware

### Frontend
- **React 19** + TypeScript
- **Vite 6** - Fast build tool
- **Wagmi 3** - Ethereum integration
- **WalletConnect AppKit** - Wallet connection
- **@tanstack/react-query** - Data management
- **Farcaster Frame SDK** - Frame integration
- **Lens Protocol, ZeroDev, Solana** and other Web3 libraries

## 📋 Features

- ✅ Browse active events for prediction
- ✅ Create new events (admins with API key)
- ✅ Make predictions
- ✅ Statistics for events and users
- ✅ Web3 wallet connection
- ✅ Farcaster Frame integration
- ✅ Real-time data updates

## 🎨 Architecture

### Backend
- **Service Layer Pattern** - Business logic separated from routes
- **Repository Pattern** - Database access through services
- **Middleware** - Authentication and validation

### Frontend
- **Feature-based structure** - Logical grouping by functionality
- **Custom Hooks** - Reusable logic
- **Path aliases** - Convenient imports (`@components`, `@hooks`)
- **React Query** - Caching and data synchronization

## 🔐 Security

- API keys for event creation
- Data validation on client and server
- CORS configuration
- Prepared statements to protect against SQL injection

## 📊 API Endpoints

```
GET    /api/health                    # Health check
GET    /api/events                    # List events
GET    /api/events/:id                # Get specific event
POST   /api/events                    # Create event (auth)
POST   /api/events/:id/resolve        # Close event (auth)
POST   /api/predictions               # Make prediction
GET    /api/predictions/user/:address # User predictions
GET    /api/stats/event/:eventId      # Event statistics
GET    /api/stats/user/:address       # User statistics
```

## 🤖 Dependabot

Automatic dependency updates configured for both folders:
- `/frontend`
- `/backend`

## 📄 License

MIT

## 👨‍💻 Development

Project uses:
- ESM modules
- TypeScript strict mode
- React 19 with new features
- Modern Web3 standards
