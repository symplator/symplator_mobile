import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {useApp as useAppMock} from '@realm/react';
import {App} from '../App';
import {UserSettingsProvider} from '../app/context/UserSettings/UserSettingsProvider';
import SymptomTranslation from 'models/SymptomTranslation';
import {API_KEY} from '@env';
import Realm from 'realm';

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: jest.fn(),
}));

jest.mock('react-native-wheel-picker-android', () => ({
  WheelPicker: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock('../app/models/index', () => ({
  SymplatorRealmContext: {
    useQuery: jest.fn(),
  },
}));

jest.mock('@realm/react', () => ({
  useApp: jest.fn().mockReturnValue({
    logIn: jest.fn(),
  }),
}));

jest.mock('realm', () => ({
  Credentials: {
    apiKey: jest.fn(),
  },
}));

class MockSymptom {
  _id: string;
  bodyParts: number[];
  translations: SymptomTranslation[];

  constructor(
    _id: string,
    bodyParts: number[],
    translations: SymptomTranslation[],
  ) {
    this._id = _id;
    this.bodyParts = bodyParts;
    this.translations = translations;
  }
}

jest.mock('../app/models/Symptom', () => ({
  Symptom: MockSymptom,
}));


describe('App', () => {
  it('should render AppSync component when user is logged in', async () => {
    // Mock the logIn function
    const mockLogIn = jest.fn().mockResolvedValueOnce('test-user');
    useApp.mockReturnValueOnce({
      logIn: mockLogIn,
    });

    // Render the App component
    const { getByText } = render(<App />);

    // Wait for the logIn function to be called and user to be set
    await waitFor(() => expect(mockLogIn).toHaveBeenCalled());

    // Check if AppSync component is rendered
    expect(getByText('AppSync Component')).toBeInTheDocument();
  });

  it('should not render AppSync component when user is not logged in', async () => {
    // Mock the logIn function
    useApp.mockReturnValueOnce({
      logIn: jest.fn(),
    });

    // Render the App component
    const { queryByText } = render(<App />);

    // Wait for the logIn function to be called
    await waitFor(() => expect(useApp).toHaveBeenCalled());

    // Check if AppSync component is not rendered
    expect(queryByText('AppSync Component')).toBeNull();
  });
});