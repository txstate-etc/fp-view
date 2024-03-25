import { test as base, expect, type Page, type Response, type Request, type BrowserContext, Browser } from '@playwright/test'

export interface LoadOptions {
  title?: string
  status?: number
  url: string
}

export class StandardPageTests {
  private readonly title: string
  private readonly url: string
  private readonly targetStatus: number = 200
  private page: Page
  private loadResponse: Response | null
  private errors: Error[] = []
  private readonly dependencies: Request[] = []
  private readonly dependenciesResponses: (Response | null)[] = []
  public readonly test: typeof base = base

  constructor (public readonly opts: LoadOptions ) {
    this.title = opts.title ?? opts.url
    this.url = opts.url
    this.targetStatus = opts.status ?? 200
    this.test.beforeAll(async ({ context }) => {
      this.page = await context.newPage()
      /* Peform any login or steup tasks here...
      //   this.page.goto('http://localhost:3000/login')
      //   Do login stuff and inspect response before registering listeners and going to actual page to test...
      // Register specific page event listeners... */
      this.page.on('request', request => this.dependencies.push(request))
      this.page.on('console', async (msg) => {
        const msgArgs = msg.args()
        const logValues = await Promise.all(msgArgs.map(async arg => await arg.jsonValue()))
      })
      this.page.on('pageerror', async (error) => this.errors.push(error) && console.error(error))
    })
    this.test.afterAll(async () => {
      // Perform any logout or cleanup tasks here...
      await this.page.close()
    })
  }
  public runStandardTests () {
    this.test.describe(`Standard Page Tests - ${this.title}`, async () => {
      this.test('Loads', async () => {
        this.page.goto(this.url)
        expect(this.loadResponse?.status()).toBe(this.targetStatus)
        this.dependenciesResponses.push(...(await Promise.all(this.dependencies.map(request => request.response()))))
        expect(this.dependenciesResponses.filter(response => response?.status() !== this.targetStatus).length).toBe(0)
      })
      this.test.describe.parallel('Standards Compliance', async () => {
        this.test('Has A Title', async () => {
          await expect(this.page).toHaveTitle(/.+/)
        })
      })
      // Any additional tests desired...
    })
  }
}

/*
export function pageLoads (title: string, url: string, opts: LoadOptions) {
  test(`${title} - Loads`, async ({ page }) => {
    const loadResponse: Response | null = opts.navigated ?? await page.goto(url)
    expect(loadResponse?.status()).toBe(opts.status ?? 200)
  })
}
export function pageDependenciesLoad (title: string, url: string, opts: LoadOptions) {
    test(`${title} - Loads Dependencies`, async ({ page }) => {
    // Register page event listeners...
    // Capture all the page's depencency requests.
    const requests: Request[] = []
    page.on('request', request => requests.push(request))
    // Log all client side console logs to command terminal.
    page.on('console', async (msg) => {
      const msgArgs = msg.args()
      const logValues = await Promise.all(msgArgs.map(async arg => await arg.jsonValue()))
    })

    // Navigate to the page and wait for all requests to resolve.
    if (!opts.navigated) await page.goto(url)
    // Collect all page load sub-request responses.
    const responses = await Promise.all(requests.map(request => request.response()))
    // console.log(responses.filter(resp => resp?.status() !== 200).map(resp => ({ url: resp?.url(), status: resp?.status()})))
    expect(responses.every(response => response?.status() === opts.status ?? 200)).toBeTruthy()
  })
}

export async function pageStandardTests (title: string, url: string, status: number) {
  test.describe(`${title} - Standard Page Tests`, () => {
    pageLoads(title, url, status)
    pageDependenciesLoad(title, url, status)
    test(`${title} - Has A Title`, async ({ page }) => {
      await page.goto(url)
      await expect(page).toHaveTitle(/.*\/)
    })
  })
} */
