"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  getGeneralSettings,
  GeneralSettings,
  getImageUrl,
  MEDIA_BASE_URL,
} from "@/utils/api";

export default function Footer() {
  const [settings, setSettings] = useState<GeneralSettings | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      const data = await getGeneralSettings();
      if (data) {
        setSettings(data);
      }
    };
    loadSettings();
  }, []);

  const resolveVariable = (text: string | undefined): string => {
    if (!text || !settings) return text || "";
    let resolved = text;
    settings.global_variables.forEach((variable) => {
      if (variable.is_active) {
        // Use a global regex to replace all occurrences if it's a code
        const escapedCode = variable.code.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&",
        );
        resolved = resolved.replace(
          new RegExp(escapedCode, "g"),
          variable.code_value,
        );
      }
    });
    resolved = resolved.replace("{YEAR}", new Date().getFullYear().toString());
    return resolved;
  };

  const parseLinks = (html: string | undefined) => {
    if (!html) return [];

    // Check if it contains a JSON array pattern
    const jsonMatch = html.match(
      /\[\s*\{\s*"link"\s*:\s*"[^"]+"\s*,\s*"text"\s*:\s*"[^"]+"\s*}\s*(?:,\s*\{\s*"link"\s*:\s*"[^"]+"\s*,\s*"text"\s*:\s*"[^"]+"\s*}\s*)*\]/,
    );
    if (jsonMatch) {
      try {
        // Extract the JSON array string
        let jsonStr = jsonMatch[0];
        // Parse it
        const items = JSON.parse(jsonStr);
        if (Array.isArray(items)) {
          return items.map((item) => ({
            href: item.link,
            text: item.text,
          }));
        }
      } catch (e) {
        console.error("Failed to parse JSON links:", e);
      }
    }

    // Fallback to HTML <a> tag parsing
    const links: { text: string; href: string }[] = [];
    const regex = /<a\s+[^>]*?href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
    let match;
    while ((match = regex.exec(html)) !== null) {
      let innerText = match[2].replace(/<\/?[^>]+(>|$)/g, "").trim();
      innerText = innerText.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
      if (innerText) {
        links.push({ href: match[1], text: innerText });
      }
    }
    return links;
  };

  const footerLogo = settings?.footer_setting.logo
    ? getImageUrl(settings.footer_setting.logo)
    : "/logo.png";
  const footerData = settings?.footer_setting;
  const contents = footerData?.contents;
  const socialIcons = footerData?.social_media_icons;

  interface SocialIconEntry {
    index: string;
    platform: string;
    link: string;
    iconPath: string;
    alt: string;
  }

  const getSocialIcons = (): SocialIconEntry[] => {
    if (!socialIcons || socialIcons.enable_social_media_icons !== "1")
      return [];

    const entries: SocialIconEntry[] = [];
    const keys = Object.keys(socialIcons);

    // Collect all numeric suffixes (skip INDEX and non-numeric)
    const numericIndices = new Set<string>();
    keys.forEach((key) => {
      const match = key.match(/^social_media_icons_link_input_(\d+)$/);
      if (match) numericIndices.add(match[1]);
    });

    numericIndices.forEach((idx) => {
      const platform = socialIcons[`social_media_icons_input_${idx}`] as
        | string
        | null;
      const link = socialIcons[`social_media_icons_link_input_${idx}`] as
        | string
        | null;
      const iconPath = socialIcons[`social_media_icons_${idx}`] as
        | string
        | null;
      const alt = socialIcons[`social_media_icons_alt_input_${idx}`] as
        | string
        | null;

      // Only render if link is present and icon is not a dummy placeholder
      if (link && iconPath && !iconPath.includes("dummy.svg")) {
        const label = platform || alt || `social-${idx}`;
        entries.push({
          index: idx,
          platform: label,
          link,
          iconPath,
          alt: alt || label,
        });
      }
    });

    // Sort by numeric index order
    return entries.sort((a, b) => Number(a.index) - Number(b.index));
  };

  if (!settings) {
    return <footer className="site-footer"></footer>;
  }

  const primaryLinks = parseLinks(contents?.link_1_content);
  const secondaryLinks = parseLinks(contents?.link_2_content);

  console.log("Footer settings loaded:", contents?.link_1_content);

  return (
    <footer className="site-footer">
      <div className="footerin">
        <div className="footercontentarea">
          <div className="container">
            <div className="footeraftercontainer">
              <div className="footer-brand">
                <Link href="/" className="footer-logo">
                  <img src={footerLogo} alt="Footer Logo" />
                </Link>
              </div>
              <div className="footer-main-content">
                <div className="footer-nav-primary">
                  {primaryLinks.map((link, idx) => (
                    <Link key={idx} href={link.href}>
                      {link.text}
                    </Link>
                  ))}
                </div>

                <div className="footer-social">
                  {getSocialIcons().map((icon) => (
                    <a
                      key={icon.index}
                      href={icon.link}
                      className={`social-icon ${icon.platform.toLowerCase()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={`${MEDIA_BASE_URL}/${icon.iconPath}`}
                        alt={icon.alt}
                      />
                    </a>
                  ))}
                </div>
              </div>
              <div className="footer-divider"></div>
              <div className="footer-nav-secondary">
                <div className="secondary-links">
                  {secondaryLinks.map((link, idx) => (
                    <Link key={idx} href={link.href}>
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="footer-payment-methods">
                <img src="/dis.svg" alt="Discover" className="payment-icon" />
                <img src="/msc.svg" alt="Mastercard" className="payment-icon" />
                <img src="/vis.svg" alt="Visa" className="payment-icon" />
                <img src="/ame.svg" alt="Amex" className="payment-icon" />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="footer-bottom">
            <div className="copyright-area">
              <p className="copyright-text">
                {resolveVariable(contents?.footer_copyright_content)}
              </p>
              <div className="legal-disclaimer">
                <div
                  dangerouslySetInnerHTML={{
                    __html: resolveVariable(
                      contents?.footer_below_copyright_text,
                    ),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
