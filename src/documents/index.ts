import glob from 'fast-glob';

export async function getDocuments() {
  const files = await glob('docs/[a-z0-9-]+.md');

  return files;
}
