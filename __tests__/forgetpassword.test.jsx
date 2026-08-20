import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ForgetPasswordPage from '@/app/forgetpassword/page'

const typeEmail = async (user, value) => {
  const input = screen.getByLabelText('Email address')
  await user.clear(input)
  await user.type(input, value)
  return input
}

describe('ForgetPasswordPage', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()
    delete global.fetch
  })

  it('renders the form in its idle state', () => {
    render(<ForgetPasswordPage />)

    expect(
      screen.getByRole('heading', { name: 'Forgot your password?' })
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Email address')).toHaveValue('')
    expect(screen.getByRole('button', { name: 'Send reset link' })).toBeEnabled()
    expect(screen.getByRole('link', { name: 'Back to login' })).toHaveAttribute(
      'href',
      '/signin'
    )
  })

  it('shows an error and skips the request when the email is blank', async () => {
    const user = userEvent.setup()
    render(<ForgetPasswordPage />)

    await user.type(screen.getByLabelText('Email address'), '   ')
    await user.click(screen.getByRole('button', { name: 'Send reset link' }))

    expect(screen.getByText('Enter your email address.')).toBeInTheDocument()
    expect(screen.getByLabelText('Email address')).toHaveAttribute(
      'aria-invalid',
      'true'
    )
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it.each(['not-an-email', 'missing@domain', 'spaced out@mail.com'])(
    'rejects the malformed address %p without submitting',
    async (value) => {
      const user = userEvent.setup()
      render(<ForgetPasswordPage />)

      await typeEmail(user, value)
      await user.click(screen.getByRole('button', { name: 'Send reset link' }))

      expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument()
      expect(global.fetch).not.toHaveBeenCalled()
    }
  )

  it('clears the error state as soon as the email is edited again', async () => {
    const user = userEvent.setup()
    render(<ForgetPasswordPage />)

    await user.click(screen.getByRole('button', { name: 'Send reset link' }))
    expect(screen.getByText('Enter your email address.')).toBeInTheDocument()

    await user.type(screen.getByLabelText('Email address'), 'a')

    expect(screen.queryByText('Enter your email address.')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Email address')).toHaveAttribute(
      'aria-invalid',
      'false'
    )
  })

  it('posts the email and shows the success state', async () => {
    global.fetch.mockResolvedValue({ ok: true, json: async () => ({}) })
    const user = userEvent.setup()
    render(<ForgetPasswordPage />)

    await typeEmail(user, 'shopper@example.com')
    await user.click(screen.getByRole('button', { name: 'Send reset link' }))

    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Check your email' })
      ).toBeInTheDocument()
    )

    expect(global.fetch).toHaveBeenCalledWith('/api/auth/forget-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'shopper@example.com' }),
    })
    expect(screen.getByText('shopper@example.com')).toBeInTheDocument()
  })

  it('returns to the form from the success state', async () => {
    global.fetch.mockResolvedValue({ ok: true, json: async () => ({}) })
    const user = userEvent.setup()
    render(<ForgetPasswordPage />)

    await typeEmail(user, 'shopper@example.com')
    await user.click(screen.getByRole('button', { name: 'Send reset link' }))
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Use a different email' })
      ).toBeInTheDocument()
    )

    await user.click(screen.getByRole('button', { name: 'Use a different email' }))

    expect(
      screen.getByRole('heading', { name: 'Forgot your password?' })
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Email address')).toHaveValue(
      'shopper@example.com'
    )
  })

  it('surfaces the server message when the request fails', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'No account for that email.' }),
    })
    const user = userEvent.setup()
    render(<ForgetPasswordPage />)

    await typeEmail(user, 'shopper@example.com')
    await user.click(screen.getByRole('button', { name: 'Send reset link' }))

    await waitFor(() =>
      expect(screen.getByText('No account for that email.')).toBeInTheDocument()
    )
  })

  it('falls back to a generic message when the error body is unreadable', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      json: async () => {
        throw new Error('invalid json')
      },
    })
    const user = userEvent.setup()
    render(<ForgetPasswordPage />)

    await typeEmail(user, 'shopper@example.com')
    await user.click(screen.getByRole('button', { name: 'Send reset link' }))

    await waitFor(() =>
      expect(
        screen.getByText('Something went wrong. Try again.')
      ).toBeInTheDocument()
    )
  })

  it('reports network failures', async () => {
    global.fetch.mockRejectedValue(new Error('Network down'))
    const user = userEvent.setup()
    render(<ForgetPasswordPage />)

    await typeEmail(user, 'shopper@example.com')
    await user.click(screen.getByRole('button', { name: 'Send reset link' }))

    await waitFor(() =>
      expect(screen.getByText('Network down')).toBeInTheDocument()
    )
  })

  it('disables the button and shows a spinner label while sending', async () => {
    let resolveFetch
    global.fetch.mockImplementation(
      () => new Promise((resolve) => {
        resolveFetch = () => resolve({ ok: true, json: async () => ({}) })
      })
    )
    const user = userEvent.setup()
    render(<ForgetPasswordPage />)

    await typeEmail(user, 'shopper@example.com')
    await user.click(screen.getByRole('button', { name: 'Send reset link' }))

    const button = await screen.findByRole('button', { name: 'Sending link...' })
    expect(button).toBeDisabled()

    resolveFetch()
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Check your email' })
      ).toBeInTheDocument()
    )
  })
})
