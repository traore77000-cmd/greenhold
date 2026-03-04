// lib/pdf.tsx — JSX helper for server-side PDF generation
// Must be .tsx to support JSX with @react-pdf/renderer
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { CertificatePDF, type CertificatePDFProps } from "@/components/CertificatePDF";

export async function generateCertificatePDF(
  props: CertificatePDFProps
): Promise<Buffer> {
  const element = <CertificatePDF {...props} />;
  const rawBuffer = await renderToBuffer(element);
  return Buffer.from(rawBuffer);
}
