import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  Injectable,
  Type,
  ViewContainerRef
} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalComponentRef!: ComponentRef<any>
  private childComponentRef!: ComponentRef<any>
  private rootViewContainerRef!: ViewContainerRef

  constructor(
    private appRef: ApplicationRef
  ) { }

  setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainerRef = viewContainerRef
  }

  open(modalComponent: Type<any>, childComponent: Type<any>, data?: any): void {
    this.modalComponentRef = createComponent(modalComponent, {
      environmentInjector: this.appRef.injector
    })
    this.rootViewContainerRef.insert(this.modalComponentRef.hostView)

    this.childComponentRef = createComponent(childComponent, {
      environmentInjector: this.appRef.injector
    })
    console.log(data)
    console.log(this.childComponentRef)
    if (data) {
      Object.assign(this.childComponentRef.instance, { data })
    }

    this.modalComponentRef.instance.viewContainerRef.insert(this.childComponentRef.hostView)
  }

  close(): void {
    if (this.childComponentRef) {
      this.childComponentRef.destroy()
    }
    if (this.modalComponentRef) {
      this.rootViewContainerRef.detach(this.rootViewContainerRef.indexOf(this.modalComponentRef.hostView))
      this.modalComponentRef.destroy()
    }
  }
}
