import { animate, state, style, transition, trigger } from '@angular/animations'

const scaleInOut = trigger('scaleInOut', [
  state('void', style({ transform: 'scale(0.9)', opacity: 0 })),
  transition(':enter, :leave', [
    animate(300)
  ])
])

export default scaleInOut
