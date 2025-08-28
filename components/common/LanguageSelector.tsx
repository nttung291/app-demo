import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { Button, Text, XStack, YStack, Sheet } from 'tamagui';
import { useAppColors } from '@/hooks';

export const LanguageSelector = () => {
  const { t } = useTranslation();
  const { language, setLanguage, availableLanguages } = useLanguage();
  const { colors } = useAppColors();
  const [open, setOpen] = React.useState(false);
  
  const handleLanguageChange = async (langCode: string) => {
    await setLanguage(langCode);
    setOpen(false);
  };
  
  return (
    <>
      <Button
        onPress={() => setOpen(true)}
        backgroundColor={colors.card}
        color={colors.text}
        borderRadius="$4"
        paddingHorizontal="$4"
        paddingVertical="$2"
      >
        <Text>{t('settings.language')}</Text>
      </Button>
      
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[40]}
        dismissOnSnapToBottom
        position={0}
      >
        <Sheet.Overlay />
        <Sheet.Frame padding="$4">
          <Sheet.Handle />
          <YStack space="$4">
            <Text fontSize="$6" fontWeight="bold" textAlign="center">
              {t('settings.selectLanguage')}
            </Text>
            
            {availableLanguages.map((lang) => (
              <Button
                key={lang.code}
                onPress={() => handleLanguageChange(lang.code)}
                backgroundColor={language === lang.code ? colors.primary : colors.card}
                color={language === lang.code ? 'white' : colors.text}
                marginVertical="$1"
                borderRadius="$4"
                paddingVertical="$3"
              >
                <Text>{t(`settings.${lang.code === 'en' ? 'english' : 'spanish'}`)}</Text>
              </Button>
            ))}
            
            <Button
              onPress={() => setOpen(false)}
              backgroundColor={colors.background}
              color={colors.text}
              borderWidth={1}
              marginTop="$2"
              borderRadius="$4"
              paddingVertical="$3"
            >
              <Text>{t('common.cancel')}</Text>
            </Button>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </>
  );
};

export default LanguageSelector;
