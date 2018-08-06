import ko from 'knockout';

export const HOME = 'HOME 1';

export const printHome = () => console.log(HOME);

// export function HomeViewModel(first, last) {
//     this.firstName = ko.observable(first);
//     this.lastName = ko.observable(last);

//     this.fullName = ko.pureComputed(function () {
//         // Knockout tracks dependencies automatically. It knows that fullName
// depends on firstName and lastName, because these get called when evaluating fullName.
//         return this.firstName() + " " + this.lastName();
//     }, this);
// }

export class HomeViewModel {
  constructor(first, last) {
    this.firstName = ko.observable(first);
    this.lastName = ko.observable(last);
    this.fullName = ko.pureComputed(() => `${this.firstName()} ${this.lastName()}`);
  }
}
