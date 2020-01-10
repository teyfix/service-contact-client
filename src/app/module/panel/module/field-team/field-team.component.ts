import { Component, OnInit } from '@angular/core';
import { Paginator } from 'src/app/service/paginate/paginator';
import { FieldTeam } from 'src/app/service/field-team/entity/field-team';
import { FieldTeamService } from 'src/app/service/field-team/field-team.service';

@Component({
  selector: 'app-field-team',
  templateUrl: './field-team.component.html',
  styleUrls: ['./field-team.component.scss'],
})
export class FieldTeamComponent implements OnInit {
  fieldTeams: Paginator<FieldTeam>;

  constructor(private readonly fieldTeamService: FieldTeamService) {
  }

  ngOnInit() {
    this.fieldTeams = this.fieldTeamService.paginate();
  }

  onDelete($event: string | string[]) {
    this.fieldTeamService.deleteById($event);
  }
}
