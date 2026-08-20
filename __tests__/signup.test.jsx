import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignupPage from '@/app/signup/page'

describe('SignupPage', () => {
  it('renders every required field with the expected input type', () => {
    render(<SignupPage />)

    const fields = [
      ['Full Name', 'text'],
      ['Address', 'text'],
      ['Email', 'email'],
      ['Mobile Number', 'tel'],
      ['Password', 'password'],
      ['Confirm Password', 'password'],
    ]

    fields.forEach(([label, type]) => {
      const input = screen.getByLabelText(label)
      expect(input).toBeRequired()
      expect(input).toHaveAttribute('type', type)
    })
  })

  it('requires accepting the terms and conditions', async () => {
    const user = userEvent.setup()
    render(<SignupPage />)

    const accept = screen.getByRole('checkbox', { name: /I accept the/ })
    expect(accept).toBeRequired()
    expect(accept).not.toBeChecked()

    await user.click(accept)

    expect(accept).toBeChecked()
    expect(screen.getByRole('link', { name: 'Terms and Conditions' })).toBeInTheDocument()
  })

  it('submits through the create-account button and links back to sign in', () => {
    render(<SignupPage />)

    expect(
      screen.getByRole('button', { name: 'Create an account' })
    ).toHaveAttribute('type', 'submit')
    expect(screen.getByRole('link', { name: 'Back' })).toHaveAttribute(
      'href',
      '/signin'
    )
  })
})
