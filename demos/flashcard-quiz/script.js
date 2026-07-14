document.addEventListener("DOMContentLoaded", () => {
  const flashcard = document.getElementById("flashcard");
  const front = document.getElementById("card-front");
  const back = document.getElementById("card-back");
  const flipBtn = document.getElementById("flipBtn");
  const nextBtn = document.getElementById("nextBtn");
  const backBtn = document.getElementById("backBtn");
  const progressText = document.getElementById("cardProgress");



  const flashcards = [
    { question: "What is object-oriented programming?", answer: "A programming approach that organizes software around objects containing data and behavior." },
    { question: "What are the four main principles of object-oriented programming?", answer: "Encapsulation, abstraction, inheritance, and polymorphism." },
    { question: "What is an API?", answer: "An Application Programming Interface allows different software systems to communicate with one another." },
    { question: "What does REST stand for?", answer: "Representational State Transfer." },
    { question: "What is the purpose of Git?", answer: "Git is a version control system used to track code changes and support collaboration." },
    { question: "What is a database?", answer: "A structured system used to store, organize, retrieve, and manage data." },
    { question: "What is the difference between frontend and backend development?", answer: "Frontend development focuses on the user interface, while backend development handles business logic, servers, and data." },
    { question: "What is debugging?", answer: "The process of finding, analyzing, and fixing errors in software." },
    { question: "What is cloud computing?", answer: "The delivery of computing services such as storage, servers, databases, and software over the internet." },
    { question: "What is responsive web design?", answer: "An approach that allows a website to adapt its layout to different screen sizes and devices." }
  ];

  let currentCard = 0;

  // Load the first card
  loadCard(currentCard);

  // Flip button
  flipBtn.addEventListener("click", () => {
    flashcard.classList.toggle("flipped");
  });


  
  // Next button
  nextBtn.addEventListener("click", () => {
    flashcard.classList.remove("flipped");
    currentCard++;

    if (currentCard >= flashcards.length) {
      currentCard = 0;
    }

    setTimeout(() => {
      loadCard(currentCard);
    }, 300);
  });

  // ✅ Back button
  backBtn.addEventListener("click", () => {
    flashcard.classList.remove("flipped");
    currentCard--;

    if (currentCard < 0) {
      currentCard = flashcards.length - 1;
    }

    setTimeout(() => {
      loadCard(currentCard);
    }, 300);
  });

  // Load question + answer into card
  function loadCard(index) {
  const card = flashcards[index];
  front.textContent = card.question;
  back.textContent = card.answer;
  progressText.textContent = `Card ${index + 1} of ${flashcards.length}`;
}
});
