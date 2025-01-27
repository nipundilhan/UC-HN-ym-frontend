import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-learn-questions',
  templateUrl: './learn-questions.component.html',
  styleUrls: ['./learn-questions.component.css']
})
export class LearnQuestionsComponent implements OnInit {

  // Tips array which can include text, images, and even videos
tips = [
  {
    text: `<p>Welcome to <b><i>Pharao's Trial: Question Mastery</i></b>, brave adventurer!</p>
           <p>In this journey, I’ll guide you through an exciting skill that sharpens your mind and prepares you for success: <b>crafting your own questions and answers</b>.</p>
           <p>Learning how to create and answer questions helps you understand programming concepts deeply, identify key topics, and prepare effectively for exams—all while making studying more engaging and interactive.</p>
           <p>Click the <b>next arrow</b> to embark on this empowering learning adventure...</p>`,
    images: [],
    video: null
  },
  {
    text: `<h4>Why Craft Questions?</h4>
         <div class="journalling-tip-block">🌟 <b>Enhances Understanding:</b> Writing questions forces you to identify and understand key concepts.</div>
         <div class="journalling-tip-block">✨ <b>Prepares for Exams:</b> Anticipating possible questions mirrors what you might encounter in the exam.</div>
         <div class="journalling-tip-block">🛡️ <b>Boosts Retention:</b> Creating answers helps solidify your knowledge and recall it later.</div>`,
    images: [],
    video: null
    // video: "https://www.youtube.com/embed/MI2MIyiGAeQ?si=ARo64DVeOzUkYHEI"
  },
  {
   
    text: `<h4>Steps to Craft Questions and Answers</h4>
         <h6>Follow these steps to master this study skill:</h6>
         <div class="breathing-step-block">
           <p><b>Step 1: Identify Key Topics </b>: Go through your programming lecture notes, tutorials or other relevant materials and pick out essential topics or concepts.  Look for core topics or challenging concepts that are essential for understanding the subject. Highlight keywords, patterns, and recurring themes to focus your questions effectively.</p>
         </div>`,
    images: [],
    video: null
    // video: "https://www.youtube.com/embed/MI2MIyiGAeQ?si=ARo64DVeOzUkYHEI"
  },
  {
   
    text: `<h4>Steps to Craft Questions and Answers</h4>
<h6>Follow these steps to master this study skill:</h6>
<div class="breathing-step-block">
  <p><b>Step 2: Create Questions</b>: Write a mix of theoretical and practical questions. A good question not only tests knowledge but also encourages critical thinking and application of concepts. Here's how to create balanced questions:</p>
  <ul>
    <li>
      <p><b>Theoretical Questions:</b> These assess your understanding of concepts and definitions. Aim for clarity and depth. For example:</p>
      <p><i>- What is the purpose of a loop in programming?</i></p>
      <p><i>- Explain the differences between a 'for' loop and a 'while' loop with examples.</i></p>
    </li>
    <li>
      <p><b>Practical Questions:</b> These test your ability to apply theoretical knowledge to solve problems. Ensure they are realistic and relevant to what you're learning. For example:</p>
      <p><i>- Write a Python function to reverse a string.</i></p>
      <p><i>- Design an algorithm to find the second-largest number in a list.</i></p>
    </li>
  </ul>
</div>
`,
    images: [],
    video: null
    // video: "https://www.youtube.com/embed/MI2MIyiGAeQ?si=ARo64DVeOzUkYHEI"
  },
  {
   
    text: `<h4>Steps to Craft Questions and Answers</h4>
         <h6>Follow these steps to master this study skill:</h6>
         <div class="breathing-step-block">
           <p><b>Step 3: Write Model Answers </b>: Craft detailed answers to your questions. Include clear explanations and relevant examples, such as code snippets or diagrams. Use comments in code to explain key parts and ensure answers can be understood by someone new to the topic.</p>
           <p><b>Step 4: Refine </b>: Review your questions for clarity, and ensure your answers are accurate and easy to understand.</p>
           <p><b>Step 5: Test Yourself </b>: Later, try answering your crafted questions without referring to the answers.</p>
         </div>
         <p>🌟 <b>Bonus:</b> Share your questions with friends or classmates for collaborative learning!</p>`,
    images: [],
    video: null
    // video: "https://www.youtube.com/embed/MI2MIyiGAeQ?si=ARo64DVeOzUkYHEI"
    },
  {
    text: `<h3>How to Play the Game</h3>
           <p>Welcome to your creative study adventure! Here’s how to maximize your experience by logging your crafted questions:</p> 
           <p><strong>Log Your Questions:</strong> As you create questions and answers based on your lessons, log the details to track your progress. 
           Enter the lesson title, your question, and its corresponding answer to build a personalized study guide. You will earn a <b>point</b> for each question created.</p> `,
    images: ["assets/questions/add-question.png"],
    video: null
  },
  {
    text: `<h3>How to Play the Game</h3>
           <p><strong>Review Your Questions:</strong> Revisit your logged questions to see how your understanding of the topic grows. 
           Use this record as a revision tool to identify gaps in your knowledge and strengthen your programming skills.</p>`,
    images: ["assets/questions/view-questions.png"],
    video: null
  },
  {
    text: `<h3>Share Your Questions</h3>
           <p>Sharing your crafted questions is both easy and beneficial! Here’s how you can inspire others and get feedback:</p>
           <ol>
             <li><strong>Log Your Questions:</strong> Ensure each question is logged with its answer and all essential details. </li>
             <li><strong>Click the Share Button:</strong> Look for the <b>"Share"</b> button at the bottom of your logged question record. Click it to share your work with others.</li>
             <li><strong>Engage and Collaborate:</strong> Once shared, your question will be visible to your friends, allowing them to like.</li>
             <li><strong>Earn Likes:</strong> Gain recognition by receiving likes for your questions. The more likes you get, the closer you’ll be to earning the <b>Rising Star Badge</b>!</li>
           </ol>
           <p>Sharing your crafted questions not only helps others but also allows you to learn through collaboration and feedback!</p>`,
    images: [],
    video: null
  },
  {
    text: `<h3>Earn Badges</h3>
           <ul>
             <div class="tip-block">
               <li><b>Beginner Badge:</b> Log <strong>2 questions</strong> to earn this badge, marking the beginning of your question-crafting journey.</li>
              <img src = "/assets/badges/badge03_a.png" class="badge-image">

             </div>
             <div class="tip-block">
             <li><b>Master Badge:</b> Log <strong>5 questions</strong> to achieve this badge, celebrating your growing skills and dedication to crafting meaningful questions.</li>
            <img src = "/assets/badges/badge03_b.png" class="badge-image">

             </div>
             <div class="tip-block">
               <li><b>Rising Star Badge:</b> Collect <strong>5 likes</strong> across your shared questions to unlock this prestigious badge, awarded for inspiring and engaging with the community.</li>
               <img src = "/assets/badges/badge03_c.png" class="badge-image">

             </div>
           </ul>
           <p>Track your achievements, share your work, and watch your skills soar as you craft more questions!</p>`,
    images: [],
    video: null
  },
  {
    text: `<p>So dive in, start crafting, and let this game transform your learning experience!</p>`,
    images: [],
    video: null
  }
];

