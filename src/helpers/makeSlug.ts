export function MakeSlug(Text) {
  if (Text === undefined) {
    return "";
  }

  return Text.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}
