const aliases: Record<string, string> = {
  showcase: 'TECH_SHOWCASE',
  writeups: 'ARTICLES',
  open_source: 'OPEN_SOURCE_PROJECTS',
  career: 'ERA',
  archive: 'ARCHIVE',
  contact: 'CONTACT'
}

export function parseRoute(route: string) {
  const [segment = '', param = null] = route.replace(/^#/, '').split('/').filter(Boolean)

  return { path: Object.hasOwn(aliases, segment) ? aliases[segment] : segment, param }
}
