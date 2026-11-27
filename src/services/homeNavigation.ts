let pendingSectionId: string | null = null

export function requestHomeSection(sectionId: string) {
  pendingSectionId = sectionId
}

export function consumeHomeSection() {
  const sectionId = pendingSectionId
  pendingSectionId = null
  return sectionId
}
