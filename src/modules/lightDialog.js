import React, { Component } from 'react';

export default class LightDialog extends Component {
  constructor(props) {
    super(props);
    this.classLayoutMaskOpen = 'light-mask--open';
    this.classLightDialog = 'light-dialog';
    this.classLightDialogBody = 'light-dialog__body';
    this.classLightDialogContent = 'light-dialog__content';
    this.classLightDialogActive = 'light-dialog--active';
    this.classLightDialogClose = 'light-dialog--close';
    this.openedLightDialog = false;
    this.widthBodyScrollbar = 0;
    this.paddingRightBody = 0;
  }
  // 会在组件render之前执行，并且永远都只执行一次。
  componentWillMount() {
    document.addEventListener("keydown", (event) => {
      if ( this.openedLightDialog ) {
        this.showHideLightDialog(event, 'close');
      }
    });
  }
  // 这个方法会在组件加载完毕之后立即执行。
  componentDidMount() {

  }
  countBodyScrollbarWidth (action) {
    this.widthBodyScrollbar = window.innerWidth - document.body.clientWidth;
    switch(action) {
      case 'open':
        this.paddingRightBody = document.body.style.paddingRight;
        document.body.style.paddingRight = this.widthBodyScrollbar + 'px';
        break;
      case 'close':
        document.body.style.paddingRight = this.paddingRightBody;
        break;
      default:
    }
  }
  showHideLightDialog(e, action) {
    e.preventDefault();
    var boolOpen = true,
        boolTriggerChange = false,
        boolKeyESCEvent = e.keyCode === 27 ? true : false;
    switch (action) {
      case 'open':
        boolOpen = true;
        boolTriggerChange = true;
        this.countBodyScrollbarWidth('open');
        break;
      case 'close':
        if (e.target.classList.contains(this.classLightDialogActive) ||
            e.target.classList.contains(this.classLightDialogClose) ||
            boolKeyESCEvent) {
          boolOpen = false;
          boolTriggerChange = true;
          this.countBodyScrollbarWidth('close');
        }
        break;
      default:
    }
    if (boolTriggerChange) {
      this.openedLightDialog = boolOpen;
      document.body.classList.toggle(this.classLayoutMaskOpen, boolOpen);
      this.forceUpdate();
    }
  }
  render() {
    return ( 
      <div className={`${this.classLightDialog} ${this.openedLightDialog ? this.classLightDialogActive : ''}`} 
           onClick={(e) => this.showHideLightDialog(e, 'close')}> 
        <div className={this.classLightDialogBody}>
          <button className={this.classLightDialogClose}></button>
          <div className={this.classLightDialogContent}>
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
}