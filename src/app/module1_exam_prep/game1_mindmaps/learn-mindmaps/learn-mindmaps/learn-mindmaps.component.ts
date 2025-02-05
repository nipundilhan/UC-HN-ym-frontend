import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-learn-mindmaps',
  templateUrl: './learn-mindmaps.component.html',
  styleUrls: ['./learn-mindmaps.component.css']
})
export class LearnMindmapsComponent implements OnInit {
  videoUrl: SafeResourceUrl = ''; // Initialize with an empty string or a default safe URL.

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
    text: `<h4>Why Mind Mapping?</h4>
           <div class="journalling-tip-block">🌟 <b>Boosts Creativity:</b> Visualizing ideas in a structured way helps unlock creative problem-solving skills.</div>
           <div class="journalling-tip-block">✨ <b>Improves Memory:</b> Using colors, images, and keywords enhances retention and recall.</div>
           <div class="journalling-tip-block">🛡️ <b>Simplifies Complexity:</b> Breaking down topics into manageable parts makes studying less overwhelming.</div>`,
    images: [],
    video: null
  },
  {
    text: `<h4>How to get Started?</h4>
           <h6>Follow these steps to master mind mapping:</h6>
           <div class="breathing-step-block">
  <p><b>Step 1:</b> Choose a Central Topic: Select a lesson or concept you want to explore.</p>
  <img src="/assets/mindmapping/mindmap-step1.png" alt="Step 1 Image" class="mindmap-step-image">

  <p><b>Step 2:</b> Add Main Branches: Write key ideas or categories related to the topic as branches extending from the center.</p>
  <img src="/assets/mindmapping/mindmap-step2.png" alt="Step 2 Image" class="mindmap-step-image">
</div>`,
    images: [],
    video: null
  },
  {
    text: `<h4>How to get Started?</h4>
           <h6>Follow these steps to master mind mapping:</h6>
           <div class="breathing-step-block">
            <p><b>Step 3:</b> Expand Sub-Branches: For each main branch, add details or subtopics to deepen your understanding.</p>
            <img src="/assets/mindmapping/mindmap-step3.png" alt="Step 3 Image" class="mindmap-step-image">

            <p><b>Step 4:</b> Use Visual Elements: Add colors, symbols, or images to make your map engaging and memorable.</p>
            <img src="/assets/mindmapping/mindmap-step4.png" alt="Step 4 Image" class="mindmap-step-image">

            <p><b>Step 5:</b> Review and Refine: Check for clarity and ensure all important points are included.</p>
          </div>`,
    images: [],
    video: null
  },

  {
    text: `<h3>Online Tools for Mind Mapping</h3>
           <p>Don’t worry if you’re not sure how to get started with creating mind maps. Here’s a list of free and user-friendly online tools that can help you design and organize your mind maps:</p>
           <ul>
             <li><a href="https://www.mindmeister.com/" target="_blank"><b>MindMeister</b></a>: A popular tool with an intuitive interface for creating collaborative mind maps.</li>
             <li><a href="https://coggle.it/" target="_blank"><b>Coggle</b></a>: Perfect for brainstorming and visualizing complex ideas.</li>
             <li><a href="https://www.canva.com/mind-maps/templates/" target="_blank"><b>Canva</b></a>: Offers customizable templates and vibrant design elements for creative mind mapping.</li>
             <li><a href="https://miro.com/mind-map/" target="_blank"><b>Miro</b></a>: Ideal for creating detailed, interactive mind maps as part of team collaboration.</li>
             <li><a href="https://www.lucidchart.com/pages/examples/mind_mapping_software" target="_blank"><b>Lucidchart</b></a>: A versatile tool for creating structured diagrams and mind maps.</li>
           </ul>`,
    images: [],
    video: null
  },
  {
    text: `<h3>How to Play the Game</h3>
           Here’s how to make the most out of your experience while creating mind maps:</p> 
           <p><strong>Log Your Mind Maps:</strong> As you create mind maps based on your lessons, log the details to track your progress. 
           Enter the lesson title,mind map image and an optional description to reflect on your thought process and learning.</p> `,
    images: ['assets/mindmapping/add-mindmap.png'],
    video: null
  },
  {
    text: `<h3>How to Play the Game</h3>
           <p><strong>Review Your Progress:</strong> Keep track of how your mind mapping skills evolve over time by revisiting your logged maps. 
           Use this record as a visual tool to monitor your growth and deepen your understanding of topics.</p>`,
    images: ['assets/mindmapping/view-mindmaps.png'],
    video: null
  },
  {
    text: `<h3>Share Your Mind Maps</h3>
           <p>Sharing your creative work is both easy and rewarding! Here’s how you can inspire others and showcase your skills:</p>
           <ol>
             <li><strong>Log Your Mind Map:</strong> Ensure your mind map is logged with all essential details, including an image and earn a <b>point</b> for each record.</li>
             <p></p>
             <li><strong>Click the Share Button:</strong> Look for the <b>"Share"</b> button at the bottom of your logged mind map. Click it to share with your friends.</li>
              <p></p>
             <li><strong>Engage and Collaborate:</strong> Once shared, your mind map will be visible to others, allowing them to view and appreciate your work.</li>
              <p></p>
             <li><strong>Earn Likes:</strong> Gain recognition by receiving likes for your mind maps. The more likes you collect, the closer you’ll be to earning the <b>Rising Star Badge</b>!</li>
           </ol>
           <p>Sharing your mind maps not only helps others but also fosters collaborative learning and feedback!</p>`,
    images: [],
    video: null
  },
  {
    text: `<h3>Earn Badges</h3>
           <ul>
             <div class="tip-block">
               <li><b>Beginner Badge:</b> Log <strong>2 mind maps</strong> to earn this badge, marking the beginning of your journey to mastering mind mapping.</li>
               <img src = "/assets/badges/badge02_a.png" class="badge-image">
             </div>
             <div class="tip-block">
               <li><b>Master Badge:</b> Log <strong>5 mind maps</strong> to achieve this badge, highlighting your growing expertise in organizing ideas visually.</li>
               <img src = "/assets/badges/badge02_b.png" class="badge-image">
             </div>
             <div class="tip-block">
               <li><b>Rising Star Badge:</b> Collect <strong>5 likes</strong> across your shared mind maps to unlock this prestigious badge, recognizing your creativity and impact on the community.</li>
               <img src = "/assets/badges/badge02_c.png" class="badge-image">
             </div>
           </ul>
           <p>Track your achievements, share your work, and celebrate your progress as you create more mind maps!</p>`,
    images: [],
    video: null
  },
  {
    text: `<p>So dive in, start mapping, and let this game transform the way you learn and remember!</p>`,
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
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/7Ep5mKuRmAA?si=w6E5xZg98z7SUTiw');


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

  getSafeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
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

  displayTip(): void {
    const currentTip = this.tips[this.currentTipIndex];

    // Update text content
    const tipTextElement = document.getElementById('tip-text');
    if (tipTextElement) {
      tipTextElement.innerHTML = currentTip.text;
    }

    // Update images dynamically
    const tipImagesContainer = document.getElementById('tip-images');
    if (tipImagesContainer) {
      tipImagesContainer.innerHTML = ''; // Clear old images
      currentTip.images.forEach((src: string) => {
        const imgElement = document.createElement('img');
        imgElement.src = src;
        imgElement.style.width = '200px';
        tipImagesContainer.appendChild(imgElement);
      });
    }

    // Handle video dynamically
    if (currentTip.video) {
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(currentTip.video);
    } else {
      this.safeVideoUrl = null; // Clear video if not present
    }
  }

   goToMainMenu(): void {
    this.router.navigate(['/home']);
}
  
}
