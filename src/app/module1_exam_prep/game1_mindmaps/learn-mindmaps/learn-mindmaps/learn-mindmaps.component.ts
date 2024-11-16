import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-learn-mindmaps',
  templateUrl: './learn-mindmaps.component.html',
  styleUrls: ['./learn-mindmaps.component.css']
})
export class LearnMindmapsComponent implements OnInit {

  // Tips array which can include text, images, and even videos
tips = [

  {
    text: `<p>Welcome to <b><i>Ankh’s Chronicle : Mind Mapping Mastery</i></b>, brave adventurer!</p>
  <p>As you progress, I’ll provide you with helpful tips to teach you a very important and fun skill: <b>mind mapping</b>.</p>
  <p>Mind mapping will help you prepare for your lab test with confidence and reduce stress. It’s a powerful tool for organizing your thoughts, enhancing your memory, and boosting your problem-solving abilities.</p>
  <p>Click the <b>next arrow</b> to begin learning more...</p>`,
    images: [],
    video: null
  },
  {
    text: `<h4>What is Mind Mapping?</h4><p>Mind maps are a visual way of taking notes, brainstorming ideas or planning. They can help you organise and connect information and ideas. They are also easy to remember and quick to review</p>`,
    images: [],
    video: null
    // video: "https://www.youtube.com/embed/MI2MIyiGAeQ?si=ARo64DVeOzUkYHEI"
  },
  {
    text: `<h4>Why Mind Mapping?</h4>
    <p>The process of mind mapping allows us to;</p>
    <ul style="text-align: left !important;">
    <li>Visualize ideas and concepts</li>
    <li>Brainstorm effectively</li>
    <li>Improve note taking and knowledge management</li>
    <li>Develop critical thinking skills</li>
    </ul>
`,
    images: [],
    video: null
    // video: "https://www.youtube.com/embed/MI2MIyiGAeQ?si=ARo64DVeOzUkYHEI"
  },
  {
    text: `<ol>
    <li>
      <strong>Start with a Central Idea:</strong>
      <p>Begin your mind map with a central idea or question. This could be a concept you're studying or a problem you're trying to solve. For instance, if you're preparing for a programming test, the central idea could be "Algorithms" or "Data Structures."</p>
    </li>

    <li>
      <strong>Branch Out with Key Concepts:</strong>
      <p>From the central idea, create branches for key topics or sub-questions. For example, if your central idea is "Algorithms," you might have branches like "Sorting Algorithms," "Search Algorithms," or "Graph Algorithms." This helps break down the topic into manageable chunks.</p>
    </li>

    <li>
      <strong>Use Keywords to Keep it Simple:</strong>
      <p>Mind maps are most effective when they’re simple and to the point. Use keywords, short phrases, or single terms on each branch to summarize important concepts or ideas. This keeps your mind map clean and easy to follow.</p>
    </li>
    <ol>`,
    images: [],
    video: null
    // video: "https://www.youtube.com/embed/MI2MIyiGAeQ?si=ARo64DVeOzUkYHEI"
  },
  {
    text: `<ol>
    <li>
      <strong>Organize Information Hierarchically:</strong>
      <p>Mind maps allow you to visually organize information in a hierarchical structure. Start with broad topics at the center, and branch out to more specific details or examples. This will help you visualize how concepts relate to one another and how smaller ideas fit into the larger picture.</p>
    </li>

    <li>
      <strong>Add Visual Elements to Enhance Understanding:</strong>
      <p>You can make your mind map more engaging by adding icons, shapes, or small visuals next to the branches. For example, use arrows to show relationships between different ideas or use color-coding to highlight different types of information (e.g., facts in blue, examples in green, or questions in red).</p>
    </li>

    <li>
      <strong>Connect Ideas Across Different Branches:</strong>
      <p>A powerful feature of mind maps is showing how different ideas are interconnected. Draw lines or arrows to connect branches that relate to one another, showing the flow of thoughts or logical connections between concepts. This helps you understand the material in a more integrated way.</p>
    </li>
    <ol>`,
    images: [],
    video: null
    // video: "https://www.youtube.com/embed/MI2MIyiGAeQ?si=ARo64DVeOzUkYHEI"
  },
  {
    text: `<ol>
    <li>
      <strong>Focus on Understanding, Not Just Memorizing:</strong>
      <p>Mind mapping is more about understanding the connections between ideas than memorizing details. As you create your map, think about how each piece of information relates to the others and how you can apply that knowledge to solve problems or answer test questions.</p>
    </li>

    <li>
      <strong>Keep It Focused and Manageable:</strong>
      <p>Don’t overcrowd your mind map with too many details. If a branch becomes too complex, break it into smaller sub-branches. This will keep the map easy to navigate and help you focus on the most important concepts.</p>
    </li>

    <li>
      <strong>Review and Revise Your Map Regularly:</strong>
      <p>Mind maps are dynamic tools that can change as your understanding deepens. As you learn more or uncover new insights, update your map. Regularly reviewing and revising your map will reinforce what you’ve learned and help solidify the connections between concepts.</p>
    </li>

    <li>
      <strong>Use Mind Mapping for Problem Solving and Planning:</strong>
      <p>Mind mapping isn’t just for studying; it can also be used to solve problems. If you're facing a complex issue (like a coding problem or project plan), use a mind map to break it down into smaller, more manageable parts. This allows you to identify potential solutions or steps in an organized way.</p>
    </li>
  </ol>`,
// images: ["assets/view-tutorials.png"],
images: [],

video: null
  },
  {
    text: `<h3>How to Play the Game</strong></h3><p>Welcome to your creative learning adventure! Here’s how to make the most out of your experience while logging your mind maps:</p> <p><strong>Log Your Mind Maps:</strong> As you work on your mind maps, keep track of your progress by logging each one you complete. You can enter essential details such as the lesson title and an optional description to reflect on your thought process and learning.</p> <p><strong>
    Option to Add Images:</strong> You can enhance your log by uploading an image of your mind map or simply log the details without an image. Either way, you’ll have a record of your creative journey to look back on.</p> <p><strong>Review Your Progress:</strong> Keep track of how your mind mapping skills improve over time by reviewing your logged maps. With each new map, you can visualize how your understanding of topics deepens and how your mind mapping technique evolves.</p>`,
images: ["assets/view-tutorials.png"],
video: null
  },
  {
    text: `<p><strong>Track Partially Completed Mind Maps:</strong> Don’t worry if you haven’t finished a mind map! You can log partially completed ones and come back to update them later when you finish. You can also add or change the image. <b> You'll do great!</b></p>`,
    images: [],
    video: null
  },
  {
    text: `<h3>Share Your Mind Map</h3>
  <p>Sharing your creativity is simple and rewarding! Follow these steps to share your mind map with others:</p>
  <ol>
    <li><strong>Log Your Mind Map:</strong> Ensure your mind map is fully logged with all essential details, including an image. The share feature is only available for records with images.</li>
    <li><strong>Click the Share Button:</strong> After logging your mind map, look for the <b>"Share"</b> button at the bottom. Click on it to share your mind map with your friends.</li>
    <li><strong>Showcase Your Work:</strong> Once shared, your mind map will become visible to other users, allowing them to view and appreciate your work.</li>
    <li><strong>Earn Likes:</strong> Your shared mind map can receive likes from others. The more likes you get, the closer you’ll be to earning the <b>Pharaoh’s Crown Badge</b>!</li>
  </ol>
  <p>Share your mind maps to inspire others, celebrate your creativity, and engage with the community!</p>`,
    images: [],
    video: null
  },
  {
    text: `<p><strong>Earn Badges:</strong> Celebrate your creativity and engagement with three distinct badges:</p> <ul> <div class="tip-block"> <li><b>Silver Ankh Badge:</b> Log <strong>5 mind maps with images</strong> to earn this badge, recognizing your effort in visualizing and organizing ideas.</li> 
    </div> <p></p> <div class="tip-block"> <li><b>Gold Ankh Badge:</b> Reach <strong>10 mind maps with images</strong> to unlock this prestigious badge, showcasing your advanced mind mapping skills and commitment.</li> </div> <p></p> <div class="tip-block"> <li><b>Pharaoh’s Crown Badge:</b> 
    Collect <strong>50 likes</strong> across your shared mind maps to achieve this coveted badge, awarded for inspiring and engaging with others in the community.</li> </div> </ul> <p>Share your mind maps, track your achievements, and see how your skills grow with every step!</p>`,
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
    this.router.navigate(['/play-mindmaps']); // Update '/game' to the actual route for your game page
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
