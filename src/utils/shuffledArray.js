function shuffleArray(array) {
    const shuffledArray = [...array]; // Create a copy of the original array
  
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1)); // Generate a random index
  
      // Swap elements between current index and random index
      [shuffledArray[i], shuffledArray[randomIndex]] = [
        shuffledArray[randomIndex],
        shuffledArray[i],
      ];
    }
  
    return shuffledArray;
  }
  
  export default shuffleArray;
  