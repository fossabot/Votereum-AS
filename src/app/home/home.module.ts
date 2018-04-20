import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home.component';
/* Modules */
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { GuideComponent } from './components/guide.component';
import { VotingComponent } from './components/voting.component';
import { ScoreBoardComponent } from './components/score-board.component';
import { CandidateComponent } from './components/candidate.component';
import { VoteResultComponent } from './components/vote-result.component';
@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        SharedModule
    ],
    exports: [HomeComponent],
    declarations: [
        HomeComponent,
        GuideComponent,
        VotingComponent,
        ScoreBoardComponent,
        CandidateComponent,
        VoteResultComponent
    ]
})
export class HomeModule { }
