import { expect, Page, test } from "@playwright/test";

test.describe("Favorites functionality", () => {
  // Clear all favorites before each test
  test.beforeEach(async ({ page }) => {
    // Navigate to favorites page
    await page.goto("/favorites");

    // Check if Remove All button exists (means we have favorites)
    const removeAllBtnExists =
      (await page.locator('[data-testid="remove-all-favorites-btn"]').count()) >
      0;

    if (removeAllBtnExists) {
      await page.locator('[data-testid="remove-all-favorites-btn"]').click();
      await page.waitForSelector('[data-testid="favorites-list-empty"]');
    }
  });

  test("should add favorites, update counter and display them on favorites page", async ({
    page,
  }) => {
    //Setup
    // Go to the homepage / course list
    await page.goto("/");
    await page.waitForSelector('[data-testid="course-list-card"]');

    // Ensure some data are on first page
    const courseCards = await page
      .locator('[data-testid="course-list-card"]')
      .all();

    // Check top fav nav btn count (should be 0 since were resetting in teh beforeEach)
    expect(await getFavoritesNavBtnCounter(page)).toBe(0);
    expect(courseCards.length > 2).toBeTruthy();

    // Act
    // Add 2 favorites one by one
    for (let i = 0; i < 2; i++) {
      // Click on a course card to go to its detail page
      await courseCards[i].click();

      // Wait for the page to load
      await page.waitForSelector(
        '[data-testid="favorites-toggle-btn-isNotFavorite"]'
      );

      // Click the favorite star button to toggle favorite status
      await page
        .locator('[data-testid="favorites-toggle-btn-isNotFavorite"]')
        .click();

      // Wait for the UI to update
      await page.waitForLoadState("networkidle");

      //Cant make it work without this timeout
      //Could wait for a selector or something but leaving it for now.
      await page.waitForTimeout(250);

      // Verify counter
      const count = await getFavoritesNavBtnCounter(page);
      expect(count).toBe(i + 1);

      await page.goto("/");
      await page.waitForSelector('[data-testid="course-list-card"]');

      // Verify counter
      expect(await getFavoritesNavBtnCounter(page)).toBe(i + 1);
    }

    // Assert
    const updatedFavoriteCount = await getFavoritesNavBtnCounter(page);
    expect(updatedFavoriteCount).toBe(2);

    // Assert the list on the favorites page
    await page.locator('[data-testid="favorites-nav-btn"]').click();
    await page.waitForLoadState("networkidle");
    await page.waitForSelector('[data-testid="favorites-list"]');
    const favoriteCourses = await page
      .locator('[data-testid="course-list-card"]')
      .count();
    expect(favoriteCourses).toBe(2);
  });
});

// Helper function to extract the count from the favorites nav button
async function getFavoritesNavBtnCounter(page: Page) {
  const navBtnText = await page
    .locator('[data-testid="favorites-nav-btn"]')
    .textContent();

  // Extract the number from text like "Favorites 3"
  const n = navBtnText?.trim()?.split(" ")[1];
  if (typeof n !== "string") {
    throw new Error("Unable to find number in btn");
  }
  return parseInt(n, 10);
}
