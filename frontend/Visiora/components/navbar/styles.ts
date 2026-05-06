import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },

  container: {
    height: 85,
    backgroundColor: '#8CC8C0',

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    paddingBottom: 10,
  },

  tab: {
    alignItems: 'center',
    width: '25%',
  },

  label: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
    fontWeight: '600',
  },

  circleWrapper: {
    position: 'absolute',
    top: -22, 
  },

  circle: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#fff',

    alignItems: 'center',
    justifyContent: 'center',

    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
});