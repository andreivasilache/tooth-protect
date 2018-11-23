import { Schedule } from './schedule.model';

export class UserModel {
    public name: string;
    public firstName: string;
    public email: string;
    public password: string;
    public age: number;
    public schedules: Schedule[];

    constructor(
        name: string,
        firstname: string,
        email: string,
        password: string,
        age: number,
        schedule: Schedule[]
    ) {
        this.name = name;
        this.firstName = firstname;
        this.email = email;
        this.password = password;
        this.age = age;
        this.schedules = schedule;
    }


}