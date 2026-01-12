import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginHeaderButton: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginHeaderButton = page.getByTestId("boton-login-header-signup");
    this.loginButton = page.getByTestId("boton-login");
  }

  async hacerClickBotonLogin() {
    await this.loginButton.click();
  }
  async visitarPaginaLogin() {
    await this.page.goto("http://localhost:3000/signup");
  }

  async completarFormularioLogin(usuario: {
    email: string;
    contraseña: string;
  }) {
    await this.emailInput.fill(usuario.email);
    await this.passwordInput.fill(usuario.contraseña);
  }
}
