
import { Identity, QuizQuestion } from './types';

export const IDENTITIES: Identity[] = [
  {
    id: 1,
    title: "Bình phương của một tổng",
    formula: "(a + b)² = a² + 2ab + b²",
    simpleExplanation: "Bình phương của tổng hai số bằng bình phương số thứ nhất, cộng hai lần tích hai số, cộng bình phương số thứ hai.",
    example: {
      steps: [
        "Tính (x + 2)²",
        "Số thứ nhất là x, số thứ hai là 2",
        "Áp dụng công thức: x² + 2·x·2 + 2²"
      ],
      result: "x² + 4x + 4"
    },
    mnemonic: "Tổng bình phương, nhớ kỹ đường: Số một bình, tích đôi thương, số hai bình."
  },
  {
    id: 2,
    title: "Bình phương của một hiệu",
    formula: "(a - b)² = a² - 2ab + b²",
    simpleExplanation: "Giống như tổng nhưng ở giữa là dấu trừ.",
    example: {
      steps: [
        "Tính (x - 3)²",
        "Áp dụng: x² - 2·x·3 + 3²"
      ],
      result: "x² - 6x + 9"
    },
    mnemonic: "Hiệu bình phương, dấu trừ ở giữa hai lần tích."
  },
  {
    id: 3,
    title: "Hiệu hai bình phương",
    formula: "a² - b² = (a - b)(a + b)",
    simpleExplanation: "Hiệu hai bình phương bằng tích của hiệu hai số đó với tổng của chúng.",
    example: {
      steps: [
        "Tính x² - 4",
        "Nhận ra 4 = 2²",
        "Áp dụng: x² - 2² = (x - 2)(x + 2)"
      ],
      result: "(x - 2)(x + 2)"
    },
    mnemonic: "Hai bình trừ nhau, tách thành hai ngoặc: một trừ một cộng."
  },
  {
    id: 4,
    title: "Lập phương của một tổng",
    formula: "(a + b)³ = a³ + 3a²b + 3ab² + b³",
    simpleExplanation: "Khai triển mũ 3 với quy luật 1-3-3-1.",
    example: {
      steps: [
        "Tính (x + 1)³",
        "Áp dụng: x³ + 3·x²·1 + 3·x·1² + 1³"
      ],
      result: "x³ + 3x² + 3x + 1"
    },
    mnemonic: "Mũ ba tổng: Đầu đuôi lập phương, giữa ba lần tích bình phương xen kẽ."
  },
  {
    id: 5,
    title: "Lập phương của một hiệu",
    formula: "(a - b)³ = a³ - 3a²b + 3ab² - b³",
    simpleExplanation: "Dấu đan xen: Cộng - Trừ - Cộng - Trừ.",
    example: {
      steps: [
        "Tính (x - 2)³",
        "Áp dụng: x³ - 3·x²·2 + 3·x·2² - 2³"
      ],
      result: "x³ - 6x² + 12x - 8"
    },
    mnemonic: "Mũ ba hiệu: Dấu nhảy múa (+ - + -)."
  },
  {
    id: 6,
    title: "Tổng hai lập phương",
    formula: "a³ + b³ = (a + b)(a² - ab + b²)",
    simpleExplanation: "Tổng hai lập phương bằng tổng hai số đó nhân với bình phương thiếu của hiệu.",
    example: {
      steps: [
        "Tính x³ + 8",
        "Nhận ra 8 = 2³",
        "Áp dụng công thức: x³ + 2³ = (x + 2)(x² - x·2 + 2²)"
      ],
      result: "(x + 2)(x² - 2x + 4)"
    },
    mnemonic: "Tổng lập phương: Ngoặc nhỏ mang dấu cộng, ngoặc to bình phương thiếu mang dấu trừ."
  },
  {
    id: 7,
    title: "Hiệu hai lập phương",
    formula: "a³ - b³ = (a - b)(a² + ab + b²)",
    simpleExplanation: "Hiệu hai lập phương bằng hiệu hai số đó nhân với bình phương thiếu của tổng.",
    example: {
      steps: [
        "Tính x³ - 27",
        "Nhận ra 27 = 3³",
        "Áp dụng công thức: x³ - 3³ = (x - 3)(x² + x·3 + 3²)"
      ],
      result: "(x - 3)(x² + 3x + 9)"
    },
    mnemonic: "Hiệu lập phương: Ngoặc nhỏ mang dấu trừ, ngoặc to toàn dấu cộng."
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Khai triển (x + 1)² ta được kết quả là:",
    options: ["x² + 1", "x² + 2x + 1", "x² + x + 1", "x² - 2x + 1"],
    correctAnswer: 1,
    explanation: "Áp dụng (a+b)² = a² + 2ab + b² với a=x, b=1."
  },
  {
    id: 2,
    question: "Biểu thức x² - 9 bằng:",
    options: ["(x - 3)²", "(x + 3)²", "(x - 3)(x + 3)", "x - 3"],
    correctAnswer: 2,
    explanation: "Đây là hiệu hai bình phương: x² - 3² = (x-3)(x+3)."
  },
  {
    id: 3,
    question: "Khai triển (2x - 1)² ta được:",
    options: ["4x² - 1", "4x² - 4x + 1", "2x² - 4x + 1", "4x² + 4x + 1"],
    correctAnswer: 1,
    explanation: "(2x)² - 2·2x·1 + 1² = 4x² - 4x + 1."
  },
  {
    id: 4,
    question: "Tính nhanh 101² bằng hằng đẳng thức:",
    options: ["(100 + 1)²", "(100 - 1)²", "(102 - 1)²", "100² + 1²"],
    correctAnswer: 0,
    explanation: "101² = (100+1)² = 10000 + 200 + 1 = 10201."
  },
  {
    id: 5,
    question: "Rút gọn biểu thức (x + y)² - (x - y)²:",
    options: ["0", "2x² + 2y²", "4xy", "2xy"],
    correctAnswer: 2,
    explanation: "(x²+2xy+y²) - (x²-2xy+y²) = 4xy."
  },
  {
    id: 6,
    question: "Biểu thức x³ + 3x² + 3x + 1 là khai triển của:",
    options: ["(x + 1)²", "(x + 3)³", "(x + 1)³", "(x - 1)³"],
    correctAnswer: 2,
    explanation: "Đây là hằng đẳng thức lập phương của một tổng."
  },
  {
    id: 7,
    question: "Kết quả của (x - 2)(x + 2) là:",
    options: ["x² - 4", "x² + 4", "x² - 2", "x² - 4x + 4"],
    correctAnswer: 0,
    explanation: "Áp dụng hiệu hai bình phương ngược: (a-b)(a+b) = a²-b²."
  },
  {
    id: 8,
    question: "Viết biểu thức x² + 6x + 9 dưới dạng bình phương một tổng:",
    options: ["(x + 9)²", "(x + 3)²", "(x + 6)²", "(x - 3)²"],
    correctAnswer: 1,
    explanation: "x² + 2·x·3 + 3² = (x+3)²."
  },
  {
    id: 9,
    question: "Tính 99² bằng cách sử dụng hằng đẳng thức:",
    options: ["(100 - 1)²", "(90 + 9)²", "(100 + 1)²", "90² + 9²"],
    correctAnswer: 0,
    explanation: "99² = (100-1)² = 10000 - 200 + 1 = 9801."
  },
  {
    id: 10,
    question: "Hằng đẳng thức (a - b)³ có bao nhiêu dấu trừ trong khai triển?",
    options: ["1", "2", "3", "0"],
    correctAnswer: 1,
    explanation: "a³ - 3a²b + 3ab² - b³. Có 2 vị trí mang dấu trừ."
  }
];
