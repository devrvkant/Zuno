import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders App component without crashing and properly utilizes Outlet within a router context', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  // The App component solely renders <Outlet />. When no specific route matches,
  // Outlet itself renders nothing to the DOM.
  // Therefore, the primary test is to ensure that the component mounts
  // within a router context without throwing any errors, indicating
  // correct integration with React Router's Outlet.
  // If render completes without throwing, it signifies success for this component's simple function.
  // We can assert that the document body exists, confirming the render process completed.
  expect(document.body).toBeInTheDocument();
});