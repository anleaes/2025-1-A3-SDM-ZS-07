// src/styles/globalStyles.js
import { StyleSheet } from 'react-native';
import colors from './colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: colors.gold,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#222',
    color: colors.white,
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
    width: '100%',
  },
  button: {
    backgroundColor: colors.gold,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    width: '100%',
  },
  buttonText: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: colors.gold,
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  text: {
    color: colors.white,
    fontSize: 16,
  },
  errorText: {
    color: colors.red,
    fontSize: 14,
    marginBottom: 10,
  },
  successText: {
    color: colors.green,
    fontSize: 14,
    marginBottom: 10,
  },
});