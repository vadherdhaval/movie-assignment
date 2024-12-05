import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchSort from "./SearchSort";

const mockHandleSearch = jest.fn();
const mockHandleSort = jest.fn();

describe("SearchSort Component", () => {
  it("renders the component with initial values", () => {
    render(
      <SearchSort handleSearch={mockHandleSearch} handleSort={mockHandleSort} />
    );

    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByText("Sort by...")).toBeInTheDocument();
  });

  it("calls handleSearch when typing in the search input", () => {
    render(
      <SearchSort handleSearch={mockHandleSearch} handleSort={mockHandleSort} />
    );

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "A New Hope" } });

    
    expect(mockHandleSearch).toHaveBeenCalledWith("A New Hope");
  });

  it("does not call handleSort when 'Sort by...' option is selected", () => {
    render(
      <SearchSort handleSearch={mockHandleSearch} handleSort={mockHandleSort} />
    );

    const dropdownToggle = screen.getByRole("button", { name: "Sort by..." });
    fireEvent.click(dropdownToggle);

    const sortByOption = screen.getByText("Sort by...");
    fireEvent.click(sortByOption);

    expect(mockHandleSort).not.toHaveBeenCalled();
  });
});
