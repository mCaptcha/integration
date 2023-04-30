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

  settingsCssSelector: string;
  settingsCopyBtnCssSelector: string;
  updatedEmail: string;
  updatedEmail2: string;

  complexSitekeyDescription: string;
  complexSitekeyDuration: string;
  complexSitekeyVisitor1: string;
  complexSitekeyDifficulty1: string;
  complexSitekeyVisitor2: string;
  complexSitekeyDifficulty2: string;
  complexSitekeyVisitor3: string;
  complexSitekeyDifficulty3: string;

  complexCaptchaAboutUrl: string;

  registerUsernameWithoutEmaiUsernamel: string;
  registerUsernameWithoutEmaiUsername2: string;
  registerUsernameWithoutEmaiPassword: string;
  registerUsernameWithEmailEmail: string;
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

  this.settingsCssSelector =
    "li.secondary-menu__item:nth-child(3) > a:nth-child(1)";
  this.settingsCopyBtnCssSelector = ".settings__secret-copy";
  this.updatedEmail = "updateEmail@foo.com";
  this.updatedEmail2 = "updateEmail2@foo.com";

  this.complexSitekeyDescription = "complex sitekey nightwatch";
  this.complexSitekeyDuration = "40";
  this.complexSitekeyVisitor1 = "20";
  this.complexSitekeyDifficulty1 = "20";
  this.complexSitekeyVisitor2 = "40";
  this.complexSitekeyDifficulty2 = "40";
  this.complexSitekeyVisitor3 = "60";
  this.complexSitekeyDifficulty3 = "60";

  this.registerUsernameWithoutEmaiUsernamel = "nightwatchtestuser1";
  this.registerUsernameWithoutEmaiUsername2 = "nightwatchtestuser2";
  this.registerUsernameWithoutEmaiPassword = "password";
  this.registerUsernameWithEmailEmail = "registerEmail@nightwatch.example.com";

  // callback can be a regular function as well as an arrow function.
  beforeEach(function (this: ExtendDescribeThis<CustomThis>, browser) {
    browser.navigateTo(this.mCaptchaUrl!);
  });

  it("register account without email, update username and delete account", async (browser) => {
    browser
      .waitForElementVisible(this.usernameBox!)
      .click(".auth__secondary-action__link")
      .waitForElementVisible("#password-check")
      .sendKeys("#username", [this.registerUsernameWithoutEmaiUsernamel!])
      .sendKeys(this.passwordBox!, [this.registerUsernameWithoutEmaiPassword!])
      .sendKeys("#password-check", [this.registerUsernameWithoutEmaiPassword!]);

    browser.expect.element("#password").attribute("type").to.equal("password");
    browser.expect
      .element("#password-check")
      .attribute("type")
      .to.equal("password");
    browser.expect.element(this.showPasswordImg!).to.be.visible;
    browser.expect.element(this.hidePasswordImg!).not.be.visible;

    browser.click(this.showPasswordButton!);
    browser.expect.element(this.hidePasswordImg!).to.be.visible;
    browser.expect.element(this.showPasswordImg!).not.be.visible;
    browser.expect.element("#password").attribute("type").to.equal("text");
    browser.expect
      .element("#password-check")
      .attribute("type")
      .to.equal("text");

    browser.click(this.showPasswordButton!);
    browser.expect.element("#password").attribute("type").to.equal("password");
    browser.expect
      .element("#password-check")
      .attribute("type")
      .to.equal("password");
    browser.expect.element(this.showPasswordImg!).to.be.visible;
    browser.expect.element(this.hidePasswordImg!).not.be.visible;

    browser
      .click(this.submitButton!)
      .pause(1000)
      .waitForElementVisible(this.usernameBox!)
      .sendKeys(this.usernameBox!, [this.registerUsernameWithoutEmaiUsernamel!])
      .sendKeys(this.passwordBox!, [this.registerUsernameWithoutEmaiPassword!])
      .click(this.submitButton!)
      .assert.visible(".help-text");

    if (
      (await browser.getCssProperty(".nav__hamburger-menu", "display")) !=
      "none"
    ) {
      browser.click(".nav__hamburger-menu");
    }

    browser
      .click(this.settingsCssSelector!)
      .waitForElementVisible("#settings__username-form > button:nth-child(2)")
      .click("#username")
      .clearValue("#username")
      .sendKeys("#username", this.registerUsernameWithoutEmaiUsername2!)
      .click("#settings__username-form > button:nth-child(2)")
      .pause(1000)
      .waitForElementVisible("#settings__username-form > button:nth-child(2)")
      .click("li.taskbar__action:nth-child(5) > a:nth-child(1)")
      .waitForElementVisible(this.passwordBox!)
      .sendKeys(this.usernameBox!, [this.registerUsernameWithoutEmaiUsername2!])
      .sendKeys(this.passwordBox!, [this.registerUsernameWithoutEmaiPassword!])
      .click(this.submitButton!)
      .assert.visible(".help-text");

    if (
      (await browser.getCssProperty(".nav__hamburger-menu", "display")) !=
      "none"
    ) {
      browser.click(".nav__hamburger-menu");
    }

    browser
      .click(this.settingsCssSelector!)
      .waitForElementVisible("#settings__username-form > button:nth-child(2)")
      .click("#delete-account")
      .pause(1000)
      .acceptAlert()
      .waitForElementVisible(this.passwordBox!)
      .sendKeys(this.passwordBox!, [this.registerUsernameWithoutEmaiPassword!]);

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

    browser.click(this.submitButton!).assert.visible(this.usernameBox!);
  });

  it("register account with email and delete account", async (browser) => {
    browser
      .waitForElementVisible(this.usernameBox!)
      .click(".auth__secondary-action__link")
      .waitForElementVisible("#password-check")
      .sendKeys("#username", [this.registerUsernameWithoutEmaiUsernamel!])
      .sendKeys(this.passwordBox!, [this.registerUsernameWithoutEmaiPassword!])
      .sendKeys("#password-check", [this.registerUsernameWithoutEmaiPassword!])
      .sendKeys("#email", this.registerUsernameWithEmailEmail!)
      .click(this.submitButton!)
      .pause(1000)
      .waitForElementVisible(this.usernameBox!)
      .sendKeys(this.usernameBox!, [this.registerUsernameWithoutEmaiUsernamel!])
      .sendKeys(this.passwordBox!, [this.registerUsernameWithoutEmaiPassword!])
      .click(this.submitButton!)
      .assert.visible(".help-text");

    if (
      (await browser.getCssProperty(".nav__hamburger-menu", "display")) !=
      "none"
    ) {
      browser.click(".nav__hamburger-menu");
    }

    browser
      .click(this.settingsCssSelector!)
      .waitForElementVisible("#settings__username-form > button:nth-child(2)")
      .click("#delete-account")
      .pause(1000)
      .acceptAlert()
      .waitForElementVisible(this.passwordBox!)
      .sendKeys(this.passwordBox!, [this.registerUsernameWithoutEmaiPassword!]);

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

    browser.click(this.submitButton!).assert.visible(this.usernameBox!);
  });
});
