import { Injectable } from 'injection-js';

@Injectable()
export class Environment {
    production = false;
    applicationContextName = "paginationApp";
    baseUrl = "";
    useUrlRouting = true;
}

