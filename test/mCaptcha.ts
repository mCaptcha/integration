/*
 * Copyright (C) 2023  Aravinth Manivannan <realaravinth@batsense.net>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { ExtendDescribeThis } from "nightwatch";

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

  simpleCaptchaAboutUrl: string;

  sitekeyFormWidgetLink: string;
  sitekeyFormEditWidgetLink: string;
  sitekeyFormDeleteWidgetLink: string;

  parent_window: string;
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

  this.sitekeyFormWidgetLink = ".sitekey-form__widget-link";
  this.sitekeyFormEditWidgetLink = ".sitekey-form__edit";

  this.sitekeyFormDeleteWidgetLink = ".sitekey-form__delete";

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

  it("create mCaptcha widget, the simple way", async (browser) => {
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

    this.simpleCaptchaAboutUrl = await browser.getCurrentUrl();
  });

  it("access simple widget and check if all states work", async (browser) => {
    browser
      .navigateTo(this.simpleCaptchaAboutUrl!)
      .assert.visible(".notification__title-text");

    //    browser.getAttribute(this.siteKeyDescriptionBox!, "readonly", (v) => {
    //      expect(v.value).to.be.true;
    //    });

    this.parent_window = await browser.windowHandle();
    browser.getAttribute("h1 a", "href", async (link) => {
      browser.click(this.sitekeyFormWidgetLink!);

      const allHandles = await browser.windowHandles();

      browser
        .switchWindow(allHandles[1])
        .assert.urlEquals(
          `https://demo.mcaptcha.org${link.value?.toString()!}`
        );

      browser.closeWindow();

      browser.switchWindow(this.parent_window!);
    });
  });

  it("access edit simple widget and check if all states work", async (browser) => {
    browser
      .navigateTo(this.simpleCaptchaAboutUrl!)
      .assert.visible(".notification__title-text");

    browser.click(this.sitekeyFormEditWidgetLink!);

    browser.expect.element(this.siteKeyDescriptionBox!).visible;
    browser.expect.element(this.averageTrafficBox!).visible;
    browser.expect.element(this.maxTrafficBox!).visible;
    browser.expect.element(this.thresholdTrafficBox!).visible;

    browser.getAttribute(this.siteKeyDescriptionBox!, "readonly", (v) => {
      expect(v.value).to.be.null;
    });

    browser.getAttribute(this.averageTrafficBox!, "readonly", (v) => {
      expect(v.value).to.be.null;
    });

    browser.getAttribute(this.maxTrafficBox!, "readonly", (v) => {
      expect(v.value).to.be.null;
    });

    browser
      .click("button.taskbar__add-site")
      .assert.urlEquals("https://demo.mcaptcha.org/sitekeys/easy/add")
      .waitForElementVisible(this.averageTrafficBox!)
      .sendKeys(this.siteKeyDescriptionBox!, [this.siteKeyDescription!])
      .sendKeys(this.averageTrafficBox!, [
        (this.averageTraffic! * 2).toString(),
      ])
      .sendKeys(this.maxTrafficBox!, [(this.peakTraffic! * 2).toString()])
      .sendKeys(this.thresholdTrafficBox!, [
        (this.thresholdTraffic! * 2).toString(),
      ])
      .click(this.simpleSiteKeySubmitButton!)
      .assert.visible(".notification__title-text");
  });

  it("delete simple widget", async (browser) => {
    browser
      .navigateTo(this.simpleCaptchaAboutUrl!)
      .assert.visible(".notification__title-text");

    browser.click(this.sitekeyFormDeleteWidgetLink!);

    browser.expect.element(".form__title").text.to.be.equal("Confirm Access");

    browser
      .waitForElementVisible(this.passwordBox!)
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
});
