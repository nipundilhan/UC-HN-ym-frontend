import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HomeComponent } from './global_comman/home/home.component';
import { HeaderComponent } from './global_comman/header/header.component';
import { SidenavComponent } from './global_comman/sidenav/sidenav.component';
import { FooterComponent } from './global_comman/footer/footer.component';
import { LoginComponent } from './global_comman/login/login.component';
import { TestComponent } from './global_comman/test/test.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SignupComponent } from './global_comman/signup/signup.component';
import { SelectavatarComponent } from './global_comman/selectavatar/selectavatar.component';
import { DataTransferService } from './_secondary_services/data-transfer.service';
import { TutorialSubmissionComponent } from './module1_exam_prep/game1_tutorials/tutorial-submission/tutorial-submission.component';
import { MindmapSubmissionComponent } from './module1_exam_prep/game1_mindmaps/mindmap-submission/mindmap-submission.component';
import { ViewTutorialsComponent } from './module1_exam_prep/game1_tutorials/view-tutorials/view-tutorials.component';
import { Module1EnterGameComponent } from './module1_exam_prep/common/module1-enter-game/module1-enter-game.component';
import { HometestComponent } from './global_comman/hometest/hometest.component';
import { IntroPageComponent } from './global_comman/intro-page/intro-page.component';
import { ProfileComponent } from './global_comman/profile/profile.component';
import { ShareFeedComponent } from './global_comman/share-feed/share-feed.component';
import { GameOptionsComponent } from './global_comman/game-options/game-options.component';
import { LearnTutorialsComponent } from './module1_exam_prep/game1_tutorials/learn-tutorials/learn-tutorials.component';
import { ViewQuestionsComponent } from './module1_exam_prep/game1_questions/view-questions/view-questions.component';
import { UsersComponent } from './admin/users/users.component';
import { GamesComponent } from './admin/games/games.component';
import { UserActivityComponent } from './admin/user-activity/user-activity.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { QuillModule } from 'ngx-quill';


@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        SidenavComponent,
        FooterComponent,
        LoginComponent,
        TestComponent,
        SignupComponent,
        SelectavatarComponent,
        TutorialSubmissionComponent,
        MindmapSubmissionComponent,
        ViewTutorialsComponent,
        Module1EnterGameComponent,
        HometestComponent,
        IntroPageComponent,
        ProfileComponent,
        ShareFeedComponent,
        GameOptionsComponent,
        LearnTutorialsComponent,
        ViewQuestionsComponent,
        UsersComponent,
        GamesComponent,
        UserActivityComponent,
        AdminDashboardComponent,
        AdminLayoutComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        QuillModule.forRoot(),

        
        ReactiveFormsModule], providers: [DataTransferService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
