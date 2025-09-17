import { EntryType } from "@/components/EntryDataForm";

export function generateEntry(size: number, type: EntryType): number[] {
  const array: number[] = [];

  switch (type) {
    case EntryType.RANDOM:
      for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * size));
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
        array.push(Math.floor(Math.random() * size));
      }
  }

  return array;
}
