import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-learn-tutorials',
  templateUrl: './learn-tutorials.component.html',
  styleUrls: ['./learn-tutorials.component.css']
})
export class LearnTutorialsComponent implements OnInit {

  // Tips array which can include text, images, and even videos
tips = [
  {
    text: `<p>Welcome to the <b><i>Eye of Horus!</i></b> I will guide you through the tips to master your lab test.</p>`,
    images: [], // No images for this tip
    video: null // Optional, can also include video path
  },
  {
    text: `<p>In this game, your task is to review the tutorials and quizzes you've completed in the past and log them to earn the <b><i>Eye of Horus</b></i> badge. 
    I'll provide you with helpful tips to guide your revision, helping you prepare for the lab test with confidence and reduced stress. 
    Click the next arrow to begin reading the tips. </p>`,
    images: ["/assets/practice-labs.png"],
    video: null
  },
  {
    text: `<p><b>Revisit Completed Labs:</b> Go back to your completed lab exercises. Try solving them without peeking at your old solutions. It's a great way to reinforce your skills!.</p>
    <p><b>Reflect on Mistakes:</b> Review any errors or challenges you faced during tutorials and labs. Understanding what went wrong helps prevent future mistakes.<p>
    <p><b>Practice Problems: </b> Look for additional problems related to your past tutorials. Websites like LeetCode and HackerRank can provide relevant challenges to test your skills.
    </p><p><b>Use Additional Resources:</b> If you struggle with a topic in a tutorial, seek additional resources such as online articles or videos that explain the same concept in a different way.</p>
    <p><b>Use the Documentation:</b> Revisit official documentation (like MDN for web technologies) while going through past tutorials. It’s a great way to deepen your understanding of the tools you used.</p>
`,
    images: [],
    //images: ["assets/lab1.png", "assets/lab2.png"], // Example of multiple images
    video: null
  },
  {
    text: `<p><b>Summarize Key Concepts:</b> After each tutorial, write a brief summary of the key points. This creates a handy reference for future study sessions!</p>
    <p><b>Track Your Progress:</b> Keep a checklist of tutorials and labs you've completed. Each time you finish one, check it off! Watching your progress grow can be a powerful motivator.</p>`,
    images: [],
    video: null
    // video: "https://www.youtube.com/embed/MI2MIyiGAeQ?si=ARo64DVeOzUkYHEI"
  },
  {
    text: `<p>Remember to stay calm and prepared before your exams. <b>You'll do great!</b></p>`,
    images: [],
    video: null
  }
];

  // Current index of the tip
  currentTipIndex: number = 0;
  safeVideoUrl: SafeResourceUrl | null = null;


  // Constructor
  constructor(private sanitizer: DomSanitizer) { }

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
  
}
