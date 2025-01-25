import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: () => {},
  }),
}));

afterEach(() => {
  cleanup();
});
