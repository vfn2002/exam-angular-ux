import {
  AfterViewInit, Component, Injectable, OnInit, Pipe, PipeTransform, Renderer, ViewChild,
  ViewChildren
} from '@angular/core';
import {InternService} from "../../../services/Intern.service";
import {Intern} from "../../../models/Intern";
import {FormBuilder, Validators} from "@angular/forms";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})

export class ListComponent implements OnInit, AfterViewInit {

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
  @ViewChild("loader") loader;
  @ViewChild("message") message;

  @ViewChild("internList") internList;

  interns: Intern[] = [];

  constructor(private internService: InternService) { }

  ngOnInit() {
    this.loadInterns();
  }

  ngAfterViewInit(){
    console.log(document.getElementById("interns"));
  }

  loadInterns() {
    this.internService.getInterns()
      .subscribe(
        res => {
          for (let i = 0; i < res.length; i++) {
            if (res[i].data !== undefined) {
              let intern = new Intern(res[i].data.initials, res[i].data.name, res[i].data.visitDate, res[i].data.IDOfInternship, res[i].data.companyName, res[i].data.companyPerson, res[i].data.companyTrends, res[i].data.companyQualification, res[i].data.cooperation, res[i].data.miscellaneous, res[i]._id);
              this.interns.push(intern);
            }
          }
        },
        error => console.log(error),
        () => {
          this.loader.nativeElement.remove();
        }
      );
  }

  updateIntern( intern: Intern, index: number) {
    /**
     * Magic
     */
    let initialsValue = this.internList.nativeElement.children[index].children[1].children[2].value;
    let nameValue = this.internList.nativeElement.children[index].children[1].children[3].value;
    let visitDateValue = this.internList.nativeElement.children[index].children[1].children[4].value;
    let cooperationValue = this.internList.nativeElement.children[index].children[1].children[5].value;
    let companyNameValue = this.internList.nativeElement.children[index].children[1].children[6].value;
    let companyPersonValue = this.internList.nativeElement.children[index].children[1].children[7].value;
    let qualificationsValue = this.internList.nativeElement.children[index].children[1].children[8].value;
    let companyTrendsValue = this.internList.nativeElement.children[index].children[1].children[9].value;
    let internshipIDValue = this.internList.nativeElement.children[index].children[1].children[10].value;
    let miscValue = this.internList.nativeElement.children[index].children[1].children[11].value;

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

    console.log(internJSON);

    this.message.nativeElement.innerHTML = "Intern successfully updated";
    this.message.nativeElement.style.backgroundColor = "#FFF59D";
    this.message.nativeElement.style.animationName = "fade-in-out";
    this.message.nativeElement.style.animationTimingFunction = "ease";
    this.message.nativeElement.style.animationDuration = "4s";
    setTimeout(function () {
      this.message.nativeElement.style.backgroundColor = "";
      this.message.nativeElement.style.animationName = "";
      this.message.nativeElement.style.animationTimingFunction = "";
      this.message.nativeElement.style.animationDuration = "";
    }, 4000)

    this.internService.putIntern(internJSON, intern._id)
      .subscribe(
        (res) => console.log(res),
        (error) => console.log(error)
      )
  }

  deleteIntern( intern: Intern ) {

    for (let i = 0; i < this.interns.length; i++) {
      if (intern === this.interns[i]) {
        this.interns.splice(i,1);
        this.message.nativeElement.innerHTML = "Intern successfully deleted";
        this.message.nativeElement.style.backgroundColor = "#EF9A9A";
        this.message.nativeElement.style.animationName = "fade-in-out";
        this.message.nativeElement.style.animationTimingFunction = "ease";
        this.message.nativeElement.style.animationDuration = "4s";
        setTimeout(function () {
          this.message.nativeElement.style.backgroundColor = "";
          this.message.nativeElement.style.animationName = "";
          this.message.nativeElement.style.animationTimingFunction = "";
          this.message.nativeElement.style.animationDuration = "";
        }, 4000);
      }
    }

    this.internService.deleteIntern(intern._id)
      .subscribe(
        (res) => {

        },
        (error) => console.log(error)
      )
  }

  expand( index: number ) {
    document.getElementById("buttons-" + index).style.display = "flex";
    document.getElementById("collapsed-" + index).style.display = "none";
    document.getElementById("details-" + index).style.display = "flex";
    document.getElementById("details-" + index).style.overflow = "hidden";
    document.getElementById("details-" + index).style.animationName = "expand";
    document.getElementById("details-" + index).style.animationTimingFunction = "ease";
    document.getElementById("details-" + index).style.animationDuration = "1s";
  }

}
