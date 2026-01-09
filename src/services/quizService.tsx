export interface TestItem {
  id: string;
  name: string;
  tags: string[];
}

export interface TestDetails {
  id: string;
  name: string;
  tasks: Array<{
    question: string;
    answers: Array<{
      content: string;
      isCorrect: boolean;
    }>;
  }>;
}

export async function getTests(): Promise<TestItem[]> {
  try {
    const response = await fetch("https://tgryl.pl/quiz/tests");
    const data = await response.json();

    return data.map((t: any) => ({
      ...t,
      tags: Array.isArray(t.tags) ? t.tags : [],
    }));
  } catch (err) {
    console.warn("📴 Brak internetu lub błąd API w getTests:", err);
    return []; // offline fallback
  }
}

export async function getTestDetails(id: string): Promise<TestDetails> {
  try {
    const response = await fetch(`https://tgryl.pl/quiz/test/${id}`);
    return await response.json();
  } catch (err) {
    console.warn("📴 Brak internetu lub błąd API w getTestDetails:", err);

    return {
      id,
      name: "Offline",
      tasks: [],
    };
  }
}
