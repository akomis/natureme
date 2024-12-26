import { HighlightInit } from "@highlight-run/next/client";
import "./global.css";

export const metadata = {
  title: "NatureMe eShop",
  description:
    "Χειροποίητα σαπούνια και κεραλοιφές , 100% φυσικά προϊόντα, κατασκευασμένα με δερματικά ελεγμένες και πιστοποιημένες πρώτες ύλες φυτικής προέλευσης.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const highlightProjectId = process.env.NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID;

  if (!highlightProjectId?.length) {
    throw new Error("Missing Highlight project ID");
  }

  return (
    <>
      <HighlightInit
        excludedHostnames={['localhost']}
        projectId={highlightProjectId}
        serviceName="natureme"
        tracingOrigins
        networkRecording={{
          enabled: true,
          recordHeadersAndBody: true,
          urlBlocklist: [],
        }}
      />

      <html lang="en">
        <body className="bg-jasmine">{children}</body>
      </html>
    </>
  );
}
