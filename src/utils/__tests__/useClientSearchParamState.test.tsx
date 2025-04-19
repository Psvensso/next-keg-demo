import { act, renderHook } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";
import useClientSearchParams from "../hooks/useClientSearchParamState";

// Mock the Next.js router and search params
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("useClientSearchParamState", () => {
  // Setup mock implementations
  let mockRouter: { push: jest.Mock; replace: jest.Mock };
  let mockSearchParams: { toString: jest.Mock; getAll: jest.Mock };
  let originalURLSearchParams: typeof URLSearchParams;

  beforeEach(() => {
    // Save the original URLSearchParams to restore later
    originalURLSearchParams = global.URLSearchParams;

    // Create mock router
    mockRouter = {
      push: jest.fn(),
      replace: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    // Create mock search params from next/navigation
    mockSearchParams = {
      toString: jest.fn().mockReturnValue(""),
      getAll: jest.fn(),
    };
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    // Mock window.location
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/test-path",
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    // Restore the original URLSearchParams
    global.URLSearchParams = originalURLSearchParams;
  });

  test("should initialize with values from search params", () => {
    // Arrange
    mockSearchParams.toString.mockReturnValue(
      "category=value1&category=value2&sort=asc"
    );

    // Create a proper mock for URLSearchParams with getAll method
    const mockGetAll = jest.fn((key) => {
      if (key === "category") return ["value1", "value2"];
      if (key === "sort") return ["asc"];
      return [];
    });

    // Mock the global URLSearchParams
    global.URLSearchParams = jest.fn().mockImplementation(() => ({
      getAll: mockGetAll,
      append: jest.fn(),
      delete: jest.fn(),
      toString: jest
        .fn()
        .mockReturnValue("category=value1&category=value2&sort=asc"),
    }));

    const initialState = { category: [], sort: "" };

    // Act
    const { result } = renderHook(() => useClientSearchParams(initialState));

    // Assert
    expect(result.current[0]).toEqual({
      category: ["value1", "value2"],
      sort: ["asc"],
    });
  });

  test("should update search params and state when updateValue is called", () => {
    // Arrange
    mockSearchParams.toString.mockReturnValue("");

    // Prepare mock methods for URLSearchParams
    const mockAppend = jest.fn();
    const mockDelete = jest.fn();
    const mockToString = jest
      .fn()
      .mockReturnValue("category=value1&category=value2&sort=asc");
    const mockGetAll = jest.fn().mockImplementation((key) => {
      if (key === "category") return ["value1", "value2"];
      if (key === "sort") return ["asc"];
      return [];
    });

    // Mock URLSearchParams
    global.URLSearchParams = jest.fn().mockImplementation(() => ({
      append: mockAppend,
      delete: mockDelete,
      getAll: mockGetAll,
      toString: mockToString,
    }));

    const initialState = { category: [], sort: "" };

    // Act
    const { result } = renderHook(() => useClientSearchParams(initialState));

    act(() => {
      result.current[1]({
        category: ["value1", "value2"],
        sort: "asc",
      });
    });

    // Assert
    expect(mockDelete).toHaveBeenCalledWith("category");
    expect(mockDelete).toHaveBeenCalledWith("sort");
    expect(mockAppend).toHaveBeenCalledWith("category", "value1");
    expect(mockAppend).toHaveBeenCalledWith("category", "value2");
    expect(mockAppend).toHaveBeenCalledWith("sort", "asc");
    expect(mockRouter.replace).toHaveBeenCalled();
  });

  test("should use router.push when replace is false", () => {
    // Arrange
    mockSearchParams.toString.mockReturnValue("");

    // Prepare mock methods for URLSearchParams
    const mockAppend = jest.fn();
    const mockDelete = jest.fn();
    const mockToString = jest.fn().mockReturnValue("category=value1&sort=asc");
    const mockGetAll = jest.fn().mockImplementation((key) => {
      if (key === "category") return ["value1"];
      if (key === "sort") return ["asc"];
      return [];
    });

    // Mock URLSearchParams
    global.URLSearchParams = jest.fn().mockImplementation(() => ({
      append: mockAppend,
      delete: mockDelete,
      getAll: mockGetAll,
      toString: mockToString,
    }));

    const initialState = { category: [], sort: "" };

    // Act
    const { result } = renderHook(() => useClientSearchParams(initialState));

    act(() => {
      // Call with replace=false as the second argument
      result.current[1](
        {
          category: ["value1"],
          sort: "asc",
        },
        false
      );
    });

    // Assert
    expect(mockRouter.push).toHaveBeenCalled();
    expect(mockRouter.replace).not.toHaveBeenCalled();
  });

  test("should delete existing params before adding new ones", () => {
    // Arrange
    mockSearchParams.toString.mockReturnValue("category=old&sort=desc");

    // Prepare mock methods for URLSearchParams
    const mockAppend = jest.fn();
    const mockDelete = jest.fn();
    const mockToString = jest.fn().mockReturnValue("category=new&sort=asc");
    const mockGetAll = jest.fn().mockImplementation((key) => {
      if (key === "category") return ["new"];
      if (key === "sort") return ["asc"];
      return [];
    });

    // Mock URLSearchParams
    global.URLSearchParams = jest.fn().mockImplementation(() => ({
      append: mockAppend,
      delete: mockDelete,
      getAll: mockGetAll,
      toString: mockToString,
    }));

    const initialState = { category: [], sort: "" };

    // Act
    const { result } = renderHook(() => useClientSearchParams(initialState));

    act(() => {
      result.current[1]({
        category: ["new"],
        sort: "asc",
      });
    });

    // Assert
    expect(mockDelete).toHaveBeenCalledWith("category");
    expect(mockDelete).toHaveBeenCalledWith("sort");
    expect(mockAppend).toHaveBeenCalledWith("category", "new");
    expect(mockAppend).toHaveBeenCalledWith("sort", "asc");
  });

  test("should handle empty arrays and empty strings in params", () => {
    // Arrange
    mockSearchParams.toString.mockReturnValue("");

    // Prepare mock methods for URLSearchParams
    const mockAppend = jest.fn();
    const mockDelete = jest.fn();
    const mockToString = jest.fn().mockReturnValue("sort=");
    const mockGetAll = jest.fn().mockImplementation((key) => {
      if (key === "category") return [];
      if (key === "sort") return [""];
      return [];
    });

    // Mock URLSearchParams
    global.URLSearchParams = jest.fn().mockImplementation(() => ({
      append: mockAppend,
      delete: mockDelete,
      getAll: mockGetAll,
      toString: mockToString,
    }));

    const initialState = { category: [], sort: "" };

    // Act
    const { result } = renderHook(() => useClientSearchParams(initialState));

    act(() => {
      result.current[1]({
        category: [],
        sort: "",
      });
    });

    // Assert
    expect(mockDelete).toHaveBeenCalledWith("category");
    expect(mockDelete).toHaveBeenCalledWith("sort");
    expect(mockAppend).toHaveBeenCalledWith("sort", "");
  });
});
