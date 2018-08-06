import { printInventory1 } from './inventoryScreen1';
import { printInventory2 } from './inventoryScreen2';
import '../../style/common.scss';
import '../../style/inventory.scss';

printInventory1();
printInventory2();

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {});
}
