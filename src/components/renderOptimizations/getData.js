// Don't change this query function
let randomInteger = null;
export async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    randomInteger:
      randomInteger || (randomInteger = Math.floor(Math.random() * 100)),
    randomString: Math.random().toString(36).substring(7),
  };
}
