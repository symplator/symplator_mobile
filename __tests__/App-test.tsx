import 'react-native';
import React from 'react';
import App from '../App';
import {render} from '@testing-library/react-native';

describe('App', () => {
  it('renders correctly', (): void => {
    render(<App />);
  });
});
