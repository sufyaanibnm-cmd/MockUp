import emailjs from "@emailjs/browser";

interface ContactEnquiry {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// These are public browser SDK identifiers, not private credentials.
// Optional local environment values can override this site's configured account.
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() || "service_clu4c65";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim() || "template_yti2l9y";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() || "caODYuv3Wp48p9Ms7";

export async function sendContactEnquiry(data: ContactEnquiry) {
  // The template fixes the recipient to hi@shaffedits.com and uses user_email
  // for Reply-To. Keep these names aligned with its message-body variables.
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      user_name: data.name,
      user_email: data.email,
      user_phone: data.phone,
      message: data.message,
    },
    { publicKey: PUBLIC_KEY },
  );
}
