import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { UserProfileSettings } from './UserProfileSettings';

describe('UserProfileSettings Component', () => {
  it('renders all form fields correctly', () => {
    render(<UserProfileSettings />);
    
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/bio/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
  });

  it('validates empty submissions and displays errors', async () => {
    const user = userEvent.setup();
    render(<UserProfileSettings />);
    
    const submitButton = screen.getByRole('button', { name: /save changes/i });
    await user.click(submitButton);

    await waitFor(() => {
      const nameError = screen.getByText(/full name must be at least 2 characters/i);
      expect(nameError).toBeInTheDocument();
      
      const emailError = screen.getByText(/invalid email address/i);
      expect(emailError).toBeInTheDocument();
    });
    
    // Check aria-invalid
    expect(screen.getByLabelText(/full name/i)).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-invalid', 'true');
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    render(<UserProfileSettings />);
    
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'not-an-email');
    
    const submitButton = screen.getByRole('button', { name: /save changes/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    });
  });

  it('transforms email to lowercase on blur', async () => {
    const user = userEvent.setup();
    render(<UserProfileSettings />);
    
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'TEST@EXAMPLE.COM');
    
    // blur
    await user.tab();
    
    await waitFor(() => {
      expect(emailInput).toHaveValue('test@example.com');
    });
  });

  it('displays character count for bio and validates max length', async () => {
    const user = userEvent.setup();
    render(<UserProfileSettings />);
    
    const bioInput = screen.getByLabelText(/bio/i);
    
    // Type 10 characters
    await user.type(bioInput, '1234567890');
    
    expect(screen.getByText('10/200')).toBeInTheDocument();

    // Type 200 characters string
    const longString = 'a'.repeat(201);
    await user.clear(bioInput);
    
    // Paste because typing 201 characters takes time in tests
    await user.click(bioInput);
    await user.paste(longString);

    const submitButton = screen.getByRole('button', { name: /save changes/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/bio must be at most 200 characters/i)).toBeInTheDocument();
    });
  });

  it('manages focus states properly via classes', async () => {
    const user = userEvent.setup();
    render(<UserProfileSettings />);
    
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email/i);
    
    // Initially not focused
    expect(nameInput).not.toHaveFocus();
    
    // Focus the element
    await user.click(nameInput);
    expect(nameInput).toHaveFocus();
    // Class names contain focus ring classes
    expect(nameInput).toHaveClass('focus:ring-2', 'focus:ring-blue-500');

    // Tab to next element
    await user.tab();
    expect(nameInput).not.toHaveFocus();
    expect(emailInput).toHaveFocus();
  });

  it('handles successful submission, shows loading state, and success message', async () => {
    const user = userEvent.setup();
    render(<UserProfileSettings />);
    
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/bio/i), 'A short bio');
    
    const submitButton = screen.getByRole('button', { name: /save changes/i });
    await user.click(submitButton);
    
    // Should show loading state
    expect(screen.getByText(/saving\.\.\./i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    // Wait for submission to complete
    await waitFor(() => {
      expect(screen.getByText(/profile updated successfully!/i)).toBeInTheDocument();
    }, { timeout: 2000 });
    
    // Button should be enabled again
    expect(submitButton).not.toBeDisabled();
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
  });
});
