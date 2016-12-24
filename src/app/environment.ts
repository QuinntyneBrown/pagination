import { Injectable } from "@angular/core";

@Injectable()
export class Environment {
    production = false;
    applicationContextName = "paginationApp";
    baseUrl = "";
    useUrlRouting = true;
}

