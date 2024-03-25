import { test, expect, Request, Response } from '@playwright/test'
import { StandardPageTests } from './playwright-common'

const HomePage = new StandardPageTests({ title: 'Home Page', url: '/'})
const DepartmentsPage = new StandardPageTests({ title: 'Departments Page', url: '/departments' })
const ProfilePage = new StandardPageTests({ title: 'Profile Page', url: '/profile/4523685' })
const SearchPage = new StandardPageTests({ title: 'Search Page w/o Query', url: '/search' })
const SearchPageWQuery = new StandardPageTests({ title: 'Search Page w/ Query', url: '/search?q=Jane' })


    HomePage.runStandardTests()
    DepartmentsPage.runStandardTests()
    ProfilePage.runStandardTests()
    SearchPage.runStandardTests()
    SearchPageWQuery.runStandardTests()

/*
test('homepage loads', async ({ page }) => {
  const loadResponse: Response | null = await page.goto('http://localhost:3000/')
  expect(loadResponse?.status()).toBe(200)
})
test('homepage dependencies load', async ({ page }) => {
  // Register page event listeners...
  // Capture all the page's depencency requests.
  const requests: Request[] = []
  page.on('request', request => requests.push(request))
  // Log all client side console logs to command terminal.
  page.on('console', async (msg) => {
    const msgArgs = msg.args()
    const logValues = await Promise.all(msgArgs.map(async arg => await arg.jsonValue()))
    console.log(...logValues)
  })

  // Navigate to the page and wait for all requests to resolve.
  await page.goto('http://localhost:3000/')
  // Collect all page load sub-request responses.
  const responses = await Promise.all(requests.map(request => request.response()))
  // console.log(responses.filter(resp => resp?.status() !== 200).map(resp => ({ url: resp?.url(), status: resp?.status()})))
  expect(responses.every(response => response?.status() === 200)).toBeTruthy()
})
test('homepage has title', async ({ page }) => {
  await expect(page).toHaveTitle("Faculty Profiles")
})
test('homepage search works', async ({ page }) => {
})
test('interactive experiment test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByPlaceholder('Search Name or Keyword').click();
  await page.getByPlaceholder('Search Name or Keyword').click();
  await page.getByPlaceholder('Search Name or Keyword').fill('Jane');
  await page.getByRole('button', { name: ' Search' }).click();
  await page.locator('div').filter({ hasText: /^Dr\. Jane Sue Doe-Remi$/ }).click();
  await page.getByRole('link', { name: 'Dr. Jane Sue Doe-Remi' }).click();
  await page.getByRole('button', { name: 'Show further titles and' }).click();
  await page.getByText('Lab Coordinator —').click();
  await page.getByRole('button', { name: 'Show further titles and' }).click();
  await expect(page.getByRole('button', { name: 'Show further titles and' })).toBeVisible();
  await page.getByRole('button', { name: 'Show further titles and' }).click();
  await expect(page.getByText('Lab Coordinator —')).toBeVisible();
  await page.getByRole('button', { name: 'Show further titles and' }).click();
}) */
