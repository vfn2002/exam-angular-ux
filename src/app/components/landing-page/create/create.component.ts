import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {KeyValuePair} from "../../../models/KeyValuePair";
import {Intern} from "../../../models/Intern";
import {InternService} from "../../../services/Intern.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  @ViewChild("initials") initials;
  @ViewChild("name") name;
  @ViewChild("cooperation") cooperation;
  @ViewChild("qualifications") qualifications;
  @ViewChild("companyPerson") companyPerson;
  @ViewChild("companyName") companyName;
  @ViewChild("companyTrends") companyTrends;
  @ViewChild("internshipID") internshipID;
  @ViewChild("visitDate") visitDate;
  @ViewChild("misc") misc;
  @ViewChild("message") message;
  @ViewChild("container") container;

  constructor(private internService: InternService) { }

  ngOnInit() {
  }

  onAddIntern() {

    let initialsValue = this.initials.nativeElement.value;
    let nameValue = this.name.nativeElement.value;
    let cooperationValue = this.cooperation.nativeElement.value;
    let qualificationsValue = this.qualifications.nativeElement.value;
    let companyPersonValue = this.companyPerson.nativeElement.value;
    let companyNameValue = this.companyName.nativeElement.value;
    let companyTrendsValue = this.companyTrends.nativeElement.value;
    let internshipIDValue = this.internshipID.nativeElement.value;
    let visitDateValue = this.visitDate.nativeElement.value;
    let miscValue = this.misc.nativeElement.value;

    let internJSON = {
      data: {
        initials: initialsValue,
        name: nameValue,
        cooperation: cooperationValue,
        qualifications: qualificationsValue,
        companyPerson: companyPersonValue,
        companyName: companyNameValue,
        companyTrends: companyTrendsValue,
        IDOfInternship: internshipIDValue,
        visitDate: visitDateValue,
        miscellaneous: miscValue
      }

    };

    this.internService.postIntern(internJSON)
      .subscribe(
        (res) => {
          console.log(res);
          this.message.nativeElement.innerHTML = "Intern successfully added";
          this.message.nativeElement.style.backgroundColor = "#A5D6A7";
          this.message.nativeElement.style.animationName = "fade-in-out";
          this.message.nativeElement.style.animationTimingFunction = "ease";
          this.message.nativeElement.style.animationDuration = "4s";
        },
        (error) => console.log(error)
      );
  }

}
