import { ExtendDescribeThis } from "nightwatch";

//interface CustomThis {
//  duckDuckGoUrl: string;
//  searchBox: string;
//  submitButton: string;
//}
//
//// callback passed to `describe` should be a regular function (not an arrow function).
//describe('duckduckgo example', function(this: ExtendDescribeThis<CustomThis>) {
//  this.duckDuckGoUrl = 'https://duckduckgo.com';
//  this.searchBox = 'input[name=q]';
//  this.submitButton = '*[type=submit]';
//
//  // callback can be a regular function as well as an arrow function.
//  beforeEach(function(this: ExtendDescribeThis<CustomThis>, browser) {
//    browser.navigateTo(this.duckDuckGoUrl!);
//  });
//
//  // no need to specify `this` parameter when passing an arrow function
//  // as callback to `it`.
//  it('Search Nightwatch.js and check results', (browser) => {
//    browser
//      .waitForElementVisible(this.searchBox!)
//      .sendKeys(this.searchBox!, ['Nightwatch.js'])
//      .click(this.submitButton!)
//      .assert.visible('.results--main')
//      .assert.textContains('.results--main', 'Nightwatch.js');
//  });
//});

interface CustomThis {
  mCaptchaUrl: string;
  usernameBox: string;
  passwordBox: string;
  submitButton: string;
  showPasswordButton: string;
  showPasswordImg: string;
  hidePasswordImg: string;
  username: string;
  password: string;

  averageTrafficBox: string;
  siteKeyDescriptionBox: string;
  maxTrafficBox: string;
  thresholdTrafficBox: string;
  siteKeyDescription: string;
  averageTraffic: number;
  peakTraffic: number;
  thresholdTraffic: number;
  simpleSiteKeySubmitButton: string;
}

// callback passed to `describe` should be a regular function (not an arrow function).
describe("mCaptcha login example", function (this: ExtendDescribeThis<CustomThis>) {
  this.mCaptchaUrl = "https://demo.mcaptcha.org";
  this.usernameBox = "input[name=login]";
  this.passwordBox = "input[name=password]";
  this.submitButton = "*[type=submit]";
  this.showPasswordButton = ".show-password-container";
  this.showPasswordImg = ".show-password--show";
  this.hidePasswordImg = ".show-password--hide";
  this.username = "aaronsw";
  this.password = "password";

  // callback can be a regular function as well as an arrow function.
  beforeEach(function (this: ExtendDescribeThis<CustomThis>, browser) {
    browser.navigateTo(this.mCaptchaUrl!);
  });

  // no need to specify `this` parameter when passing an arrow function
  // as callback to `it`.
  it("fill username and password with demo credentials, verify show password works and try login", (browser) => {
    browser
      .waitForElementVisible(this.usernameBox!)
      .sendKeys(this.usernameBox!, [this.username!])
      .sendKeys(this.passwordBox!, [this.password!]);

    browser.expect.element("#password").attribute("type").to.equal("password");
    browser.expect.element(this.showPasswordImg!).to.be.visible;
    browser.expect.element(this.hidePasswordImg!).not.be.visible;

    browser.click(this.showPasswordButton!);
    browser.expect.element(this.hidePasswordImg!).to.be.visible;
    browser.expect.element(this.showPasswordImg!).not.be.visible;
    browser.expect.element("#password").attribute("type").to.equal("text");

    browser.click(this.showPasswordButton!);
    browser.expect.element("#password").attribute("type").to.equal("password");
    browser.expect.element(this.showPasswordImg!).to.be.visible;
    browser.expect.element(this.hidePasswordImg!).not.be.visible;

    browser.click(this.submitButton!).assert.visible(".help-text");
  });

  const login = (obj: ExtendDescribeThis<CustomThis>, browser: any) => {
    browser
      .waitForElementVisible(obj.usernameBox!)
      .sendKeys(obj.usernameBox!, [obj.username!])
      .sendKeys(obj.passwordBox!, [obj.password!])
      .click(obj.submitButton!)
      .assert.visible(".help-text");
  };

  it("create mCaptcha widget, the simple way", (browser) => {
    //    login(this, browser);
    this.siteKeyDescriptionBox = "input[name=description]";
    this.averageTrafficBox = "input[name=avg_traffic]";
    this.maxTrafficBox = "input[name=peak_sustainable_traffic]";
    this.thresholdTrafficBox = "input[name=broke_my_site_traffic]";
    this.siteKeyDescription = "create mcaptcha widget; the simple way";
    this.averageTraffic = 500;
    this.peakTraffic = 5_000;
    this.thresholdTraffic = 50_000;
    this.simpleSiteKeySubmitButton = ".sitekey-form__submit";

    browser
      .click("button.taskbar__add-site")
      .assert.urlEquals("https://demo.mcaptcha.org/sitekeys/easy/add")
      .waitForElementVisible(this.averageTrafficBox!)
      .sendKeys(this.siteKeyDescriptionBox!, [this.siteKeyDescription!])
      .sendKeys(this.averageTrafficBox!, [this.averageTraffic!.toString()])
      .sendKeys(this.maxTrafficBox!, [this.peakTraffic!.toString()])
      .sendKeys(this.thresholdTrafficBox!, [this.thresholdTraffic!.toString()])
      .click(this.simpleSiteKeySubmitButton!)
      .assert.visible(".notification__title-text");
  });
});
