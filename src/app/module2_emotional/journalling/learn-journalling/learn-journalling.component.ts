import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-learn-journalling',
  templateUrl: './learn-journalling.component.html',
  styleUrls: ['./learn-journalling.component.css']
})
export class LearnJournallingComponent implements OnInit {
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
      name: 'Gratitude Journaling',
      icon: 'assets/journalling/gratitude.png',
      tips: [
        { 
          text: `<h3>What is Gratitude Journaling?</h3> 
                 <p>Gratitude journaling is about focusing on the good things in your life by writing them down. 
                 It’s your personal treasure map to happiness and calm.</p>
                 <p>It can be as simple as appreciating a peaceful moment, a kind word from a friend, or a delicious meal. 
                 The magic lies in shifting your attention to the positives.</p>`, 
          image: 'assets/journalling/Thankful-intro.jpg', 
          video: null 
        },
        { 
          text: `<h4>Why Practice Gratitude Journaling?</h4>
                 <div class="journalling-tip-block">🌟 <b>Improves Focus:</b> Reflecting on gratitude clears mental clutter and helps you concentrate on studies.</div>
                 <div class="journalling-tip-block">✨ <b>Enhances Mood:</b> A gratitude habit can uplift your spirits, even on tough days.</div>
                 <div class="journalling-tip-block">🛡️ <b>Builds Inner Strength:</b> Being thankful teaches you to find joy, even in small victories.</div>`, 
          image: null, 
          video: null 
        },
        { 
          text: `<h4>How to Start Gratitude Journaling?</h4>
                 <h6>Prompts to Get You Started</h6>
                 <div class="journalling-tip-block">
                   <p style="margin-bottom:0.5rem"><b>Name three things you’re grateful for today:</b></p>
                   <p style="margin-top:0; margin-bottom:0.5rem"><i>“The quiet morning I spent reading.”</i></p>
                   <p style="margin-top:0; margin-bottom:0.5rem"><i>“The help I received during a group study session.”</i></p>
                   <p style="margin-top:0; margin-bottom:0.5rem"><i>“My favorite snack break after studying.”</i></p>
                 </div>
                 <div class="journalling-tip-block">
                   <p style="margin-bottom:0.5rem"><b>What made you smile today?</b></p>
                   <p style="margin-top:0; margin-bottom:0.5rem"><i>“A funny joke from my classmate.”</i></p>
                   <p style="margin-top:0; margin-bottom:0.5rem"><i>“A sunny walk after my study session.”</i></p>
                 </div>
                 <p>🌟 <b>Bonus:</b> In the game, you can also create and answer your own personalized questions!</p>`,
          image: null, 
          video: null 
        },
        { 
          text: `<h4>Here are some more prompts to guide you and spark new ideas for your gratitude journaling:</h4>
          <ul>
            <li>What small act of kindness made your day better?</li>
            <li>What is something beautiful you saw today?</li>
            <li>What opportunity are you thankful for today?</li>
            <li>Who is someone you are grateful for, and why?</li>
            <li>What personal strengths helped you overcome a challenge today?</li>
            <li>What’s something in your life that you often take for granted, but are thankful for?</li>
          </ul>
          `, 
          image: null, 
          video: null 
        },
        { 
          text: `<h4>Ready to Begin?</h4> 
                 <p>Start small—just a sentence or two is enough to feel the impact. Each journal entry earns you <b>points</b> in the game, helping you unlock <b>badges</b> and track your progress!</p>
                 <p>Your gratitude journal is your path to a stronger, happier, and calmer you.</p>`, 
          image: null, 
          video: null 
        },

        
            

              
      ],
    },
    {
      name: 'Self-compassion Journalling',
      icon: 'assets/journalling/self-compassion.png',
      tips: [
        { 
          text: `<h3>What is Self-Compassion Journaling?</h3> 
                 <p>Self-compassion journaling is about being kind to yourself, especially during tough times. 
                 It’s a way to recognize your efforts, forgive your mistakes, and cheer yourself on.</p>
                 <p>This type of journaling helps you practice self-care and remind yourself that it’s okay to not be perfect.</p>`, 
          image: 'assets/journalling/Self-compassion-intro.png', 
          video: null 
        },
        { 
          text: `<h4>Why Practice Self-Compassion Journaling?</h4>
                 <div class="journalling-tip-block">💖 <b>Boosts Confidence:</b> Encourages you to see your worth beyond grades or achievements.</div>
                 <div class="journalling-tip-block">🧘 <b>Reduces Stress:</b> Helps you let go of self-criticism and focus on what you can improve.</div>
                 <div class="journalling-tip-block">🤗 <b>Improves Resilience:</b> Reminds you that everyone faces challenges—and you’re doing your best.</div>`, 
          image: null, 
          video: null 
        },
        { 
          text: `<h4>How to Start Self-Compassion Journaling?</h4>
                 <h6>Prompts to Get You Started</h6>
                 <div class="journalling-tip-block">
                    <p style="margin-bottom:0.5rem"><b>Write a kind note to yourself.</b></p>
                    <p style="margin-top:0; margin-bottom:0.5rem"><i>“You are doing great! Keep going—you’ve got this!”</i></p>
                    <p style="margin-top:0; margin-bottom:0.5rem"><i>“I am proud of how far I’ve come, and I know I can handle whatever comes next.”</i></p>
                  </div>
                 <div class="journalling-tip-block">
                   <p style="margin-bottom:0.5rem"><b>Write about a challenge you faced today and how you handled it:</b></p>
                   <p style="margin-top:0; margin-bottom:0.5rem"><i>“I struggled with a tough math problem but stayed patient and tried different methods.”</i></p>
                   <p style="margin-top:0; margin-bottom:0.5rem"><i>“I felt overwhelmed, but I took a break and came back stronger.”</i></p>
                 </div>
                 <p>🌟 <b>Bonus:</b> In the game, you can also create and answer your own personalized questions!</p>
`, 
          image: null, 
          video: null 
        },
        { 
          text: `<h4>Here are some more prompts to guide your self-compassionate journaling and help you reflect with kindness:</h4>
                <ul>
                  <li>What’s a mistake you made recently, and what can you learn from it?</li>
                  <li>How can you take better care of yourself this week?</li>
                  <li>What’s something you’ve accomplished that you feel proud of?</li>
                  <li>What would you say to a friend going through what you're facing now?</li>
                  <li>What’s one thing you can do to nurture your emotional health today?</li>
                  <li>How can you celebrate your progress so far in your studies or personal growth?</li>
                </ul>`, 
          image: null, 
          video: null 
        },
        { 
          text: `<h4>Ready to Begin?</h4> 
                 <p>Start by giving yourself permission to be imperfect. Remember, every journal entry you log earns you <b>points</b> in the game and brings you closer to unlocking <b>badges</b> for self-growth!</p>
                 <p>Your self-compassion journal is your personal coach to remind you how far you’ve come and encourage you to keep going.</p>`, 
          image: null, 
          video: null 
        }
      ],
    },
    {
      name: 'Reflective Journalling',
      icon: 'assets/journalling/reflective.png',
      tips: [
        { 
          text: `<h3>What is Reflective Journaling?</h3> 
                 <p>Reflective journaling is a way to look back on your experiences, analyze them, and learn from them. 
                 It helps you understand what’s working, what isn’t, and how to improve.</p>
                 <p>This practice allows you to connect your actions with your goals, turning everyday study sessions into meaningful progress.</p>`, 
          image: 'assets/journalling/Reflective-intro.png', 
          video: null 
        },
        { 
          text: `<h4>Why Practice Reflective Journaling?</h4>
                 <div class="journalling-tip-block">🧠 <b>Improves Self-Awareness:</b> Helps you understand your strengths and areas to work on.</div>
                  <div class="journalling-tip-block">💡 <b>Sparks Insight:</b> Helps you see patterns, discover what works for you, and make informed decisions in any area of your life.</div>
                 <div class="journalling-tip-block">🎯 <b>Strengthens Focus:</b> Keeps you aligned with your goals and motivated to push forward.</div>`, 
          image: null, 
          video: null 
        },
        { 
          text: `<h4>How to Start Reflective Journaling?</h4>
                 <h6>Prompts to Get You Started</h6>
                 <div class="journalling-tip-block">
                    <p style="margin-bottom:0.5rem"><b>What is one thing I can do today to get closer to my goal?</b></p>
                    <p style="margin-top:0; margin-bottom:0.5rem"><i>“Start revising for my upcoming test in small chunks.”</i></p>
                    <p style="margin-top:0; margin-bottom:0.5rem"><i>“Reach out to a mentor for advice on my career path.”</i></p>
                  </div>
                  <div class="journalling-tip-block">
                    <p style="margin-bottom:0.5rem"><b>I am proud of myself for .......</b></p>
                    <p style="margin-top:0; margin-bottom:0.5rem"><i>“Staying consistent with my studies this week.”</i></p>
                    <p style="margin-top:0; margin-bottom:0.5rem"><i>“Helping a friend understand a tough concept.”</i></p>
                  </div>
                 <p>🌟 <b>Bonus:</b> In the game, you can also create and answer your own personalized questions!</p>
`, 
          image: null, 
          video: null 
        },
        { 
          text: `<h4>Here are some more prompts to inspire your reflective journaling and deepen your self-awareness:</h4>
              <ul>
                <li>What did you learn about yourself today?</li>
                <li>How did you grow today, even if in a small way?</li>
                <li>What was your biggest challenge today, and what did you learn from it?</li>
                <li>What moments today made you feel most alive or fulfilled?</li>
                <li>What advice would you give yourself for tomorrow?</li>
                <li>What is something that inspired you recently, and how can you apply it to your life?</li>
              </ul>
          `, 
          image: null, 
          video: null 
        },
        { 
          text: `<h4>Ready to Reflect?</h4> 
                 <p>As you log your reflective journal entries, you’ll gain <b>points</b> to level up in the game and unlock valuable <b>badges</b>! 
                 Your journal is your personal mirror—it shows where you’ve been and lights the path ahead.</p>
                 <p>Start now, and make every study session a step toward mastering your exams!</p>`, 
          image: null, 
          video: null 
        }
      ],
    },
    // {
    //   name: 'Expressive Writing',
    //   icon: 'assets/expressive.png',
    //   tips: [
    //     { text: 'Use doodles and sketches to express emotions.', image: null, video: null },
    //     { text: 'Combine drawings with short notes.', image: 'assets/images/creative-example.jpg', video: null },
    //   ],
    // },
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


}
