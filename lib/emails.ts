import { Resend } from "resend";

const FROM = process.env.RESEND_FROM_EMAIL ?? "GREENHOLD <contact@greenhold.fr>";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

// ─── Types ────────────────────────────────────────────────────────

interface ConfirmationEmailParams {
  to: string;
  buyerName: string;
  packName: string;
  parts: number;
  certNumber: string;
  pdfBuffer: Buffer;
}

interface WelcomeDayOneParams {
  to: string;
  buyerName: string;
  packName: string;
}

interface FirstPaymentParams {
  to: string;
  buyerName: string;
  estimatedRevenue: number;
}

// ─── Shared header/footer snippets ───────────────────────────────

const emailHeader = `
  <div style="background:#0C2518;padding:32px;text-align:center;">
    <h1 style="color:#C8972A;font-size:28px;margin:0;letter-spacing:3px;">GREENHOLD</h1>
    <p style="color:#C8E6D4;margin:8px 0 0;font-size:13px;">Foret mutualisee au Senegal</p>
  </div>
`;

const emailFooter = `
  <div style="background:#0C2518;padding:24px;text-align:center;">
    <p style="color:#C8E6D4;font-size:12px;margin:0;">
      GREENHOLD &mdash; contact@greenhold.fr &mdash; www.greenhold.fr
    </p>
    <p style="color:#6B7280;font-size:10px;margin:6px 0 0;">
      Tu recois cet email car tu as achete un pack GREENHOLD. Aucune desinscription possible pour les emails transactionnels.
    </p>
  </div>
`;

// ─── 1. Email confirmation achat avec certificat PDF ─────────────

export async function sendConfirmationEmail({
  to,
  buyerName,
  packName,
  parts,
  certNumber,
  pdfBuffer,
}: ConfirmationEmailParams) {
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#F8F4EE;">
      ${emailHeader}
      <div style="padding:40px 32px;">
        <p style="color:#0C2518;font-size:20px;font-weight:bold;margin:0 0 16px;">
          Bienvenue dans la foret, ${buyerName} !
        </p>
        <p style="color:#1C2B22;line-height:1.7;margin:0 0 20px;">
          Ton paiement pour le <strong>${packName}</strong> a ete confirme.
          Tu es maintenant actionnaire de <strong>${parts} part${parts > 1 ? "s" : ""}</strong>
          dans la foret GREENHOLD au Senegal.
        </p>

        <div style="background:#0C2518;border-radius:8px;padding:24px;margin:24px 0;text-align:center;">
          <p style="color:#C8972A;font-size:11px;margin:0 0 8px;letter-spacing:2px;font-weight:bold;">
            CERTIFICAT N&deg;
          </p>
          <p style="color:#FFFFFF;font-size:26px;font-weight:bold;margin:0;letter-spacing:2px;">
            ${certNumber}
          </p>
        </div>

        <p style="color:#1C2B22;line-height:1.7;margin:0 0 20px;">
          Ton <strong>certificat nominatif PDF</strong> est joint a cet email.
          Conserve-le &mdash; il atteste de ta propriete dans la foret et peut etre
          transmis a tes heritiers.
        </p>

        <div style="background:#FFFFFF;border:1px solid #DDE8E2;border-radius:8px;padding:20px;margin:24px 0;">
          <p style="color:#0C2518;font-weight:bold;margin:0 0 12px;">Prochaines etapes :</p>
          <p style="color:#1C2B22;margin:6px 0;font-size:14px;">
            <strong>Sous 24h</strong> &mdash; Ton arbre est assigne a ton nom dans nos registres
          </p>
          <p style="color:#1C2B22;margin:6px 0;font-size:14px;">
            <strong>Sous 30 jours</strong> &mdash; Premieres photos de terrain geolocalisees
          </p>
          <p style="color:#1C2B22;margin:6px 0;font-size:14px;">
            <strong>Mois 9</strong> &mdash; Ton premier revenu grace au papayer offert
          </p>
        </div>

        <div style="text-align:center;margin:32px 0;">
          <a href="https://greenhold.fr/mon-espace"
             style="background:#0C2518;color:#F0C55A;padding:16px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:15px;">
            Voir mon espace actionnaire &rarr;
          </a>
        </div>
      </div>
      ${emailFooter}
    </div>
  `;

  return getResend().emails.send({
    from: FROM,
    to,
    subject: `Confirmation d'achat — ${packName} GREENHOLD`,
    html,
    attachments: [
      {
        filename: `certificat-greenhold-${certNumber}.pdf`,
        content: pdfBuffer,
      },
    ],
  });
}

// ─── 2. Email bienvenue J+1 ───────────────────────────────────────

