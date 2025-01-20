import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
  },
  titleStyle: {
    textAlign: 'left',
    fontWeight: '700',
    fontSize: 18,
    color: '#1a1a1a',
    letterSpacing: -0.5,
  },
  containerImage: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  imageStyle: {
    width: 64,
    height: 64,
    opacity: 0.9,
  },
  genericCardText: {
    fontSize: 15,
    color: '#4a4a4a',
    fontWeight: '500',
  },
  genericCardTextSpacing: {
    marginTop: 12,
  },
  buyCartButton: {
    marginTop: 16,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6791ff',
    borderRadius: 12,
    shadowColor: '#6791ff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
});

export default styles;
