import { EntryType } from "@/components/EntryDataForm";

export function generateEntry(n: number, type: EntryType): number[] {
  const array: number[] = [];

  switch (type) {
    case EntryType.RANDOM:
      for (let i = 0; i < n; i++) {
        array.push(i + 1);
      }
      for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      break;

    case EntryType.ASCENDING:
      for (let i = 0; i < n; i++) {
        array.push(i + 1);
      }
      break;

    case EntryType.DESCENDING:
      for (let i = n; i > 0; i--) {
        array.push(i);
      }
      break;

    default:
      for (let i = 0; i < n; i++) {
        array.push(i + 1);
      }
      for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
  }

  return array;
}
