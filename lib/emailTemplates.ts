import { OrderFormData } from "./schema";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function baseLayout(title: string, body: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:30px 0;">
    <tr>
      <td align="center">
        <table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:#173158;padding:20px 36px;">
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="56" style="vertical-align:middle;padding-right:16px;">
                    <img src="${process.env.NEXT_PUBLIC_SITE_URL}/assets/logo.jpg" alt="Nyati Cement" width="56" height="56" style="display:block;border-radius:8px;" />
                  </td>
                  <td style="vertical-align:middle;">
                    <img src="${process.env.NEXT_PUBLIC_SITE_URL}/assets/lake-cement-ltd-white.png" alt="Lake Cement Ltd" width="130" height="18" style="display:block;opacity:0.7;" />
                    <p style="margin:4px 0 0;color:rgba(255,255,255,0.35);font-size:10px;letter-spacing:3px;text-transform:uppercase;font-family:Arial,sans-serif;">Hushika Haraka Hudumu Zaidi</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Brand accent stripe -->
          <tr>
            <td style="padding:0;line-height:0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="background:#173158;height:4px;line-height:4px;">&nbsp;</td>
                  <td width="35%" style="background:#f49545;height:4px;line-height:4px;">&nbsp;</td>
                  <td width="15%" style="background:#d1d5db;height:4px;line-height:4px;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px 36px;">
              ${body}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f8f9fa;padding:18px 36px;border-top:1px solid #e8e8e8;">
              <p style="margin:0;font-size:12px;color:#888888;line-height:1.6;">
                Lake Cement Ltd &bull; Nyati Cement &bull;
                <a href="mailto:projects@lakecement.co.tz" style="color:#173158;text-decoration:none;font-weight:600;">projects@lakecement.co.tz</a>
              </p>
            </td>
          </tr>
          <!-- Footer accent stripe -->
          <tr>
            <td style="padding:0;line-height:0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="background:#173158;height:3px;line-height:3px;">&nbsp;</td>
                  <td width="35%" style="background:#f49545;height:3px;line-height:3px;">&nbsp;</td>
                  <td width="15%" style="background:#d1d5db;height:3px;line-height:3px;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function detailRow(label: string, value: string) {
  return `
  <tr>
    <td style="padding:10px 14px;background:#f8f9fa;font-size:13px;color:#173158;font-weight:600;width:40%;border-bottom:1px solid #eee;vertical-align:top;">${label}</td>
    <td style="padding:10px 14px;font-size:13px;color:#333;border-bottom:1px solid #eee;vertical-align:top;">${value}</td>
  </tr>`;
}

function sectionHeading(text: string) {
  return `
  <h3 style="margin:0 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#173158;">
    ${text}
  </h3>
  <div style="height:2px;margin-bottom:12px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td width="60%" style="background:#f49545;height:2px;line-height:2px;">&nbsp;</td>
        <td style="background:#e5e7eb;height:2px;line-height:2px;">&nbsp;</td>
      </tr>
    </table>
  </div>`;
}

export function coordinatorEmail(order: OrderFormData): { subject: string; html: string } {
  const subject = `New Cement Order Request – ${order.companyName}`;

  const body = `
    <h2 style="margin:0 0 6px;font-size:20px;font-weight:700;color:#173158;">New Order Request</h2>
    <p style="margin:0 0 28px;font-size:14px;color:#555;line-height:1.7;">
      A new cement purchase order request has been submitted. Please review the details below and follow up with the customer.
    </p>

    ${sectionHeading("Customer Information")}
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:6px;overflow:hidden;margin-bottom:28px;">
      ${detailRow("Company / Customer", order.companyName)}
      ${detailRow("Contact Person", order.contactPerson)}
      ${detailRow("Phone", order.contactPhone)}
      ${detailRow("Email", `<a href="mailto:${order.contactEmail}" style="color:#173158;font-weight:600;">${order.contactEmail}</a>`)}
    </table>

    ${sectionHeading("Project Details")}
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:6px;overflow:hidden;margin-bottom:28px;">
      ${detailRow("Project Name", order.projectName)}
      ${detailRow("Project Location", order.projectLocation)}
    </table>

    ${sectionHeading("Order Details")}
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:6px;overflow:hidden;margin-bottom:28px;">
      ${detailRow("Cement Type", order.cementType)}
      ${detailRow("Quantity", `${order.quantity.toLocaleString()} ${order.quantityUnit}`)}
      ${detailRow("Requested Delivery Date", formatDate(order.deliveryDate))}
      ${detailRow("Delivery Address", order.deliveryAddress)}
      ${order.notes ? detailRow("Additional Notes", order.notes) : ""}
    </table>

    <p style="margin:24px 0 0;font-size:12px;color:#999;">This order request was submitted via the Nyati Cement Project Order Form.</p>
  `;

  return { subject, html: baseLayout(subject, body) };
}

