import 'react-native';
import {API_KEY} from '@env';

describe('App', () => {
  it('gets env variable', (): void => {
    // Mock the environment variables
    jest.mock('react-native-dotenv', () => ({
      API_KEY: 'test_secret_value',
    }));
    expect(API_KEY).toBeDefined();
  });
});
