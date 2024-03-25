import { test as setup, expect } from '@playwright/test'

const authFile = 'testing/.auth/user.json'

setup('authenticate', async ({ page }) => {
  /* Demo auth steps - Define as needed for your project.
  await page.goto('/login')
  await page.getByLabel('Username or email address').fill('username')
  await page.getByLabel('Password').fill('password')
  await page.getByRole('button', { name: 'Sign in' }).click()
  // Wait until the page receives the cookies - sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('/')
  */
  /* Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible() */

  await expect(page).toHaveURL(/.*/)
  await page.context().storageState({ path: authFile })
})
