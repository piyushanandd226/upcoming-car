import { browser, by, element } from 'protractor';

describe('Add Car page', () => {
  beforeAll(() => {
    browser.get('/addcar');
  });

  it('should have an Add Car form with file input', async () => {
    const fileInput = element(by.css('input[type="file"]'));
    expect(await fileInput.isPresent()).toBe(true);
  });
});
