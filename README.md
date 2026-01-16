# Travel App - Production-Ready React Native Demo

A production-ready Travel App built with React Native and TypeScript, following feature-based modular architecture. This project demonstrates senior-level React Native engineering practices and serves as a reference architecture for real production apps.

## 🏗️ Architecture

### Feature-Based Modular Structure

The app follows a feature-based architecture where each feature is self-contained:

```
src/
├── features/              # Feature modules
│   ├── home/             # Home feature
│   │   ├── screens/      # Feature screens
│   │   ├── hooks/        # React Query hooks
│   │   ├── services/     # API services
│   │   └── state/         # Redux slices (if needed)
│   ├── search/           # Search feature
│   ├── tripDetails/      # Trip Details feature
│   └── bookings/         # Bookings feature
│
├── shared/               # Shared modules
│   ├── api/             # API client & endpoints
│   ├── components/      # Reusable UI components
│   ├── theme/           # Design system (colors, typography, spacing)
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   └── store/           # Redux store & React Query setup
│
└── navigation/          # Navigation configuration
```

### Key Principles

- **Separation of Concerns**: Business logic in hooks/services, not UI components
- **Type Safety**: Strict TypeScript mode enabled
- **Performance**: Optimized with React.memo, useCallback, useMemo
- **Scalability**: Feature-based structure allows easy feature addition/removal

## 🚀 Features

### Implemented Features

1. **Home Screen**

   - Featured trips display
   - Popular destinations
   - Optimized FlatList with lazy loading

2. **Search**

   - Trip and destination search
   - Real-time filtering
   - Pagination support

3. **Trip Details**

   - Comprehensive trip information
   - Image gallery
   - Booking integration

4. **Bookings**
   - View user bookings
   - Create new bookings
   - Cancel bookings

## 🛠️ Tech Stack

### Core

- **React Native** 0.83.1
- **TypeScript** 5.8.3 (strict mode)
- **React** 19.2.0

### State Management & Data Fetching

- **Redux Toolkit** - Global state management
- **React Query (TanStack Query)** - Server state & caching
- **Axios** - HTTP client with interceptors

### Navigation

- **React Navigation** - Stack & Tab navigation

### Native Capabilities

- **react-native-permissions** - Permission handling
- **react-native-geolocation-service** - Location services

### Monitoring & Analytics

- **Sentry** - Error tracking & monitoring
- **Firebase Crashlytics** - Crash reporting

### OTA Updates

- **CodePush** - Over-the-air updates

### Performance

- **react-native-fast-image** - Optimized image loading
- **react-native-reanimated** - Smooth animations

### Testing

- **Jest** - Unit testing
- **React Native Testing Library** - Component testing
- **Detox** - E2E testing

## 📦 Installation

### Prerequisites

- Node.js >= 20
- React Native development environment set up
- iOS: Xcode and CocoaPods
- Android: Android Studio and JDK 17

### Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   ```bash
   # Copy example env file
   cp .env.example .env

   # Edit .env with your actual values
   # See ENV_SETUP.md for detailed instructions
   ```

3. **iOS setup**

   ```bash
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

4. **Run the app**

   ```bash
   # iOS
   npm run ios

   # Android
   npm run android
   ```

### Environment Variables

The app uses environment variables for configuration. See [ENV_SETUP.md](./ENV_SETUP.md) for detailed setup instructions.

**Quick setup:**

1. Copy `.env.example` to `.env`
2. Fill in your configuration values
3. Restart Metro bundler: `npm start -- --reset-cache`

## 🧪 Testing

### Unit Tests

```bash
npm test
```

### Watch Mode

```bash
npm run test:watch
```

### Coverage

```bash
npm run test:coverage
```

### E2E Tests (Detox)

```bash
# Build
npm run detox:build

# Test
npm run detox:test
```

## 🔧 Development

### Code Quality

- **ESLint** - Linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

