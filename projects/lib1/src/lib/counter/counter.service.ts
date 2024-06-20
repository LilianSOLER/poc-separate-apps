import { BehaviorSubject } from "rxjs";
import { inject, Injectable, NgZone } from "@angular/core";
import { LocalStorageService } from "../local-storage.service";
import type { User } from "../user.interface";

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  localStorageService: LocalStorageService = inject(LocalStorageService);

  private readonly COUNTER_KEY = 'counter';
  private readonly USERS_KEY = 'users';
  private counterSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  counter$ = this.counterSubject.asObservable();
  users$ = this.usersSubject.asObservable();

  useLocalStorage = true;  // Booléen pour contrôler l'utilisation du local storage

  constructor(private ngZone: NgZone) {
    this.initCounter();
    this.initUsers();
    window.addEventListener('storage', this.syncCounter.bind(this));
    window.addEventListener('storage', this.syncUsers.bind(this));
  }

  private measurePerformance(methodName: string, callback: () => void) {
    const start = performance.now();
    callback();
    const end = performance.now();
    console.log(`${methodName} took ${end - start} milliseconds`);
  }

  private initCounter() {
    this.measurePerformance('initCounter', () => {
      const initialCounter = this.useLocalStorage ? this.localStorageService.getItem<number>(this.COUNTER_KEY) || 0 : 0;
      this.counterSubject.next(initialCounter);
    });
  }

  private initUsers() {
    this.measurePerformance('initUsers', () => {
      const initialUsers = this.useLocalStorage ? this.localStorageService.getItem<User[]>(this.USERS_KEY) || [] : [];
      this.usersSubject.next(initialUsers);
    });
  }

  private syncCounter(event: StorageEvent) {
    this.measurePerformance('syncCounter', () => {
      if (this.useLocalStorage && event.key === this.COUNTER_KEY) {
        this.ngZone.run(() => {
          const newCounter = JSON.parse(event.newValue || '0');
          this.counterSubject.next(newCounter);
        });
      }
    });
  }

  private syncUsers(event: StorageEvent) {
    this.measurePerformance('syncUsers', () => {
      if (this.useLocalStorage && event.key === this.USERS_KEY) {
        this.ngZone.run(() => {
          const newUsers = JSON.parse(event.newValue || '[]');
          this.usersSubject.next(newUsers);
        });
      }
    });
  }

  increment() {
    this.measurePerformance('increment', () => {
      const currentCounter = this.useLocalStorage ? this.localStorageService.getItem<number>(this.COUNTER_KEY) || 0 : this.counterSubject.getValue();
      const newCounter = currentCounter + 1;
      if (this.useLocalStorage) {
        this.localStorageService.setItem(this.COUNTER_KEY, newCounter);
      }
      this.counterSubject.next(newCounter);
    });
  }

  decrement() {
    this.measurePerformance('decrement', () => {
      const currentCounter = this.useLocalStorage ? this.localStorageService.getItem<number>(this.COUNTER_KEY) || 0 : this.counterSubject.getValue();
      const newCounter = currentCounter - 1;
      if (this.useLocalStorage) {
        this.localStorageService.setItem(this.COUNTER_KEY, newCounter);
      }
      this.counterSubject.next(newCounter);
    });
  }

  reset() {
    this.measurePerformance('reset', () => {
      if (this.useLocalStorage) {
        this.localStorageService.setItem(this.COUNTER_KEY, 0);
      }
      this.counterSubject.next(0);
    });
  }

  addUser(user: User) {
    this.measurePerformance('addUser', () => {
      const currentUsers = this.useLocalStorage ? this.localStorageService.getItem<User[]>(this.USERS_KEY) || [] : this.usersSubject.getValue();
      currentUsers.push(user);
      if (this.useLocalStorage) {
        this.localStorageService.setItem(this.USERS_KEY, currentUsers);
      }
      this.usersSubject.next(currentUsers);
    });
  }

  removeUser(userId: number) {
    this.measurePerformance('removeUser', () => {
      let currentUsers = this.useLocalStorage ? this.localStorageService.getItem<User[]>(this.USERS_KEY) || [] : this.usersSubject.getValue();
      currentUsers = currentUsers.filter(user => user.id !== userId);
      if (this.useLocalStorage) {
        this.localStorageService.setItem(this.USERS_KEY, currentUsers);
      }
      this.usersSubject.next(currentUsers);
    });
  }

  resetUsers() {
    this.measurePerformance('resetUsers', () => {
      if (this.useLocalStorage) {
        this.localStorageService.setItem(this.USERS_KEY, []);
      }
      this.usersSubject.next([]);
    });
  }
}
