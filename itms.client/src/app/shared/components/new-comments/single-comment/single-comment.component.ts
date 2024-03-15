import { Component, Input } from '@angular/core';
import { GetLocalTimeService } from '../../../services/get-local-time.service';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.css']
})
export class SingleCommentComponent {

  @Input() commentDetails: any;

  constructor(private localTime: GetLocalTimeService) { }

  convertUtcToLocalTime(utcTimeString: string): string {
    return this.localTime.localizeDateStr(utcTimeString);
  }


}
