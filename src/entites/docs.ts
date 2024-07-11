import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { createTranslatedUrl, LANGUAGE_DEFAULT, type Language } from './languages';

export type Doc = CollectionEntry<'docs'> & {
  language: Language;
};

export type DocSlug = Doc['slug']; // extends `${infer T}${Locale}` ? T : Document['slug'];

interface DocInfo {
  slug: string;
  title: string;
  url: string;
}

export async function getDocInfo(doc: Doc): Promise<DocInfo> {
  const { headings } = await doc.render();
  const mainHeading = headings.find((heading) => heading.depth === 1);

  return {
    slug: doc.slug,
    title: mainHeading?.text || doc.slug,
    url: createTranslatedUrl(`/${doc.slug}/`, doc.language),
  };
}

function createDoc(doc1: CollectionEntry<'docs'>, language: Language, doc2?: CollectionEntry<'docs'>): Doc {
  return {
    ...doc1,
    body: doc2?.body || doc1.body,
    render: doc2?.render || doc1.render,
    data: {
      ...doc1.data,
      ...doc2?.data,
    },
    language,
  };
}

export async function getDocs(
  language: Language = LANGUAGE_DEFAULT,
  filter?: (doc: CollectionEntry<'docs'>) => boolean,
): Promise<Doc[]> {
  const docs = await getCollection('docs', (entry) => /^[^\.]+\.mdx$/.test(entry.id) && (!filter || filter(entry)));

  if (language !== LANGUAGE_DEFAULT) {
    const tester = new RegExp(`^[^\\.]+${language}\\.mdx$`);
    const localizedDocs = await getCollection('docs', (entry) => tester.test(entry.id) && (!filter || filter(entry)));

    return docs.map((doc) =>
      createDoc(
        doc,
        language,
        localizedDocs.find(({ id }) => id === `${doc.slug}.${language}.mdx`),
      ),
    );
  } else {
    return docs.map((doc) => createDoc(doc, language));
  }
}

export async function getDoc(slug: DocSlug, language: Language = LANGUAGE_DEFAULT): Promise<Doc | undefined> {
  const doc = await getEntry('docs', slug);
  let localizedDoc;

  if (language !== LANGUAGE_DEFAULT) {
    localizedDoc = await getEntry('docs', slug + language);
  }

  return createDoc(doc, language, localizedDoc);
}
