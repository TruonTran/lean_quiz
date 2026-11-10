export interface Question {
  id: number;
  question: string;
  options: string[];

  // Một đáp án hoặc nhiều đáp án
  answer: number | number[];

  hint?: string;
  rationale?: string;

  /** Ảnh minh hoạ (địa chỉ https) hiện dưới nội dung câu hỏi. */
  image?: string;
}
