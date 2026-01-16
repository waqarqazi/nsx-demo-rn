/**
 * Example E2E test using Detox
 * Tests critical user flow: Search and view trip details
 */

describe('Travel App E2E Tests', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display home screen', async () => {
    await expect(element(by.text('Explore the World'))).toBeVisible();
  });

  it('should navigate to search screen', async () => {
    await element(by.id('search-button')).tap();
    await expect(element(by.id('search-input'))).toBeVisible();
  });

  it('should search for trips', async () => {
    await element(by.id('search-button')).tap();
    await element(by.id('search-input')).typeText('Paris');
    await waitFor(element(by.id('tab-trips')))
      .toBeVisible()
      .withTimeout(2000);
  });

  it('should navigate to trip details', async () => {
    // Assuming there's at least one trip card
    await waitFor(element(by.id('trip-card-1')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id('trip-card-1')).tap();
    await expect(element(by.id('book-button'))).toBeVisible();
  });
});
