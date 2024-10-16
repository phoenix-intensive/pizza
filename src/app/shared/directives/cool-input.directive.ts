import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2} from '@angular/core';


@Directive({
  selector: '[coolInput]'
})
export class CoolInputDirective implements OnInit {

  @Input() coolInputDefaultBgColor: string = 'white';
  @Input() coolInputFocusBgColor: string = 'orange';

  constructor(private el: ElementRef, private rend: Renderer2) {

  }


  //Меняем цвет инпута при фокусе на оранжевый
  @HostListener('focus')
  onFocus(): void {
    this.changeElementBgColor(this.coolInputFocusBgColor);
    this._onFocus = true;
  }

  //Потеря фокуса
  @HostListener('blur')
  onBlur(): void {
    this.changeElementBgColor(this.coolInputDefaultBgColor);
    this._onFocus = false;
  }

  @HostListener('click', ['$event.target'])
  onClick(target: HTMLElement): void {
    console.log(target)
  }


  private _backgroundColor: string = '';
  @HostBinding('style.backgroundColor')
  get getBcColor() {
    return this._backgroundColor;
  }


  private _onFocus: boolean = false;
  @HostBinding('class.isOnFocus')
  get getOnFocus() {
    return this._onFocus;
  }


  ngOnInit(): void {
    this.changeElementBgColor(this.coolInputDefaultBgColor);
    this.rend.setAttribute(this.el.nativeElement, 'placeholder',this.el.nativeElement.getAttribute('placeholder') + '*');
    // this.el.nativeElement.style.background = 'yellow';

    // const text = this.rend.createElement('span');
    // this.rend.setProperty(text, 'innerText', '*обязательно для заполнения');
    // this.rend.setStyle(text, 'color', 'red');
    // //Вставляем этот элемент после инпута insertBefore() привязываемся к род эл и вставлеям от текущего nextSibling this.el.nativeElement
    // this.rend.insertBefore(this.el.nativeElement.parentElement, text, this.rend.nextSibling(this.el.nativeElement));
  }

  changeElementBgColor(color: string): void {
     this._backgroundColor = color;
  }
}
