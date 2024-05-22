import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service'
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { IPositions } from '../../../../interfaces/IPositions'

@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  private positions: BehaviorSubject<IPositions> = new BehaviorSubject<IPositions>({
    positions: []
  })
  constructor(private httpService: HttpService) { }

  getPositions (): Observable<IPositions> {
    if (this.positions.value.positions.length === 0) {
      this.httpService.get<IPositions>('positions').pipe(
        tap(positions => this.positions.next(positions))
      ).subscribe()
    }

    return this.positions.asObservable()
  }
}
