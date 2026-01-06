import { test, expect } from "@playwright/test";

test("TC-1 Verificacion elementos visuales pagina registro", async ({
  page,
}) => {
  await page.goto("http://localhost:3000");
  await expect(page.locator('input[name="firstName"]')).toBeVisible();
  await expect(page.locator('input[name="lastName"]')).toBeVisible();
  await expect(page.locator('input[name="email"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();
  await expect(page.getByTestId("boton-registrarse")).toBeVisible();

  await page.waitForTimeout(5000);
});

test("TC-2 Verificar: Boton de registro inhabilitado por defecto", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/signup");
  await expect(page.getByTestId("boton-registrarse")).toBeDisabled();
});

test("TC-3 Verificar: Registro exitoso con datos validos", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.waitForTimeout(5000);
  await page.getByTestId("boton-login-header-signup").click();
  await expect(page).toHaveURL("http://localhost:3000/login");
});

test("TC-4 Verificar Registro exitoso", async ({ page }) => {
  await page.goto("http://localhost:3000/signup");

  await page.locator('input[name="firstName"]').fill("Juan");
  await page.locator('input[name="lastName"]').fill("Perez");
  await page
    .locator('input[name="email"]')
    .fill("juan.perez" + Date.now().toString() + "@example.com");
  await page.locator('input[name="password"]').fill("password123");
  await page.getByTestId("boton-registrarse").click();
  await page.getByText("Registro exitoso").isVisible();
});
