import { getCollection, getEntry, render, type CollectionEntry } from 'astro:content';
import { createTranslatedUrl, LANGUAGE_DEFAULT, type Language } from './languages';

export interface Doc extends CollectionEntry<'docs'> {
  language: Language;
}

export type DocSlug = Doc['id']; // extends `${infer T}${Locale}` ? T : Document['id'];

interface DocInfo {
  id: string;
  title: string;
  url: string;
}

export async function getDocInfo(doc: Doc): Promise<DocInfo> {
  const { headings } = await render(doc);
  const mainHeading = headings.find((heading) => heading.depth === 1);

  return {
    id: doc.id,
    title: mainHeading?.text || doc.id,
    url: createTranslatedUrl(`/${doc.id}/`, doc.language),
  };
}

function createDoc(doc1: CollectionEntry<'docs'>, language: Language, doc2?: CollectionEntry<'docs'>): Doc {
  const result: Doc = { ...doc1, language };

  if (doc2?.body) {
    result.body = doc2.body;
  }

  if (doc2?.rendered) {
    result.rendered = doc2.rendered;
  }

  if (doc2?.data) {
    result.data = { ...result.data, ...doc2.data };
  }

  if (doc2?.filePath) {
    result.filePath = doc2.filePath;
  }

  return result;
}

export async function getDocs(
  language: Language = LANGUAGE_DEFAULT,
  filter?: (doc: CollectionEntry<'docs'>) => boolean,
): Promise<Doc[]> {
  const docs = await getCollection(
    'docs',
    (entry) => /^[^\.]+\.mdx$/.test(entry.filePath ?? '') && (!filter || filter(entry)),
  );

  if (language !== LANGUAGE_DEFAULT) {
    const tester = new RegExp(`^[^\\.]+\\.${language}\\.mdx$`);
    const localizedDocs = await getCollection(
      'docs',
      (entry) => tester.test(entry.filePath ?? '') && (!filter || filter(entry)),
    );

    return docs.map((doc) =>
      createDoc(
        doc,
        language,
        localizedDocs.find(({ id }) => id === `${doc.id}${language}`),
      ),
    );
  } else {
    return docs.map((doc) => createDoc(doc, language));
  }
}

export async function getDoc(slug: DocSlug, language: Language = LANGUAGE_DEFAULT): Promise<Doc | undefined> {
  const doc = await getEntry('docs', slug);
  if (!doc) {
    return undefined;
  }

  let localizedDoc;

  if (language !== LANGUAGE_DEFAULT) {
    localizedDoc = await getEntry('docs', slug + language);
  }

  return createDoc(doc, language, localizedDoc);
}