export async function sendWelcomeDayOneEmail({
  to,
  buyerName,
  packName,
}: WelcomeDayOneParams) {
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#F8F4EE;">
      ${emailHeader}
      <div style="padding:40px 32px;">
        <p style="color:#0C2518;font-size:20px;font-weight:bold;margin:0 0 16px;">
          Bonjour ${buyerName},
        </p>
        <p style="color:#1C2B22;line-height:1.7;margin:0 0 20px;">
          Ton <strong>${packName}</strong> est officiellement enregistre dans nos registres.
          La famille GREENHOLD au Senegal prepare en ce moment l'espace pour tes arbres.
        </p>

        <div style="background:#1A4D35;border-radius:8px;padding:24px;margin:24px 0;">
          <p style="color:#C8E6D4;font-size:16px;font-weight:bold;margin:0 0 10px;">
            Ton arbre est en cours de plantation
          </p>
          <p style="color:#C8E6D4;line-height:1.7;margin:0;font-size:14px;">
            Dans moins de 30 jours, tu recevras tes premieres photos de terrain
            geolocalisees. Chaque photo sera accompagnee des coordonnees GPS
            de ta parcelle dans la foret GREENHOLD.
          </p>
        </div>

        <div style="background:#FFFFFF;border:1px solid #DDE8E2;border-radius:8px;padding:20px;margin:24px 0;">
          <p style="color:#0C2518;font-weight:bold;margin:0 0 12px;">Ce que tu vas recevoir :</p>
          <p style="color:#1C2B22;margin:6px 0;font-size:14px;">
            Photos de ta parcelle toutes les 8 semaines
          </p>
          <p style="color:#1C2B22;margin:6px 0;font-size:14px;">
            Rapport de production annuel detaille
          </p>
          <p style="color:#1C2B22;margin:6px 0;font-size:14px;">
            Premier revenu au mois 9 grace au papayer offert
          </p>
          <p style="color:#1C2B22;margin:6px 0;font-size:14px;">
            Acces a ton espace actionnaire personnel
          </p>
        </div>

        <div style="text-align:center;margin:32px 0;">
          <a href="https://greenhold.fr/mon-espace"
             style="background:#C8972A;color:#0C2518;padding:16px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:15px;">
            Suivre ma foret &rarr;
          </a>
        </div>
      </div>
      ${emailFooter}
    </div>
  `;

  return getResend().emails.send({
    from: FROM,
    to,
    subject: "Ton arbre est en cours de plantation",
    html,
  });
}

// ─── 3. Email mois 9 — premier virement ──────────────────────────

export async function sendFirstPaymentEmail({
  to,
  buyerName,
  estimatedRevenue,
}: FirstPaymentParams) {
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#F8F4EE;">
      ${emailHeader}
      <div style="padding:40px 32px;">
        <p style="color:#0C2518;font-size:20px;font-weight:bold;margin:0 0 16px;">
          Bonne nouvelle, ${buyerName} !
        </p>
        <p style="color:#1C2B22;line-height:1.7;margin:0 0 20px;">
          Ton papayer intercalaire a produit ses premiers fruits.
          <strong>Ton premier virement GREENHOLD est en route !</strong>
        </p>

        <div style="background:#0C2518;border-radius:8px;padding:32px;margin:24px 0;text-align:center;">
          <p style="color:#C8972A;font-size:13px;margin:0 0 10px;font-weight:bold;letter-spacing:2px;">
            VIREMENT ESTIME
          </p>
          <p style="color:#FFFFFF;font-size:42px;font-weight:bold;margin:0;">
            ${estimatedRevenue.toFixed(2)} &euro;
          </p>
          <p style="color:#C8E6D4;font-size:12px;margin:10px 0 0;">
            Base sur ta production papayer annee 1
          </p>
        </div>

        <p style="color:#1C2B22;line-height:1.7;margin:0 0 20px;">
          A partir de maintenant, tes revenus vont croitre chaque annee
          avec la montee en production de tes goyaviers et manguiers.
          Au bout de 5 ans, tes revenus seront plus de <strong>2x superieurs</strong>.
        </p>

        <div style="background:#FFFFFF;border:1px solid #DDE8E2;border-radius:8px;padding:20px;margin:24px 0;">
          <p style="color:#0C2518;font-weight:bold;margin:0 0 10px;">
            Tu peux reinvestir automatiquement tes revenus :
          </p>
          <p style="color:#6B7280;margin:0;font-size:14px;line-height:1.6;">
            Connecte-toi a ton espace actionnaire pour configurer tes preferences
            de reinvestissement et maximiser ton patrimoine forestier.
          </p>
        </div>

        <div style="text-align:center;margin:32px 0;">
          <a href="https://greenhold.fr/mon-espace"
             style="background:#C8972A;color:#0C2518;padding:16px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:15px;">
            Voir mes revenus &rarr;
          </a>
        </div>
      </div>
      ${emailFooter}
    </div>
  `;

  return getResend().emails.send({
    from: FROM,
    to,
    subject: "Ton premier virement arrive !",
    html,
  });
}

// ─── 4. Notification interne — nouvel arbre à planter ────────────

interface PlantationNotificationParams {
  email: string;
  typeArbre: string;
}

export async function sendPlantationNotification({
  email,
  typeArbre,
}: PlantationNotificationParams) {
  return getResend().emails.send({
    from: FROM,
    to: "contact@greenhold.fr",
    subject: "🌱 Nouvel arbre à planter !",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#F8F4EE;">
        ${emailHeader}
        <div style="padding:32px;">
          <p style="color:#0C2518;font-size:20px;font-weight:bold;margin:0 0 20px;">
            🌱 Nouvel arbre à planter !
          </p>
          <p style="color:#1C2B22;font-size:16px;line-height:1.7;margin:0 0 20px;">
            Un actionnaire vient d'acheter un arbre.
          </p>
          <div style="background:#1A4D35;border-radius:8px;padding:20px;margin:0 0 24px;">
            <p style="color:#C8E6D4;margin:0 0 10px;font-size:15px;">
              📧 Email : <strong style="color:white;">${email}</strong>
            </p>
            <p style="color:#C8E6D4;margin:0;font-size:15px;">
              🌳 Arbre : <strong style="color:white;">${typeArbre}</strong>
            </p>
          </div>
          <div style="text-align:center;margin:24px 0;">
            <a href="https://greenhold.fr/terrain-upload"
               style="background:#2C5F2D;color:white;padding:16px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">
              Connecte-toi sur greenhold.fr/terrain-upload →
            </a>
          </div>
        </div>
        ${emailFooter}
      </div>
    `,
  });
}
