import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '@/app/signin/page'

describe('LoginForm', () => {
  it('renders the email and password fields as required', () => {
    render(<LoginForm />)

    expect(screen.getByRole('heading', { name: 'Welcome back' })).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeRequired()
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email')
    expect(screen.getByLabelText('Password')).toBeRequired()
    expect(screen.getByRole('button', { name: 'Sign in' })).toHaveAttribute(
      'type',
      'submit'
    )
  })

  it('links to password recovery and account creation', () => {
    render(<LoginForm />)

    expect(screen.getByRole('link', { name: 'Forgot password?' })).toHaveAttribute(
      'href',
      '/forgetpassword'
    )
    expect(screen.getByRole('link', { name: 'Sign up' })).toHaveAttribute(
      'href',
      '/signup'
    )
  })

  it('masks the password by default', () => {
    render(<LoginForm />)

    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password')
    const toggle = screen.getByRole('button', { name: 'Show password' })
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
  })

  it('reveals and re-masks the password when the toggle is used', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    await user.type(screen.getByLabelText('Password'), 'sup3r-secret')
    await user.click(screen.getByRole('button', { name: 'Show password' }))

    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'text')
    const hideToggle = screen.getByRole('button', { name: 'Hide password' })
    expect(hideToggle).toHaveAttribute('aria-pressed', 'true')

    await user.click(hideToggle)

    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password')
    expect(screen.getByLabelText('Password')).toHaveValue('sup3r-secret')
  })

  it('keeps the toggle out of the submit flow', () => {
    render(<LoginForm />)

    expect(screen.getByRole('button', { name: 'Show password' })).toHaveAttribute(
      'type',
      'button'
    )
  })

  it('exposes a remember-me checkbox', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const remember = screen.getByRole('checkbox', { name: /Remember me/ })
    expect(remember).not.toBeChecked()

    await user.click(remember)

    expect(remember).toBeChecked()
  })
})
