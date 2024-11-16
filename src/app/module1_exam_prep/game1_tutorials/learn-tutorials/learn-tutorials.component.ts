import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-learn-tutorials',
  templateUrl: './learn-tutorials.component.html',
  styleUrls: ['./learn-tutorials.component.css']
})
export class LearnTutorialsComponent implements OnInit {

  // Tips array which can include text, images, and even videos
tips = [

  {
    text: `<p>Welcome to the <b><i>Eye of Horus : Mastery of labs and tutorials</i></b>, brave adventurer!  As you progress, I'll provide you with helpful tips to guide your revisions, helping you prepare for your lab test with confidence and less stress. Click the next arrow to begin learning more....</p>`,
    images: ["/assets/practice-labs.png"],
    video: null
  },
  //{
//     text: `<p><b>Revisit Completed Labs:</b> Go back to your completed lab exercises. Try solving them without peeking at your old solutions. It's a great way to reinforce your skills!.</p>
//     <p><b>Reflect on Mistakes:</b> Review any errors or challenges you faced during tutorials and labs. Understanding what went wrong helps prevent future mistakes.<p>
//     <p><b>Practice Problems: </b> Look for additional problems related to your past tutorials. Websites like LeetCode and HackerRank can provide relevant challenges to test your skills.
//     </p><p><b>Use Additional Resources:</b> If you struggle with a topic in a tutorial, seek additional resources such as online articles or videos that explain the same concept in a different way.</p>
//     <p><b>Use the Documentation:</b> Revisit official documentation (like MDN for web technologies) while going through past tutorials. It’s a great way to deepen your understanding of the tools you used.</p>
// `,
  {
    text: `<div class="tip-block">
             <ul>
               <li><b>Revisit Lab Instructions Carefully</b>: Review your lab instructions in detail before attempting the exercises again. Understanding exactly what is being asked in the lab can help you approach the tasks methodically and avoid mistakes in your revision.</li>
             </ul>
           </div>
           <div class="tip-block">
             <ul>
               <li><b>Break Down the Lab Tasks</b>: Labs often require you to complete multiple tasks. Break each task into smaller steps. This will help you manage your time and focus on one problem at a time, just like when preparing for a test.</li>
             </ul>
           </div>
           <div class="tip-block">
             <ul>
               <li><b>Replicate the Lab Work Without Looking at Your Solution</b>: If you’ve completed a lab before, challenge yourself by doing it again without looking at your previous solution. This forces you to think critically and reinforces your problem-solving abilities.</li>
             </ul>
           </div>`,
    images: [],
    video: null
    // video: "https://www.youtube.com/embed/MI2MIyiGAeQ?si=ARo64DVeOzUkYHEI"
  },
  {
    text: `<div class="tip-block">
             <ul>
               <li><b>Focus on Common Patterns</b>: Many labs test common programming concepts like loops, functions, or arrays. Identify recurring patterns or types of problems as you review your past labs. Understanding these patterns will help you tackle similar questions during a test.</li>
             </ul>
           </div>
           <div class="tip-block">
             <ul>
               <li><b>Use the Debugging Process to Learn</b>: If your lab work isn’t working, take the time to debug your code. Don’t just fix the issue and move on. Try to understand why it failed and how you can prevent it from happening again. Debugging helps you think logically and systematically, which is key to performing well in exams.</li>
             </ul>
           </div>
           <div class="tip-block">
             <ul>
               <li><b>Review Your Code and Comments</b>: After completing a lab, review your code and comments. Ensure your code is clear and well-documented. Being able to explain your code is an important skill for practical exams.</li>
             </ul>
           </div>
           <div class="tip-block">
             <ul>
               <li><b>Practice Time Management</b>: Many labs are timed. Set a timer when revising a lab to simulate exam conditions. This will help you get used to managing your time effectively during the actual test.</li>
             </ul>
           </div>`,
    images: [],
    video: null
    // video: "https://www.youtube.com/embed/MI2MIyiGAeQ?si=ARo64DVeOzUkYHEI"
  },
  {
  text: `<p><b>Summarize Key Concepts:</b> After each tutorial, write a brief summary of the key points. This creates a handy reference for future study sessions!</p>
  <p><b>Track Your Progress:</b> Keep a checklist of tutorials and labs you've completed. Each time you finish one, check it off! Watching your progress grow can be a powerful motivator.</p>`,
  images: [],
  video: null
  // video: "https://www.youtube.com/embed/MI2MIyiGAeQ?si=ARo64DVeOzUkYHEI"
},

  {
    text: `<h3><strong>How to Play the Game</strong></h3>
<p>Welcome to your learning adventure! Here’s how to make the most out of your experience while revising tutorials, quizzes, and labs:</p>
<p><strong>Log Your Progress:</strong> As you study, keep track of your journey by logging each tutorial, quiz, or lab you complete. You can enter essential details such as the title, date, progress percentage, and an optional description to reflect on your learning.</p>`,
images: ["assets/view-tutorials.png"],
video: null
  },
  {
    text: `<p><strong>Track Partially Completed Work:</strong> Don’t worry if you haven’t finished a tutorial or quiz! You can log partially completed ones, allowing you to update them later once you finish. This flexibility ensures that every step of your learning counts!<b> You'll do great!</b></p>`,
    images: [],
    video: null
  },
  {
    text: `<p><strong>Earn Badges:</strong> Celebrate your progress with two unique badges:</p>
<ul><div class="tip-block">
    <li><b>Eye of Horus Silver Badge:</b> Log <strong>5 tutorials, quizzes, or labs with 100% completion</strong> to earn this badge as a mark of your dedication.</li></div><p></p>
    <div class="tip-block"><li><b>Eye of Horus Gold Badge:</b> Reach <strong>10 activities with 100% completion</strong> to unlock this prestigious reward, showing your mastery and commitment.</li></div>
</ul>
<p>Track your achievements, stay motivated, and see how far you’ve come!</p>
`,
    images: ["assets/badges/badge01.png"],
    video: null
  },
  {
    text: `<p>So dive in, enjoy the journey, and let the game enhance your learning experience!</p>`,
    images: [],
    video: null
  },
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
    this.router.navigate(['/view-tutorials']); // Update '/game' to the actual route for your game page
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
