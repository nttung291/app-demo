# Order Viewer

A responsive cross-platform application for managing orders across web, iOS, and Android platforms. Built with Expo, React Native, and Tamagui.

![Order Viewer App](https://via.placeholder.com/800x400?text=Order+Viewer+App)

## Features

- 📱 Cross-platform: Works on iOS, Android, and Web
- 🌓 Dark/Light mode support
- 🔄 Real-time order management
- 📊 Order filtering and search
- 🛠️ Responsive UI with Tamagui
- 🧩 Modular component architecture
- 🌐 Internationalization (i18n) with multiple language support

## Tech Stack

- [Expo](https://expo.dev/) - React Native framework
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing
- [Tamagui](https://tamagui.dev/) - UI component library
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [React Query](https://tanstack.com/query/latest) - API data fetching and caching
- [React Navigation](https://reactnavigation.org/) - Navigation library
- [i18next](https://www.i18next.com/) - Internationalization framework
- [react-i18next](https://react.i18next.com/) - React bindings for i18next
- [expo-localization](https://docs.expo.dev/versions/latest/sdk/localization/) - Device locale detection

## Project Structure

```
app-demo/
├── app/                    # Expo Router app directory
│   ├── (drawer)/           # Drawer navigation screens
│   │   ├── _layout.tsx     # Drawer navigation layout
│   │   ├── index.tsx       # Home screen
│   │   ├── orders.tsx      # Orders list screen
│   │   └── settings.tsx    # Settings screen
│   ├── orders/             # Order-related screens
│   │   ├── [id].tsx        # Order details screen
│   │   └── index.tsx       # Redirect to drawer orders
│   └── _layout.tsx         # Root layout with providers
├── assets/                 # Static assets
├── components/             # Reusable components
│   ├── common/             # Common UI components
│   ├── layout/             # Layout components
│   └── orders/             # Order-specific components
├── constants/              # App constants
├── context/                # React context providers
├── data/                   # Mock data
├── hooks/                  # Custom hooks
├── services/               # API services
├── store/                  # Zustand store configuration
├── translations/           # i18n translation files
├── types/                  # TypeScript type definitions
└── utils/                  # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn
- Expo CLI
- iOS Simulator / Android Emulator (for mobile development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/app-demo.git
cd app-demo
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
# Development environment (default)
yarn start:dev

# Staging environment
yarn start:staging

# Production environment
yarn start:prod
```

4. Run on specific platforms:
```bash
# For iOS (development environment)
yarn ios:dev

# For iOS (staging environment)
yarn ios:staging

# For iOS (production environment)
yarn ios:prod

# For Android (development environment)
yarn android:dev

# For Android (staging environment)
yarn android:staging

# For Android (production environment)
yarn android:prod

# For Web (development environment)
yarn web:dev

# For Web (staging environment)
yarn web:staging

# For Web (production environment)
yarn web:prod
```

5. Start the mock API server (optional):
```bash
yarn api
```

## Key Components

### Layout Components

- **Header**: Responsive header with navigation controls
- **LayoutContainer**: SafeAreaView wrapper with theme-aware background

### Order Components

- **OrderList**: Displays filterable list of orders
- **OrderDetails**: Shows detailed information about a specific order
- **ActionSheet**: Bottom sheet for order actions

## State Management

The app uses Zustand for state management and React Query for data fetching and caching. Zustand stores are configured in the `store/` directory, and React Query hooks are in the `services/` directory.

## Theming

The app supports both light and dark themes using Tamagui's theming system and a custom ThemeContext provider.

## API Integration

The app connects to a REST API for order data. In development, it can use a mock API server powered by json-server.

## Environment Configuration

The app supports multiple environments (development, staging, production) with different configurations:

### Environment Files

- `.env.development` - Development environment variables
- `.env.staging` - Staging environment variables
- `.env.production` - Production environment variables

### Configuration Files

- `config/env.development.js` - Development configuration
- `config/env.staging.js` - Staging configuration
- `config/env.production.js` - Production configuration
- `config/index.js` - Environment configuration loader

### Building for Different Environments

```bash
# Build Android app for development
yarn build:android:dev

# Build Android app for staging
yarn build:android:staging

# Build Android app for production
yarn build:android:prod

# Build iOS app for development
yarn build:ios:dev

# Build iOS app for staging
yarn build:ios:staging

# Build iOS app for production
yarn build:ios:prod
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Internationalization (i18n)

The app supports multiple languages using i18next and react-i18next. The language can be changed in the settings screen.

### Supported Languages

- English (en)
- Spanish (es)

### Adding a New Language

1. Create a new translation file in the `translations/` directory (e.g., `fr.json`)
2. Copy the structure from an existing translation file (e.g., `en.json`)
3. Translate all the strings to the new language
4. Add the new language to the available languages in `context/LanguageContext.tsx`:

```typescript
const availableLanguages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' } // New language
];
```

5. Import and add the new language resources in `utils/i18n.ts`:

```typescript
import fr from '../translations/fr.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr } // New language
};
```

### Using Translations in Components

To use translations in your components:

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <Text>{t('key.to.translate')}</Text>
  );
}
```

### Changing Language Programmatically

To change the language programmatically:

```typescript
import { useLanguage } from '@/context/LanguageContext';

function LanguageSwitcher() {
  const { setLanguage } = useLanguage();
  
  const changeToSpanish = () => {
    setLanguage('es');
  };
  
  return (
    <Button onPress={changeToSpanish}>Switch to Spanish</Button>
  );
}
```

## Acknowledgments

- [Expo](https://expo.dev/)
- [Tamagui](https://tamagui.dev/)
- [React Navigation](https://reactnavigation.org/)
- [i18next](https://www.i18next.com/)
