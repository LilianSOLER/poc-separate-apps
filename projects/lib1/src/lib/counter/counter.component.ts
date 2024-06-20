import {Component, inject, OnInit} from '@angular/core';
import {CounterService} from './counter.service';
import {Observable} from 'rxjs';
import {AsyncPipe, NgForOf} from '@angular/common';
import {User} from '../user.interface';
import {faker} from '@faker-js/faker';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'lib-counter',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    FormsModule
  ],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  counterService: CounterService = inject(CounterService);

  counter$: Observable<number> = this.counterService.counter$;
  users$: Observable<User[]> = this.counterService.users$;
  numberOfUsersToAdd: number = 1;

  constructor() {
    console.log('CounterComponent initialized');
  }

  ngOnInit(): void {
  }

  increment() {
    this.counterService.increment();
  }

  decrement() {
    this.counterService.decrement();
  }

  reset() {
    this.counterService.reset();
  }

  addRandomUser() {
    for (let i = 0; i < this.numberOfUsersToAdd; i++) {
      const randomUser = this.generateRandomUser();
      this.counterService.addUser(randomUser);
    }

  }

  removeUser(userId: number) {
    this.counterService.removeUser(userId);
  }

  private generateRandomUser(): User {
    const id = faker.number.int(1000);
    return {
      id: id,
      email: faker.internet.email(),
      name: faker.person.fullName(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      pictureUrl: faker.image.avatar(),
      position: faker.person.jobType(),
      birthDate: faker.date.past().toISOString(),
      entryDate: faker.date.recent().toISOString(),
      phone1: faker.phone.number(),
      phone2: faker.phone.number(),
      phone3: faker.phone.number(),
      managerId: faker.string.uuid(),
      consultantsId: [faker.number.int(), faker.number.int()],
      tutorId: faker.string.uuid(),
      isHR: faker.datatype.boolean(),
      tutoredId: [faker.number.int(), faker.number.int()],
      technologies: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
      diet: faker.lorem.word(),
      shirtSize: faker.helpers.arrayElement(['S', 'M', 'L', 'XL']),
      yearsOfExperience: faker.number.int({min: 1, max: 20}),
      hrDriveLink: faker.internet.url(),
      highestDiplomaName: faker.lorem.word(),
      highestDiplomaLink: faker.internet.url(),
      office: {id: faker.string.uuid(), town: faker.location.city()},
      certifications: [{id: faker.string.uuid(), name: faker.lorem.word()}],
      positions: [{
        userId: id,
        startDate: faker.date.past().toISOString(),
        name: faker.name.jobTitle()
      }],
      teamId: faker.string.uuid(),
      team: {
        id: faker.string.uuid(),
        name: faker.company.name(),
        managerId: faker.number.int(),
        tribeId: faker.string.uuid(),
        directorsIds: [faker.number.int(), faker.number.int()]
      },
      managedTeamsIds: [faker.string.uuid(), faker.string.uuid()],
      directedTeamsIds: [faker.string.uuid(), faker.string.uuid()],
      tribeId: faker.string.uuid(),
      tribe: {
        id: faker.string.uuid(),
        name: faker.company.name(),
        leaderId: faker.number.int()
      },
      isDirector: faker.datatype.boolean()
    };
  }

  removeAllUsers() {
    this.counterService.resetUsers();
  }
}
