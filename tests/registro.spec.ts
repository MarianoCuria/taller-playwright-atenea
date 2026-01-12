import { test, expect } from "@playwright/test";
import { RegisterPage } from "../pages/registerPage";
import { before } from "node:test";
import TestData from "../data/testData.json";

test.beforeEach(async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.visitarPaginaRegistro();
});
test("TC-1 Verificacion elementos visuales pagina registro", async ({
  page,
}) => {
  const registerPage = new RegisterPage(page);
  await registerPage.page.waitForTimeout(5000);
  await expect(registerPage.firstNameInput).toBeVisible();
  await expect(registerPage.lastNameInput).toBeVisible();
  await expect(registerPage.emailInput).toBeVisible();
  await expect(registerPage.passwordInput).toBeVisible();
  await expect(registerPage.registerButton).toBeVisible();
});

test("TC-2 Verificar: Boton de registro inhabilitado por defecto", async ({
  page,
}) => {
  const registerPage = new RegisterPage(page);
  await page.goto("http://localhost:3000/signup");
  await registerPage.registerButton.isDisabled();
});

test("TC-3 Verificar: Registro exitoso con datos validos", async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.visitarPaginaRegistro();
  await page.waitForTimeout(5000);
  await page.getByTestId("boton-login-header-signup").click();
  await expect(page).toHaveURL("http://localhost:3000/login");
});

test("TC-4 Verificar Registro exitoso", async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.completarFormularioRegistro(TestData.usuarioValido);
  await registerPage.hacerClickBotonRegistro();
  await page.getByText("Registro exitoso").isVisible();
});
