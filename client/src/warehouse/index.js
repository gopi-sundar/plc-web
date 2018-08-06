import { printWarehouse1 } from './warehouseScreen1';
import { printWarehouse2 } from './warehouseScreen2';
import '../../style/common.scss';
import '../../style/warehouse.scss';

printWarehouse1();
printWarehouse2();

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {});
}
