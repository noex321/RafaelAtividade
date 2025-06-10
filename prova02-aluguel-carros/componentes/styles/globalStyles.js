import { StyleSheet } from 'react-native';

const colors = {
  primary: '#545454',
  secondary: '#545454',
  background: '#d9d9d9',
  white: '#FFFFFF',
  text: '#333333',
};

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.secondary,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    color: colors.text,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});