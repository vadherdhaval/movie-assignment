import React from 'react';
import { act, render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import MovieList from './Movies';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('./MovieDetails', () => ({
    __esModule: true, 
    default: jest.fn(() => <div>Mocked Movie Details</div>),
}));

describe('MovieList Component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

    jest.clearAllMocks();
  });

  test('shows "No Movies Found" when movie count is 0', () => {
    (useSelector as unknown as jest.Mock).mockImplementation((callback) =>
      callback({
        MOVIES: {
          isLoading: false,
          movies: [],
          movies_count: 0,
        },
      })
    );

    render(<MovieList />);

    expect(screen.getByText('No Movies Found')).toBeInTheDocument();
  });

  test('shows loading state when isLoading is true', () => {
    (useSelector as unknown as jest.Mock).mockImplementation((callback) =>
      callback({
        MOVIES: {
          isLoading: true,
          movies: [],
          movies_count: 0,
        },
      })
    );

    render(<MovieList />);

    const loaderIcon = screen.getByRole('img', { name: /loader-icon/i });
    expect(loaderIcon).toBeInTheDocument();
  });

  

  test('allows searching for movies', () => {
    jest.useFakeTimers();

    (useSelector as unknown as jest.Mock).mockImplementation((callback) =>
      callback({
        MOVIES: {
          isLoading: false,
          movies: [
            { episode_id: 1, title: 'A New Hope', release_date: '1977-05-25' },
            { episode_id: 2, title: 'The Empire Strikes Back', release_date: '1980-05-21' },
          ],
          movies_count: 2,
        },
      })
    );

    render(<MovieList />);

    const searchInput = screen.getByPlaceholderText('Search'); 
    act(() => {
        fireEvent.change(searchInput, { target: { value: 'Empire' } });
    });
    
    jest.advanceTimersByTime(100);

    expect(screen.getByText(/the empire strikes back/i)).toBeInTheDocument();
    expect(screen.queryByText(/a new hope/i)).not.toBeInTheDocument();

    jest.useRealTimers(); 
  });

  test('allows sorting of movies', () => {
    (useSelector as unknown as jest.Mock).mockImplementation((callback) =>
      callback({
        MOVIES: {
          isLoading: false,
          movies: [
            { episode_id: 2, title: 'The Empire Strikes Back', release_date: '1980-05-21' },
            { episode_id: 1, title: 'A New Hope', release_date: '1977-05-25' },
          ],
          movies_count: 2,
        },
      })
    );

    render(<MovieList />);

    const sortButton = screen.getByText(/sort by/i);
    fireEvent.click(sortButton);

    const movieTitles = screen.getAllByText(/episode/i).map((movie) => movie.textContent);
    expect(movieTitles).toEqual([
      'Episode',
      'EPISODE 1',
      'EPISODE 2'
    ]);
  });
});