export function customerConfirmationEmail(order: OrderFormData): { subject: string; html: string } {
  const subject = "Your Nyati Cement Order Request Has Been Received";

  const body = `
    <h2 style="margin:0 0 6px;font-size:20px;font-weight:700;color:#173158;">Thank You, ${order.contactPerson}!</h2>
    <p style="margin:0 0 28px;font-size:14px;color:#555;line-height:1.7;">
      We have successfully received your cement order request for <strong style="color:#173158;">${order.projectName}</strong>.
      Our project coordinator will review your request and be in touch with you shortly.
    </p>

    ${sectionHeading("Your Order Summary")}
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:6px;overflow:hidden;margin-bottom:28px;">
      ${detailRow("Company / Customer", order.companyName)}
      ${detailRow("Project Name", order.projectName)}
      ${detailRow("Project Location", order.projectLocation)}
      ${detailRow("Cement Type", order.cementType)}
      ${detailRow("Quantity", `${order.quantity.toLocaleString()} ${order.quantityUnit}`)}
      ${detailRow("Requested Delivery Date", formatDate(order.deliveryDate))}
      ${detailRow("Delivery Address", order.deliveryAddress)}
    </table>

    <p style="margin:0 0 12px;font-size:14px;color:#555;line-height:1.7;">
      If you have any urgent queries, please contact our projects team directly:
    </p>
    <p style="margin:0 0 28px;font-size:14px;">
      <a href="mailto:projects@lakecement.co.tz" style="color:#173158;font-weight:700;text-decoration:none;">projects@lakecement.co.tz</a>
    </p>

    <p style="margin:0;font-size:13px;color:#999;border-top:1px solid #eee;padding-top:20px;">
      Thank you for choosing Nyati Cement — <em>Trusted Cement for Strong &amp; Durable Construction.</em>
    </p>
  `;

  return { subject, html: baseLayout(subject, body) };
}

export interface DealerOrderEmailData {
  orderNumber: string
  dealerName: string
  region: string
  products: { cementType: string; quantityMT: number; pricePerMT: number }[]
  deliveryAddress: string
  deliveryPriority: string
  retailerName?: string
  notes?: string
  totalAmountTZS: number
}

export async function sendPasswordResetEmail(
  to: string,
  name: string,
  code: string
): Promise<void> {
  const { sendMail } = await import('@/lib/mailer')
  const subject = 'Your Nyati Portal Password Reset Code'
  const body = `
    <h2 style="margin:0 0 6px;font-size:20px;font-weight:700;color:#173158;">Password Reset</h2>
    <p style="margin:0 0 20px;font-size:14px;color:#555;line-height:1.7;">
      Hi ${name}, use the code below to reset your Nyati Dealer Portal password.
      This code expires in <strong>10 minutes</strong>.
    </p>
    <div style="text-align:center;margin:28px 0;">
      <span style="display:inline-block;background:#173158;color:#ffffff;font-size:32px;font-weight:800;letter-spacing:10px;padding:16px 32px;border-radius:8px;">
        ${code}
      </span>
    </div>
    <p style="margin:0;font-size:13px;color:#999;">
      If you did not request a password reset, you can safely ignore this email.
    </p>
  `
  await sendMail({ to, subject, html: baseLayout(subject, body) })
}

export function dealerOrderEmail(data: DealerOrderEmailData): { subject: string; html: string } {
  const subject = `New Portal Order ${data.orderNumber} — ${data.dealerName}`

  const productRows = data.products
    .map((p) =>
      detailRow(
        p.cementType,
        `${p.quantityMT} MT @ TZS ${p.pricePerMT.toLocaleString()}/MT = TZS ${(p.quantityMT * p.pricePerMT).toLocaleString()}`
      )
    )
    .join('')

  const body = `
    <h2 style="margin:0 0 6px;font-size:20px;font-weight:700;color:#173158;">New Portal Order</h2>
    <p style="margin:0 0 28px;font-size:14px;color:#555;line-height:1.7;">
      A new order has been placed via the dealer portal. Order number: <strong>${data.orderNumber}</strong>
    </p>
    ${sectionHeading('Dealer')}
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:6px;overflow:hidden;margin-bottom:24px;">
      ${detailRow('Company', data.dealerName)}
      ${detailRow('Region', data.region)}
      ${data.retailerName ? detailRow('Retailer', data.retailerName) : ''}
    </table>
    ${sectionHeading('Products')}
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:6px;overflow:hidden;margin-bottom:24px;">
      ${productRows}
      ${detailRow('Total', 'TZS ' + data.totalAmountTZS.toLocaleString())}
    </table>
    ${sectionHeading('Delivery')}
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:6px;overflow:hidden;margin-bottom:24px;">
      ${detailRow('Address', data.deliveryAddress)}
      ${detailRow('Priority', data.deliveryPriority.toUpperCase())}
      ${data.notes ? detailRow('Notes', data.notes) : ''}
    </table>
  `

  return { subject, html: baseLayout(subject, body) }
}
