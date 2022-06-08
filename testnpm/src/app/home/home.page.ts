import { Component, HostListener, OnInit } from '@angular/core';
import { Firestore, collectionData, updateDoc, docData } from '@angular/fire/firestore';
import { collection, doc } from '@firebase/firestore';
import { IpService } from '../ip.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  collectionName = 'articles';
  albums = null;
  updated;
  ipAddress = null;

  @HostListener('energyUpdated', ['$event'])
  energyupdatedHandler(event) {
    let data = event.detail;
    for(let album of this.albums) {
      if (album.id === data.id) {
        this.updateAlbum(data, album);
      }
    }
  }

  constructor(
    private firestore: Firestore,
    private ip: IpService
  ) {}

  async getIP() {
    return new Promise((resolve, reject) => {
      this.ip.getIPAddress().subscribe((res) => {
        this.ipAddress = res['ip'];
      });
    });
  }

  ngOnInit() {
    this.getAlbums().subscribe(res => {
      if (this.albums == null) {
        this.albums = res;
        while(this.ipAddress == null);
        for(let album of this.albums) {
          if (album.ipsReactSeen.find(x => x === this.ipAddress)) {
            album.userGaveEnergy = true;
          } else {
            album.userGaveEnergy = false;
          }
        }
      }
    });
    this.getIP();
  }

  getAlbums() {
    const ref = collection(this.firestore, 'albums');
    return collectionData(ref);
  }

  updateAlbum(data, album) {
    const ref = doc(this.firestore, `albums/${data.id}`);
    if (!album.ipsReactSeen.find(x => x === this.ipAddress))
      album.ipsReactSeen.push(this.ipAddress);
    else {
      const index = album.ipsReactSeen.indexOf(this.ipAddress);
      album.ipsReactSeen.splice(index, 1);
    }
    updateDoc(ref, {energy: data.energy, ipsReactSeen: album.ipsReactSeen});
  }

}
