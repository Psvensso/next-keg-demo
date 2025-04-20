import { expect, Page, test } from "@playwright/test";

test.describe("Application functionality", () => {
  // Clear all applications before each test
  test.beforeEach(async ({ page }) => {
    // Clear applications via test API
    await clearAllApplications(page);
  });

  // Clean up after tests
  test.afterEach(async ({ page }) => {
    // Clear applications via test API
    await clearAllApplications(page);
  });

  test("should allow submitting an application and view it in applications list", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForSelector('[data-testid="course-list-card"]');

    const courseCards = await page
      .locator('[data-testid="course-list-card"]')
      .all();
    expect(courseCards.length).toBeGreaterThan(0);

    await courseCards[0].click();
    await page.waitForLoadState("networkidle");
    await page.waitForSelector('[data-testid="course-details-card-title"]', {
      timeout: 5000,
    });

    const courseTitle = await page
      .locator('[data-testid="course-details-card-title"]')
      .textContent();
    expect(courseTitle).toBeTruthy();

    await page.locator('[data-testid="new-application-card-toggler"]').click();
    await page.waitForSelector('[data-testid="new-application-form"]');

    // Act
    await page.fill('input[name="firstName"]', "Test User");
    await page.fill('input[name="lastName"]', "Test User");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="phone"]', "1234567890");
    await page.fill(
      'textarea[name="message"]',
      "This is a test application submitted by Playwright."
    );

    // Submit
    await page.locator('[data-testid="submit-application-btn"]').click();
    await page.waitForLoadState("networkidle");
    await page.waitForSelector("text=Application submitted");

    await page.goto("/applications");
    await page.waitForLoadState("networkidle");
    await page.waitForSelector(
      '[data-testid="submitted-application-course-description"]'
    );

    const applicationCards = await page
      .locator('[data-testid="submitted-application-course-card"]')
      .all();
    expect(applicationCards.length).toBeGreaterThan(0);

    const applicationText = await applicationCards[0].textContent();
    expect(applicationText).toContain("Test User");
    expect(applicationText).toContain("test@example.com");
    if (courseTitle) {
      expect(applicationText).toContain(courseTitle);
    }
  });
});

// Clear all applications via the test API
async function clearAllApplications(page: Page) {
  const response = await page.request.delete("/api/test/clearApplications");
  expect(response.status()).toBe(200);
  const json = await response.json();
  expect(json.success).toBe(true);
}
