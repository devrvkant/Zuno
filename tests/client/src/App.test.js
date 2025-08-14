import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App from '../App'; // Assuming App.js is in the parent directory relative to the test file

describe('App Component Outlet Rendering', () => {
  it('should render the content of a nested route through the Outlet', () => {
    const TestComponent = () => <div>Test Route Content</div>;

    render(
      <MemoryRouter initialEntries={['/test']}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="test" element={<TestComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Route Content')).toBeInTheDocument();
  });

  it('should render nothing when no matching child route is found', () => {
    render(
      <MemoryRouter initialEntries={['/nomatch']}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="test" element={<div>Test Route Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // Assert that the content of the child route is not present
    expect(screen.queryByText('Test Route Content')).not.toBeInTheDocument();

    // To further confirm, we can check if the App component itself renders its structure,
    // which in this case is just the Outlet, so nothing specific to assert besides the
    // absence of child content.
    // An Outlet without a matched route typically renders null.
  });
});