```bash
# Lint
npm run lint

# Format
npm run format

# Type check
npm run type-check
```

### Project Structure Guidelines

1. **Features**: Each feature is self-contained with its own screens, hooks, services, and state
2. **Shared Modules**: Reusable components, utilities, and types
3. **Business Logic**: Lives in hooks and services, not UI components
4. **Type Safety**: All code is typed with TypeScript

## 📱 Performance Optimizations

### Implemented Optimizations

1. **React.memo** - Prevents unnecessary re-renders
2. **useCallback** - Memoizes callback functions
3. **useMemo** - Memoizes computed values
4. **FlatList Optimization**:
   - `keyExtractor` for efficient key generation
   - `getItemLayout` for known item sizes
   - `removeClippedSubviews` for off-screen rendering
   - `initialNumToRender` and `maxToRenderPerBatch` tuning
5. **Lazy Loading** - Dynamic imports for screens
6. **Image Optimization** - FastImage for efficient image loading

## 🔐 Permissions

The app requests permissions contextually (not at launch):

- Location permissions when needed for location-based features

## 📊 Monitoring

### Sentry Setup

1. Add your Sentry DSN in `src/shared/services/monitoring.ts`
2. Errors are automatically tracked in production

### Firebase Crashlytics

1. Configure Firebase in your project
2. Crashlytics automatically captures crashes

## 🔄 OTA Updates (CodePush)

### Setup

1. Install CodePush CLI: `npm install -g code-push-cli`
2. Create CodePush account: `code-push register`
3. Add deployment keys to your app configuration

### Deploy Updates

```bash
# iOS
code-push release-react NsxDemo-ios

# Android
code-push release-react NsxDemo-android
```

## 🚢 CI/CD

GitHub Actions workflow includes:

- Linting and type checking
- Unit tests with coverage
- Android build
- iOS build
- Deployment (configure as needed)

See `.github/workflows/ci.yml` for details.

## 📝 Code Style

- **ESLint**: Configured with React Native and TypeScript rules
- **Prettier**: Consistent code formatting
- **TypeScript**: Strict mode enabled

## 🎨 Design System

The app includes a comprehensive design system:

- **Colors**: Centralized color palette
- **Typography**: Consistent font sizes and weights
- **Spacing**: 4px grid system

## 🔍 Key Features Implementation

### State Management

- **Redux Toolkit**: For global state (auth, user profile)
- **React Query**: For server state (API data, caching)

### API Layer

- **Axios**: Configured with interceptors
- **Error Handling**: Centralized error handling
- **Request/Response Transformation**: Automatic data transformation

### Navigation

- **Type-Safe**: Full TypeScript support
- **Stack Navigation**: For modal screens
- **Tab Navigation**: For main app sections

## 📚 Additional Resources

- [React Native Documentation](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Query](https://tanstack.com/query/latest)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

This is a demo project showcasing production-ready architecture. For production use:

1. Replace placeholder API endpoints
2. Configure Sentry DSN
3. Set up Firebase Crashlytics
4. Configure CodePush deployment keys
5. Add proper authentication
6. Implement proper error boundaries
7. Add analytics tracking
8. Configure environment variables

## 📄 License

This project is for demonstration purposes.

## 👨‍💻 Architecture Decisions

### Why Feature-Based Architecture?

- **Scalability**: Easy to add/remove features
- **Maintainability**: Clear separation of concerns
- **Team Collaboration**: Teams can work on features independently
- **Code Organization**: Related code stays together

### Why Redux Toolkit + React Query?

- **Redux Toolkit**: For global, cross-feature state (auth, user)
- **React Query**: For server state, caching, and synchronization
- **Separation**: Clear distinction between client and server state

### Performance First

- All components optimized with React.memo
- Callbacks memoized with useCallback
- Computed values memoized with useMemo
- FlatList optimized for large lists
- Images optimized with FastImage

---

Built with ❤️ using React Native and TypeScript
