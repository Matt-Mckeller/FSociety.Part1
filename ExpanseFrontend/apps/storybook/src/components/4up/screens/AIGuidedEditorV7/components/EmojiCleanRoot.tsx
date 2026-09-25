import { useEffect, useRef, type ReactNode } from 'react';
import { Box, type BoxProps } from '@mui/material';

/** Leading emoji / pictograph sequences (incl. ZWJ + variation selectors). */
const LEADING_EMOJI = /^(?:[\p{Extended_Pictographic}\uFE0F\u200D]+\s*)+/u;

function stripLeadingEmoji(text: string): string {
  return text.replace(LEADING_EMOJI, '').trimStart();
}

function cleanTree(root: HTMLElement) {
  const selectors = [
    '.MuiChip-label',
    '.MuiTypography-root',
    '.MuiButton-startIcon + *',
  ];

  root.querySelectorAll(selectors.join(',')).forEach((node) => {
    const el = node as HTMLElement;
    if (el.dataset.v7EmojiClean === '1') return;
    if (el.children.length > 0) return;

    const raw = el.textContent ?? '';
    const next = stripLeadingEmoji(raw);
    if (next !== raw) {
      el.textContent = next;
      el.dataset.v7EmojiClean = '1';
    }
  });

  /* Standalone emoji-only text nodes used as “icons” in V6 layers */
  root.querySelectorAll('span, p, div, h6').forEach((node) => {
    const el = node as HTMLElement;
    if (el.dataset.v7EmojiClean === '1') return;
    if (el.children.length > 0) return;
    const raw = (el.textContent ?? '').trim();
    if (!raw) return;
    if (LEADING_EMOJI.test(raw) && stripLeadingEmoji(raw) === '') {
      el.textContent = '';
      el.dataset.v7EmojiClean = '1';
    }
  });
}

/**
 * Strips leading emoji from nested V6 chip/typography labels without editing V6.
 * Keeps section chips, options, and detail rows — just quieter icons.
 */
export function EmojiCleanRoot({ children, sx, ...rest }: BoxProps & { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const run = () => cleanTree(root);
    run();

    const mo = new MutationObserver(() => run());
    mo.observe(root, { childList: true, subtree: true, characterData: true });
    return () => mo.disconnect();
  }, []);

  return (
    <Box ref={ref} sx={sx} {...rest}>
      {children}
    </Box>
  );
}
