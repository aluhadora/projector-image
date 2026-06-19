import data from './AvailableImages.json';

const BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL ?? '';

const IMAGE_FIELDS = ['src', 'smallsrc', 'flatsrc', 'smallflatsrc', 'bumpsrc', 'shadowsrc', 'ringsrc', 'smallringsrc', 'specularsrc'];

export function prefixPath(path) {
  if (!path) return path;
  if (path.startsWith(BASE_URL)) return path;
  
  return `${BASE_URL}/${path}`;
}

function prefixPaths(item) {
  const result = { ...item };
  for (const field of IMAGE_FIELDS) {
    if (result[field]) result[field] = prefixPath(result[field]);
  }
  return result;
}

export default {
  ...data,
  images: data.images.map(prefixPaths),
};
