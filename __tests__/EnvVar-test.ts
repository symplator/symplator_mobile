import 'react-native';
import {REALM_PASS} from '@env';

describe('App', () => {
  it('gets env variable', (): void => {
    // Mock the environment variables
    jest.mock('react-native-dotenv', () => ({
      REALM_PASS: 'test_secret_value',
    }));
    expect(REALM_PASS).toBeDefined();
  });
});
