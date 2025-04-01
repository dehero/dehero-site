import { getCollection, getEntry, render, type CollectionEntry } from 'astro:content';
import { createTranslatedUrl, type Language } from './languages';

const CONTENT_LANGUAGE_REGEX = /^<Content.*lang="(.*)"/gm;

export type Doc = CollectionEntry<'docs'>;

export type DocId = Doc['id'];

interface DocInfo {
  id: string;
  title: string;
  url: string;
}

export async function getDocInfo(doc: Doc, language: Language): Promise<DocInfo> {
  // TODO: improve searching heading index
  const languages = [...(doc.body?.matchAll(CONTENT_LANGUAGE_REGEX) ?? [])].map((match) => match[1]);
  const languageIndex = languages?.findIndex((lang) => lang === language);

  const { headings } = await render(doc);
  const mainHeadings = headings.filter((heading) => heading.depth === 1);
  const mainHeading = mainHeadings[languageIndex] ?? mainHeadings[0];

  return {
    id: doc.id,
    title: mainHeading?.text || doc.id,
    url: createTranslatedUrl(`/${doc.id}/`, language),
  };
}

export async function getDocs(filter?: (doc: Doc) => boolean): Promise<Doc[]> {
  return getCollection('docs', filter);
}

export async function getDoc(id: DocId): Promise<Doc | undefined> {
  return getEntry('docs', id);
}

export function getDocMetaTitle(doc: Doc, language: Language) {
  return typeof doc.data.metaTitle === 'string' ? doc.data.metaTitle : doc.data.metaTitle?.[language];
}

export function getDocDescription(doc: Doc, language: Language) {
  return typeof doc.data.description === 'string' ? doc.data.description : doc.data.description?.[language];
}
