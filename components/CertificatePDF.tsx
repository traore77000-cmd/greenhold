import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

export interface CertificatePDFProps {
  certNumber: string;
  buyerName: string;
  buyerEmail: string;
  parts: number;
  packName: string;
  trees: string;
  date: string;
}

const C = {
  darkGreen: "#0C2518",
  mediumGreen: "#1A4D35",
  gold: "#C8972A",
  cream: "#F8F4EE",
  lightGreen: "#C8E6D4",
  border: "#DDE8E2",
  gray: "#6B7280",
  white: "#FFFFFF",
} as const;

const s = StyleSheet.create({
  page: {
    backgroundColor: C.cream,
    paddingTop: 48,
    paddingBottom: 48,
    paddingLeft: 48,
    paddingRight: 48,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: C.gold,
  },
  logoText: {
    fontSize: 20,
    color: C.darkGreen,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 3,
  },
  badgeWrap: {
    backgroundColor: C.gold,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 4,
  },
  badgeText: {
    color: C.darkGreen,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1,
  },
  certNum: {
    fontSize: 9,
    color: C.gray,
    textAlign: "right",
  },
  titleSection: {
    alignItems: "center",
    marginBottom: 28,
  },
  mainTitle: {
    fontSize: 28,
    color: C.darkGreen,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 11,
    color: C.gray,
    textAlign: "center",
    marginBottom: 12,
  },
  decorLine: {
    height: 2,
    width: 60,
    backgroundColor: C.gold,
  },
  introText: {
    fontSize: 11,
    color: C.darkGreen,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 1.6,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  card: {
    flex: 1,
    backgroundColor: C.white,
    borderRadius: 6,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
    borderWidth: 1,
    borderColor: C.border,
  },
  cardLabel: {
    fontSize: 8,
    color: C.gray,
    marginBottom: 5,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1,
  },
  cardValue: {
    fontSize: 14,
    color: C.darkGreen,
    fontFamily: "Helvetica-Bold",
  },
  treesBox: {
    backgroundColor: C.darkGreen,
    borderRadius: 6,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 16,
  },
  treesLabel: {
    fontSize: 8,
    color: C.gold,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1,
    marginBottom: 6,
  },
  treesValue: {
    fontSize: 14,
    color: C.white,
    fontFamily: "Helvetica-Bold",
    marginBottom: 5,
  },
  treesLocation: {
    fontSize: 9,
    color: C.lightGreen,
  },
  guaranteesRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
  },
  guaranteeItem: {
    flex: 1,
    backgroundColor: C.white,
    borderRadius: 6,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 8,
    paddingRight: 8,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: "center",
  },
  guaranteeText: {
    fontSize: 8,
    color: C.darkGreen,
    textAlign: "center",
    lineHeight: 1.5,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: C.border,
    paddingTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  footerCompany: {
    fontSize: 10,
    color: C.darkGreen,
    fontFamily: "Helvetica-Bold",
    marginBottom: 3,
  },
  footerContact: {
    fontSize: 8,
    color: C.gray,
    lineHeight: 1.6,
  },
  signatureLabel: {
    fontSize: 8,
    color: C.gray,
    marginBottom: 4,
    textAlign: "right",
  },
  signatureText: {
    fontSize: 18,
    color: C.darkGreen,
    fontFamily: "Helvetica-BoldOblique",
    textAlign: "right",
  },
  legalNote: {
    fontSize: 7,
    color: C.gray,
    textAlign: "center",
    marginTop: 16,
    lineHeight: 1.5,
  },
});

export function CertificatePDF({
  certNumber,
  buyerName,
  buyerEmail,
  parts,
  packName,
  trees,
  date,
}: CertificatePDFProps) {
  return (
    <Document
      title={`Certificat GREENHOLD ${certNumber}`}
      author="GREENHOLD"
      subject="Certificat de propriete forestiere"
    >
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          <Text style={s.logoText}>GREENHOLD</Text>
          <View style={s.badgeWrap}>
            <Text style={s.badgeText}>CERTIFICAT OFFICIEL</Text>
          </View>
          <Text style={s.certNum}>N deg {certNumber}</Text>
        </View>

        {/* Title */}
        <View style={s.titleSection}>
          <Text style={s.mainTitle}>Certificat de Propriete</Text>
          <Text style={s.subtitle}>Foret Mutualisee GREENHOLD - Senegal</Text>
          <View style={s.decorLine} />
        </View>

        {/* Intro */}
        <Text style={s.introText}>
          {`Ce certificat atteste que ${buyerName} est actionnaire\nde la foret mutualisee GREENHOLD au Senegal.`}
        </Text>

        {/* Info Row 1 */}
        <View style={s.row}>
          <View style={s.card}>
            <Text style={s.cardLabel}>ACTIONNAIRE</Text>
            <Text style={s.cardValue}>{buyerName}</Text>
          </View>
          <View style={s.card}>
            <Text style={s.cardLabel}>PACK SOUSCRIT</Text>
            <Text style={s.cardValue}>{packName}</Text>
          </View>
        </View>

        {/* Info Row 2 */}
        <View style={[s.row, { marginBottom: 20 }]}>
          <View style={s.card}>
            <Text style={s.cardLabel}>NOMBRE DE PARTS</Text>
            <Text style={s.cardValue}>{parts} part{parts > 1 ? "s" : ""}</Text>
          </View>
          <View style={s.card}>
            <Text style={s.cardLabel}>DATE D'ACQUISITION</Text>
            <Text style={s.cardValue}>{date}</Text>
          </View>
        </View>

        {/* Trees */}
        <View style={s.treesBox}>
          <Text style={s.treesLabel}>ARBRES ASSOCIES</Text>
          <Text style={s.treesValue}>{trees}</Text>
          <Text style={s.treesLocation}>
            Foret GREENHOLD, Senegal - Plantes a votre nom dans les 30 jours
          </Text>
        </View>

        {/* Guarantees */}
        <View style={s.guaranteesRow}>
          <View style={s.guaranteeItem}>
            <Text style={s.guaranteeText}>{"Remplacement\ngratuit (6 mois)"}</Text>
          </View>
          <View style={s.guaranteeItem}>
            <Text style={s.guaranteeText}>{"Photos geolocalisees\ntoutes 8 semaines"}</Text>
          </View>
          <View style={s.guaranteeItem}>
            <Text style={s.guaranteeText}>{"Parts transmissibles\na vos heritiers"}</Text>
          </View>
          <View style={s.guaranteeItem}>
            <Text style={s.guaranteeText}>{"Premier revenu\ndes le mois 9"}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={s.footer}>
          <View>
            <Text style={s.footerCompany}>GREENHOLD SAS</Text>
            <Text style={s.footerContact}>{"contact@greenhold.fr\nwww.greenhold.fr"}</Text>
          </View>
          <View>
            <Text style={s.signatureLabel}>Signature GREENHOLD</Text>
            <Text style={s.signatureText}>GREENHOLD</Text>
          </View>
        </View>

        {/* Legal note */}
        <Text style={s.legalNote}>
          {`Ce certificat fait foi de votre propriete dans la foret mutualisee GREENHOLD. Conservez-le precieusement.\nIl peut etre transmis a vos heritiers. Ref. actionnaire : ${buyerEmail} - N deg ${certNumber}`}
        </Text>
      </Page>
    </Document>
  );
}
