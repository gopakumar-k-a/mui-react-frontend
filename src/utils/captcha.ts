export async function getCaptchaToken(): Promise<string | null> {
  return new Promise<string | null>((resolve) => {
    grecaptcha.ready(async () => {
      const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
      if (!siteKey) {
        resolve(null);
        return;
      }

      const token = await grecaptcha.execute(siteKey, {
        action: "task",
      });
      resolve(token);
    });
  });
}
