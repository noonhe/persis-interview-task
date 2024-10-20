# Persis Interview Task

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running Mock Backend

I've used json-server to mock a backend server. list of countries are in `db.json` file and to be able to call the services, please run `json-server db.json --watch`. If you don't have json-server installed in your system, please install its package globally with `npm install -g json-server`

## Phone Number Component 

This component is located in `app/shared/ui-components/international-phone-number` directory.
it's implemented with Angular Material and I've used ngx-mask library for implementing the formating of the phonenumber when it's being typed by the user.

