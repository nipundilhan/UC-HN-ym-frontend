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
import { LearnTutorialsComponent } from './module1_exam_prep/game1_tutorials/learn-tutorials/learn-tutorials.component';
import { MindmapSubmissionComponent } from './module1_exam_prep/game1_mindmaps/mindmap-submission/mindmap-submission.component';
import { ViewQuestionsComponent } from './module1_exam_prep/game1_questions/view-questions/view-questions.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { GamesComponent } from './admin/games/games.component';
import { UserActivityComponent } from './admin/user-activity/user-activity.component';
import { TestUploadComponent } from './module1_exam_prep/game1_mindmaps/mindmap-submission/test-upload/test-upload.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'test', component: TestComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'select-avatar', component: SelectavatarComponent },
  { path: 'tutorial-submission', component: TutorialSubmissionComponent },
  { path: 'view-tutorials', component: ViewTutorialsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'hometest', component: HometestComponent },
  { path: 'upload', component: TestUploadComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'introduction', component: IntroPageComponent , data: { hideHeader: true } },
  { path: 'share', component: ShareFeedComponent },
  { path: 'game-options/:id', component: GameOptionsComponent },
  { path: 'learn-tutorials', component: LearnTutorialsComponent },
  { path: 'play-mindmaps', component: MindmapSubmissionComponent },
  { path: 'play-questions', component: ViewQuestionsComponent },


  {
    path: 'admin',
    component: AdminLayoutComponent, data: { hideHeader: true },// Admin layout with sidebar
    children: [
      { path: '', component: AdminDashboardComponent }, // Default to dashboard
      { path: 'users', component: UsersComponent },
      { path: 'games', component: GamesComponent },
      { path: 'user-activity', component: UserActivityComponent },
    ]
  },
  { path: '', redirectTo: '/admin', pathMatch: 'full' }, // Redirect root to /admin
  { path: '**', redirectTo: '/admin' } // Fallback route




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
