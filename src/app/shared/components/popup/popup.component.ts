import {Component, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',

})

//3 вариант - показа попапа не по нажатитю по кнопке, он сразу будет выходить на гл страницу
export class PopupComponent implements OnInit {

  @ViewChild('popup')
  popup!: TemplateRef<ElementRef>;

  @Input() data: string = '';

  public modalRef!: NgbModalRef;

  constructor(private modalService: NgbModal) { }

  open(): void {
    this.modalRef = this.modalService.open(this.popup);
  }

  ngOnInit(): void {
  }

}
