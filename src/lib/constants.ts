/**
 * Site Configuration Constants
 * Central place for contact info, WhatsApp, etc.
 */

// ============================
// Phone Numbers
// ============================

// الرقم الدولي مع + لكل الاستخدامات (tel و WhatsApp)
export const PHONE_NUMBER = "+966565560831";
export const WHATSAPP_NUMBER = "+966565560831";

// رقم العرض فقط للواجهة
export const DISPLAY_PHONE = "056 556 0831";

// ============================
// Site Info
// ============================

export const LOCATION = "المملكة العربية السعودية";
export const SITE_NAME = "بطلة - أتيلييه ومحل خياطة";
export const SITE_URL = "https://boteq.com";

// ============================
// Phone Call URL
// ============================

export function getPhoneCallUrl(): string {
  // encodeURIComponent يحمي + ويخليه يظهر صح
  return `tel:${encodeURIComponent(PHONE_NUMBER)}`;
}

// ============================
// WhatsApp URL
// ============================

export function getWhatsAppUrl(message: string = ""): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${encodeURIComponent(WHATSAPP_NUMBER)}${
    message ? `&text=${encodedMessage}` : ""
  }`;
}

// ============================
// Order WhatsApp URL
// ============================

export function getOrderWhatsAppUrl(
  itemTitle: string,
  category?: string,
  imageUrl?: string
): string {
  let message = `السلام عليكم 👋\n\nأرغب في طلب التصميم التالي:\n\n📌 *${itemTitle}*`;

  if (category) {
    message += `\n📂 التصنيف: ${category}`;
  }

  if (imageUrl) {
    message += `\n🖼️ صورة التصميم: ${imageUrl}`;
  }

  message += `\n\nأرجو التواصل معي لمزيد من التفاصيل.\nشكراً لكم 🙏`;

  return getWhatsAppUrl(message);
}

// ============================
// General Inquiry URL
// ============================

export function getInquiryWhatsAppUrl(): string {
  const message = `السلام عليكم 👋

أود الاستفسار عن خدماتكم.

شكراً لكم 🙏`;

  return getWhatsAppUrl(message);
}

// ============================
// Service Inquiry URL
// ============================

export function getServiceInquiryWhatsAppUrl(
  serviceName: string,
  pageUrl: string
): string {
  const intro = `مرحباً بكِ في متجر رواء

نسعد بخدمتكِ دائماً
نوفر خدمة التوصيل لباب البيت 🚚

اتركي الطلب أو الإستفسار
وسيتم الرد بأقرب وقت ممكن ✨

- عند الطلب يرجى كتابة :
الإسم + المنطقة + رقم الجوال
- ولتحديد المقاس المناسب :
ارسلي مقاسك لتحديد المقاس المناسب بكل دقة .`;

  const message = `${intro}

أود الاستفسار عن خدمة: *${serviceName}*

رابط الخدمة:
${pageUrl}

شكراً لكم 🙏`;

  return getWhatsAppUrl(message);
}
