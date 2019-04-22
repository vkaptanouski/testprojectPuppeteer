
const puppeteer = require('puppeteer');

const selectors = {
  developerNameTextField: '#developer-name',
  reusingJSCodeCheckboxInput: '#reusing-js-code',
  reusingJSCodeCheckboxLabel: '[for="reusing-js-code"]',
  contIntgCheckboxInput: '#continuous-integration-embedding',
  contIntgCheckboxLabel: '[for="continuous-integration-embedding"]',
  macOsOperSys: '#macos',
  submitBtn: '#submit-button',
  articleHeader: '#article-header',
  interfaceDropdown: '#preferred-interface',
  triedTestCafeCheckboxInput: '#tried-test-cafe',
  slider: '#testcafe-rank',
  sliderHandle: '.ui-slider-handle',
  textAreaComments: '#comments',
};

const pageURL = 'https://devexpress.github.io/testcafe/example/';
let page;
let browser;
const expectedReusingJSCodeCheckboxLabel = 'Re-using existing JavaScript code for testing';
const expectedContIntgCheckboxLabel = 'Easy embedding into a Continuous integration system';
const expectedinterfaceDropdownValue = 'JavaScript API';
const expectedTextAreaComments = 'Puppeteer is amazing framework!';
const expectedDeveloperName = 'Developer';

describe('Getting Started', () => {
	beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      // slowMo: 20, // slow down by 20ms
    });
    page = await browser.newPage();
		await page.goto(pageURL);
	});

	it('Select important features', async () => {
		const reusingJSCodeCheckboxInput = await page.waitForSelector(selectors.reusingJSCodeCheckboxInput);
		const reusingJSCodeCheckboxLabel = await page.$eval(selectors.reusingJSCodeCheckboxLabel, el => el.innerText);
		const contIntgCheckboxInput = await page.waitForSelector(selectors.contIntgCheckboxInput);
		const contIntgCheckboxLabel = await page.$eval(selectors.contIntgCheckboxLabel, el => el.innerText);
		expect(reusingJSCodeCheckboxInput).toBeDefined();
		expect(reusingJSCodeCheckboxLabel).toBe(expectedReusingJSCodeCheckboxLabel);
		expect(contIntgCheckboxInput).toBeDefined();
		expect(contIntgCheckboxLabel).toBe(expectedContIntgCheckboxLabel);
		await page.click(selectors.reusingJSCodeCheckboxInput);
		await page.click(selectors.contIntgCheckboxInput);
		const reusingJSCodeCheckboxInputChecked = await page.$eval(selectors.reusingJSCodeCheckboxInput, el => el.checked);
		const contIntgCheckboxChecked = await page.$eval(selectors.contIntgCheckboxInput, el => el.checked);
		expect(reusingJSCodeCheckboxInputChecked).toBeTruthy();
		expect(contIntgCheckboxChecked).toBeTruthy();
	});

  it('Select OS', async () => {
		const macOsOperSys = await page.waitForSelector(selectors.macOsOperSys);
	  expect(macOsOperSys).toBeDefined();
		await page.click(selectors.macOsOperSys);
		const macOsOperSysChecked = await page.$eval(selectors.macOsOperSys, el => el.checked);
	  expect(macOsOperSysChecked).toBeTruthy();
  });

  it('Select interface', async () => {
		const interfaceDropdown = await page.waitForSelector(selectors.interfaceDropdown);
		expect(interfaceDropdown).toBeDefined();
	  await page.click(selectors.interfaceDropdown);
		await page.select(selectors.interfaceDropdown, expectedinterfaceDropdownValue);
		const interfaceDropdownValue = await page.$eval(selectors.interfaceDropdown, el => el.value);
	  expect(interfaceDropdownValue).toBe(expectedinterfaceDropdownValue);
  });

  it('Fill text area what do you think', async () => {
		 const triedTestCafeCheckboxInput = await page.waitForSelector(selectors.triedTestCafeCheckboxInput);
		 expect(triedTestCafeCheckboxInput).toBeDefined();
		 await page.click(selectors.triedTestCafeCheckboxInput);
		 const textAreaCommentsState = await page.$eval(selectors.textAreaComments, el => el.disabled);
	   expect(textAreaCommentsState).toBeFalsy();
		 await page.type(selectors.textAreaComments, expectedTextAreaComments);
		 const textAreaComments = await page.$eval(selectors.textAreaComments, el => el.value);
	   expect(textAreaComments).toBe(expectedTextAreaComments);
  });

	it('Fill developer name in text field', async () => {
		const developerNameTextField = await page.waitForSelector(selectors.developerNameTextField);
		expect(developerNameTextField).toBeDefined();
		await page.type(selectors.developerNameTextField, expectedDeveloperName);
		const developerNameTextFieldValue = await page.$eval(selectors.developerNameTextField, el => el.value);
		expect(developerNameTextFieldValue).toBe(expectedDeveloperName);
		const submitBtnState = await page.$eval(selectors.submitBtn, el => el.disabled);
		expect(submitBtnState).toBeFalsy();
		await page.click(selectors.submitBtn);
		await page.waitForNavigation();
		const articleHeader = await page.waitForSelector(selectors.articleHeader);
		expect(articleHeader).toBeDefined();
		const articleHeaderText = await page.$eval(selectors.articleHeader, el => el.innerText);
		expect(articleHeaderText).toBe(`Thank you, ${expectedDeveloperName}!`);
	});

	afterAll(async () => {
		await page.close();
		await browser.close();
	});

});
