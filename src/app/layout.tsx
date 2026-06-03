import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/components/StoreProvider";

export const metadata: Metadata = {
  title: "D&D 5e — Gerenciador de Personagem",
  description: "Ficha digital de personagem para Dungeons & Dragons 5a Edição.",
  icons: {
    icon: "/favicon.jpg",
  },
  openGraph: {
    title: "D&D 5e — Gerenciador de Personagem",
    description: "Ficha digital de personagem para Dungeons & Dragons 5a Edição.",
    url: "https://projeto-d-d-zeta.vercel.app/",
    siteName: "D&D 5e — Gerenciador de Personagem",
    images: [
      {
        url: "/favicon.jpg",
        width: 1200,
        height: 630,
        alt: "D&D 5e — Gerenciador de Personagem",
      },
    ],
    locale: "pt-BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-bg-base text-text-primary antialiased min-h-dvh">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
