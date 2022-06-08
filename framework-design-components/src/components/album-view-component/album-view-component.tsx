import { Component, h, Prop, Element, State, Event, EventEmitter } from '@stencil/core';
import "@ionic/core";
import "ionicons";

const DEFAULT_WIDTH: string = '320px';

@Component({
  tag: 'album-view-component',
  styleUrl: 'album-view-component.css',
  shadow: true,
})
export class AlbumViewComponent {
  @Element() imageGalleryEl: HTMLElement;

  @Prop() albumtitle: string;
  @Prop() idx: string;
  @Prop({mutable: true}) num: number = 0;
  @Prop({mutable: true}) position: number = 0;
  @Prop({mutable: true}) energy: number = 0;
  @Prop() description: string;
  @Prop() top: number = 10;

  @State() maxEnergy: number = 10;
  @Prop({mutable: true}) gaveEnergy: boolean = false;
  @State() showDesc: boolean = false;
  @State() showImgs: boolean = true;

  @Event() energyUpdated: EventEmitter<any>;

  private react() {
    if (this.gaveEnergy == false) {
      this.energy += 1;
    } else {
      this.energy -= 1;
    }
    this.gaveEnergy = !this.gaveEnergy;
    this.energyUpdated.emit({'id': this.idx, 'energy': this.energy});
    return this;
  }

  private slotChanged(event) {
    const currentSlot = event.srcElement as HTMLSlotElement;
    if (currentSlot) {
      const nodes = currentSlot.assignedNodes();
      if (nodes) {
        this.num = nodes.length;
        for(const htmlElement of nodes as HTMLElement[]) {
          htmlElement.removeAttribute('hidden');
          if (htmlElement.querySelector('img')) {
            htmlElement.querySelector('img').style.height = 'inherit';
          }
        }
      }
    }
  }

  private imgsControls() {
    return (
      <ion-item lines="none">
        {this.albumtitle}
        <ion-button slot="end" shape="round" fill="clear" disabled={this.position <= 0} onClick={() => this.prev()}>
          <ion-icon slot="icon-only" name="chevron-back-outline"></ion-icon>
        </ion-button>
        <ion-button slot="end" shape="round" fill="clear" disabled={this.position >= this.num - 1} onClick={() => this.next()}>
          <ion-icon slot="icon-only" name="chevron-forward-outline"></ion-icon>
        </ion-button>
        <ion-button slot="end" shape="round" fill="clear" onClick={() => this.switchDescImgs()}>
          <ion-icon slot="icon-only" name="information-circle-outline"></ion-icon>
        </ion-button>
      </ion-item>
    );
  }

  private imgsInfo(idx) {
    return (
      <ion-text class="counter" slot="start">
        {idx} of {this.num}
      </ion-text>
    );
  }

  private imgsContent() {
    return (
      <section class="stage">
        <div class="carousel">
          <slot name="images" onSlotchange={(event) => this.slotChanged(event)}></slot>
        </div>
      </section>
    );
  }

  private descContent() {
    return (
      <section class="stage">
        {this.description}
      </section>
    );
  }

  private descControls() {
    return (
      <ion-item lines="none">
        {this.albumtitle}
        <ion-button slot="end" shape="round" fill="clear" onClick={() => this.switchDescImgs()}>
          <ion-icon slot="icon-only" name="information-circle-outline"></ion-icon>
        </ion-button>
      </ion-item>
    );
  }

  public next() {
    this.position = (this.position + 1) % this.num;
    return this;
  }

  public prev() {
    this.position = (this.num + (this.position - 1)) % this.num;
    return this;
  }

  public switchDescImgs() {
    this.showImgs = !this.showImgs;
    this.showDesc = !this.showDesc;
    console.log(this.showImgs, this.showDesc);
  }

  public get stageWidth(): string {
    return getComputedStyle(this.imageGalleryEl).getPropertyValue('--stage-width') || DEFAULT_WIDTH;
  }

  public get styles(): string {
    return `.carousel { margin-left: ${-this.position * parseInt(this.stageWidth)}px; }`;
  }

  render() {
    this.maxEnergy = this.top;
    const idx = this.position + 1;

    let conditionalContent, conditionalControls, conditionalInfo;
    if (this.showImgs) {
      conditionalContent = this.imgsContent();
      conditionalControls = this.imgsControls();
      conditionalInfo = this.imgsInfo(idx);
    } else {
      conditionalContent = this.descContent();
      conditionalControls = this.descControls();
    }

    return (
      <div>
        <style>{this.styles}</style>
        <ion-card class="card-size">
          <ion-card-header>
            {conditionalControls}
          </ion-card-header>
          <ion-card-content>
            {conditionalContent}
            <ion-item class="feedback" lines="none">
              {conditionalInfo}
              <ion-buttons slot="end">
                <ion-button onClick={() => this.react()}>
                  <ion-icon slot="icon-only" name="flash" class={this.gaveEnergy ? 'gave-evergy' : 'did-not-give'}></ion-icon>
                </ion-button>
              </ion-buttons>
              <ion-progress-bar slot="end" value={this.energy / this.maxEnergy}></ion-progress-bar>
            </ion-item>
          </ion-card-content>
        </ion-card>
      </div>
    );
  }

}
