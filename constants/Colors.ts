// Color palette
const palette = {
  blue: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
    950: '#172554',
  },
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#030712',
  },
  red: {
    500: '#EF4444',
    600: '#DC2626',
  },
  green: {
    500: '#10B981',
    600: '#059669',
  },
  white: '#FFFFFF',
  black: '#000000',
};

// Theme colors
const Colors = {
  light: {
    // Base
    text: palette.gray[900],
    textSecondary: palette.gray[600],
    background: palette.white,
    backgroundSecondary: palette.gray[50],
    
    // UI Elements
    primary: palette.blue[500],
    primaryDark: palette.blue[700],
    primaryLight: palette.blue[300],
    headerBackground: palette.blue[400],
    headerText: palette.white,
    
    // Status
    success: palette.green[500],
    error: palette.red[500],
    
    // Components
    card: palette.white,
    cardBorder: palette.gray[200],
    divider: palette.gray[200],
    buttonText: palette.white,
    buttonDisabled: palette.gray[300],
    inputBorder: palette.gray[300],
    inputBackground: palette.white,
    
    // Navigation
    drawerBackground: palette.gray[100],
    drawerActiveText: palette.blue[500],
    drawerInactiveText: palette.gray[700],
    drawerActiveBackground: palette.blue[50],
  },
  dark: {
    // Base
    text: palette.gray[100],
    textSecondary: palette.gray[400],
    background: palette.gray[950],
    backgroundSecondary: palette.gray[800],
    
    // UI Elements
    primary: palette.blue[400],
    primaryDark: palette.blue[600],
    primaryLight: palette.blue[300],
    headerBackground: palette.blue[800],
    headerText: palette.white,
    
    // Status
    success: palette.green[500],
    error: palette.red[500],
    
    // Components
    card: palette.gray[800],
    cardBorder: palette.gray[700],
    divider: palette.gray[700],
    buttonText: palette.white,
    buttonDisabled: palette.gray[600],
    inputBorder: palette.gray[600],
    inputBackground: palette.gray[800],
    
    // Navigation
    drawerBackground: palette.gray[900],
    drawerActiveText: palette.blue[400],
    drawerInactiveText: palette.gray[400],
    drawerActiveBackground: palette.gray[800],
  },
};

export default Colors;
export { palette };
