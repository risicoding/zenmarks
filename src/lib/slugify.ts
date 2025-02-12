function slugify(string: string) {
  return string
    .toString() // Ensure the input is a string
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing spaces
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, "") // Remove non-word characters
    .replace(/\-\-+/g, "-"); // Replace multiple hyphens with a single one
}

export default slugify;
