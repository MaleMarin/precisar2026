import type { ReactNode } from "react";
import { SITE } from "@/lib/site";

type ListItem = string | { strong?: string; bold?: string; text: string };

type ParagraphBlock = {
  type: "p";
  text: string;
  label?: string;
  wrapStrong?: boolean;
};

type H3Block = { type: "h3"; text: string };

type UlBlock = { type: "ul"; items: ListItem[] };

export type LegalBlock = ParagraphBlock | H3Block | UlBlock;

export type LegalSection = { title: string; blocks: LegalBlock[] };

export function injectLegalEmails(text: string, contactEmail: string, privacyEmail: string): ReactNode {
  const parts = text.split(/(__EMAIL__|__PRIVACY_EMAIL__)/g);
  return parts.map((part, i) => {
    if (part === "__EMAIL__") {
      return (
        <a key={i} href={`mailto:${contactEmail}`}>
          {contactEmail}
        </a>
      );
    }
    if (part === "__PRIVACY_EMAIL__") {
      return (
        <a key={i} href={`mailto:${privacyEmail}`}>
          {privacyEmail}
        </a>
      );
    }
    return part;
  });
}

function isEmailPlaceholder(text: string) {
  return text.trim() === "__EMAIL__" || text.includes("__EMAIL__");
}

function isPrivacyEmailPlaceholder(text: string) {
  return text.trim() === "__PRIVACY_EMAIL__" || text.includes("__PRIVACY_EMAIL__");
}

function listLabel(item: { strong?: string; bold?: string }) {
  return item.bold ?? item.strong;
}

export function renderListItem(item: ListItem, key: number, contactEmail: string, privacyEmail: string) {
  if (typeof item === "string") {
    return <li key={key}>{item}</li>;
  }
  const label = listLabel(item);
  if (label && isEmailPlaceholder(item.text)) {
    return (
      <li key={key}>
        <strong>{label}</strong>{" "}
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
      </li>
    );
  }
  if (label && isPrivacyEmailPlaceholder(item.text)) {
    return (
      <li key={key}>
        <strong>{label}</strong>{" "}
        <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a>
      </li>
    );
  }
  if (isEmailPlaceholder(item.text) || isPrivacyEmailPlaceholder(item.text)) {
    return (
      <li key={key}>
        {label ? <strong>{label}</strong> : null}
        {injectLegalEmails(item.text, contactEmail, privacyEmail)}
      </li>
    );
  }
  return (
    <li key={key}>
      {label ? <strong>{label}</strong> : null}
      {item.text}
    </li>
  );
}

export function renderLegalBlock(
  block: LegalBlock,
  key: number,
  contactEmail = SITE.contactEmail,
  privacyEmail = SITE.privacyEmail,
) {
  switch (block.type) {
    case "h3":
      return (
        <h3 key={key} className="mt-6 text-base font-medium">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul key={key} className="list-disc space-y-1 pl-5">
          {block.items.map((item, i) => renderListItem(item, i, contactEmail, privacyEmail))}
        </ul>
      );
    case "p":
      if (block.label && block.wrapStrong) {
        return (
          <p key={key} className="mt-4">
            <strong>{block.label}</strong>
            {block.text}
          </p>
        );
      }
      if (block.label) {
        return (
          <p key={key}>
            <strong>{block.label}</strong> {block.text}
          </p>
        );
      }
      if (isEmailPlaceholder(block.text) || isPrivacyEmailPlaceholder(block.text)) {
        return <p key={key}>{injectLegalEmails(block.text, contactEmail, privacyEmail)}</p>;
      }
      return <p key={key}>{block.text}</p>;
    default:
      return null;
  }
}

export function renderBotListItem(item: ListItem, key: number) {
  if (typeof item === "string") {
    return <li key={key}>{item}</li>;
  }
  return (
    <li key={key}>
      {item.strong ? <strong>{item.strong}</strong> : null}
      {item.text}
    </li>
  );
}

export function renderBotPara(item: ListItem) {
  if (typeof item === "string") {
    return item;
  }
  return (
    <>
      <strong>{item.strong}</strong>
      {item.text}
    </>
  );
}
