"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface PageScriptProps {
    /** Raw HTML string from backend (may contain <script> tags). */
    html: string | null | undefined;
    /**
     * Optional stable key to scope cleanup (recommended: page slug / route).
     * If not provided, we default to current pathname.
     */
    ownerKey?: string;
}

function normalizeInlineScript(content: string) {
    return content.replace(/\r\n/g, "\n").trim();
}

// Global function to remove all page scripts - ensures cleanup happens synchronously
function removeAllPageScripts() {
    if (typeof document === "undefined") return;
    const scripts = document.head.querySelectorAll("script[data-page-script-owner]");
    scripts.forEach((s) => {
        if (s.parentNode) {
            s.remove();
        }
    });
}

// Helper to check if a script already exists in head
function scriptExists(content: string, type?: string): boolean {
    if (typeof document === "undefined") return false;
    const existingScripts = document.head.querySelectorAll("script");
    for (const script of existingScripts) {
        if (type && script.getAttribute("type") !== type) continue;
        const existingContent = normalizeInlineScript(script.innerHTML || "");
        const normalizedContent = normalizeInlineScript(content);
        if (existingContent === normalizedContent && existingContent !== "") {
            return true;
        }
    }
    return false;
}

export default function PageScript({ html, ownerKey }: PageScriptProps) {
    const pathname = usePathname();
    const scope = ownerKey || pathname || "unknown";
    const scriptsRef = useRef<HTMLScriptElement[]>([]);
    const previousScopeRef = useRef<string>("");

    // Effect: Handle script injection/cleanup
    useEffect(() => {
        // CRITICAL: Always clean up ALL previous page scripts FIRST (synchronously)
        // This must happen before any new scripts are added, regardless of scope
        // This ensures that when navigating between pages, old scripts are removed immediately
        removeAllPageScripts();

        // Clear our ref
        scriptsRef.current = [];

        // Track current scope
        const currentScope = scope;
        previousScopeRef.current = currentScope;

        // If no script provided, don't add anything (already cleaned up above)
        if (!html || typeof html !== "string" || html.trim() === "") {
            return;
        }

        // Parse the provided HTML to find tags
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html.trim();
        // Support script, meta, and link tags
        const elements = tempDiv.querySelectorAll("script, meta, link");

        if (elements.length === 0) {
            return;
        }

        // Final safety check: Remove any scripts that might have been added by other components
        // This prevents race conditions during navigation
        removeAllPageScripts();

        // Create elements in <head>
        elements.forEach((oldEl) => {
            // Double-check: Make sure we haven't been unmounted or scope changed
            if (previousScopeRef.current !== currentScope) {
                return; // Don't add scripts if scope changed during processing
            }

            const tagName = oldEl.tagName.toLowerCase();
            const newEl = document.createElement(tagName);

            // Mark ownership
            (newEl as any).dataset.pageScriptOwner = currentScope;

            // Copy all attributes
            Array.from(oldEl.attributes).forEach((attr) => {
                newEl.setAttribute(attr.name, attr.value);
            });

            if (tagName === 'script') {
                const oldScript = oldEl as HTMLScriptElement;
                const newScript = newEl as HTMLScriptElement;
                const originalSrc = oldScript.getAttribute("src");

                if (!originalSrc) {
                    const content = normalizeInlineScript(oldScript.innerHTML || "");
                    if (content) {
                        // Check for duplicate inline script
                        if (scriptExists(content, oldScript.getAttribute("type") || undefined)) {
                            return;
                        }
                        newScript.text = content;
                    }
                } else {
                    // Check for duplicate external script
                    const existing = document.head.querySelector(`script[src="${CSS.escape(originalSrc)}"]`);
                    if (existing) return;
                }
            } else if (tagName === 'meta') {
                const name = oldEl.getAttribute('name');
                const content = oldEl.getAttribute('content');
                const property = oldEl.getAttribute('property');

                // Check for duplicate meta tags
                let selector = 'meta';
                if (name) selector += `[name="${CSS.escape(name)}"]`;
                else if (property) selector += `[property="${CSS.escape(property)}"]`;

                const existing = document.head.querySelector(selector);
                if (existing && existing.getAttribute('content') === content) {
                    return;
                }
            } else if (tagName === 'link') {
                const rel = oldEl.getAttribute('rel');
                const href = oldEl.getAttribute('href');

                // Check for duplicate link tags
                const existing = document.head.querySelector(`link[rel="${CSS.escape(rel || '')}"][href="${CSS.escape(href || '')}"]`);
                if (existing) return;
            }

            // Final check before appending
            if (previousScopeRef.current === currentScope) {
                document.head.appendChild(newEl);
                scriptsRef.current.push(newEl as any);
            }
        });

        return () => {
            // Cleanup: Remove all scripts we added for this page scope
            scriptsRef.current.forEach((s) => {
                if (s && s.parentNode) {
                    s.remove();
                }
            });
            scriptsRef.current = [];

            // Extra safety: Remove any scripts with this scope that might still exist
            if (previousScopeRef.current === scope) {
                document.head
                    .querySelectorAll(`script[data-page-script-owner="${CSS.escape(scope)}"]`)
                    .forEach((s) => s.remove());
            }
        };
    }, [html, scope, pathname]);

    return null;
}
