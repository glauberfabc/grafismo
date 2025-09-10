import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quiz de Grafismo Fonético - Avalie o Desenvolvimento do seu Filho",
  description: "Descubra como está o desenvolvimento da escrita do seu filho com nosso quiz especializado. Kit de Atividades de Grafismo Fonético para crianças.",
  keywords: ["grafismo fonético", "desenvolvimento infantil", "escrita", "coordenação motora", "alfabetização", "quiz infantil"],
  authors: [{ name: "Kit de Atividades de Grafismo Fonético" }],
  openGraph: {
    title: "Quiz de Grafismo Fonético - Avalie o Desenvolvimento do seu Filho",
    description: "Descubra como está o desenvolvimento da escrita do seu filho com nosso quiz especializado.",
    url: "https://chat.z.ai",
    siteName: "Kit de Atividades de Grafismo Fonético",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quiz de Grafismo Fonético",
    description: "Avalie o desenvolvimento da escrita do seu filho",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
          data-utmify-ignore-iframe
          data-utmify-is-cartpanda
          async
          defer
        ></script>
     <script>
  window.pixelId = "68c0df8d61c0c9c2279ff414";
  var a = document.createElement("script");
  a.setAttribute("async", "");
  a.setAttribute("defer", "");
  a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
  document.head.appendChild(a);
</script>
        <script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "t8boc6v9ge");
</script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
