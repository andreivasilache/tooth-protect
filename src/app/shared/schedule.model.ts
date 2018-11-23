export class Schedule {
    public id: string;
    public resource: string;
    public start: string;
    public end: string;
    public text: string;
    public color: string;

    constructor(
        id: string,
        resource: string,
        start: string,
        end: string,
        text: string,
        color: string
    ) {
        this.id = id;
        this.resource = resource;
        this.start = start;
        this.end = end;
        this.text = text;
        this.color = color;

    }
}
export class SchedulerModel {}
