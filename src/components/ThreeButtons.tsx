import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { AppContext } from '../context/appContext';
import CustomTouchButton from './CustomTouchButton';
import { themes } from '../palette/themes';

const ThreeButtons = ({
  goToSettings,
  goToSignin,
  goToSignup,
  handleLogout,
  buttonContainerStyle,
  textModal,
  i18n,
}) => {
  const { token } = useContext(AppContext);
  const font =
    i18n.locale === 'ua' ? themes.textSize.xs : themes.textSize.small;
  return (
    <View style={styles.buttonContainer}>
      <CustomTouchButton
        onPress={goToSettings}
        title={i18n.t('main.settings')}
        style1={{
          ...buttonContainerStyle,
        }}
        style2={{ ...textModal, fontSize: font }}
      />
      {token ? (
        <CustomTouchButton
          onPress={handleLogout}
          title={i18n.t('main.logout')}
          style1={{
            ...buttonContainerStyle,
          }}
          style2={{ ...textModal, fontSize: font }}
        />
      ) : (
        <>
          <CustomTouchButton
            onPress={goToSignin}
            title={i18n.t('main.signin')}
            style1={{
              ...buttonContainerStyle,
            }}
            style2={{ ...textModal, fontSize: font }}
          />
          <CustomTouchButton
            onPress={goToSignup}
            title={i18n.t('main.signup')}
            style1={{
              ...buttonContainerStyle,
            }}
            style2={{ ...textModal, fontSize: font }}
          />
        </>
      )}
    </View>
  );
};

export default ThreeButtons;

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    top: 50,
    transform: [{ translateY: -50 }],
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
});
