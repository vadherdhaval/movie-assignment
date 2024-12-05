import { render, screen, waitFor } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import MovieDetails from "./MovieDetails";
import { fetchPosterApi } from "../../Store/Movies/MoviesSlice";


jest.mock("../../Store/Movies/MoviesSlice", () => ({
  fetchPosterApi: jest.fn(),
}));

jest.mock("../../Components/loader.svg", () => "mock-loader");

jest.mock("./MovieRatings", () => () => <div>Mock Movie Ratings</div>);

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const mockStore:any = {
  MOVIES: {
    movies: [
      {
        episode_id: 1,
        title: "A New Hope",
        release_date: "1977-05-25",
        director: "George Lucas",
        opening_crawl: "A long time ago...",
      },
      {
        episode_id: 2,
        title: "The Empire Strikes Back",
        release_date: "1980-05-17",
        director: "Irvin Kershner",
        opening_crawl: "The adventure continues...",
      },
    ],
    movie_detail: {
      Poster: "https://example.com/poster.jpg",
    },
    isPosterDataLoading: false,
  },
};

describe("MovieDetails Component", () => {
  let store: any;

  beforeEach(() => {
    (useSelector as unknown as jest.Mock).mockImplementation(callback => callback(mockStore));

    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn() as any);
  });

  it("renders loader when poster data is loading", () => {
    mockStore.MOVIES.isPosterDataLoading = true;

    render(
        <MovieDetails id={1} />
    );

    expect(screen.getByAltText("loader-icon")).toBeInTheDocument();
  });

  it("renders movie details when data is loaded", async () => {

    mockStore.MOVIES.isPosterDataLoading = false;

    render(<MovieDetails id={1} />);

    expect(screen.getByText("Episode I - A New Hope")).toBeInTheDocument();
    expect(screen.getByText("Directed by: George Lucas")).toBeInTheDocument();
    expect(screen.getByText("A long time ago...")).toBeInTheDocument();

    expect(screen.getByText("Mock Movie Ratings")).toBeInTheDocument();
  });

  it("converts episode_id to Roman numeral correctly", () => {
    const { container } = render(
        <MovieDetails id={1} />
    );

    expect(container.querySelector("h1")?.textContent).toBe("Episode I - A New Hope");
  });

  it("dispatches fetchPosterApi when movie id is passed", async () => {
    const dispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);

    render(
        <MovieDetails id={1} />
    );

    await waitFor(() => expect(fetchPosterApi).toHaveBeenCalledWith({
      name: "A New Hope",
      year: 1977,
    }));
  });

  it("handles empty movie details state correctly", async () => {
    mockStore.MOVIES.movie_detail = {};

    render(
        <MovieDetails id={1} />
    );
    
    expect(screen.queryByText("Episode I - A New Hope")).not.toBeInTheDocument();
    expect(screen.queryByText("Directed by: George Lucas")).not.toBeInTheDocument();
  });
});
