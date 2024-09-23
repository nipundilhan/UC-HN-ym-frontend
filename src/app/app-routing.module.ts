import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './global_comman/home/home.component';
import { LoginComponent } from './global_comman/login/login.component';
import { TestComponent } from './global_comman/test/test.component';
import { SignupComponent } from './global_comman/signup/signup.component';
import { SelectavatarComponent } from './global_comman/selectavatar/selectavatar.component';
import { TutorialSubmissionComponent } from './module1_exam_prep/game1_tutorials/tutorial-submission/tutorial-submission.component';
import { ViewTutorialsComponent } from './module1_exam_prep/game1_tutorials/view-tutorials/view-tutorials.component';
import { HometestComponent } from './global_comman/hometest/hometest.component';
import { IntroPageComponent } from './global_comman/intro-page/intro-page.component';
import { ProfileComponent } from './global_comman/profile/profile.component';
import { ShareFeedComponent } from './global_comman/share-feed/share-feed.component';
import { GameOptionsComponent } from './global_comman/game-options/game-options.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'test', component: TestComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'select-avatar', component: SelectavatarComponent },
  { path: 'tutorial-submission', component: TutorialSubmissionComponent },
  { path: 'view-tutorials', component: ViewTutorialsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'hometest', component: HometestComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'introduction', component: IntroPageComponent , data: { hideHeader: true } },
  { path: 'share', component: ShareFeedComponent },
  { path: 'game-options/:id', component: GameOptionsComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
