import type { getSubjectById } from "../data/subjects";

export type Subject = NonNullable<ReturnType<typeof getSubjectById>>;
export type Question = Subject["questions"][number];
export type Answer = number | number[];
export type SlideDir = "next" | "prev";
