import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Fantasy FRC",
  description: "Like fantasy football, but for for FIRST Robotics Competition (FRC)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
