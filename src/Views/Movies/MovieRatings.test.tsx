import { render, screen, waitFor } from "@testing-library/react";
import { useSelector } from "react-redux";
import MovieRatings from "./MovieRatings";

jest.mock("../../Components/Ratings", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked Rating</div>),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

const mockStore: any = {
  MOVIES: {
    movie_detail: {
      Ratings: [
        { Source: "Internet Movie Database", Value: "8.2/10" },
        { Source: "Metacritic", Value: "75/100" },
        { Source: "Rotten Tomatoes", Value: "85%" },
      ],
    },
  },
};

describe("MovieRatings Component", () => {
  beforeEach(() => {
    (useSelector as unknown as jest.Mock).mockImplementation(callback => callback(mockStore));
  });

  it("renders average rating and individual ratings correctly", async () => {
    render(<MovieRatings />);

    expect(screen.getByText("Average Rating:")).toBeInTheDocument();

    expect(screen.getByText("Internet Movie Database: 82%")).toBeInTheDocument();
    expect(screen.getByText("Rotten Tomatoes: 85%")).toBeInTheDocument();
    expect(screen.getByText("Metacritic: 75%")).toBeInTheDocument();
  });

  it("handles empty movie details gracefully", async () => {

    mockStore.MOVIES.movie_detail = {};

    render(<MovieRatings />);

    await waitFor(() => screen.getByText("Average Rating:"));

    expect(screen.queryByText("Internet Movie Database:")).toBeNull();
    expect(screen.queryByText("Rotten Tomatoes:")).toBeNull();
    expect(screen.queryByText("Metacritic:")).toBeNull();
  });
});
