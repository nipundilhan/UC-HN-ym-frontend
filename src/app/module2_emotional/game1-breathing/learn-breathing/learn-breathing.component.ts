import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-learn-breathing',
  templateUrl: './learn-breathing.component.html',
  styleUrls: ['./learn-breathing.component.css']
})
export class LearnBreathingComponent implements OnInit {

  currentTechnique: any;
  showIntroDialog: boolean = true;
  introStep: number = 0;  // Track which step of the intro we're on


  constructor(private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  // Handle the "Next" button click in the intro dialog
  nextStep(): void {
    if (this.introStep < 7) {
      this.introStep++; // Go to the next step
    } else {
      this.showIntroDialog = false; // End the intro once we've gone through all steps
    }
  }


  previousStep(): void {
    if (this.introStep > 0) {
      this.introStep--; // Go to the previous step
    }
  }

  closeIntro(): void {
    this.showIntroDialog = false; // Close the intro dialog

  }

  
  ngOnInit(): void {
    this.showIntroDialog = true;
    this.introStep = 0;  // Reset intro step on page load

  }

  techniques = [
    {
      name: '4-4-4 breathing',
      icon: 'assets/breathing/4-4-4-intro.png',
      tips: [
        {
            text: `<h3>What is 4-4-4 (Box) Breathing?</h3> 
                   <p>4-4-4 Breathing, also called Box Breathing, is a simple yet powerful breathing technique. 
                   It helps you focus, reduce stress, and regain calm by following a steady breathing pattern.</p>`, 
            image: null, 
            video: null 
          },
          { 
            text: `<h4>Why Practice 4-4-4 Breathing?</h4>
                   <div class="journalling-tip-block">🌟 <b>Boosts Focus:</b> Helps center your thoughts, especially during exam preparation.</div>
                   <div class="journalling-tip-block">✨ <b>Relieves Stress:</b> Slows your heart rate and eases tension in moments of anxiety.</div>
                   <div class="journalling-tip-block">🛡️ <b>Improves Resilience:</b> Builds mental strength by promoting mindful breathing.</div>`, 
            image: null, 
            video: null 
          },
          { 
            text: `<h4>How to Practice 4-4-4 Breathing?</h4>
                   <h6>Follow these steps:</h6>
                   <div class="breathing-step-block">
                     <p><b>Step 1:</b> Sit comfortably in a quiet space. Close your eyes and relax your shoulders.</p>
                     <p><b>Step 2:</b> Inhale deeply through your nose for 4 seconds. Visualize drawing one side of a square.</p>
                     <p><b>Step 3:</b> Hold your breath for 4 seconds. Picture the second side of the square forming.</p>
                     <p><b>Step 4:</b> Exhale slowly through your mouth for 4 seconds, completing the third side.</p>
                     <p><b>Step 5:</b> Hold your breath for 4 seconds to finish the square. Repeat this cycle 4-5 times.</p>
                   </div>
                   <p>🌟 <b>Bonus:</b> Use the app's guided animation to practice easily or log your session manually!</p>`, 
            image: null, 
            video: null 
          },
          { 
            text: `<h4>Ready to Practice?</h4> 
                   <p>Each practice session earns you <b>points</b> in the game, bringing you closer to unlocking <b>badges</b> for your dedication!</p>
                   <p>Box Breathing is your tool for staying calm, focused, and ready to tackle challenges.</p>`, 
            image: null, 
            video: null 
          
        }      
      ],
    },
    {
      name: '4-7-8 breathing',
      icon: 'assets/breathing/4-7-8-intro.png',
      tips: [
        { 
          text: `<h3>What is 4-7-8 Breathing?</h3> 
                 <p>4-7-8 Breathing is a calming technique designed to help you relax and improve sleep. 
                 It involves a rhythmic breathing cycle to naturally ease stress and anxiety.</p>
                 <p>This technique focuses on breathing in for 4 seconds, holding for 7 seconds, and exhaling for 8 seconds.</p>`, 
          image: null, 
          video: null 
        },
        { 
          text: `<h4>Why Practice 4-7-8 Breathing?</h4>
                 <div class="journalling-tip-block">🌟 <b>Reduces Anxiety:</b> Slows your breathing and calms your nervous system.</div>
                 <div class="journalling-tip-block">✨ <b>Improves Sleep:</b> Prepares your body and mind for restful sleep by lowering tension.</div>
                 <div class="journalling-tip-block">🛡️ <b>Enhances Focus:</b> Clears your mind, making it easier to concentrate during study sessions.</div>`, 
          image: null, 
          video: null 
        },
        { 
          text: `<h4>How to Practice 4-7-8 Breathing?</h4>
                 <h6>Follow these steps:</h6>
                 <div class="breathing-step-block">
                   <p><b>Step 1:</b> Sit comfortably or lie down in a quiet space. Close your eyes and relax.</p>
                   <p><b>Step 2:</b> Inhale deeply through your nose for 4 seconds.</p>
                   <p><b>Step 3:</b> Hold your breath for 7 seconds. Focus on keeping your body relaxed.</p>
                   <p><b>Step 4:</b> Exhale slowly and completely through your mouth for 8 seconds.</p>
                   <p><b>Step 5:</b> Repeat the cycle 4-5 times, or until you feel calmer.</p>
                 </div>
                 <p>🌟 <b>Bonus:</b> Practice with the app’s animation or log your session manually!</p>`, 
          image: null, 
          video: null 
        },
        { 
          text: `<h4>Ready to Practice?</h4> 
                 <p>With every practice session, you earn <b>points</b> and progress towards <b>badges</b> that celebrate your commitment to calmness!</p>
                 <p>Let 4-7-8 Breathing guide you to a peaceful, stress-free state of mind.</p>`, 
          image: null, 
          video: null 
        },
        
      ],
    },
    {
      name: 'Belly breathing',
      icon: 'assets/breathing/belly-intro.png',
      tips: [
        { 
          "text": `<h3>What is Belly Breathing?</h3> 
                   <p>Belly breathing, also known as diaphragmatic breathing, is a simple yet effective way to relax and lower stress levels. 
                   It focuses on deep, intentional breathing that engages the diaphragm.</p>
                   <p>By shifting your breath to the belly, this technique helps reduce tension and improve overall well-being.</p>`, 
          "image": null, 
          "video": null 
        },
        { 
          "text": `<h4>Why Practice Belly Breathing?</h4>
                   <div class="journalling-tip-block">🌟 <b>Reduces Stress:</b> Activates the body’s relaxation response to calm the mind.</div>
                   <div class="journalling-tip-block">✨ <b>Improves Focus:</b> Clears mental distractions, making it easier to concentrate on tasks.</div>
                   <div class="journalling-tip-block">🛡️ <b>Boosts Energy:</b> Increases oxygen intake for better stamina and alertness.</div>`, 
          "image": null, 
          "video": null 
        },
        { 
          "text": `<h4>How to Practice Belly Breathing?</h4>
                   <h6>Follow these steps:</h6>
                   <div class="breathing-step-block">
                     <p><b>Step 1:</b> Find a quiet, comfortable place to sit or lie down. Place one hand on your chest and the other on your belly.</p>
                     <p><b>Step 2:</b> Inhale deeply through your nose, feeling your belly rise as you fill your lungs with air. Your chest should remain still.</p>
                     <p><b>Step 3:</b> Exhale slowly through your mouth, allowing your belly to fall naturally as you release the breath.</p>
                     <p><b>Step 4:</b> Repeat the cycle for 5–10 breaths, keeping your focus on the rise and fall of your belly.</p>
                   </div>`, 
          "image": null, 
          "video": null 
        },
        {
          "text": `<h4>Ready to See How It's Done?</h4>
           <p>Follow along with the video to master the technique!</p>
           <div class="video-container"><iframe width="560" height="315" src="https://www.youtube.com/embed/OXjlR4mXxSk?si=gVEGEtC_h9m_UmTi&rel=0&modestbranding=1&iv_load_policy=3&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
           <p>
              If have trouble watching the video above, please visit 
              <a href="https://www.youtube.com/embed/OXjlR4mXxSk?si=gVEGEtC_h9m_UmTi&rel=0&modestbranding=1&iv_load_policy=3&autoplay=1" target="_blank" rel="noopener noreferrer">
                this link
              </a>.
            </p>`, 
          "image": null, 
          "video": null 
        },
        { 
          "text": `<h4>Ready to Practice?</h4> 
                   <p>Each belly breathing session earns you <b>points</b> and moves you closer to unlocking <b>badges</b> for relaxation mastery!</p>
                   <p>Let belly breathing help you achieve balance and inner calm.</p>`, 
          "image": null, 
          "video": null 
        }
        
      ],
    },
    {
      name: 'Alternate Nostril Breathing',
      icon: 'assets/breathing/alternate-intro.png',
      tips: [
        { 
          "text": `<h3>What is Alternate Nostril Breathing?</h3> 
                   <p>Alternate nostril breathing, or Nadi Shodhana, is an ancient technique used to balance energy and promote calmness. 
                   It involves breathing through one nostril at a time in a rhythmic pattern.</p>
                   <p>This practice is perfect for finding focus and reducing stress.</p>`, 
          "image": null, 
          "video": null 
        },
        { 
          "text": `<h4>Why Practice Alternate Nostril Breathing?</h4>
                   <div class="journalling-tip-block">🌟 <b>Enhances Relaxation:</b> Balances your nervous system for a soothing effect.</div>
                   <div class="journalling-tip-block">✨ <b>Improves Focus:</b> Sharpens your mind, helping you tackle tasks with clarity.</div>
                   <div class="journalling-tip-block">🛡️ <b>Boosts Energy Flow:</b> Promotes harmony in the body’s energy pathways.</div>`, 
          "image": null, 
          "video": null 
        },
        { 
          "text": `<h4>How to Practice Alternate Nostril Breathing?</h4>
                   <h6>Follow these steps:</h6>
                   <div class="breathing-step-block">
                     <p><b>Step 1:</b> Sit in a comfortable position with your back straight and shoulders relaxed. Place your left hand on your knee.</p>
                     <p><b>Step 2:</b> Use your right thumb to close your right nostril and inhale deeply through your left nostril.</p>
                     <p><b>Step 3:</b> Close your left nostril with your ring finger, release your thumb, and exhale slowly through your right nostril.</p>
                     <p><b>Step 4:</b> Inhale through your right nostril, then close it with your thumb, release your ring finger, and exhale through your left nostril.</p>
                     <p><b>Step 5:</b> Repeat the cycle for 5–7 rounds, keeping your breaths smooth and even.</p>
                   </div>`, 
          "image": null, 
          "video": null 
        },
        {
          "text": `<h4>Ready to See How It's Done?</h4>
           <p>Follow along with the video to master the technique!</p>
            <div class="video-container">
                <iframe width="560" height="315" 
                        src="https://www.youtube.com/embed/a7re4bKxB3A?si=Gnm0siaE_GEFOUPr&rel=0&modestbranding=1&iv_load_policy=3&autoplay=1"  
                        title="YouTube video player" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" 
                        allowfullscreen>
                </iframe>
           </div>

           <p>
            If you have trouble watching video above, please visit 
            <a href="https://www.youtube.com/embed/a7re4bKxB3A?si=Gnm0siaE_GEFOUPr&rel=0&modestbranding=1&iv_load_policy=3&autoplay=1" target="_blank" rel="noopener noreferrer">
              this link
            </a>.
          </p>`, 
          "image": null, 
          "video": null 
        },
        { 
          "text": `<h4>Ready to Practice?</h4> 
                   <p>Each session of alternate nostril breathing earns you <b>points</b> and takes you one step closer to unlocking <b>badges</b> that celebrate your journey to balance!</p>
                   <p>Let alternate nostril breathing help you feel centered and refreshed.</p>`, 
          "image": null, 
          "video": null 
        }
        
      ],
    },
  ];

  selectedTechnique: any = null;
  currentTipIndex = 0;
  helpPopupVisible = false;

  get currentTip() {
    return this.selectedTechnique?.tips[this.currentTipIndex];
  }

  getSafeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  goToMainMenu(): void {
    this.router.navigate(['/home']);
}
  
  selectTechnique(technique: any) {
    this.selectedTechnique = technique;
    this.currentTipIndex = 0;
  }

  closeDialogue() {
    this.selectedTechnique = null;
  }

  nextTip() {
    if (this.currentTipIndex < this.selectedTechnique.tips.length - 1) {
      this.currentTipIndex++;
    }
  }

  previousTip() {
    if (this.currentTipIndex > 0) {
      this.currentTipIndex--;
    }
  }

  openHelpPopup() {
    this.helpPopupVisible = true;
  }

  closeHelpPopup() {
    this.helpPopupVisible = false;
  }

  goToGame(): void {
    // Example: redirecting to the game route
    this.router.navigate(['/play-breathing']); // Update '/game' to the actual route for your game page
}


}