  // Current index of the tip
  currentTipIndex: number = 0;
  safeVideoUrl: SafeResourceUrl | null = null;


  // Constructor
  constructor(private sanitizer: DomSanitizer,
    private router: Router,
  ) { }

  // OnInit lifecycle method
  ngOnInit(): void {
    // Initially display the first tip
    this.displayTip();
  }

  // Method to go to the next tip
  nextTip(): void {
    if (this.currentTipIndex < this.tips.length - 1) {
      this.currentTipIndex++;
      this.displayTip();
    }
  }

  // Method to go to the previous tip
  previousTip(): void {
    if (this.currentTipIndex > 0) {
      this.currentTipIndex--;
      this.displayTip();
    }
  }

  goToGame(): void {
    // Example: redirecting to the game route
    this.router.navigate(['/play-questions']); // Update '/game' to the actual route for your game page
}

  // Method to skip the narration
  skipNarration(): void {
    this.currentTipIndex = this.tips.length - 1;
    this.displayTip();
  }

  // Method to display the current tip (can include text, image, or video)
  // displayTip(): void {
  //   const currentTip = this.tips[this.currentTipIndex];

  //   // Update the tip text
  //   const tipTextElement = document.getElementById('tip-text');
  //   if (tipTextElement) {
  //     tipTextElement.textContent = currentTip.text;
  //   }

  //   // Optionally, update the image
  //   const tipImageElement = document.getElementById('tip-image') as HTMLImageElement;
  //   if (tipImageElement && currentTip.image) {
  //     tipImageElement.src = currentTip.image;
  //     tipImageElement.style.display = 'block';
  //   } else if (tipImageElement) {
  //     tipImageElement.style.display = 'none'; // Hide image if none available
  //   }

  //   // Optionally, handle video content (if any)
  //   const tipVideoElement = document.getElementById('tip-video') as HTMLVideoElement;
  //   if (tipVideoElement && currentTip.video) {
  //     tipVideoElement.src = currentTip.video;
  //     tipVideoElement.style.display = 'block';
  //   } else if (tipVideoElement) {
  //     tipVideoElement.style.display = 'none'; // Hide video if none available
  //   }
  // }

    // Method to display the current tip (can include text, images, or video)
    displayTip(): void {
      const currentTip = this.tips[this.currentTipIndex];
  
      // Update the tip text with HTML
      const tipTextElement = document.getElementById('tip-text');
      if (tipTextElement) {
        tipTextElement.innerHTML = currentTip.text; // Use innerHTML to render HTML tags
      }
  
      // Optionally, update multiple images
      const tipImagesContainer = document.getElementById('tip-images');
      if (tipImagesContainer) {
        tipImagesContainer.innerHTML = ''; // Clear previous images
  
        currentTip.images.forEach((imageSrc: string) => {
          const imgElement = document.createElement('img');
          imgElement.src = imageSrc;
          imgElement.style.width = '200px'; // Example: adjust image size
          tipImagesContainer.appendChild(imgElement);
        });
      }
  
     // Optionally, handle video content (if any)
    //  const tipVideoElement = document.getElementById('tip-video') as HTMLIFrameElement;
    //  if (tipVideoElement && currentTip.video) {
    //    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(currentTip.video);
    //    tipVideoElement.src = this.safeVideoUrl as string;
    //    tipVideoElement.style.display = 'block';
    //  } else if (tipVideoElement) {
    //    tipVideoElement.style.display = 'none'; 
    //  }

      // Handle video content (if any)
    if (currentTip.video) {
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(currentTip.video);
  } else {
      this.safeVideoUrl = null; // Reset if no video
  }
   }

   goToMainMenu(): void {
    this.router.navigate(['/home']);
}
  
}
