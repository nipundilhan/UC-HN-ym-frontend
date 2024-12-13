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
      text: `<p>Welcome to <b><i>Eye of Horus: Tutorial and Labs Mastery</i></b>, brave adventurer!</p>
             <p>In this challenge, I’ll guide you through tips to sharpen your revision skills and help you master programming tutorials, labs, and quizzes.</p>
             <p>By applying these techniques, you’ll reinforce your knowledge, identify gaps, and improve your exam performance—all while staying focused and motivated.</p>
             <p>Click the <b>next arrow</b> to uncover the secrets of effective revision...</p>`,
      images: [],
      video: null
    },
    {
      text: `<h4>Why Revise Tutorials and Labs?</h4>
             <div class="journalling-tip-block">🌟 <b>Strengthen Your Understanding:</b> Regular revision solidifies programming concepts, ensuring you can apply them confidently.</div>
             <div class="journalling-tip-block">✨ <b>Reduce Forgetting:</b> Revisiting tutorials and labs combats the "forgetting curve" by reinforcing key ideas over time.</div>
             <div class="journalling-tip-block">🛡️ <b>Boost Performance:</b> Effective revision enhances problem-solving skills, making you exam-ready and reducing last-minute stress.</div>`,
      images: [],
      video: null
    },
    {
      text: `<h4>Tips to Master Revision: How to Get Started</h4>
             <h6>Follow these tips to make your revision efficient and effective:</h6>
             <div class="breathing-step-block">
               <p><b>Revisit Completed Labs:</b> Go back to your completed lab exercises. Try solving them again without looking at your old solutions. It’s a great way to reinforce your skills!</p>
               <p><b>Plan Your Revision:</b> Break down your past tutorials, labs, and quizzes into smaller topics. Allocate time to revise each section, prioritizing difficult or key areas.</p>
             </div>`,
      images: [],
      video: null
    },
    {
      text: `<h4>Tips to Master Revision: How to Revise</h4>
             <div class="breathing-step-block">
               <p><b>Break Down the Lab Tasks:</b> Split lab or tutorial tasks into smaller steps. Focus on solving one problem at a time—this methodical approach mirrors effective test preparation.</p>
               <p><b>Read Instructions Carefully:</b> Review the instructions in labs or tutorials in detail before attempting exercises again. Understanding exactly what is asked helps you avoid mistakes.</p>
               <p><b>Review Code and Comments:</b> After completing a lab, review your code and comments. Ensure your code is clear, well-documented, and easy to understand. Being able to explain your code is an important skill for practical exams.</p>
               <p><b>Reflect on Mistakes:</b> Review any errors or challenges you faced during tutorials and labs. Understanding what went wrong helps you avoid similar mistakes in the future.</p>
             </div>`,
      images: [],
      video: null
    },
    {
      text: `<h4>Tips to Master Revision: Stay Organized</h4>
             <div class="breathing-step-block">
               <p><b>Summarize Key Concepts:</b> After each tutorial, write a brief summary of the key points. This creates a handy reference for future study sessions!</p>
               <p><b>Track Your Progress:</b> Keep a checklist of tutorials and labs you've completed. Each time you finish one, check it off! Watching your progress grow can be a powerful motivator.</p>
             </div>`,
      images: [],
      video: null
    },
    {
      text: `<h3>How to Play the Game</h3>
             <p>Welcome to your learning adventure! This game helps you log tutorials and labs and keep track of your progress. Here’s how to make the most of your experience while revising tutorials, quizzes, and labs:</p> 
             <p><strong>Log Your Tutorials:</strong> As you revise programming tutorials, labs, or quizzes, log the details to monitor your learning. Include the tutorial/lab name, date, description, and select a progress status from the dropdown (Started, In Progress, or Completed). You will earn a <b>point</b> for each record.</p>`,
      images: ["assets/tutorials/log-new-tutorial.png"],
      video: null
    },
    {
      text: `<h3>How to Play the Game</h3>
             <p><strong>Track Improvements:</strong> Review your logged revisions to identify improvements or areas needing more practice.</p> 
             <p><strong>Track Partially Completed Work:</strong> Don’t worry if you haven’t finished a tutorial or quiz! Log partially completed ones and update them later once you finish. This flexibility ensures every step of your learning journey counts. <b>You’ve got this!</b></p>
             <p>Stay consistent and watch your programming skills grow!</p>`,
      images: ["assets/tutorials/tutorial-records.png"],
      video: null
    },
    {
      text: `<h3>Earn Badges</h3>
             <ul>
               <div class="tip-block">
                 <li><b>Beginner Badge:</b> Log revisions for <strong>2 tutorials or labs</strong> to earn this badge and showcase your commitment to mastering programming concepts.</li>
                 <img src="/assets/badges/badge01_a.png" class="badge-image">
               </div>
               <div class="tip-block">
                 <li><b>Master Badge:</b> Log revisions for <strong>5 tutorials or labs</strong> to earn this badge, celebrating your dedication to continuous improvement!</li>
                 <img src="/assets/badges/badge01_b.png" class="badge-image">
               </div>
             </ul>
             <p>Track your achievements and become a revision master as you progress!</p>`,
      images: [],
      video: null
    },
    {
      text: `<p>Take the challenge, sharpen your skills, and let this game transform the way you revise programming tutorials and labs!</p>`,
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
