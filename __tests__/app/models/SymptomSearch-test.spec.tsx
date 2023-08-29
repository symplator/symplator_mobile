import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {SymptomTextSearchScreen} from '../../../app/screens/SymptomTextSearchScreen';

// Mock Realm module
jest.mock('realm', () => ({
  open: jest.fn(),
  objects: jest.fn(),
}));

describe('SymptomSearch', () => {
  it('renders the search component correctly', () => {
    const {getByPlaceholderText} = render(<SymptomTextSearchScreen />);
    const inputElement = getByPlaceholderText('Enter your search query');
    expect(inputElement).toBeTruthy();
  });

  it('performs a search correctly and displays the results', async () => {
    // Mocked Realm objects and filtered results
    const mockObjects = [
      {name: 'Apple', tag: 'Fruit', detail: 'A juicy fruit'},
      {name: 'Banana', tag: 'Fruit', detail: 'A yellow fruit'},
      {name: 'Carrot', tag: 'Vegetable', detail: 'An orange vegetable'},
    ];
    const mockFilteredResults = [
      {name: 'Apple', tag: 'Fruit', detail: 'A juicy fruit'},
      {name: 'Banana', tag: 'Fruit', detail: 'A yellow fruit'},
    ];

    // Mock Realm objects and filtered methods
    jest.spyOn(require('realm'), 'objects').mockReturnValue(mockObjects);
    jest.spyOn(mockObjects, 'filtered').mockReturnValue(mockFilteredResults);

    const {getByPlaceholderText, getByText} = render(<SymptomTextSearchScreen />);
    const inputElement = getByPlaceholderText('Enter your search query');

    // Enter search query and perform search
    fireEvent.changeText(inputElement, 'fruit');
    fireEvent.submitEditing(inputElement);

    // Wait for the state update and check if the results are rendered
    await waitFor(() => {
      const resultElement1 = getByText('Apple');
      const resultElement2 = getByText('Banana');
      expect(resultElement1).toBeTruthy();
      expect(resultElement2).toBeTruthy();
    });
  });
});
