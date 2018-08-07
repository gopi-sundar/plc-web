import ko from 'knockout';

export const HOME_1 = 'HOME 2';

export const printHome1 = () => console.log(HOME_1);

// export function Home1ViewModel() {
//     this.numberOfClicks = ko.observable(0);
//     this.incrementClickCounter = () => {
//     }
// }

export class Home1ViewModel {
  constructor() {
    this.numberOfClicks = ko.observable(0);
  }

  incrementClickCounter() {
    this.numberOfClicks(this.numberOfClicks() + 1);
  }
}
