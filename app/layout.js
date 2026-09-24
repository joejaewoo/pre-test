import './globals.css';

export const metadata = {
  title: '즐거움의힘 | Level Test',
  description: 'Delightful Experiences Language School - Online Pre-Test',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
