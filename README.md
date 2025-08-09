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

## Tech Stack

- [Expo](https://expo.dev/) - React Native framework
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing
- [Tamagui](https://tamagui.dev/) - UI component library
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) - API data fetching
- [React Navigation](https://reactnavigation.org/) - Navigation library

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
├── store/                  # Redux store configuration
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
yarn start
```

4. Run on specific platforms:
```bash
# For iOS
yarn ios

# For Android
yarn android

# For Web
yarn web
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

The app uses Redux Toolkit for state management and RTK Query for data fetching. The store is configured in the `store/` directory.

## Theming

The app supports both light and dark themes using Tamagui's theming system and a custom ThemeContext provider.

## API Integration

The app connects to a REST API for order data. In development, it can use a mock API server powered by json-server.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Expo](https://expo.dev/)
- [Tamagui](https://tamagui.dev/)
- [React Navigation](https://reactnavigation.org/)
