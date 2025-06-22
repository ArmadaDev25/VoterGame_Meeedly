import React from 'react';

export const metadata = {
  title: "Coolest Subject Rater",
  description: "Vote anonymously for the coolest subjects!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
