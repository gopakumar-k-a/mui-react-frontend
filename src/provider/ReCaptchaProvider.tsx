import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export const ReCaptchaProvider = ({ children }:{children:React.ReactNode}) => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY as string} // Replace with your site key
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
};