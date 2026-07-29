import type { Subject } from "../../types/Subject";

import { mln111 } from "./mln111";
import { mln122 } from "./mln122";

export const subjects: Subject[] = [mln111, mln122];

export function getSubjectById(id: string) {
  return subjects.find((subject) => subject.id === id);
}
