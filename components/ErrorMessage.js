import React from 'react';
import { StyleSheet, Text } from 'react-native';
import MangoStyles from '../styles';

const ErrorMessage = ({ error, visible }) => {
  if (!error || !visible) {
    return null;
  }

  return <Text style={styles.errorText}>⚠️ {error}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    color: MangoStyles.mangoNegativeAction,
    fontSize: 20,
    margin: 10,
    fontWeight: '600'
  }
});

export default ErrorMessage;
