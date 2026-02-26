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

        // Parse the provided HTML to find <script> tags
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html.trim();
        const scripts = tempDiv.querySelectorAll("script");

        if (scripts.length === 0) {
            return;
        }

        // Final safety check: Remove any scripts that might have been added by other components
        // This prevents race conditions during navigation
        removeAllPageScripts();

        // Create scripts in <head>
        scripts.forEach((oldScript) => {
            // Double-check: Make sure we haven't been unmounted or scope changed
            if (previousScopeRef.current !== currentScope) {
                return; // Don't add scripts if scope changed during processing
            }

            // Handle inline script - check for content or attributes
            if (!oldScript.src) {
                const content = normalizeInlineScript(oldScript.innerHTML || "");
                const hasAttributes = oldScript.attributes.length > 0;
                if (!content && !hasAttributes) {
                    return; // Skip only completely empty and attribute-less scripts
                }
                const scriptType = oldScript.getAttribute("type") || undefined;

                // Check if this exact script already exists (prevent duplicates)
                if (content && scriptExists(content, scriptType)) {
                    return; // Skip if duplicate exists
                }
            }

            const newScript = document.createElement("script");

            // Mark ownership so we can identify and remove later
            newScript.dataset.pageScriptOwner = currentScope;

            // Get original src value BEFORE browser resolves it (preserve as-is from API)
            const originalSrc = oldScript.getAttribute("src");

            // Copy all attributes (src, async, defer, type, etc.)
            // IMPORTANT: Copy attributes first to preserve original values
            Array.from(oldScript.attributes).forEach((attr) => {
                // For src attribute, use the original value from getAttribute to avoid browser resolution
                if (attr.name === "src" && originalSrc !== null) {
                    newScript.setAttribute(attr.name, originalSrc);
                } else {
                    newScript.setAttribute(attr.name, attr.value);
                }
            });

            // Handle external script
            if (originalSrc) {
                // Check if external script already exists (use original src for comparison)
                const existing = document.head.querySelector(`script[src="${CSS.escape(originalSrc)}"]`);
                if (existing) {
                    return; // Skip if duplicate exists
                }
                // Don't set newScript.src directly - it's already set via setAttribute above
                // This preserves the original URL exactly as provided by the API
            } else {
                // Handle inline script
                const content = normalizeInlineScript(oldScript.innerHTML || "");
                if (content) {
                    newScript.text = content;
                }
            }

            // Final check before appending
            if (previousScopeRef.current === currentScope) {
                document.head.appendChild(newScript);
                scriptsRef.current.push(newScript);
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
