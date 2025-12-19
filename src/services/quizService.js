export async function getTests() {
  const response = await fetch("https://tgryl.pl/quiz/tests");
  return await response.json();
}

export async function getTestDetails(id) {
  const response = await fetch(`https://tgryl.pl/quiz/test/${id}`);
  return await response.json();
}
