export const toDateTime = (date: string) => {
  const createdAtDate = new Date(date);
  return createdAtDate.toLocaleDateString()
}