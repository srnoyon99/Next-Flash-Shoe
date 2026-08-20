import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navbar from '@/components/navbar'

const push = jest.fn()
let pathname = '/'

jest.mock('next/navigation', () => ({
  usePathname: () => pathname,
  useRouter: () => ({ push }),
}))

const setMatchMedia = (prefersDark) => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: prefersDark,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }))
}

// The desktop row and the mobile drawer render duplicate controls, so queries
// are scoped to one of these regions.
const desktopRow = () => document.querySelector('div.lg\\:flex')
const desktopLinkStrip = () => document.querySelector('div.lg\\:block')
const mobileDrawer = () => document.querySelector('aside')

const desktopThemeToggle = () =>
  within(desktopRow()).getByRole('button', { name: 'Toggle light and dark mode' })

describe('Navbar', () => {
  beforeEach(() => {
    pathname = '/'
    push.mockClear()
    window.localStorage.clear()
    document.documentElement.className = ''
    setMatchMedia(false)
  })

  describe('theme initialisation', () => {
    it('applies the stored dark theme', () => {
      window.localStorage.setItem('theme', 'dark')

      render(<Navbar />)

      expect(document.documentElement).toHaveClass('dark')
      expect(desktopThemeToggle()).toHaveTextContent('Dark mode')
    })

    it('applies the stored light theme even when the OS prefers dark', () => {
      setMatchMedia(true)
      window.localStorage.setItem('theme', 'light')

      render(<Navbar />)

      expect(document.documentElement).toHaveClass('light')
      expect(desktopThemeToggle()).toHaveTextContent('Light mode')
    })

    it('falls back to the OS preference and persists it', () => {
      setMatchMedia(true)

      render(<Navbar />)

      expect(document.documentElement).toHaveClass('dark')
      expect(window.localStorage.getItem('theme')).toBe('dark')
    })

    it('ignores an unrecognised stored value', () => {
      window.localStorage.setItem('theme', 'sepia')

      render(<Navbar />)

      expect(document.documentElement).toHaveClass('light')
      expect(window.localStorage.getItem('theme')).toBe('light')
    })
  })

  it('toggles the theme and persists the new value', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    await user.click(desktopThemeToggle())

    expect(document.documentElement).toHaveClass('dark')
    expect(document.documentElement).not.toHaveClass('light')
    expect(window.localStorage.getItem('theme')).toBe('dark')
    expect(desktopThemeToggle()).toHaveTextContent('Dark mode')

    await user.click(desktopThemeToggle())

    expect(document.documentElement).toHaveClass('light')
    expect(window.localStorage.getItem('theme')).toBe('light')
    expect(desktopThemeToggle()).toHaveTextContent('Light mode')
  })

  it('renders the wishlist and cart badge counts in both rows', () => {
    render(<Navbar wishlistCount={3} cartCount={7} />)

    const cartLinks = screen.getAllByRole('link', { name: /Shopping cart/ })
    expect(cartLinks).toHaveLength(2)
    cartLinks.forEach((link) => expect(link).toHaveTextContent('7'))

    const wishlistLinks = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href') === '/wishlist')
    expect(wishlistLinks).toHaveLength(2)
    wishlistLinks.forEach((link) => expect(link).toHaveTextContent('3'))
  })

  it('defaults both badge counts to zero', () => {
    render(<Navbar />)

    screen
      .getAllByRole('link', { name: /Shopping cart/ })
      .forEach((link) => expect(link).toHaveTextContent('0'))
  })

  describe('navigation links', () => {
    it('includes a Sign In link only for anonymous visitors', () => {
      render(<Navbar />)

      expect(
        within(desktopLinkStrip()).getByRole('link', { name: 'Sign In' })
      ).toHaveAttribute('href', '/signin')
    })

    it('omits the Sign In link when a user is signed in', () => {
      render(<Navbar currentUser={{ email: 'shopper@example.com' }} />)

      expect(
        within(desktopLinkStrip()).queryByRole('link', { name: 'Sign In' })
      ).not.toBeInTheDocument()
    })

    it('marks Home active only on the root path', () => {
      render(<Navbar />)

      const strip = within(desktopLinkStrip())
      expect(strip.getByRole('link', { name: 'Home' }).className).toContain(
        'border-b-2'
      )
      expect(strip.getByRole('link', { name: 'Brands' }).className).not.toContain(
        'border-b-2'
      )
    })

    it('marks a section active for nested paths', () => {
      pathname = '/brands/nike'
      render(<Navbar />)

      const strip = within(desktopLinkStrip())
      expect(strip.getByRole('link', { name: 'Brands' }).className).toContain(
        'border-b-2'
      )
      expect(strip.getByRole('link', { name: 'Home' }).className).not.toContain(
        'border-b-2'
      )
    })
  })

  describe('desktop account dropdown', () => {
    it('shows guest entries and closes on an outside click', async () => {
      const user = userEvent.setup()
      render(<Navbar />)

      await user.click(screen.getByRole('button', { name: 'Account menu' }))

      const menu = within(desktopRow())
      expect(menu.getByRole('link', { name: /Sign In/ })).toBeInTheDocument()
      expect(menu.getByRole('link', { name: /Create Account/ })).toBeInTheDocument()

      await user.click(document.body)

      expect(
        within(desktopRow()).queryByRole('link', { name: /Create Account/ })
      ).not.toBeInTheDocument()
    })

    it('shows the signed-in entries and the user email', async () => {
      const user = userEvent.setup()
      render(<Navbar currentUser={{ email: 'shopper@example.com' }} />)

      await user.click(screen.getByRole('button', { name: 'Account menu' }))

      const menu = within(desktopRow())
      expect(menu.getByText('shopper@example.com')).toBeInTheDocument()
      expect(menu.getByRole('link', { name: /Manage My Account/ })).toHaveAttribute(
        'href',
        '/account'
      )
      expect(menu.getByRole('link', { name: /My Order/ })).toHaveAttribute(
        'href',
        '/orders'
      )
      expect(menu.getByRole('link', { name: /My Cancellation/ })).toHaveAttribute(
        'href',
        '/cancellations'
      )
      expect(menu.getByRole('link', { name: /My Reviews/ })).toHaveAttribute(
        'href',
        '/reviews'
      )
    })

    it('closes when one of its links is followed', async () => {
      const user = userEvent.setup()
      render(<Navbar currentUser={{ email: 'shopper@example.com' }} />)

      await user.click(screen.getByRole('button', { name: 'Account menu' }))
      await user.click(within(desktopRow()).getByRole('link', { name: /My Reviews/ }))

      expect(
        within(desktopRow()).queryByRole('link', { name: /My Reviews/ })
      ).not.toBeInTheDocument()
    })
  })

  describe('mobile drawer account dropdown', () => {
    it('lists guest entries and closes on an outside click', async () => {
      const user = userEvent.setup()
      render(<Navbar />)

      const drawer = () => within(mobileDrawer())
      await user.click(drawer().getByRole('button', { name: /Account/ }))

      expect(drawer().getByRole('link', { name: /Create Account/ })).toHaveAttribute(
        'href',
        'signup'
      )

      await user.click(document.body)

      expect(
        drawer().queryByRole('link', { name: /Create Account/ })
      ).not.toBeInTheDocument()
    })

    it('closes the drawer when a signed-in entry is followed', async () => {
      const user = userEvent.setup()
      render(<Navbar currentUser={{ email: 'shopper@example.com' }} />)

      const drawerToggle = document.getElementById('flash-mobile-drawer')
      await user.click(screen.getByLabelText('Toggle menu'))
      expect(drawerToggle).toBeChecked()

      const drawer = () => within(mobileDrawer())
      await user.click(drawer().getByRole('button', { name: /Account/ }))
      await user.click(drawer().getByRole('link', { name: /My Order/ }))

      expect(drawerToggle).not.toBeChecked()
      expect(drawer().queryByRole('link', { name: /My Order/ })).not.toBeInTheDocument()
    })
  })

  describe('logout', () => {
    it('calls onLogout, closes the menu and redirects', async () => {
      const onLogout = jest.fn().mockResolvedValue(undefined)
      const user = userEvent.setup()
      render(
        <Navbar currentUser={{ email: 'shopper@example.com' }} onLogout={onLogout} />
      )

      await user.click(screen.getByRole('button', { name: 'Account menu' }))
      await user.click(within(desktopRow()).getByRole('button', { name: /Log Out/ }))

      await waitFor(() => expect(onLogout).toHaveBeenCalledTimes(1))
      expect(push).toHaveBeenCalledWith('/auth/login')
      expect(
        within(desktopRow()).queryByRole('link', { name: /My Reviews/ })
      ).not.toBeInTheDocument()
    })

    it('redirects even without an onLogout handler', async () => {
      const user = userEvent.setup()
      render(<Navbar currentUser={{ email: 'shopper@example.com' }} />)

      await user.click(screen.getByRole('button', { name: 'Account menu' }))
      await user.click(within(desktopRow()).getByRole('button', { name: /Log Out/ }))

      await waitFor(() => expect(push).toHaveBeenCalledWith('/auth/login'))
    })

    it('logs the failure and stays put when onLogout rejects', async () => {
      const error = new Error('session expired')
      const onLogout = jest.fn().mockRejectedValue(error)
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
      const user = userEvent.setup()
      render(
        <Navbar currentUser={{ email: 'shopper@example.com' }} onLogout={onLogout} />
      )

      await user.click(screen.getByRole('button', { name: 'Account menu' }))
      await user.click(within(desktopRow()).getByRole('button', { name: /Log Out/ }))

      await waitFor(() =>
        expect(consoleError).toHaveBeenCalledWith('Logout failed:', error)
      )
      expect(push).not.toHaveBeenCalled()

      consoleError.mockRestore()
    })
  })

  describe('mobile search', () => {
    it('opens and closes the popular searches panel', async () => {
      const user = userEvent.setup()
      render(<Navbar />)

      expect(screen.queryByText('Popular Searches')).not.toBeInTheDocument()

      const [searchToggle] = screen.getAllByRole('button', { name: 'Search' })
      await user.click(searchToggle)

      const panel = screen.getByText('Popular Searches').parentElement
      expect(
        within(panel).getByRole('button', { name: 'Electronics' })
      ).toBeInTheDocument()
      expect(within(panel).getByRole('button', { name: 'Fashion' })).toBeInTheDocument()

      await user.click(searchToggle)

      expect(screen.queryByText('Popular Searches')).not.toBeInTheDocument()
    })
  })

  describe('mobile drawer', () => {
    it('toggles via the drawer checkbox and closes on link navigation', async () => {
      const user = userEvent.setup()
      render(<Navbar />)

      const drawerToggle = document.getElementById('flash-mobile-drawer')
      expect(drawerToggle).not.toBeChecked()

      await user.click(screen.getByLabelText('Toggle menu'))
      expect(drawerToggle).toBeChecked()

      await user.click(
        within(mobileDrawer()).getByRole('link', { name: 'Accessories' })
      )

      expect(drawerToggle).not.toBeChecked()
    })

    it('closes when the overlay is clicked', async () => {
      const user = userEvent.setup()
      render(<Navbar />)

      const drawerToggle = document.getElementById('flash-mobile-drawer')
      await user.click(screen.getByLabelText('Toggle menu'))
      expect(drawerToggle).toBeChecked()

      await user.click(screen.getByLabelText('close sidebar'))

      expect(drawerToggle).not.toBeChecked()
    })

    it('renders the log out button only for signed-in users', () => {
      const { unmount } = render(<Navbar />)
      expect(
        within(mobileDrawer()).queryByRole('button', { name: 'Log Out' })
      ).not.toBeInTheDocument()
      unmount()

      render(<Navbar currentUser={{ email: 'shopper@example.com' }} />)
      expect(
        within(mobileDrawer()).getByRole('button', { name: 'Log Out' })
      ).toBeInTheDocument()
    })
  })

  describe('scroll shadow', () => {
    it('adds the shadow past 200px and removes it back at the top', () => {
      render(<Navbar />)
      const nav = document.querySelector('nav')

      window.scrollY = 250
      window.dispatchEvent(new Event('scroll'))
      expect(nav).toHaveClass('shadow-md')

      window.scrollY = 0
      window.dispatchEvent(new Event('scroll'))
      expect(nav).not.toHaveClass('shadow-md')
    })

    it('removes its scroll listener on unmount', () => {
      const removeEventListener = jest.spyOn(window, 'removeEventListener')
      const { unmount } = render(<Navbar />)

      unmount()

      expect(removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
      removeEventListener.mockRestore()
    })
  })
})
