import { useColorScheme } from 'react-native';
import Colors from '../constants/Colors';
import { useTheme } from '../context/ThemeContext';

/**
 * Hook to access theme colors based on the current color scheme
 * @returns The current theme colors object
 */
export function useAppColors() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return {
    colors: isDark ? Colors.dark : Colors.light,
    isDark,
    colorScheme: theme,
  };
}
