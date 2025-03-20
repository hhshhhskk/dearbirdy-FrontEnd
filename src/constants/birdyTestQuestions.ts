export type Answer = 0 | 1 | 2;
export type Direction = "life" | "lifestyle";

interface Option {
  value: Answer;
  emoji: string; // 이모지만 별도로 정의
  label: string; // 순수 텍스트
}

export interface Question {
  id: number;
  text: string;
  direction: Direction;
  options: Option[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: `취미나 여가보다 자기계발 중\n뭐가 더 중요하다고 생각하나요?`,
    direction: "life",
    options: [
      { value: 2, emoji: "✏️", label: "자기계발이요!" },
      { value: 1, emoji: "🟰", label: "비슷하다고 생각해요" },
      { value: 0, emoji: "🎵", label: "취미나 여가죠!" },
    ],
  },
  {
    id: 2,
    text: `즐거운 방식과 효율적인 방식 중\n무엇을 더 선호하시나요?`,
    direction: "life",
    options: [
      { value: 2, emoji: "👓", label: "효율이 중요하죠" },
      { value: 1, emoji: "🟰", label: "비슷하다고 생각해요" },
      { value: 0, emoji: "😄", label: "즐거워야해요!" },
    ],
  },

  {
    id: 3,
    text: `목표를 이루기 위해서라면\n힘들어도 참을 수 있으신가요?`,
    direction: "life",
    options: [
      { value: 2, emoji: "📈", label: "네, 참을수 있어요" },
      { value: 1, emoji: "🤔", label: "그럭저럭 애매해요" },
      { value: 0, emoji: "🤔", label: "아니요, 힘든 건 싫어요!" },
    ],
  },
  {
    id: 4,
    text: `하고 싶은 일보다\n돈이 더 중요하다고 생각하나요?`,
    direction: "life",
    options: [
      { value: 2, emoji: "💸", label: "돈이 제일 중요해요!" },
      { value: 1, emoji: "🟰", label: "비슷하다고 생각해요" },
      { value: 0, emoji: "💓", label: "하고 싶은 일을 하는게 중요해요!" },
    ],
  },
  {
    id: 5,
    text: `성공한 삶이 여유로운 삶보다\n더 중요하다고 생각하시나요?`,
    direction: "life",
    options: [
      { value: 2, emoji: "💰", label: "성공한 삶을 사는 게 중요하죠" },
      { value: 1, emoji: "🟰", label: "보통인 것 같아요" },
      { value: 0, emoji: "🏖️", label: "여유 있는 삶이 더 나아요" },
    ],
  },
  {
    id: 6,
    text: `일과 삶의 균형에서\n일이 우선이신가요?`,
    direction: "life",
    options: [
      { value: 2, emoji: "🖥️", label: "일이 우선이에요!" },
      { value: 1, emoji: "🟰", label: "비슷하다고 생각해요" },
      { value: 0, emoji: "🏖️", label: "제 삶이 우선이에요!" },
    ],
  },
  {
    id: 7,
    text: `여러 사람과 교류하는 것이\n당신에게 에너지를 주나요?`,
    direction: "lifestyle",
    options: [
      { value: 2, emoji: "🙌", label: "네! 교류가 좋아요" },
      { value: 1, emoji: "🤔", label: "그때그때 다르거나 비슷해요" },
      { value: 0, emoji: "🫰", label: "아니요, 혼자가 더 편해요" },
    ],
  },
  {
    id: 8,
    text: `혼자만의 시간보다\n누군가와 함께 하는 시간이 더 즐겁나요?`,
    direction: "lifestyle",
    options: [
      { value: 2, emoji: "🙌", label: "함께 하는 시간이 더 좋아요" },
      { value: 1, emoji: "🟰", label: "비슷비슷한 것 같아요" },
      { value: 0, emoji: "🫰", label: "혼자만의 시간이 더 좋아요" },
    ],
  },
  {
    id: 9,
    text: `새로운 사람을 만나는 것에\n설레는 편인가요?`,
    direction: "lifestyle",
    options: [
      { value: 2, emoji: "😄", label: "네, 설레요!" },
      { value: 1, emoji: "🟰", label: "보통인 것 같아요" },
      { value: 0, emoji: "😅", label: "아니요, 새로운 만남은 어려워요" },
    ],
  },
  {
    id: 10,
    text: `개인활동, 단체활동 중\n더 편한 것은 무엇인가요?`,
    direction: "lifestyle",
    options: [
      { value: 2, emoji: "🙌", label: "단체활동이요" },
      { value: 1, emoji: "🟰", label: "둘이 비슷해요" },
      { value: 0, emoji: "🫰", label: "개인활동이요" },
    ],
  },
  {
    id: 11,
    text: `주말에 주로 약속을 잡아\n친구들과 만나는 타입인가요?`,
    direction: "lifestyle",
    options: [
      { value: 2, emoji: "👟", label: "네, 주로 약속이 있어요!" },
      { value: 1, emoji: "🤔", label: "때에 따라 달라요" },
      { value: 0, emoji: "🏠", label: "아니요, 내 집이 최고" },
    ],
  },
  {
    id: 12,
    text: `모임에서 처음 보는 사람이 있다면\n먼저 다가가 말을 거시나요?`,
    direction: "lifestyle",
    options: [
      { value: 2, emoji: "🗣️", label: "주로 말을 거는 타입이에요" },
      { value: 1, emoji: "🤔", label: "때에 따라 달라요" },
      { value: 0, emoji: "👀", label: "주로 가만히 있는 타입이에요" },
    ],
  },
];
