import { EntryType } from "@/components/EntryDataForm";

export function generateEntry(n: number, type: EntryType): number[] {
  const size = Math.max(1, Math.min(50000, Math.floor(n)));
  const array: number[] = [];

  switch (type) {
    case EntryType.RANDOM:
      for (let i = 0; i < size; i++) {
        array.push(i + 1);
      }
      for (let i = size - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      break;

    case EntryType.ASCENDING:
      for (let i = 0; i < size; i++) {
        array.push(i + 1);
      }
      break;

    case EntryType.DESCENDING:
      for (let i = size; i > 0; i--) {
        array.push(i);
      }
      break;

    default:
      for (let i = 0; i < size; i++) {
        array.push(i + 1);
      }
      for (let i = size - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
  }

  return array;
}
