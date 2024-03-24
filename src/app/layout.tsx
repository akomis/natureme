import './global.css';

export const metadata = {
  title: 'NatureMe eShop',
  description:
    'Χειροποίητα σαπούνια και κεραλοιφές , 100% φυσικά προϊόντα, κατασκευασμένα με δερματικά ελεγμένες και πιστοποιημένες πρώτες ύλες φυτικής προέλευσης.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-jasmine px-4">{children}</body>
    </html>
  );
}
