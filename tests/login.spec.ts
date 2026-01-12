import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import TestData from "../data/testData.json";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.visitarPaginaLogin();
  await loginPage.loginHeaderButton.click();
});

test("TC-1 Verificacion login exitoso", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.completarFormularioLogin(TestData.usuarioLogin);
  await loginPage.hacerClickBotonLogin();
  await page.getByText("Inicio de sesion exitoso").isVisible();
});
